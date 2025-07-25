import { sendDiscordNotification } from '@astrogators-table/discord';
import { createLogger } from '@astrogators-table/logger';
import { getUnits } from '@astrogators-table/comlink';
import prisma from '@astrogators-table/database';

const logger = createLogger('sync-characters');

/**
 * This function is called when the game versions match.
 * It performs an anomaly check by comparing the number of units in the API
 * with the number of active characters in our database.
 * @param gameVersion The current game data version.
 */
export async function checkCharacterAnomalies(gameVersion: string) {
  logger.info('Checking for character data anomalies...');

  logger.debug('Fetching units from comlink for anomaly check...');
  const remoteUnits = await getUnits(gameVersion);
  if (!remoteUnits) {
    logger.warn('Could not fetch remote units for anomaly check. Skipping.');
    return;
  }
  const remoteCount = remoteUnits.length;
  logger.debug(`Found ${remoteCount} units in the API.`);

  logger.debug('Counting active characters in the database...');
  const localCount = await prisma.character.count({
    where: { is_active: true },
  });
  logger.debug(`Found ${localCount} active characters in the database.`);

  if (remoteCount !== localCount) {
    const warningMessage = `Anomaly detected during a routine check: The API has ${remoteCount} units, but the database has ${localCount} active characters. This may resolve after the next full sync.`;
    logger.warn(warningMessage);
    await sendDiscordNotification({
        title: '⚠️ Character Count Mismatch',
        message: warningMessage,
        severity: 'warning',
    });
  } else {
    logger.info('No character count anomalies detected.');
  }

  logger.info('Character anomaly check complete.');
}

/**
 * This function will be called when a new game version is detected.
 * It will perform a full synchronization of all character data.
 * @param gameVersion The new game data version.
 */
