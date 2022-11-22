/*
  Warnings:

  - You are about to drop the column `creatorId` on the `CancelTask` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `FinishedTask` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `userId` to the `CancelTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `FinishedTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `FinishedTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CancelTask" DROP CONSTRAINT "CancelTask_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "FinishedTask" DROP CONSTRAINT "FinishedTask_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_creatorId_fkey";

-- AlterTable
ALTER TABLE "CancelTask" DROP COLUMN "creatorId",
ADD COLUMN     "cancelTask" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FinishedTask" DROP COLUMN "creatorId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "finishTask" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "creatorId",
ADD COLUMN     "createdTask" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedTask" ADD CONSTRAINT "FinishedTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CancelTask" ADD CONSTRAINT "CancelTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
