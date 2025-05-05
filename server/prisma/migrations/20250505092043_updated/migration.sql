/*
  Warnings:

  - You are about to drop the column `createdById` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `InventoryLogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InventoryLogs" DROP CONSTRAINT "InventoryLogs_batchId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryLogs" DROP CONSTRAINT "InventoryLogs_productId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryLogs" DROP CONSTRAINT "InventoryLogs_userId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryLogs" DROP CONSTRAINT "InventoryLogs_variantId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "createdById";

-- DropTable
DROP TABLE "InventoryLogs";

-- CreateTable
CREATE TABLE "ProductAuditLog" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT,
    "batchId" TEXT,
    "field" TEXT NOT NULL,
    "oldValue" TEXT,
    "newValue" TEXT,
    "action" TEXT NOT NULL,
    "reason" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductAuditLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductAuditLog" ADD CONSTRAINT "ProductAuditLog_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "ProductBatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAuditLog" ADD CONSTRAINT "ProductAuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAuditLog" ADD CONSTRAINT "ProductAuditLog_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAuditLog" ADD CONSTRAINT "ProductAuditLog_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