export async function syncAllCharacters(gameVersion: string) {
  logger.info('Starting full character synchronization...');
  let newCount = 0;
  let updatedCount = 0;
  let missingCount = 0;

  // Sub-task (8a): Fetch all characters from the API and all characters from our database.
  logger.debug('Fetching all units from comlink...');
  const remoteUnits = await getUnits(gameVersion);
  if (!remoteUnits) {
    logger.error('Could not fetch remote units. Aborting synchronization.');
    await sendDiscordNotification({
      title: '🚨 Character Sync Failed',
      message: 'Could not fetch remote unit data from comlink. Synchronization aborted.',
      severity: 'error',
    });
    return;
  }
  logger.info(`Found ${remoteUnits.length} unique units in the API.`);

  logger.debug('Fetching all characters from the database...');
  const localCharacters = await prisma.character.findMany();
  logger.info(`Found ${localCharacters.length} characters in the database.`);

  // Sub-task (8b): Identify and INSERT new characters.
  const localGameIds = new Set(localCharacters.map(c => c.game_id));
  const newUnits = remoteUnits.filter(u => !localGameIds.has(u.baseId));

  if (newUnits.length > 0) {
    logger.info(`Found ${newUnits.length} new units to insert.`);
    const newCharacters = newUnits.map(unit => {
      const roles: string[] = [];
      const factions: string[] = [];
      const raids: string[] = [];
      let alignment = '';

      unit.categoryId.forEach(category => {
        if (category.startsWith('alignment')) {
          alignment = category;
        } else if (category.startsWith('role') || category.startsWith('character_fleetcommander') || category.startsWith('shipclass_capitalship')) {
          roles.push(category);
        } else if (category.startsWith('profession') || category.startsWith('affiliation') || category.startsWith('species') || category.startsWith('unaligned') || category.startsWith('ds_unaligned') || category.startsWith('ls_unaligned')) {
          factions.push(category);
        } else if (category.startsWith('raid')) {
          raids.push(category);
        }
      });

      return {
        game_id: unit.baseId,
        name_key: unit.nameKey,
        alignment,
        factions,
        roles,
        raids,
        unit_type: unit.combatType,
        icon_url: unit.thumbnailName,
      };
    });

    try {
      const result = await prisma.character.createMany({
        data: newCharacters,
        skipDuplicates: true,
      });
      newCount = result.count;
      logger.info(`Successfully inserted ${newCount} new characters.`);
    } catch (error) {
      logger.error('Error inserting new characters:', error);
    }
  } else {
    logger.info('No new units to insert.');
  }

  // Sub-task (8c): Identify characters in DB but not in API (CRITICAL ANOMALY)
  const remoteGameIds = new Set(remoteUnits.map(u => u.baseId));
  const missingInApi = localCharacters.filter(c => c.is_active && !remoteGameIds.has(c.game_id));

  if (missingInApi.length > 0) {
    missingCount = missingInApi.length;
    const missingIds = missingInApi.map(c => c.game_id).join(', ');
    const errorMessage = `Found ${missingInApi.length} active character(s) in the database that are MISSING from the game API. This indicates a critical data discrepancy.\n\n**Character IDs:**\n${missingIds}`;
    logger.error(errorMessage);
    await sendDiscordNotification({
      title: '🚨 Critical Character Sync Anomaly',
      message: errorMessage,
      severity: 'error',
    });
  } else {
    logger.info('No missing-in-API anomalies detected.');
  }

  // Sub-task (8d): Identify and UPDATE existing characters.
  const remoteUnitMap = new Map(remoteUnits.map(u => [u.baseId, u]));
  const charactersToUpdate = [];

  for (const localChar of localCharacters) {
    const remoteUnit = remoteUnitMap.get(localChar.game_id);
    if (!remoteUnit) continue; // Should be handled by soft-delete, but good practice

    const roles: string[] = [];
    const factions: string[] = [];
    const raids: string[] = [];
    let alignment = '';

    remoteUnit.categoryId.forEach(category => {
      if (category.startsWith('alignment')) {
        alignment = category;
      } else if (category.startsWith('role') || category.startsWith('character_fleetcommander') || category.startsWith('shipclass_capitalship')) {
        roles.push(category);
      } else if (category.startsWith('profession') || category.startsWith('affiliation') || category.startsWith('species') || category.startsWith('unaligned') || category.startsWith('ds_unaligned') || category.startsWith('ls_unaligned')) {
        factions.push(category);
      } else if (category.startsWith('raid')) {
        raids.push(category);
      }
    });

    const arraysAreEqual = (a: string[], b: string[]) => {
      if (a.length !== b.length) return false;
      const sortedA = [...a].sort();
      const sortedB = [...b].sort();
      return sortedA.every((val, index) => val === sortedB[index]);
    };

    if (
      localChar.name_key !== remoteUnit.nameKey ||
      localChar.alignment !== alignment ||
      !arraysAreEqual(localChar.factions, factions) ||
      !arraysAreEqual(localChar.roles, roles) ||
      !arraysAreEqual(localChar.raids, raids) ||
      localChar.unit_type !== remoteUnit.combatType ||
      localChar.icon_url !== remoteUnit.thumbnailName ||
      !localChar.is_active // Also re-activate if it was previously retired
    ) {
      charactersToUpdate.push(
        prisma.character.update({
          where: { id: localChar.id },
          data: {
            name_key: remoteUnit.nameKey,
            alignment,
            factions,
            roles,
            raids,
            unit_type: remoteUnit.combatType,
            icon_url: remoteUnit.thumbnailName,
            is_active: true, // Ensure it's active
          },
        })
      );
    }
  }

  if (charactersToUpdate.length > 0) {
    logger.info(`Found ${charactersToUpdate.length} characters to update.`);
    try {
      const result = await prisma.$transaction(charactersToUpdate);
      updatedCount = result.length;
      logger.info(`Successfully updated ${updatedCount} characters.`);
    } catch (error) {
      logger.error('Error updating characters:', error);
    }
  } else {
    logger.info('No characters to update.');
  }

  let alertSeverity: 'success' | 'warning' = 'success';
  let summaryMessage = 'Character synchronization completed with no changes.';

  if (newCount > 0 || updatedCount > 0 || missingCount > 0) {
    if (updatedCount > 0 || missingCount > 0) {
      alertSeverity = 'warning';
    }
    summaryMessage = `Character synchronization complete.
- **New Characters Added:** ${newCount}
- **Existing Characters Updated:** ${updatedCount}
- **Critical Anomalies (Missing in API):** ${missingCount}`;
  }

  await sendDiscordNotification({
    title: alertSeverity === 'success' ? '✅ Character Sync Successful' : '⚠️ Character Sync Completed with Changes',
    message: summaryMessage,
    severity: alertSeverity,
  });

  logger.info('Full character synchronization complete.');
}
