/*
  Warnings:

  - You are about to drop the column `createdBy` on the `WatchlistItem` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `WatchlistItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WatchlistItem" DROP COLUMN "createdBy",
DROP COLUMN "updatedBy",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
