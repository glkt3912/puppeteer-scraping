import { PrismaClient } from '@prisma/client';
import CategoryRepository from './CategoryRepository.js';

const prisma = new PrismaClient();
const categoryRepository = new CategoryRepository();

class SsdRepository {
  constructor() {
    this.prisma = prisma;
  }

  // Ssdデータを作成または更新する
  async createOrUpdate(ssdData) {
    const ssd = Array.isArray(ssdData) ? ssdData[0] : ssdData;
    const { name, brand, price, releaseDate } = ssd;
    if (!name || !brand) {
      throw new Error(
        `Ssd name and brand must be defined, received data: ${JSON.stringify(ssdData)}`,
      );
    }

    // カテゴリーを取得または作成
    const categoryEntity = await categoryRepository.getCategoryByName('ssd');
    const categoryId = categoryEntity.id;

    // 既に存在するSsdを検索
    const existingSsd = await this.prisma.ssd.findFirst({
      where: { name, brand, price, releaseDate },
    });

    if (existingSsd) {
      return await this.prisma.ssd.update({
        where: { id: existingSsd.id },
        data: { ...ssd, categoryId },
      });
    } else {
      return await this.prisma.ssd.create({
        data: { ...ssd, categoryId },
      });
    }
  }

  async findById(ssdId) {
    try {
      return await this.prisma.ssd.findUnique({
        where: { id: ssdId },
      });
    } catch (error) {
      console.error('Error finding Ssd by ID:', error);
      throw error;
    }
  }

  async update(ssdId, newSsdData) {
    try {
      return await this.prisma.ssd.update({
        where: { id: ssdId },
        data: newSsdData,
      });
    } catch (error) {
      console.error('Error updating Ssd:', error);
      throw error;
    }
  }

  async delete(ssdId) {
    try {
      return await this.prisma.ssd.delete({
        where: { id: ssdId },
      });
    } catch (error) {
      console.error('Error deleting Ssd:', error);
      throw error;
    }
  }

  async resetData() {
    // トランザクションを開始
    const transaction = await this.prisma.$transaction(async (prisma) => {
      // データをすべて削除
      await prisma.ssd.deleteMany({});
      // IDの生成をリセット
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "Ssd" RESTART IDENTITY CASCADE;`,
      );
      console.log('Database has been reset successfully.');
    });

    return transaction;
  }

  async updateImage(id, imagePath) {
    try {
      const updatedSsd = await this.prisma.ssd.update({
        where: { id },
        data: { image: imagePath },
      });
      console.log(`Updated Ssd image path: ${updatedSsd.image}`);
      return updatedSsd;
    } catch (error) {
      console.error(`Error updating Ssd image path: ${error.message}`);
      throw error;
    }
  }
}

export default SsdRepository;
