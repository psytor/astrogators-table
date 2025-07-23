import { PrismaClient } from '@prisma/client';
import { Logger } from 'winston';

export async function seedModShapes(prisma: PrismaClient, logger: Logger) {
  logger.info('Seeding mod shapes...');
  const modShapesData = [
    { id: 1, name: 'Square', formal_name: 'Transmitter' },
    { id: 2, name: 'Arrow', formal_name: 'Receiver' },
    { id: 3, name: 'Diamond', formal_name: 'Processor' },
    { id: 4, name: 'Triangle', formal_name: 'Holo-Array' },
    { id: 5, name: 'Circle', formal_name: 'Data-Bus' },
    { id: 6, name: 'Cross', formal_name: 'Multiplexer' },
  ];

  for (const shapeData of modShapesData) {
    await prisma.modShape.upsert({
      where: { id: shapeData.id },
      update: shapeData,
      create: shapeData,
    });
  }
  logger.info(`Upserted ${modShapesData.length} mod shape records.`);
  logger.info('Finished seeding mod shapes.');
}