import { PrismaClient } from '@prisma/client';
import { createLogger } from '@astrogators-table/logger';
const logger = createLogger('database-seeder');

export async function seedStats(prisma: PrismaClient) {
  logger.info('Seeding stats...');
  const statsData = [
    // Using correct IDs from game data
    { id: 1, name: 'Health', is_percentage: false, can_be_primary: false, can_be_secondary: true },
    { id: 5, name: 'Speed', is_percentage: false, can_be_primary: true, can_be_secondary: true },
    { id: 16, name: 'Critical Damage %', is_percentage: true, can_be_primary: true, can_be_secondary: false },
    { id: 17, name: 'Potency %', is_percentage: true, can_be_primary: true, can_be_secondary: true },
    { id: 18, name: 'Tenacity %', is_percentage: true, can_be_primary: true, can_be_secondary: true },
    { id: 28, name: 'Protection', is_percentage: false, can_be_primary: false, can_be_secondary: true },
    { id: 41, name: 'Offense', is_percentage: false, can_be_primary: false, can_be_secondary: true },
    { id: 42, name: 'Defense', is_percentage: false, can_be_primary: false, can_be_secondary: true },
    { id: 48, name: 'Offense %', is_percentage: true, can_be_primary: true, can_be_secondary: true },
    { id: 49, name: 'Defense %', is_percentage: true, can_be_primary: true, can_be_secondary: true },
    { id: 52, name: 'Accuracy %', is_percentage: true, can_be_primary: true, can_be_secondary: false },
    { id: 53, name: 'Critical Chance %', is_percentage: true, can_be_primary: true, can_be_secondary: true },
    { id: 54, name: 'Critical Avoidance %', is_percentage: true, can_be_primary: true, can_be_secondary: false },
    { id: 55, name: 'Health %', is_percentage: true, can_be_primary: true, can_be_secondary: true },
    { id: 56, name: 'Protection %', is_percentage: true, can_be_primary: true, can_be_secondary: true },
  ];

  for (const stat of statsData) {
    await prisma.stat.upsert({
      where: { id: stat.id },
      update: stat,
      create: stat,
    });
  }
  logger.info(`Upserted ${statsData.length} stat records.`);
  logger.info('Finished seeding stats.');
}
