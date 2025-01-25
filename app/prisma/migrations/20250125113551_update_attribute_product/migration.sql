-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_brandId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_subCategoryId_fkey";

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "sold" DROP NOT NULL,
ALTER COLUMN "sold" SET DEFAULT 0,
ALTER COLUMN "priceAfterDiscount" DROP NOT NULL,
ALTER COLUMN "priceAfterDiscount" SET DEFAULT 0,
ALTER COLUMN "color" DROP NOT NULL,
ALTER COLUMN "subCategoryId" DROP NOT NULL,
ALTER COLUMN "brandId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "subCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
