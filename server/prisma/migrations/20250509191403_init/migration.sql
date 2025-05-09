/*
  Warnings:

  - You are about to drop the column `barangay` on the `deliver_addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "deliver_addresses" DROP COLUMN "barangay",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "phone" TEXT;
