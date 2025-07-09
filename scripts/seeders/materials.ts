import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const materialsData = [
  { name: 'Mk 1 Bonding Pin' },
  { name: 'Mk 1 Fusion Disk' },
  { name: 'Mk 1 Power Flow Control Chip' },
  { name: 'Mk 1 Fusion Coil' },
  { name: 'Mk 1 Amplifier' },
  { name: 'Mk 1 Capacitor' },
  { name: 'Mk 2 Pulse Modulator' },
  { name: 'Mk 2 Circuit Breaker Module' },
  { name: 'Mk 2 Thermal Exchange Unit' },
  { name: 'Mk 2 Variable Resistor' },
  { name: 'Mk 2 Microprocessor' },
  { name: 'Micro Attenuator' },
];

export async function seedMaterials() {
  console.log('Seeding materials...');
  for (const materialData of materialsData) {
    await prisma.material.upsert({
      where: { name: materialData.name },
      update: {},
      create: materialData,
    });
  }
  console.log('Materials seeded.');
}
