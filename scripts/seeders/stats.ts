import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const statsData = [
  { id: 46, name: 'Accuracy', is_percentage: true, can_be_primary: true, can_be_secondary: false },
  { id: 47, name: 'Critical Avoidance', is_percentage: true, can_be_primary: true, can_be_secondary: false },
  { id: 45, name: 'Critical Chance', is_percentage: true, can_be_primary: true, can_be_secondary: true },
  { id: 16, name: 'Critical Damage', is_percentage: true, can_be_primary: true, can_be_secondary: false },
  { id: 42, name: 'Defense', is_percentage: false, can_be_primary: false, can_be_secondary: true },
  { id: 49, name: 'Defense %', is_percentage: true, can_be_primary: true, can_be_secondary: true },
  { id: 1, name: 'Health', is_percentage: false, can_be_primary: false, can_be_secondary: true },
  { id: 55, name: 'Health %', is_percentage: true, can_be_primary: true, can_be_secondary: true },
  { id: 41, name: 'Offense', is_percentage: false, can_be_primary: false, can_be_secondary: true },
  { id: 48, name: 'Offense %', is_percentage: true, can_be_primary: true, can_be_secondary: true },
  { id: 17, name: 'Potency', is_percentage: true, can_be_primary: true, can_be_secondary: true },
  { id: 28, name: 'Protection', is_percentage: false, can_be_primary: false, can_be_secondary: true },
  { id: 56, name: 'Protection %', is_percentage: true, can_be_primary: true, can_be_secondary: true },
  { id: 5, name: 'Speed', is_percentage: false, can_be_primary: true, can_be_secondary: true },
  { id: 18, name: 'Tenacity', is_percentage: true, can_be_primary: true, can_be_secondary: true },
];

export async function seedStats() {
  console.log('Seeding stats...');
  for (const stat of statsData) {
    await prisma.stat.upsert({
      where: { id: stat.id },
      update: stat,
      create: stat,
    });
  }
  console.log('Stats seeded.');
}