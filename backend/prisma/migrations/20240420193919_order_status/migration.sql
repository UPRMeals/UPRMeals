/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderStatusType" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'DELIVERED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatusType" NOT NULL DEFAULT 'PENDING';
