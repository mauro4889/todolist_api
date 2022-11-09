/*
  Warnings:

  - You are about to drop the column `authorId` on the `CancelTask` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `FinishedTask` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `CancelTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `FinishedTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CancelTask" DROP CONSTRAINT "CancelTask_authorId_fkey";

-- DropForeignKey
ALTER TABLE "FinishedTask" DROP CONSTRAINT "FinishedTask_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_authorId_fkey";

-- AlterTable
ALTER TABLE "CancelTask" DROP COLUMN "authorId",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FinishedTask" DROP COLUMN "authorId",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "authorId",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedTask" ADD CONSTRAINT "FinishedTask_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CancelTask" ADD CONSTRAINT "CancelTask_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
