/*
  Warnings:

  - You are about to drop the column `overView` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "overView",
ADD COLUMN     "overview" TEXT;
