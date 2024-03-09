import { PrismaClient } from '@prisma/client';
import DatabaseResetService from '../application/services/DatabaseResetService.js';
import CpuRepository from '../infrastructure/repositories/CpuRepository.js';

async function resetDatabase() {
  const prisma = new PrismaClient({});
  const cpuRepository = new CpuRepository(prisma);
  const databaseResetService = new DatabaseResetService(cpuRepository);

  console.log('Resetting database...');

  try {
    await databaseResetService.resetDatabase();
    console.log('Database has been reset successfully.');
  } catch (error) {
    console.error('Failed to reset the database:', error);
  } finally {
    console.log('Disconnecting from database...');
    await prisma.$disconnect();
    console.log('Disconnected.');
  }
}

resetDatabase();