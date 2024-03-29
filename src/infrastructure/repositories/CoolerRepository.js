import { PrismaClient } from '@prisma/client';
import CategoryRepository from './CategoryRepository.js';

const prisma = new PrismaClient();
const categoryRepository = new CategoryRepository();

class CoolerRepository {
  constructor() {
    this.prisma = prisma;
  }

  // Coolerデータを作成または更新する
  async createOrUpdate(coolerData) {
    const cooler = Array.isArray(coolerData) ? coolerData[0] : coolerData;
    const { name, brand, price, releaseDate } = cooler;
    if (!name || !brand) {
      throw new Error(
        `Cooler name and brand must be defined, received data: ${JSON.stringify(coolerData)}`,
      );
    }

    // カテゴリーを取得または作成
    const categoryEntity = await categoryRepository.getCategoryByName('cooler');
    const categoryId = categoryEntity.id;

    // 既に存在するCoolerを検索
    const existingCooler = await this.prisma.cooler.findFirst({
      where: { name, brand, price, releaseDate },
    });

    if (existingCooler) {
      return await this.prisma.cooler.update({
        where: { id: existingCooler.id },
        data: { ...cooler, categoryId },
      });
    } else {
      return await this.prisma.cooler.create({
        data: { ...cooler, categoryId },
      });
    }
  }

  async findById(coolerId) {
    try {
      return await this.prisma.cooler.findUnique({
        where: { id: coolerId },
      });
    } catch (error) {
      console.error('Error finding Cooler by ID:', error);
      throw error;
    }
  }

  async update(coolerId, newCoolerData) {
    try {
      return await this.prisma.cooler.update({
        where: { id: coolerId },
        data: newCoolerData,
      });
    } catch (error) {
      console.error('Error updating Cooler:', error);
      throw error;
    }
  }

  async delete(coolerId) {
    try {
      return await this.prisma.cooler.delete({
        where: { id: coolerId },
      });
    } catch (error) {
      console.error('Error deleting Cooler:', error);
      throw error;
    }
  }

  async resetData() {
    // トランザクションを開始
    const transaction = await this.prisma.$transaction(async (prisma) => {
      // データをすべて削除
      await prisma.cooler.deleteMany({});
      // IDの生成をリセット
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "Cooler" RESTART IDENTITY CASCADE;`,
      );
      console.log('Database has been reset successfully.');
    });

    return transaction;
  }

  async updateImage(id, imagePath) {
    try {
      const updatedCooler = await this.prisma.cooler.update({
        where: { id },
        data: { image: imagePath },
      });
      console.log(`Updated Cooler image path: ${updatedCooler.image}`);
      return updatedCooler;
    } catch (error) {
      console.error(`Error updating Cooler image path: ${error.message}`);
      throw error;
    }
  }
}

export default CoolerRepository;
