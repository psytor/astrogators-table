import { PrismaClient } from '@prisma/client';
import { Logger } from 'winston';

export async function seedModQualities(prisma: PrismaClient, logger: Logger) {
  logger.info('Seeding mod qualities...');
  const modQualitiesData = [
    { tier_letter: 'E', color_name: 'Grey', initial_secondaries: 0 },
    { tier_letter: 'D', color_name: 'Green', initial_secondaries: 1 },
    { tier_letter: 'C', color_name: 'Blue', initial_secondaries: 2 },
    { tier_letter: 'B', color_name: 'Purple', initial_secondaries: 3 },
    { tier_letter: 'A', color_name: 'Gold', initial_secondaries: 4 },
  ];

  for (const qualityData of modQualitiesData) {
    await prisma.modQuality.upsert({
      where: { tier_letter: qualityData.tier_letter },
      update: {},
      create: qualityData,
    });
  }
  logger.info(`Upserted ${modQualitiesData.length} mod quality records.`);
  logger.info('Finished seeding mod qualities.');
}