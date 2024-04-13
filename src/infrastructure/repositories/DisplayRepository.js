import { PrismaClient } from '@prisma/client';
import CategoryRepository from './CategoryRepository.js';

const prisma = new PrismaClient();
const categoryRepository = new CategoryRepository();

class DisplayRepository {
  constructor() {
    this.prisma = prisma;
  }

  // Displayデータを作成または更新する
  async createOrUpdate(displayData) {
    const display = Array.isArray(displayData) ? displayData[0] : displayData;
    const { name, brand, price, releaseDate } = display;
    if (!name || !brand) {
      throw new Error(
        `Display name and brand must be defined, received data: ${JSON.stringify(displayData)}`,
      );
    }

    // カテゴリーを取得または作成
    const categoryEntity = await categoryRepository.getCategoryByName('display');
    const categoryId = categoryEntity.id;

    // 既に存在するDisplayを検索
    const existingDisplay = await this.prisma.display.findFirst({
      where: { name, brand, price, releaseDate },
    });

    if (existingDisplay) {
      return await this.prisma.display.update({
        where: { id: existingDisplay.id },
        data: { ...display, categoryId },
      });
    } else {
      return await this.prisma.display.create({
        data: { ...display, categoryId },
      });
    }
  }

  async findById(displayId) {
    try {
      return await this.prisma.display.findUnique({
        where: { id: displayId },
      });
    } catch (error) {
      console.error('Error finding Display by ID:', error);
      throw error;
    }
  }

  async update(displayId, newDisplayData) {
    try {
      return await this.prisma.display.update({
        where: { id: displayId },
        data: newDisplayData,
      });
    } catch (error) {
      console.error('Error updating Display:', error);
      throw error;
    }
  }

  async delete(displayId) {
    try {
      return await this.prisma.display.delete({
        where: { id: displayId },
      });
    } catch (error) {
      console.error('Error deleting Display:', error);
      throw error;
    }
  }

  async resetData() {
    // トランザクションを開始
    const transaction = await this.prisma.$transaction(async (prisma) => {
      // データをすべて削除
      await prisma.display.deleteMany({});
      // IDの生成をリセット
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "Display" RESTART IDENTITY CASCADE;`,
      );
      console.log('Database has been reset successfully.');
    });

    return transaction;
  }

  async updateImage(id, imagePath) {
    try {
      const updatedDisplay = await this.prisma.display.update({
        where: { id },
        data: { image: imagePath },
      });
      console.log(`Updated Display image path: ${updatedDisplay.image}`);
      return updatedDisplay;
    } catch (error) {
      console.error(`Error updating Display image path: ${error.message}`);
      throw error;
    }
  }
}

export default DisplayRepository;
