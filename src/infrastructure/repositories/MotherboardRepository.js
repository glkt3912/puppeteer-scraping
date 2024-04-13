import { PrismaClient } from '@prisma/client';
import CategoryRepository from './CategoryRepository.js';

const prisma = new PrismaClient();
const categoryRepository = new CategoryRepository();

class MotherboardRepository {
  constructor() {
    this.prisma = prisma;
  }

  // Motherboardデータを作成または更新する
  async createOrUpdate(motherboardData) {
    const motherboard = Array.isArray(motherboardData) ? motherboardData[0] : motherboardData;
    const { name, brand, price, releaseDate } = motherboard;
    if (!name || !brand) {
      throw new Error(
        `Motherboard name and brand must be defined, received data: ${JSON.stringify(motherboardData)}`,
      );
    }

    // カテゴリーを取得または作成
    const categoryEntity = await categoryRepository.getCategoryByName('motherboard');
    const categoryId = categoryEntity.id;

    // 既に存在するMotherboardを検索
    const existingMotherboard = await this.prisma.motherboard.findFirst({
      where: { name, brand, price, releaseDate },
    });

    if (existingMotherboard) {
      return await this.prisma.motherboard.update({
        where: { id: existingMotherboard.id },
        data: { ...motherboard, categoryId },
      });
    } else {
      return await this.prisma.motherboard.create({
        data: { ...motherboard, categoryId },
      });
    }
  }

  async findById(motherboardId) {
    try {
      return await this.prisma.motherboard.findUnique({
        where: { id: motherboardId },
      });
    } catch (error) {
      console.error('Error finding Motherboard by ID:', error);
      throw error;
    }
  }

  async update(motherboardId, newMotherboardData) {
    try {
      return await this.prisma.motherboard.update({
        where: { id: motherboardId },
        data: newMotherboardData,
      });
    } catch (error) {
      console.error('Error updating Motherboard:', error);
      throw error;
    }
  }

  async delete(motherboardId) {
    try {
      return await this.prisma.motherboard.delete({
        where: { id: motherboardId },
      });
    } catch (error) {
      console.error('Error deleting Motherboard:', error);
      throw error;
    }
  }

  async resetData() {
    // トランザクションを開始
    const transaction = await this.prisma.$transaction(async (prisma) => {
      // データをすべて削除
      await prisma.motherboard.deleteMany({});
      // IDの生成をリセット
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "Motherboard" RESTART IDENTITY CASCADE;`,
      );
      console.log('Database has been reset successfully.');
    });

    return transaction;
  }

  async updateImage(id, imagePath) {
    try {
      const updatedMotherboard = await this.prisma.motherboard.update({
        where: { id },
        data: { image: imagePath },
      });
      console.log(`Updated Motherboard image path: ${updatedMotherboard.image}`);
      return updatedMotherboard;
    } catch (error) {
      console.error(`Error updating Motherboard image path: ${error.message}`);
      throw error;
    }
  }
}

export default MotherboardRepository;
