import { PrismaClient } from '@prisma/client';
import { Logger } from 'winston';

export async function seedStatRollInfo(prisma: PrismaClient, logger: Logger) {
  logger.info('Seeding Stat Roll Info...');

  const statRollData = [
    // --- Critical Chance ---
    { statName: 'Critical Chance %', rarity: 1, min: 0.5, max: 1, target: 0.75 },
    { statName: 'Critical Chance %', rarity: 2, min: 0.625, max: 1.25, target: 0.94 },
    { statName: 'Critical Chance %', rarity: 3, min: 0.75, max: 1.5, target: 1.13 },
    { statName: 'Critical Chance %', rarity: 4, min: 1, max: 2, target: 1.5 },
    { statName: 'Critical Chance %', rarity: 5, min: 1.125, max: 2.25, target: 1.75 },
    { statName: 'Critical Chance %', rarity: 6, min: 1.175, max: 2.35, target: 1.83 },
    // --- Defense ---
    { statName: 'Defense', rarity: 1, min: 2, max: 4, target: 3 },
    { statName: 'Defense', rarity: 2, min: 2, max: 5, target: 3.5 },
    { statName: 'Defense', rarity: 3, min: 3, max: 6, target: 4.5 },
    { statName: 'Defense', rarity: 4, min: 4, max: 8, target: 6 },
    { statName: 'Defense', rarity: 5, min: 4.9, max: 9.8, target: 7 },
    { statName: 'Defense', rarity: 6, min: 8, max: 16, target: 11.43 },
    // --- Defense % ---
    { statName: 'Defense %', rarity: 1, min: 0.5, max: 1, target: 0.75 },
    { statName: 'Defense %', rarity: 2, min: 0.55, max: 1.1, target: 0.83 },
    { statName: 'Defense %', rarity: 3, min: 0.65, max: 1.3, target: 0.98 },
    { statName: 'Defense %', rarity: 4, min: 0.75, max: 1.5, target: 1.13 },
    { statName: 'Defense %', rarity: 5, min: 0.85, max: 1.7, target: 1.2 },
    { statName: 'Defense %', rarity: 6, min: 2, max: 4, target: 2.82 },
    // --- Health ---
    { statName: 'Health', rarity: 1, min: 99, max: 199, target: 149 },
    { statName: 'Health', rarity: 2, min: 118, max: 236, target: 177 },
    { statName: 'Health', rarity: 3, min: 150, max: 300, target: 225 },
    { statName: 'Health', rarity: 4, min: 173, max: 347, target: 260 },
    { statName: 'Health', rarity: 5, min: 214.3, max: 428.6, target: 400 },
    { statName: 'Health', rarity: 6, min: 270, max: 540, target: 503.85 },
    // --- Health % ---
    { statName: 'Health %', rarity: 1, min: 0.25, max: 0.5, target: 0.38 },
    { statName: 'Health %', rarity: 2, min: 0.313, max: 0.626, target: 0.47 },
    { statName: 'Health %', rarity: 3, min: 0.375, max: 0.75, target: 0.56 },
    { statName: 'Health %', rarity: 4, min: 0.5, max: 1, target: 0.75 },
    { statName: 'Health %', rarity: 5, min: 0.563, max: 1.125, target: 0.9 },
    { statName: 'Health %', rarity: 6, min: 1, max: 2, target: 1.6 },
    // --- Offense ---
    { statName: 'Offense', rarity: 1, min: 8, max: 16, target: 12 },
    { statName: 'Offense', rarity: 2, min: 10, max: 20, target: 15 },
    { statName: 'Offense', rarity: 3, min: 14, max: 28, target: 21 },
    { statName: 'Offense', rarity: 4, min: 18, max: 36, target: 27 },
    { statName: 'Offense', rarity: 5, min: 22.8, max: 45.6, target: 35 },
    { statName: 'Offense', rarity: 6, min: 25, max: 50, target: 38.38 },
    // --- Offense % ---
    { statName: 'Offense %', rarity: 1, min: 0.125, max: 0.25, target: 0.19 },
    { statName: 'Offense %', rarity: 2, min: 0.156, max: 0.313, target: 0.23 },
    { statName: 'Offense %', rarity: 3, min: 0.188, max: 0.375, target: 0.28 },
    { statName: 'Offense %', rarity: 4, min: 0.25, max: 0.5, target: 0.38 },
    { statName: 'Offense %', rarity: 5, min: 0.281, max: 0.563, target: 0.4 },
    { statName: 'Offense %', rarity: 6, min: 0.85, max: 1.7, target: 1.21 },
    // --- Potency % ---
    { statName: 'Potency %', rarity: 1, min: 0.5, max: 1, target: 0.75 },
    { statName: 'Potency %', rarity: 2, min: 0.625, max: 1.25, target: 0.94 },
    { statName: 'Potency %', rarity: 3, min: 0.75, max: 1.5, target: 1.13 },
    { statName: 'Potency %', rarity: 4, min: 1, max: 2, target: 1.5 },
    { statName: 'Potency %', rarity: 5, min: 1.125, max: 2.25, target: 1.75 },
    { statName: 'Potency %', rarity: 6, min: 1.5, max: 3, target: 2.33 },
    // --- Protection ---
    { statName: 'Protection', rarity: 1, min: 99, max: 199, target: 149 },
    { statName: 'Protection', rarity: 2, min: 154, max: 309, target: 231.5 },
    { statName: 'Protection', rarity: 3, min: 240, max: 483, target: 361.5 },
    { statName: 'Protection', rarity: 4, min: 319, max: 639, target: 479 },
    { statName: 'Protection', rarity: 5, min: 415.3, max: 830.6, target: 800 },
    { statName: 'Protection', rarity: 6, min: 460, max: 920, target: 886.13 },
    // --- Protection % ---
    { statName: 'Protection %', rarity: 1, min: 0.5, max: 1, target: 0.75 },
    { statName: 'Protection %', rarity: 2, min: 0.63, max: 1.25, target: 0.94 },
    { statName: 'Protection %', rarity: 3, min: 0.75, max: 1.5, target: 1.13 },
    { statName: 'Protection %', rarity: 4, min: 1, max: 2, target: 1.5 },
    { statName: 'Protection %', rarity: 5, min: 1.125, max: 2.25, target: 2 },
    { statName: 'Protection %', rarity: 6, min: 1.5, max: 3, target: 2.67 },
    // --- Speed ---
    { statName: 'Speed', rarity: 1, min: 1, max: 2, target: 1.5 },
    { statName: 'Speed', rarity: 2, min: 1, max: 3, target: 2 },
    { statName: 'Speed', rarity: 3, min: 2, max: 4, target: 3 },
    { statName: 'Speed', rarity: 4, min: 2, max: 5, target: 3.5 },
    { statName: 'Speed', rarity: 5, min: 3, max: 6, target: 4 },
    { statName: 'Speed', rarity: 6, min: 3, max: 6, target: 4 },
    // --- Tenacity % ---
    { statName: 'Tenacity %', rarity: 1, min: 0.5, max: 1, target: 0.75 },
    { statName: 'Tenacity %', rarity: 2, min: 0.625, max: 1.25, target: 0.94 },
    { statName: 'Tenacity %', rarity: 3, min: 0.75, max: 1.5, target: 1.13 },
    { statName: 'Tenacity %', rarity: 4, min: 1, max: 2, target: 1.5 },
    { statName: 'Tenacity %', rarity: 5, min: 1.125, max: 2.25, target: 1.75 },
    { statName: 'Tenacity %', rarity: 6, min: 1.5, max: 3, target: 2.33 },
  ];

  const stats = await prisma.stat.findMany();
  const statIdMap = new Map(stats.map(s => [s.name, s.id]));

  const statRollInfoData = statRollData.map(roll => {
    const statId = statIdMap.get(roll.statName);

    if (!statId) {
      logger.warn(`Stat "${roll.statName}" not found in the database. Skipping.`);
      return null;
    }

    return {
      stat_id: statId,
      rarity_id: roll.rarity,
      min_roll: roll.min,
      max_roll: roll.max,
      target_roll: roll.target,
    };
  }).filter(Boolean);

  if (statRollInfoData.length > 0) {
    await prisma.statRollInfo.createMany({
      data: statRollInfoData as any[],
      skipDuplicates: true,
    });
    logger.info(`Seeded ${statRollInfoData.length} Stat Roll Info records.`);
  } else {
    logger.info('No new Stat Roll Info records to seed.');
  }

  logger.info('Finished seeding Stat Roll Info.');
}
