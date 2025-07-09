import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Data confirmed from the visual table
const calibrationCostData = [
  { attempt_number: 1, materialName: 'Micro Attenuator', quantity: 15 },
  { attempt_number: 2, materialName: 'Micro Attenuator', quantity: 25 },
  { attempt_number: 3, materialName: 'Micro Attenuator', quantity: 40 },
  { attempt_number: 4, materialName: 'Micro Attenuator', quantity: 75 },
  { attempt_number: 5, materialName: 'Micro Attenuator', quantity: 100 },
  { attempt_number: 6, materialName: 'Micro Attenuator', quantity: 150 },
];

export async function seedCalibrationCosts() {
  console.log('Seeding Calibration Costs...');

  // 1. Get the Material ID for Micro Attenuator
  const microAttenuator = await prisma.material.findUnique({
    where: { name: 'Micro Attenuator' },
  });

  if (!microAttenuator) {
    console.error('Could not find "Micro Attenuator" in the materials table. Aborting seed.');
    return;
  }

  // 2. Prepare the data for seeding
  const calibrationCostSeedData = calibrationCostData.map(cost => ({
    attempt_number: cost.attempt_number,
    material_id: microAttenuator.id,
    quantity: cost.quantity,
  }));

  // 3. Seed the data
  await prisma.calibrationCost.createMany({
    data: calibrationCostSeedData,
    skipDuplicates: true,
  });

  console.log(`Seeded ${calibrationCostSeedData.length} Calibration Cost records.`);
  console.log('Finished seeding Calibration Costs.');
}
