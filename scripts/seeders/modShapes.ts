import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const modShapesData = [
  { id: 1, name: 'Square', formal_name: 'Transmitter' },
  { id: 2, name: 'Arrow', formal_name: 'Receiver' },
  { id: 3, name: 'Diamond', formal_name: 'Processor' },
  { id: 4, name: 'Triangle', formal_name: 'Holo-Array' },
  { id: 5, name: 'Circle', formal_name: 'Data-Bus' },
  { id: 6, name: 'Cross', formal_name: 'Multiplexer' },
];

export async function seedModShapes() {
  console.log('Seeding mod shapes...');
  for (const shapeData of modShapesData) {
    await prisma.modShape.upsert({
      where: { id: shapeData.id },
      update: shapeData,
      create: shapeData,
    });
  }
  console.log('Mod shapes seeded.');
}
