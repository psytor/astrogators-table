import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const modRaritiesData = [
  { dot_value: 1 },
  { dot_value: 2 },
  { dot_value: 3 },
  { dot_value: 4 },
  { dot_value: 5 },
  { dot_value: 6 },
];

export async function seedModRarities() {
  console.log('Seeding mod rarities...');
  for (const rarityData of modRaritiesData) {
    await prisma.modRarity.upsert({
      where: { dot_value: rarityData.dot_value },
      update: {},
      create: rarityData,
    });
  }
  console.log('Mod rarities seeded.');
}
