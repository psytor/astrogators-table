import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const statsData = [
  { name: 'Accuracy', is_percentage: true, can_be_primary: true, can_be_secondary: false },
  { name: 'Critical Avoidance', is_percentage: true, can_be_primary: true, can_be_secondary: false },
  { name: 'Critical Chance', is_percentage: true, can_be_primary: true, can_be_secondary: true },
  { name: 'Critical Damage', is_percentage: true, can_be_primary: true, can_be_secondary: false },
  { name: 'Defense', is_percentage: false, can_be_primary: false, can_be_secondary: true },
  { name: 'Defense %', is_percentage: true, can_be_primary: true, can_be_secondary: true },
  { name: 'Health', is_percentage: false, can_be_primary: false, can_be_secondary: true },
  { name: 'Health %', is_percentage: true, can_be_primary: true, can_be_secondary: true },
  { name: 'Offense', is_percentage: false, can_be_primary: false, can_be_secondary: true },
  { name: 'Offense %', is_percentage: true, can_be_primary: true, can_be_secondary: true },
  { name: 'Potency', is_percentage: true, can_be_primary: true, can_be_secondary: true },
  { name: 'Protection', is_percentage: false, can_be_primary: false, can_be_secondary: true },
  { name: 'Protection %', is_percentage: true, can_be_primary: true, can_be_secondary: true },
  { name: 'Speed', is_percentage: false, can_be_primary: true, can_be_secondary: true },
  { name: 'Tenacity', is_percentage: true, can_be_primary: true, can_be_secondary: true },
];

export async function seedStats() {
  console.log('Seeding stats...');
  for (const stat of statsData) {
    await prisma.stat.upsert({
      where: { name: stat.name },
      update: {},
      create: stat,
    });
  }
  console.log('Stats seeded.');
}