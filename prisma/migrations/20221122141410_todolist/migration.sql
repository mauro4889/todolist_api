-- DropForeignKey
ALTER TABLE "CancelTask" DROP CONSTRAINT "CancelTask_profileId_fkey";

-- AddForeignKey
ALTER TABLE "CancelTask" ADD CONSTRAINT "CancelTask_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
