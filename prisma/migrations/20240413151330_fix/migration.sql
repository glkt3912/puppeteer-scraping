/*
  Warnings:

  - You are about to drop the `MotherBoard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MotherBoard" DROP CONSTRAINT "MotherBoard_categoryId_fkey";

-- DropTable
DROP TABLE "MotherBoard";

-- CreateTable
CREATE TABLE "Motherboard" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "releaseDate" TIMESTAMP(3),
    "socket" TEXT,
    "formFactor" TEXT,
    "chipset" TEXT,
    "memoryType" TEXT,
    "image" TEXT,
    "url" VARCHAR(2048),
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Motherboard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Motherboard" ADD CONSTRAINT "Motherboard_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
