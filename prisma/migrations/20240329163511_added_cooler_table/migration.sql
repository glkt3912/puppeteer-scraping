-- CreateTable
CREATE TABLE "Cooler" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "releaseDate" TIMESTAMP(3),
    "type" TEXT,
    "size" TEXT,
    "tdp" TEXT,
    "noiseMaxLevel" TEXT,
    "image" TEXT,
    "url" VARCHAR(2048),
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Cooler_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cooler" ADD CONSTRAINT "Cooler_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
