import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Corrected data mapping from Mod Shape to its possible Primary Stats
const shapePrimaryStatsMap: Record<string, string[]> = {
  'Square': ['Offense %'],
  'Diamond': ['Defense %'],
  'Circle': ['Health %', 'Protection %'],
  'Arrow': ['Speed', 'Accuracy', 'Critical Avoidance', 'Health %', 'Protection %', 'Offense %', 'Defense %'],
  'Triangle': ['Critical Chance', 'Critical Damage', 'Health %', 'Protection %', 'Offense %', 'Defense %'],
  'Cross': ['Tenacity', 'Potency', 'Health %', 'Protection %', 'Offense %', 'Defense %'],
};

export async function seedModShapePrimaryStats() {
  console.log('Seeding Mod Shape Primary Stats...');

  // 1. Get all shapes and stats from the DB
  const shapes = await prisma.modShape.findMany();
  const stats = await prisma.stat.findMany();

  // 2. Create maps for easy lookup of IDs
  const shapeIdMap = new Map(shapes.map(s => [s.name, s.id]));
  const statIdMap = new Map(stats.map(s => [s.name, s.id]));

  // 3. Prepare the data for seeding
  const modShapePrimaryStatData = [];

  for (const shapeName in shapePrimaryStatsMap) {
    const shapeId = shapeIdMap.get(shapeName);
    if (!shapeId) {
      console.warn(`Shape "${shapeName}" not found in the database. Skipping.`);
      continue;
    }

    const primaryStatNames = shapePrimaryStatsMap[shapeName];
    for (const statName of primaryStatNames) {
      const statId = statIdMap.get(statName);
      if (!statId) {
        console.warn(`Stat "${statName}" not found in the database. Skipping for shape "${shapeName}".`);
        continue;
      }
      modShapePrimaryStatData.push({ shape_id: shapeId, stat_id: statId });
    }
  }

  // 4. Seed the data
  if (modShapePrimaryStatData.length > 0) {
    await prisma.modShapePrimaryStat.createMany({
      data: modShapePrimaryStatData,
      skipDuplicates: true, // Avoid errors on re-seeding
    });
    console.log(`Seeded ${modShapePrimaryStatData.length} Mod Shape Primary Stat relationships.`);
  } else {
    console.log('No new Mod Shape Primary Stat relationships to seed.');
  }

  console.log('Finished seeding Mod Shape Primary Stats.');
}
