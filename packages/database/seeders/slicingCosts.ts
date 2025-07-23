import { PrismaClient } from '@prisma/client';
import { createLogger } from '@astrogators-table/logger';
const logger = createLogger('database-seeder');

export async function seedSlicingCosts(prisma: PrismaClient) {
  logger.info('Seeding Slicing Costs...');

  const slicingCostRawData = [
    { from: '5-E', to: '5-D', costs: [{ material: 'Mk 1 Bonding Pin', quantity: 10 }] },
    { from: '5-D', to: '5-C', costs: [{ material: 'Mk 1 Bonding Pin', quantity: 5 }, { material: 'Mk 1 Fusion Disk', quantity: 15 }] },
    { from: '5-C', to: '5-B', costs: [{ material: 'Mk 1 Fusion Disk', quantity: 10 }, { material: 'Mk 1 Power Flow Control Chip', quantity: 25 }] },
    { from: '5-B', to: '5-A', costs: [{ material: 'Mk 1 Power Flow Control Chip', quantity: 15 }, { material: 'Mk 1 Fusion Coil', quantity: 35 }] },
    { from: '5-A', to: '6-E', costs: [{ material: 'Mk 1 Amplifier', quantity: 50 }, { material: 'Mk 1 Capacitor', quantity: 50 }, { material: 'Mk 2 Pulse Modulator', quantity: 20 }] },
    { from: '6-E', to: '6-D', costs: [{ material: 'Mk 2 Circuit Breaker Module', quantity: 10 }] },
    { from: '6-D', to: '6-C', costs: [{ material: 'Mk 1 Amplifier', quantity: 5 }, { material: 'Mk 1 Capacitor', quantity: 5 }, { material: 'Mk 2 Circuit Breaker Module', quantity: 10 }, { material: 'Mk 2 Thermal Exchange Unit', quantity: 10 }] },
    { from: '6-C', to: '6-B', costs: [{ material: 'Mk 1 Amplifier', quantity: 10 }, { material: 'Mk 1 Capacitor', quantity: 10 }, { material: 'Mk 2 Circuit Breaker Module', quantity: 10 }, { material: 'Mk 2 Thermal Exchange Unit', quantity: 20 }, { material: 'Mk 2 Variable Resistor', quantity: 10 }] },
    { from: '6-B', to: '6-A', costs: [{ material: 'Mk 1 Capacitor', quantity: 30 }, { material: 'Mk 2 Pulse Modulator', quantity: 10 }, { material: 'Mk 2 Thermal Exchange Unit', quantity: 20 }, { material: 'Mk 2 Variable Resistor', quantity: 20 }, { material: 'Mk 2 Microprocessor', quantity: 15 }] },
  ];

  const materials = await prisma.material.findMany();
  const qualities = await prisma.modQuality.findMany();
  const actions = await prisma.slicingAction.findMany();

  const materialIdMap = new Map(materials.map(m => [m.name, m.id]));
  const qualityTierMap = new Map(qualities.map(q => [q.id, q.tier_letter]));

  const actionIdMap = new Map(actions.map(action => {
    const fromQualityTier = qualityTierMap.get(action.from_quality_id);
    const toQualityTier = qualityTierMap.get(action.to_quality_id);
    const key = `${action.from_rarity_id}-${fromQualityTier}_${action.to_rarity_id}-${toQualityTier}`;
    return [key, action.id];
  }));

  const slicingCostData = [];
  for (const rawData of slicingCostRawData) {
    const [fromRarity, fromTier] = rawData.from.split('-');
    const [toRarity, toTier] = rawData.to.split('-');
    const actionKey = `${fromRarity}-${fromTier}_${toRarity}-${toTier}`;
    const actionId = actionIdMap.get(actionKey);

    if (!actionId) {
      logger.warn(`Slicing action for path ${actionKey} not found. Skipping.`);
      continue;
    }

    for (const cost of rawData.costs) {
      const materialId = materialIdMap.get(cost.material);
      if (!materialId) {
        logger.warn(`Material "${cost.material}" not found. Skipping.`);
        continue;
      }
      slicingCostData.push({
        action_id: actionId,
        material_id: materialId,
        quantity: cost.quantity,
      });
    }
  }

  if (slicingCostData.length > 0) {
    await prisma.slicingCost.createMany({
      data: slicingCostData,
      skipDuplicates: true,
    });
    logger.info(`Seeded ${slicingCostData.length} Slicing Cost records.`);
  } else {
    logger.info('No new Slicing Cost records to seed.');
  }

  logger.info('Finished seeding Slicing Costs.');
}