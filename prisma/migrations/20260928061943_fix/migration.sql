/*
  Warnings:

  - You are about to drop the column `createBy` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_createBy_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "createBy",
ADD COLUMN     "createdBy" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
