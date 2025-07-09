import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Cumulative leveling cost data from https://swgoh.wiki/wiki/Mods
const levelingCostData = [
  // --- 1-Dot ---
  { rarity_id: 1, level: 3, credit_cost: 700 },
  { rarity_id: 1, level: 6, credit_cost: 1925 },
  { rarity_id: 1, level: 9, credit_cost: 3500 },
  { rarity_id: 1, level: 12, credit_cost: 5775 },
  { rarity_id: 1, level: 15, credit_cost: 13400 },
  // --- 2-Dot ---
  { rarity_id: 2, level: 3, credit_cost: 1500 },
  { rarity_id: 2, level: 6, credit_cost: 4125 },
  { rarity_id: 2, level: 9, credit_cost: 7500 },
  { rarity_id: 2, level: 12, credit_cost: 12300 },
  { rarity_id: 2, level: 15, credit_cost: 28800 },
  // --- 3-Dot ---
  { rarity_id: 3, level: 3, credit_cost: 2400 },
  { rarity_id: 3, level: 6, credit_cost: 7200 },
  { rarity_id: 3, level: 9, credit_cost: 13200 },
  { rarity_id: 3, level: 12, credit_cost: 27600 },
  { rarity_id: 3, level: 15, credit_cost: 73200 },
  // --- 4-Dot ---
  { rarity_id: 4, level: 3, credit_cost: 4500 },
  { rarity_id: 4, level: 6, credit_cost: 12600 },
  { rarity_id: 4, level: 9, credit_cost: 22500 },
  { rarity_id: 4, level: 12, credit_cost: 47700 },
  { rarity_id: 4, level: 15, credit_cost: 128700 },
  // --- 5-Dot ---
  { rarity_id: 5, level: 3, credit_cost: 6900 },
  { rarity_id: 5, level: 6, credit_cost: 18400 },
  { rarity_id: 5, level: 9, credit_cost: 37900 },
  { rarity_id: 5, level: 12, credit_cost: 86200 },
  { rarity_id: 5, level: 15, credit_cost: 248400 },
  // --- 6-Dot ---
  { rarity_id: 6, level: 3, credit_cost: 6900 },
  { rarity_id: 6, level: 6, credit_cost: 18400 },
  { rarity_id: 6, level: 9, credit_cost: 37900 },
  { rarity_id: 6, level: 12, credit_cost: 86200 },
  { rarity_id: 6, level: 15, credit_cost: 248400 },
];

export async function seedLevelingCosts() {
  console.log('Seeding Leveling Costs...');

  await prisma.levelingCost.createMany({
    data: levelingCostData,
    skipDuplicates: true,
  });

  console.log(`Seeded ${levelingCostData.length} Leveling Cost records.`);
  console.log('Finished seeding Leveling Costs.');
}
