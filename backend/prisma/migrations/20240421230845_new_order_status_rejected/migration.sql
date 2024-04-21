/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
ALTER TYPE "OrderStatusType" ADD VALUE 'REJECTED';

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatusType" NOT NULL DEFAULT 'PENDING';
