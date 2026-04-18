/*
  Warnings:

  - A unique constraint covering the columns `[userId,createdAt]` on the table `Day` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `goalTime` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Day" ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "goalTime" INTEGER NOT NULL,
ALTER COLUMN "days" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Day_userId_createdAt_key" ON "Day"("userId", "createdAt");
