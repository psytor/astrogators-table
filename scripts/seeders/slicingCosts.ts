import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Data confirmed from the visual table
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

export async function seedSlicingCosts() {
  console.log('Seeding Slicing Costs...');

  // 1. Fetch necessary data for mapping
  const materials = await prisma.material.findMany();
  const qualities = await prisma.modQuality.findMany();
  const actions = await prisma.slicingAction.findMany();

  // 2. Create maps for easy ID lookup
  const materialIdMap = new Map(materials.map(m => [m.name, m.id]));
  const qualityTierMap = new Map(qualities.map(q => [q.id, q.tier_letter]));

  // Create a map for SlicingAction IDs based on a unique string identifier
  const actionIdMap = new Map(actions.map(action => {
    const fromQualityTier = qualityTierMap.get(action.from_quality_id);
    const toQualityTier = qualityTierMap.get(action.to_quality_id);
    const key = `${action.from_rarity_id}-${fromQualityTier}_${action.to_rarity_id}-${toQualityTier}`;
    return [key, action.id];
  }));

  // 3. Prepare the data for seeding
  const slicingCostData = [];
  for (const rawData of slicingCostRawData) {
    const [fromRarity, fromTier] = rawData.from.split('-');
    const [toRarity, toTier] = rawData.to.split('-');
    const actionKey = `${fromRarity}-${fromTier}_${toRarity}-${toTier}`;
    const actionId = actionIdMap.get(actionKey);

    if (!actionId) {
      console.warn(`Slicing action for path ${actionKey} not found. Skipping.`);
      continue;
    }

    for (const cost of rawData.costs) {
      const materialId = materialIdMap.get(cost.material);
      if (!materialId) {
        console.warn(`Material "${cost.material}" not found. Skipping.`);
        continue;
      }
      slicingCostData.push({
        action_id: actionId,
        material_id: materialId,
        quantity: cost.quantity,
      });
    }
  }

  // 4. Seed the data
  if (slicingCostData.length > 0) {
    await prisma.slicingCost.createMany({
      data: slicingCostData,
      skipDuplicates: true, // Requires @@unique([action_id, material_id]) in schema
    });
    console.log(`Seeded ${slicingCostData.length} Slicing Cost records.`);
  } else {
    console.log('No new Slicing Cost records to seed.');
  }

  console.log('Finished seeding Slicing Costs.');
}
