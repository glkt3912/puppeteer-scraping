-- CreateTable
CREATE TABLE "Memory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "releaseDate" TIMESTAMP(3),
    "capacity" TEXT,
    "count" TEXT,
    "memoryStandard" TEXT,
    "memoryInterface" TEXT,
    "moduleStandard" TEXT,
    "image" TEXT,
    "url" VARCHAR(2048),
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Memory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
