/*
  Warnings:

  - You are about to drop the column `updatedBy` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_updatedBy_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "updatedBy",
ADD COLUMN     "createdBy" TEXT DEFAULT '73f65300-8dcf-4929-af45-dce69467a90f',
ADD COLUMN     "createdById" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
