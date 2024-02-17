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
    const { name, brand } = cpuData;

    if (!name || !brand) {
      throw new Error(
        `CPU name and brand must be defined, received data: ${JSON.stringify(cpuData)}`,
      );
    }

    // カテゴリーを取得または作成
    const categoryEntity = await categoryRepository.getCategoryByName('cpu');
    const categoryId = categoryEntity.id;

    // 既に存在するCPUを検索
    const existingCpu = await this.prisma.cpu.findUnique({
      where: {
        name,
        brand,
      },
    });

    if (existingCpu) {
      return await this.prisma.cpu.update({
        where: { id: existingCpu.id },
        data: { ...cpuData, categoryId },
      });
    } else {
      return await this.prisma.cpu.create({
        data: { ...cpuData, categoryId },
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
}

export default CpuRepository;
