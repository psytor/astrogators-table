import { createLogger } from '@astrogators-table/logger';
import { getMetadata } from '@astrogators-table/comlink';
import prisma from '@astrogators-table/database';
import { checkCharacterAnomalies, syncAllCharacters } from './syncCharacters';

const logger = createLogger('data-orchestrator');

const METADATA_KEY = 'latestGamedataVersion';

export async function runDataOrchestrator() {
  logger.info('Starting data orchestration process...');
  const orchestratorStartTime = new Date();

  logger.debug('Fetching latest game version from comlink...');
  const metadata = await getMetadata();
  const remoteVersion = metadata?.latestGamedataVersion;

  if (!remoteVersion) {
    logger.error('Could not fetch remote game version. Aborting.');
    return;
  }
  logger.info(`Remote game version is: ${remoteVersion}`);

  logger.debug('Fetching stored game version from database...');
  const localVersionEntry = await prisma.gameVersion.findUnique({
    where: { metadata_key: METADATA_KEY },
  });
  const localVersion = localVersionEntry?.metadata_value;
  logger.info(`Stored game version is: ${localVersion || 'Not found'}`);

  if (remoteVersion === localVersion) {
    logger.info('Game versions match. Running anomaly check...');
    await checkCharacterAnomalies(remoteVersion);
    // Even if versions match, we update the 'last_checked' timestamp
    if (localVersionEntry) {
      await prisma.gameVersion.update({
        where: { metadata_key: METADATA_KEY },
        data: { last_checked: orchestratorStartTime },
      });
    }
  } else {
    logger.info('New game version detected. Starting full data synchronization...');
    await syncAllCharacters(remoteVersion);

    logger.info(`Synchronization complete. Updating stored game version to ${remoteVersion}...`);
    await prisma.gameVersion.upsert({
      where: { metadata_key: METADATA_KEY },
      update: {
        metadata_value: remoteVersion,
        last_checked: orchestratorStartTime,
        last_updated: orchestratorStartTime,
      },
      create: {
        metadata_key: METADATA_KEY,
        metadata_value: remoteVersion,
        last_checked: orchestratorStartTime,
        last_updated: orchestratorStartTime,
      },
    });
    logger.info('Stored game version updated successfully.');
  }

  logger.info('Data orchestration process finished.');
}

// This allows the script to be run directly from the command line
if (require.main === module) {
  runDataOrchestrator().catch((error) => {
    logger.error('An unexpected error occurred during data orchestration:', error);
    process.exit(1);
  });
}