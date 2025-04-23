-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('active', 'inactive', 'banned');

-- CreateTable
CREATE TABLE "deliver_addresses" (
    "id" TEXT NOT NULL,
    "address" TEXT,
    "province" TEXT,
    "city" TEXT,
    "barangay" TEXT,
    "zipCode" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "deliver_addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "deliver_addresses" ADD CONSTRAINT "deliver_addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
