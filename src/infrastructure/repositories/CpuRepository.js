import { PrismaClient } from '@prisma/client';
import CategoryRepository from './CategoryRepository.js';

const prisma = new PrismaClient();
const categoryRepository = new CategoryRepository();

class CpuRepository {
  constructor() {
    this.prisma = prisma;
  }

  // CPUデータを作成または更新する
  async createOrUpdate(cpuData) {
    const cpu = Array.isArray(cpuData) ? cpuData[0] : cpuData;
    const { name, brand, generation, frequency, socket } = cpu;
    if (!name || !brand) {
      throw new Error(
        `CPU name and brand must be defined, received data: ${JSON.stringify(cpuData)}`,
      );
    }

    // カテゴリーを取得または作成
    const categoryEntity = await categoryRepository.getCategoryByName('cpu');
    const categoryId = categoryEntity.id;

    // 既に存在するCPUを検索
    const existingCpu = await this.prisma.cpu.findFirst({
      where: { name, brand, generation, frequency, socket },
    });

    if (existingCpu) {
      return await this.prisma.cpu.update({
        where: { id: existingCpu.id },
        data: { ...cpu, categoryId },
      });
    } else {
      return await this.prisma.cpu.create({
        data: { ...cpu, categoryId },
      });
    }
  }

  async findById(cpuId) {
    try {
      return await this.prisma.cpu.findUnique({
        where: { id: cpuId },
      });
    } catch (error) {
      console.error('Error finding CPU by ID:', error);
      throw error;
    }
  }

  async update(cpuId, newCpuData) {
    try {
      return await this.prisma.cpu.update({
        where: { id: cpuId },
        data: newCpuData,
      });
    } catch (error) {
      console.error('Error updating CPU:', error);
      throw error;
    }
  }

  async delete(cpuId) {
    try {
      return await this.prisma.cpu.delete({
        where: { id: cpuId },
      });
    } catch (error) {
      console.error('Error deleting CPU:', error);
      throw error;
    }
  }

  async resetData() {
    // トランザクションを開始
    const transaction = await this.prisma.$transaction(async (prisma) => {
      // データをすべて削除
      await prisma.cpu.deleteMany({});
      // IDの生成をリセット
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "Cpu" RESTART IDENTITY CASCADE;`,
      );
      console.log('Database has been reset successfully.');
    });

    return transaction;
  }

  async updateImage(id, imagePath) {
    try {
      const updatedCpu = await this.prisma.cpu.update({
        where: { id },
        data: { image: imagePath },
      });
      console.log(`Updated CPU image path: ${updatedCpu.image}`);
      return updatedCpu;
    } catch (error) {
      console.error(`Error updating CPU image path: ${error.message}`);
      throw error;
    }
  }
}

export default CpuRepository;
