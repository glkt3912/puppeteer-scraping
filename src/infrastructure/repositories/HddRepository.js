import { PrismaClient } from '@prisma/client';
import CategoryRepository from './CategoryRepository.js';

const prisma = new PrismaClient();
const categoryRepository = new CategoryRepository();

class HddRepository {
  constructor() {
    this.prisma = prisma;
  }

  // Hddデータを作成または更新する
  async createOrUpdate(hddData) {
    const hdd = Array.isArray(hddData) ? hddData[0] : hddData;
    const { name, brand, price, releaseDate } = hdd;
    if (!name || !brand) {
      throw new Error(
        `Hdd name and brand must be defined, received data: ${JSON.stringify(hddData)}`,
      );
    }

    // カテゴリーを取得または作成
    const categoryEntity = await categoryRepository.getCategoryByName('hdd');
    const categoryId = categoryEntity.id;

    // 既に存在するHddを検索
    const existingHdd = await this.prisma.hdd.findFirst({
      where: { name, brand, price, releaseDate },
    });

    if (existingHdd) {
      return await this.prisma.hdd.update({
        where: { id: existingHdd.id },
        data: { ...hdd, categoryId },
      });
    } else {
      return await this.prisma.hdd.create({
        data: { ...hdd, categoryId },
      });
    }
  }

  async findById(hddId) {
    try {
      return await this.prisma.hdd.findUnique({
        where: { id: hddId },
      });
    } catch (error) {
      console.error('Error finding Hdd by ID:', error);
      throw error;
    }
  }

  async update(hddId, newHddData) {
    try {
      return await this.prisma.hdd.update({
        where: { id: hddId },
        data: newHddData,
      });
    } catch (error) {
      console.error('Error updating Hdd:', error);
      throw error;
    }
  }

  async delete(hddId) {
    try {
      return await this.prisma.hdd.delete({
        where: { id: hddId },
      });
    } catch (error) {
      console.error('Error deleting Hdd:', error);
      throw error;
    }
  }

  async resetData() {
    // トランザクションを開始
    const transaction = await this.prisma.$transaction(async (prisma) => {
      // データをすべて削除
      await prisma.hdd.deleteMany({});
      // IDの生成をリセット
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "Hdd" RESTART IDENTITY CASCADE;`,
      );
      console.log('Database has been reset successfully.');
    });

    return transaction;
  }

  async updateImage(id, imagePath) {
    try {
      const updatedHdd = await this.prisma.hdd.update({
        where: { id },
        data: { image: imagePath },
      });
      console.log(`Updated Hdd image path: ${updatedHdd.image}`);
      return updatedHdd;
    } catch (error) {
      console.error(`Error updating Hdd image path: ${error.message}`);
      throw error;
    }
  }
}

export default HddRepository;
