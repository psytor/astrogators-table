import { PrismaClient } from '@prisma/client';
import { createLogger } from '@astrogators-table/logger';
const logger = createLogger('database-seeder');

export async function seedSlicingActions(prisma: PrismaClient) {
  logger.info('Seeding Slicing Actions...');

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

  const qualities = await prisma.modQuality.findMany();
  const qualityIdMap = new Map(qualities.map(q => [q.tier_letter, q.id]));

  const slicingActionData = slicingPathData.map(path => {
    const fromQualityId = qualityIdMap.get(path.fromQualityTier);
    const toQualityId = qualityIdMap.get(path.toQualityTier);

    if (!fromQualityId || !toQualityId) {
      logger.warn(`Could not find IDs for slicing path: ${path.fromQualityTier} -> ${path.toQualityTier}. Skipping.`);
      return null;
    }

    return {
      from_rarity_id: path.fromRarity,
      from_quality_id: fromQualityId,
      to_rarity_id: path.toRarity,
      to_quality_id: toQualityId,
      credit_cost: path.creditCost,
    };
  }).filter(Boolean);

  if (slicingActionData.length > 0) {
    await prisma.slicingAction.createMany({
        data: slicingActionData as any[],
        skipDuplicates: true,
    });

    logger.info(`Seeded ${slicingActionData.length} Slicing Action records.`);
  } else {
    logger.info('No new Slicing Action records to seed.');
  }

  logger.info('Finished seeding Slicing Actions.');
}