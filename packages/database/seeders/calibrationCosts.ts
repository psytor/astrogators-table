import { PrismaClient } from '@prisma/client';
import { createLogger } from '@astrogators-table/logger';
const logger = createLogger('database-seeder');

export async function seedCalibrationCosts(prisma: PrismaClient) {
  logger.info('Seeding Calibration Costs...');

  const calibrationCostData = [
    { attempt_number: 1, materialName: 'Micro Attenuator', quantity: 15 },
    { attempt_number: 2, materialName: 'Micro Attenuator', quantity: 25 },
    { attempt_number: 3, materialName: 'Micro Attenuator', quantity: 40 },
    { attempt_number: 4, materialName: 'Micro Attenuator', quantity: 75 },
    { attempt_number: 5, materialName: 'Micro Attenuator', quantity: 100 },
    { attempt_number: 6, materialName: 'Micro Attenuator', quantity: 150 },
  ];

  const microAttenuator = await prisma.material.findUnique({
    where: { name: 'Micro Attenuator' },
  });

  if (!microAttenuator) {
    logger.error('Could not find "Micro Attenuator" in the materials table. Aborting seed.');
    return;
  }

  const calibrationCostSeedData = calibrationCostData.map(cost => ({
    attempt_number: cost.attempt_number,
    material_id: microAttenuator.id,
    quantity: cost.quantity,
  }));

  await prisma.calibrationCost.createMany({
    data: calibrationCostSeedData,
    skipDuplicates: true,
  });

  logger.info(`Seeded ${calibrationCostSeedData.length} Calibration Cost records.`);
  logger.info('Finished seeding Calibration Costs.');
}