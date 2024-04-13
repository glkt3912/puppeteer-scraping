import { PrismaClient } from '@prisma/client';
import CategoryRepository from './CategoryRepository.js';

const prisma = new PrismaClient();
const categoryRepository = new CategoryRepository();

class PowerRepository {
  constructor() {
    this.prisma = prisma;
  }

  // Powerデータを作成または更新する
  async createOrUpdate(powerData) {
    const power = Array.isArray(powerData) ? powerData[0] : powerData;
    const { name, brand, price, releaseDate } = power;
    if (!name || !brand) {
      throw new Error(
        `Power name and brand must be defined, received data: ${JSON.stringify(powerData)}`,
      );
    }

    // カテゴリーを取得または作成
    const categoryEntity = await categoryRepository.getCategoryByName('power');
    const categoryId = categoryEntity.id;

    // 既に存在するPowerを検索
    const existingPower = await this.prisma.power.findFirst({
      where: { name, brand, price, releaseDate },
    });

    if (existingPower) {
      return await this.prisma.power.update({
        where: { id: existingPower.id },
        data: { ...power, categoryId },
      });
    } else {
      return await this.prisma.power.create({
        data: { ...power, categoryId },
      });
    }
  }

  async findById(powerId) {
    try {
      return await this.prisma.power.findUnique({
        where: { id: powerId },
      });
    } catch (error) {
      console.error('Error finding Power by ID:', error);
      throw error;
    }
  }

  async update(powerId, newPowerData) {
    try {
      return await this.prisma.power.update({
        where: { id: powerId },
        data: newPowerData,
      });
    } catch (error) {
      console.error('Error updating Power:', error);
      throw error;
    }
  }

  async delete(powerId) {
    try {
      return await this.prisma.power.delete({
        where: { id: powerId },
      });
    } catch (error) {
      console.error('Error deleting Power:', error);
      throw error;
    }
  }

  async resetData() {
    // トランザクションを開始
    const transaction = await this.prisma.$transaction(async (prisma) => {
      // データをすべて削除
      await prisma.power.deleteMany({});
      // IDの生成をリセット
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "Power" RESTART IDENTITY CASCADE;`,
      );
      console.log('Database has been reset successfully.');
    });

    return transaction;
  }

  async updateImage(id, imagePath) {
    try {
      const updatedPower = await this.prisma.power.update({
        where: { id },
        data: { image: imagePath },
      });
      console.log(`Updated Power image path: ${updatedPower.image}`);
      return updatedPower;
    } catch (error) {
      console.error(`Error updating Power image path: ${error.message}`);
      throw error;
    }
  }
}

export default PowerRepository;
