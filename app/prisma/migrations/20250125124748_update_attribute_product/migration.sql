/*
  Warnings:

  - A unique constraint covering the columns `[categoryId]` on the table `product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subCategoryId]` on the table `product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[brandId]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "product" ALTER COLUMN "ratings" DROP NOT NULL,
ALTER COLUMN "ratings" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "product_categoryId_key" ON "product"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "product_subCategoryId_key" ON "product"("subCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "product_brandId_key" ON "product"("brandId");
