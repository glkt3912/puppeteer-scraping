import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CategoryRepository {
  // カテゴリー名に基づいてカテゴリーを取得または作成する
  async getCategoryByName(name) {
    let category = await prisma.category.findUnique({
      where: { name },
    });

    if (!category) {
      category = await prisma.category.create({
        data: { name },
      });
    }

    return category;
  }
}

export default CategoryRepository;
