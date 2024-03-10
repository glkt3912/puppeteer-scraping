import { PrismaClient } from '@prisma/client';
import CategoryRepository from './CategoryRepository.js';

const prisma = new PrismaClient();
const categoryRepository = new CategoryRepository();

class GpuRepository {
  constructor() {
    this.prisma = prisma;
  }

  // GPUデータを作成または更新する
  async createOrUpdate(gpuData) {
    const gpu = Array.isArray(gpuData) ? gpuData[0] : gpuData;
    const { name, brand, generation, frequency, socket } = gpu;
    if (!name || !brand) {
      throw new Error(
        `GPU name and brand must be defined, received data: ${JSON.stringify(gpuData)}`,
      );
    }

    // カテゴリーを取得または作成
    const categoryEntity = await categoryRepository.getCategoryByName('gpu');
    const categoryId = categoryEntity.id;

    // 既に存在するGPUを検索
    const existingGpu = await this.prisma.gpu.findFirst({
      where: { name, brand, generation, frequency, socket },
    });

    if (existingGpu) {
      return await this.prisma.gpu.update({
        where: { id: existingGpu.id },
        data: { ...gpu, categoryId },
      });
    } else {
      return await this.prisma.gpu.create({
        data: { ...gpu, categoryId },
      });
    }
  }

  async findById(gpuId) {
    try {
      return await this.prisma.gpu.findUnique({
        where: { id: gpuId },
      });
    } catch (error) {
      console.error('Error finding GPU by ID:', error);
      throw error;
    }
  }

  async update(gpuId, newGpuData) {
    try {
      return await this.prisma.gpu.update({
        where: { id: gpuId },
        data: newGpuData,
      });
    } catch (error) {
      console.error('Error updating GPU:', error);
      throw error;
    }
  }

  async delete(gpuId) {
    try {
      return await this.prisma.gpu.delete({
        where: { id: gpuId },
      });
    } catch (error) {
      console.error('Error deleting GPU:', error);
      throw error;
    }
  }

  async resetData() {
    // トランザクションを開始
    const transaction = await this.prisma.$transaction(async (prisma) => {
      // データをすべて削除
      await prisma.gpu.deleteMany({});
      // IDの生成をリセット
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Gpu" RESTART IDENTITY CASCADE;`);
      console.log('Database has been reset successfully.');
    });

    return transaction;
  }

  async updateImage(id, imagePath) {
    try {
      const updatedGpu = await this.prisma.gpu.update({
        where: { id },
        data: { image: imagePath },
      });
      console.log(`Updated GPU image path: ${updatedGpu.image}`);
      return updatedGpu;
    } catch (error) {
      console.error(`Error updating GPU image path: ${error.message}`);
      throw error;
    }
  }
}

export default GpuRepository;
