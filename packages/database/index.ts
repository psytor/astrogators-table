import { PrismaClient } from '@prisma/client';

// Export a single, shared Prisma client instance
const prisma = new PrismaClient();
export default prisma;

// Export all the generated types from Prisma
export * from '@prisma/client'