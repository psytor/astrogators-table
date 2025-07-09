import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const modShapesData = [
  { name: 'Square', formal_name: 'Transmitter' },
  { name: 'Arrow', formal_name: 'Receiver' },
  { name: 'Diamond', formal_name: 'Processor' },
  { name: 'Triangle', formal_name: 'Holo-Array' },
  { name: 'Circle', formal_name: 'Data-Bus' },
  { name: 'Cross', formal_name: 'Multiplexer' },
];

export async function seedModShapes() {
  console.log('Seeding mod shapes...');
  for (const shapeData of modShapesData) {
    await prisma.modShape.upsert({
      where: { name: shapeData.name },
      update: {},
      create: shapeData,
    });
  }
  console.log('Mod shapes seeded.');
}
