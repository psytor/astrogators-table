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

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  // Foundational Data
  await seedStats();
  await seedModSets();
  await seedModShapes();
  await seedModQualities();
  await seedModRarities();
  await seedMaterials();

  // Relational Data
  await seedModShapePrimaryStats();
  await seedStatRollInfo();
  await seedLevelingCosts();
  await seedSlicingActions();
  await seedSlicingCosts();
  await seedCalibrationCosts();

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
