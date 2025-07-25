import { createLogger } from '@astrogators-table/logger';
import { getMetadata } from '@astrogators-table/comlink';
import prisma from '@astrogators-table/database';
import { syncAllCharacters, checkCharacterAnomalies } from './syncCharacters';

const logger = createLogger('test-sync-script');

async function main() {
  const args = process.argv.slice(2);
  const runArg = args.find(arg => arg.startsWith('--run='))?.split('=')[1];

  if (!runArg || !['sync', 'check'].includes(runArg)) {
    logger.error('Invalid argument. Please specify --run=sync or --run=check');
    return;
  }

  logger.info(`--- Starting Character Sync Test Script (mode: ${runArg}) ---`);

  // 1. Fetch the latest game version from the API
  logger.info('Fetching latest game version...');
  const metadata = await getMetadata();
  if (!metadata || !metadata.latestGamedataVersion) {
    logger.error('Could not fetch metadata or game version. Aborting test.');
    return;
  }
  const gameVersion = metadata.latestGamedataVersion;
  logger.info(`Latest game version is: ${gameVersion}`);

  if (runArg === 'sync') {
    // 2. Run the full synchronization logic
    logger.info('--- Testing syncAllCharacters ---');
    logger.info('This will simulate a "versions don\'t match" scenario.');
    await syncAllCharacters(gameVersion);
    logger.info('--- Finished testing syncAllCharacters ---');
  } else if (runArg === 'check') {
    // 3. Run the anomaly check logic
    logger.info('--- Testing checkCharacterAnomalies ---');
    logger.info('This will simulate a "versions match" scenario to check for count mismatches.');
    await checkCharacterAnomalies(gameVersion);
    logger.info('--- Finished testing checkCharacterAnomalies ---');
  }

  logger.info('--- Character Sync Test Script Finished ---');
}

main()
  .catch((e) => {
    logger.error('An error occurred during the test script execution:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
