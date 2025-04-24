/*
  Warnings:

  - You are about to drop the `ProductLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductLog" DROP CONSTRAINT "ProductLog_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "ProductLog" DROP CONSTRAINT "ProductLog_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductLog" DROP CONSTRAINT "ProductLog_variantId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "price" DECIMAL(10,2),
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "updatedBy" TEXT;

-- DropTable
DROP TABLE "ProductLog";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
