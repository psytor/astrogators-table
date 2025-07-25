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
    logger.warn(`Anomaly detected: API has ${remoteCount} units, but the database has ${localCount} active characters.`);
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
  // Logic to be added in a future step.
  logger.info('Full character synchronization complete.');
}