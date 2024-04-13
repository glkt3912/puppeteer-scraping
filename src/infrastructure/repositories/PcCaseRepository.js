import { PrismaClient } from '@prisma/client';
import CategoryRepository from './CategoryRepository.js';

const prisma = new PrismaClient();
const categoryRepository = new CategoryRepository();

class PcCaseRepository {
  constructor() {
    this.prisma = prisma;
  }

  // PcCaseデータを作成または更新する
  async createOrUpdate(pcCaseData) {
    const pcCase = Array.isArray(pcCaseData) ? pcCaseData[0] : pcCaseData;
    const { name, brand, price, releaseDate } = pcCase;
    if (!name || !brand) {
      throw new Error(
        `PcCase name and brand must be defined, received data: ${JSON.stringify(pcCaseData)}`,
      );
    }

    // カテゴリーを取得または作成
    const categoryEntity = await categoryRepository.getCategoryByName('pcCase');
    const categoryId = categoryEntity.id;

    // 既に存在するPcCaseを検索
    const existingPcCase = await this.prisma.pcCase.findFirst({
      where: { name, brand, price, releaseDate },
    });

    if (existingPcCase) {
      return await this.prisma.pcCase.update({
        where: { id: existingPcCase.id },
        data: { ...pcCase, categoryId },
      });
    } else {
      return await this.prisma.pcCase.create({
        data: { ...pcCase, categoryId },
      });
    }
  }

  async findById(pcCaseId) {
    try {
      return await this.prisma.pcCase.findUnique({
        where: { id: pcCaseId },
      });
    } catch (error) {
      console.error('Error finding PcCase by ID:', error);
      throw error;
    }
  }

  async update(pcCaseId, newPcCaseData) {
    try {
      return await this.prisma.pcCase.update({
        where: { id: pcCaseId },
        data: newPcCaseData,
      });
    } catch (error) {
      console.error('Error updating PcCase:', error);
      throw error;
    }
  }

  async delete(pcCaseId) {
    try {
      return await this.prisma.pcCase.delete({
        where: { id: pcCaseId },
      });
    } catch (error) {
      console.error('Error deleting PcCase:', error);
      throw error;
    }
  }

  async resetData() {
    // トランザクションを開始
    const transaction = await this.prisma.$transaction(async (prisma) => {
      // データをすべて削除
      await prisma.pcCase.deleteMany({});
      // IDの生成をリセット
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "PcCase" RESTART IDENTITY CASCADE;`,
      );
      console.log('Database has been reset successfully.');
    });

    return transaction;
  }

  async updateImage(id, imagePath) {
    try {
      const updatedPcCase = await this.prisma.pcCase.update({
        where: { id },
        data: { image: imagePath },
      });
      console.log(`Updated PcCase image path: ${updatedPcCase.image}`);
      return updatedPcCase;
    } catch (error) {
      console.error(`Error updating PcCase image path: ${error.message}`);
      throw error;
    }
  }
}

export default PcCaseRepository;
