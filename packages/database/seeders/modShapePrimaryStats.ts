import { PrismaClient } from '@prisma/client';
import { Logger } from 'winston';

export async function seedModShapePrimaryStats(prisma: PrismaClient, logger: Logger) {
  logger.info('Seeding Mod Shape Primary Stats...');

  const shapePrimaryStatsMap: Record<string, string[]> = {
    'Square': ['Offense %'],
    'Diamond': ['Defense %'],
    'Circle': ['Health %', 'Protection %'],
    'Arrow': ['Speed', 'Accuracy %', 'Critical Avoidance %', 'Health %', 'Protection %', 'Offense %', 'Defense %'],
    'Triangle': ['Critical Chance %', 'Critical Damage %', 'Health %', 'Protection %', 'Offense %', 'Defense %'],
    'Cross': ['Tenacity %', 'Potency %', 'Health %', 'Protection %', 'Offense %', 'Defense %'],
  };

  const shapes = await prisma.modShape.findMany();
  const stats = await prisma.stat.findMany();

  const shapeIdMap = new Map(shapes.map(s => [s.name, s.id]));
  const statIdMap = new Map(stats.map(s => [s.name, s.id]));

  const modShapePrimaryStatData = [];

  for (const shapeName in shapePrimaryStatsMap) {
    const shapeId = shapeIdMap.get(shapeName);
    if (!shapeId) {
      logger.warn(`Shape "${shapeName}" not found in the database. Skipping.`);
      continue;
    }

    const primaryStatNames = shapePrimaryStatsMap[shapeName];
    for (const statName of primaryStatNames) {
      const statId = statIdMap.get(statName);
      if (!statId) {
        logger.warn(`Stat "${statName}" not found in the database. Skipping for shape "${shapeName}".`);
        continue;
      }
      modShapePrimaryStatData.push({ shape_id: shapeId, stat_id: statId });
    }
  }

  if (modShapePrimaryStatData.length > 0) {
    await prisma.modShapePrimaryStat.createMany({
      data: modShapePrimaryStatData,
      skipDuplicates: true,
    });
    logger.info(`Seeded ${modShapePrimaryStatData.length} Mod Shape Primary Stat relationships.`);
  } else {
    logger.info('No new Mod Shape Primary Stat relationships to seed.');
  }

  logger.info('Finished seeding Mod Shape Primary Stats.');
}