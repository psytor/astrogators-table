import { PrismaClient } from '@prisma/client';
import { createLogger } from '../src/services/logger';
import { seedStats } from './seeders/stats';
import { seedModSets } from './seeders/modSets';
import { seedModShapes } from './seeders/modShapes';
import { seedModQualities } from './seeders/modQualities';
import { seedModRarities } from './seeders/modRarities';
import { seedMaterials } from './seeders/materials';
import { seedModShapePrimaryStats } from './seeders/modShapePrimaryStats';
import { seedStatRollInfo } from './seeders/statRollInfo';
import { seedLevelingCosts } from './seeders/levelingCosts';
import { seedSlicingActions } from './seeders/slicingActions';
import { seedSlicingCosts } from './seeders/slicingCosts';
import { seedCalibrationCosts } from './seeders/calibrationCosts';

const prisma = new PrismaClient();
const logger = createLogger('Seeder');

async function main() {
  logger.info('Starting database seeding process...');

  // Foundational Data
  await seedStats(prisma, logger);
  await seedModSets(prisma, logger);
  await seedModShapes(prisma, logger);
  await seedModQualities(prisma, logger);
  await seedModRarities(prisma, logger);
  await seedMaterials(prisma, logger);

  // Relational Data
  await seedModShapePrimaryStats(prisma, logger);
  await seedStatRollInfo(prisma, logger);
  await seedLevelingCosts(prisma, logger);
  await seedSlicingActions(prisma, logger);
  await seedSlicingCosts(prisma, logger);
  await seedCalibrationCosts(prisma, logger);

  logger.info('Seeding process completed successfully.');
}

main()
  .catch((e) => {
    logger.error('An error occurred during the seeding process:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    logger.info('Prisma client disconnected.');
  });
