/*
  Warnings:

  - The values [MILESTONE,FEATURE_REQUEST,FORM_RESPONSE,MEETING_NOTE,USER_STORY] on the enum `TaskTypeEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskTypeEnum_new" AS ENUM ('TASK', 'BUG', 'SUBTASK');
ALTER TABLE "public"."Task" ALTER COLUMN "task_type" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "task_type" TYPE "TaskTypeEnum_new" USING ("task_type"::text::"TaskTypeEnum_new");
ALTER TYPE "TaskTypeEnum" RENAME TO "TaskTypeEnum_old";
ALTER TYPE "TaskTypeEnum_new" RENAME TO "TaskTypeEnum";
DROP TYPE "public"."TaskTypeEnum_old";
ALTER TABLE "Task" ALTER COLUMN "task_type" SET DEFAULT 'TASK';
COMMIT;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "bug_parent_id" TEXT,
ADD COLUMN     "subtask_parent_id" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_subtask_parent_id_fkey" FOREIGN KEY ("subtask_parent_id") REFERENCES "Task"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_bug_parent_id_fkey" FOREIGN KEY ("bug_parent_id") REFERENCES "Task"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
