import { PrismaClient } from '@prisma/client';
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
import { createLogger } from '@astrogators-table/logger';
const logger = createLogger('database-seeder');

const prisma = new PrismaClient();


async function main() {
  logger.info('Starting database seeding process...');

  // Foundational Data
  await seedStats(prisma);
  await seedModSets(prisma);
  await seedModShapes(prisma);
  await seedModQualities(prisma);
  await seedModRarities(prisma);
  await seedMaterials(prisma);

  // Relational Data
  await seedModShapePrimaryStats(prisma);
  await seedStatRollInfo(prisma);
  await seedLevelingCosts(prisma);
  await seedSlicingActions(prisma);
  await seedSlicingCosts(prisma);
  await seedCalibrationCosts(prisma);

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
