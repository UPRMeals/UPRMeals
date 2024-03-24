/*
  Warnings:

  - Added the required column `proteinCount` to the `Combo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sideCount` to the `Combo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Combo" ADD COLUMN     "proteinCount" INTEGER NOT NULL,
ADD COLUMN     "sideCount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;
