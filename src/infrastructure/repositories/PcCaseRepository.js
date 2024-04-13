import { PrismaClient } from '@prisma/client';
import CategoryRepository from './CategoryRepository.js';

const prisma = new PrismaClient();
const categoryRepository = new CategoryRepository();

class PcCaseRepository {
  constructor() {
    this.prisma = prisma;
  }

  // PcCaseデータを作成または更新する
  async createOrUpdate(pccaseData) {
    const pccase = Array.isArray(pccaseData) ? pccaseData[0] : pccaseData;
    const { name, brand, price, releaseDate } = pccase;
    if (!name || !brand) {
      throw new Error(
        `PcCase name and brand must be defined, received data: ${JSON.stringify(pccaseData)}`,
      );
    }

    // カテゴリーを取得または作成
    const categoryEntity = await categoryRepository.getCategoryByName('pccase');
    const categoryId = categoryEntity.id;

    // 既に存在するPcCaseを検索
    const existingPcCase = await this.prisma.pccase.findFirst({
      where: { name, brand, price, releaseDate },
    });

    if (existingPcCase) {
      return await this.prisma.pccase.update({
        where: { id: existingPcCase.id },
        data: { ...pccase, categoryId },
      });
    } else {
      return await this.prisma.pccase.create({
        data: { ...pccase, categoryId },
      });
    }
  }

  async findById(pccaseId) {
    try {
      return await this.prisma.pccase.findUnique({
        where: { id: pccaseId },
      });
    } catch (error) {
      console.error('Error finding PcCase by ID:', error);
      throw error;
    }
  }

  async update(pccaseId, newPcCaseData) {
    try {
      return await this.prisma.pccase.update({
        where: { id: pccaseId },
        data: newPcCaseData,
      });
    } catch (error) {
      console.error('Error updating PcCase:', error);
      throw error;
    }
  }

  async delete(pccaseId) {
    try {
      return await this.prisma.pccase.delete({
        where: { id: pccaseId },
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
      await prisma.pccase.deleteMany({});
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
      const updatedPcCase = await this.prisma.pccase.update({
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
