import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const modSetsData = [
  { name: 'Health', required_mods: 2, bonus_description: '+10% Health' },
  { name: 'Defense', required_mods: 2, bonus_description: '+25% Defense' },
  { name: 'Critical Damage', required_mods: 4, bonus_description: '+30% Critical Damage' },
  { name: 'Critical Chance', required_mods: 2, bonus_description: '+8% Critical Chance' },
  { name: 'Tenacity', required_mods: 2, bonus_description: '+20% Tenacity' },
  { name: 'Offense', required_mods: 4, bonus_description: '+15% Offense' },
  { name: 'Potency', required_mods: 2, bonus_description: '+15% Potency' },
  { name: 'Speed', required_mods: 4, bonus_description: '+10% Speed' },
];

export async function seedModSets() {
  console.log('Seeding mod sets...');
  for (const setData of modSetsData) {
    await prisma.modSet.upsert({
      where: { name: setData.name },
      update: {},
      create: setData,
    });
  }
  console.log('Mod sets seeded.');
}
