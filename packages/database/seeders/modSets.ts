import { PrismaClient } from '@prisma/client';
import { createLogger } from '@astrogators-table/logger';
const logger = createLogger('database-seeder');

export async function seedModSets(prisma: PrismaClient) {
  logger.info('Seeding mod sets...');
  const modSetsData = [
    { id: 1, name: 'Health', required_mods: 2, bonus_description: '+10% Health' },
    { id: 2, name: 'Offense', required_mods: 4, bonus_description: '+15% Offense' },
    { id: 3, name: 'Defense', required_mods: 2, bonus_description: '+25% Defense' },
    { id: 4, name: 'Speed', required_mods: 4, bonus_description: '+10% Speed' },
    { id: 5, name: 'Critical Chance', required_mods: 2, bonus_description: '+8% Critical Chance' },
    { id: 6, name: 'Critical Damage', required_mods: 4, bonus_description: '+30% Critical Damage' },
    { id: 7, name: 'Potency', required_mods: 2, bonus_description: '+15% Potency' },
    { id: 8, name: 'Tenacity', required_mods: 2, bonus_description: '+20% Tenacity' },
  ];

  for (const setData of modSetsData) {
    await prisma.modSet.upsert({
      where: { id: setData.id },
      update: setData,
      create: setData,
    });
  }
  logger.info(`Upserted ${modSetsData.length} mod set records.`);
  logger.info('Finished seeding mod sets.');
}