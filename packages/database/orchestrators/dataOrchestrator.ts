import { createLogger } from '@astrogators-table/logger';
import { getMetadata } from '@astrogators-table/comlink';
import prisma from '@astrogators-table/database';

const logger = createLogger('data-orchestrator');

const METADATA_KEY = 'latestGamedataVersion';

async function main() {
  logger.info('Starting data orchestration process...');

  logger.info('Fetching latest game version from comlink...');
  const metadata = await getMetadata();
  const remoteVersion = metadata?.latestGamedataVersion;

  if (!remoteVersion) {
    logger.error('Could not fetch remote game version. Aborting.');
    return;
  }
  logger.info(`Remote game version is: ${remoteVersion}`);

  logger.info('Fetching stored game version from database...');
  const localVersionEntry = await prisma.gameVersion.findUnique({
    where: { metadata_key: METADATA_KEY },
  });
  const localVersion = localVersionEntry?.metadata_value;
  logger.info(`Stored game version is: ${localVersion || 'Not found'}`);

  if (remoteVersion === localVersion) {
    logger.info('Game versions match. No data synchronization needed.');
    // In the future, we will call the "anomaly check" logic here.
  } else {
    logger.info('New game version detected. Proceeding with data synchronization...');
    // In the future, we will call the main sync logic here.
  }

  logger.info('Data orchestration process finished.');
}

main().catch((error) => {
  logger.error('An unexpected error occurred during data orchestration:', error);
  process.exit(1);
});