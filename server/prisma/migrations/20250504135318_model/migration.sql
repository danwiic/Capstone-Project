-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "reOrderLevel" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "reOrderLevel" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "InventoryLogs" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT,
    "batchId" TEXT,
    "quantity" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryLogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InventoryLogs" ADD CONSTRAINT "InventoryLogs_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "ProductBatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryLogs" ADD CONSTRAINT "InventoryLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryLogs" ADD CONSTRAINT "InventoryLogs_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryLogs" ADD CONSTRAINT "InventoryLogs_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
