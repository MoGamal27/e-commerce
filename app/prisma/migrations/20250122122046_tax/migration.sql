-- CreateTable
CREATE TABLE "tax" (
    "id" SERIAL NOT NULL,
    "taxPrice" INTEGER NOT NULL DEFAULT 0,
    "shippingPrice" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tax_pkey" PRIMARY KEY ("id")
);
