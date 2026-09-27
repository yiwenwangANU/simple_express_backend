-- CreateEnum
CREATE TYPE "WatchlistStatus" AS ENUM ('PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "overView" TEXT,
    "releaseYear" TEXT NOT NULL,
    "genres" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "runtime" INTEGER,
    "posterUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchlistItem" (
    "id" TEXT NOT NULL,
    "status" "WatchlistStatus" NOT NULL DEFAULT 'PLANNED',
    "rating" INTEGER,
    "notes" TEXT,
    "createdBy" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "WatchlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistItem_userId_movieId_key" ON "WatchlistItem"("userId", "movieId");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchlistItem" ADD CONSTRAINT "WatchlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchlistItem" ADD CONSTRAINT "WatchlistItem_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
