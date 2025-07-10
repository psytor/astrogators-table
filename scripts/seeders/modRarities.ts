import { PrismaClient } from '@prisma/client';
import { Logger } from 'winston';

export async function seedModRarities(prisma: PrismaClient, logger: Logger) {
  logger.info('Seeding mod rarities...');
  const modRaritiesData = [
    { dot_value: 1 },
    { dot_value: 2 },
    { dot_value: 3 },
    { dot_value: 4 },
    { dot_value: 5 },
    { dot_value: 6 },
  ];

  for (const rarityData of modRaritiesData) {
    await prisma.modRarity.upsert({
      where: { dot_value: rarityData.dot_value },
      update: {},
      create: rarityData,
    });
  }
  logger.info(`Upserted ${modRaritiesData.length} mod rarity records.`);
  logger.info('Finished seeding mod rarities.');
}