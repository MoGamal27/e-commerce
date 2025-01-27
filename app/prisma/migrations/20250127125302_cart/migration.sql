-- AlterTable
ALTER TABLE "product" ADD COLUMN     "inStock" BOOLEAN DEFAULT true;

-- CreateTable
CREATE TABLE "cart" (
    "id" SERIAL NOT NULL,
    "cartItems" JSONB NOT NULL,
    "totalPrice" DECIMAL(65,30) NOT NULL,
    "totalPriceAfterDiscount" DECIMAL(65,30) NOT NULL,
    "userId" INTEGER NOT NULL,
    "couponId" INTEGER,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
