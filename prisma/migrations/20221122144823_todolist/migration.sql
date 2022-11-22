/*
  Warnings:

  - You are about to drop the column `profileId` on the `CancelTask` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `userId` to the `CancelTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CancelTask" DROP CONSTRAINT "CancelTask_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_profileId_fkey";

-- AlterTable
ALTER TABLE "CancelTask" DROP COLUMN "profileId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "profileId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CancelTask" ADD CONSTRAINT "CancelTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
