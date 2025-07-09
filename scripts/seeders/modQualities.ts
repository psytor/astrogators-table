import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const modQualitiesData = [
  { tier_letter: 'E', color_name: 'Grey', initial_secondaries: 0 },
  { tier_letter: 'D', color_name: 'Green', initial_secondaries: 1 },
  { tier_letter: 'C', color_name: 'Blue', initial_secondaries: 2 },
  { tier_letter: 'B', color_name: 'Purple', initial_secondaries: 3 },
  { tier_letter: 'A', color_name: 'Gold', initial_secondaries: 4 },
];

export async function seedModQualities() {
  console.log('Seeding mod qualities...');
  for (const qualityData of modQualitiesData) {
    await prisma.modQuality.upsert({
      where: { tier_letter: qualityData.tier_letter },
      update: {},
      create: qualityData,
    });
  }
  console.log('Mod qualities seeded.');
}
