import { PrismaClient } from '@prisma/client';
import CategoryRepository from './CategoryRepository.js';

const prisma = new PrismaClient();
const categoryRepository = new CategoryRepository();

class MemoryRepository {
  constructor() {
    this.prisma = prisma;
  }

  // Memoryデータを作成または更新する
  async createOrUpdate(memoryData) {
    const memory = Array.isArray(memoryData) ? memoryData[0] : memoryData;
    const { name, brand, capacity, count } = memory;
    if (!name || !brand) {
      throw new Error(
        `Memory name and brand must be defined, received data: ${JSON.stringify(memoryData)}`,
      );
    }

    // カテゴリーを取得または作成
    const categoryEntity = await categoryRepository.getCategoryByName('memory');
    const categoryId = categoryEntity.id;

    // 既に存在するMemoryを検索
    const existingMemory = await this.prisma.memory.findFirst({
      where: { name, brand, capacity, count },
    });

    if (existingMemory) {
      return await this.prisma.memory.update({
        where: { id: existingMemory.id },
        data: { ...memory, categoryId },
      });
    } else {
      return await this.prisma.memory.create({
        data: { ...memory, categoryId },
      });
    }
  }

  async findById(memoryId) {
    try {
      return await this.prisma.memory.findUnique({
        where: { id: memoryId },
      });
    } catch (error) {
      console.error('Error finding Memory by ID:', error);
      throw error;
    }
  }

  async update(memoryId, newMemoryData) {
    try {
      return await this.prisma.memory.update({
        where: { id: memoryId },
        data: newMemoryData,
      });
    } catch (error) {
      console.error('Error updating Memory:', error);
      throw error;
    }
  }

  async delete(memoryId) {
    try {
      return await this.prisma.memory.delete({
        where: { id: memoryId },
      });
    } catch (error) {
      console.error('Error deleting Memory:', error);
      throw error;
    }
  }

  async resetData() {
    // トランザクションを開始
    const transaction = await this.prisma.$transaction(async (prisma) => {
      // データをすべて削除
      await prisma.memory.deleteMany({});
      // IDの生成をリセット
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "Memory" RESTART IDENTITY CASCADE;`,
      );
      console.log('Database has been reset successfully.');
    });

    return transaction;
  }

  async updateImage(id, imagePath) {
    try {
      const updatedMemory = await this.prisma.memory.update({
        where: { id },
        data: { image: imagePath },
      });
      console.log(`Updated Memory image path: ${updatedMemory.image}`);
      return updatedMemory;
    } catch (error) {
      console.error(`Error updating Memory image path: ${error.message}`);
      throw error;
    }
  }
}

export default MemoryRepository;
