-- AlterTable
ALTER TABLE "todolist" ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "todolist" ADD CONSTRAINT "todolist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
