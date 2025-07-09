import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Slicing paths confirmed in the visual table
const slicingPathData = [
  { fromRarity: 5, fromQualityTier: 'E', toRarity: 5, toQualityTier: 'D', creditCost: 18000 },
  { fromRarity: 5, fromQualityTier: 'D', toRarity: 5, toQualityTier: 'C', creditCost: 18000 },
  { fromRarity: 5, fromQualityTier: 'C', toRarity: 5, toQualityTier: 'B', creditCost: 63000 },
  { fromRarity: 5, fromQualityTier: 'B', toRarity: 5, toQualityTier: 'A', creditCost: 90000 },
  { fromRarity: 5, fromQualityTier: 'A', toRarity: 6, toQualityTier: 'E', creditCost: 200000 },
  { fromRarity: 6, fromQualityTier: 'E', toRarity: 6, toQualityTier: 'D', creditCost: 36000 },
  { fromRarity: 6, fromQualityTier: 'D', toRarity: 6, toQualityTier: 'C', creditCost: 72000 },
  { fromRarity: 6, fromQualityTier: 'C', toRarity: 6, toQualityTier: 'B', creditCost: 126000 },
  { fromRarity: 6, fromQualityTier: 'B', toRarity: 6, toQualityTier: 'A', creditCost: 276000 },
];

export async function seedSlicingActions() {
  console.log('Seeding Slicing Actions...');

  // 1. Get all mod qualities from the DB to map tiers to IDs
  const qualities = await prisma.modQuality.findMany();
  const qualityIdMap = new Map(qualities.map(q => [q.tier_letter, q.id]));

  // 2. Prepare the data for seeding
  const slicingActionData = slicingPathData.map(path => {
    const fromQualityId = qualityIdMap.get(path.fromQualityTier);
    const toQualityId = qualityIdMap.get(path.toQualityTier);

    if (!fromQualityId || !toQualityId) {
      console.warn(`Could not find IDs for slicing path: ${path.fromQualityTier} -> ${path.toQualityTier}. Skipping.`);
      return null;
    }

    return {
      from_rarity_id: path.fromRarity,
      from_quality_id: fromQualityId,
      to_rarity_id: path.toRarity,
      to_quality_id: toQualityId,
      credit_cost: path.creditCost,
    };
  }).filter(Boolean); // Filter out any nulls

  // 3. Seed the data
  if (slicingActionData.length > 0) {
    await prisma.slicingAction.createMany({
        data: slicingActionData as any[],
        skipDuplicates: true,
    });

    console.log(`Seeded ${slicingActionData.length} Slicing Action records.`);
  } else {
    console.log('No new Slicing Action records to seed.');
  }

  console.log('Finished seeding Slicing Actions.');
}
