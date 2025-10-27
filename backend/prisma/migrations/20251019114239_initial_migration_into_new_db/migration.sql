-- CreateEnum
CREATE TYPE "Status" AS ENUM ('TO_DO', 'IN_PROGRESS', 'DEV_FIXED', 'QA_DONE', 'DEPLOYED_TO_UAT', 'BUG_REOPENED', 'DEPLOYED_TO_PROD');

-- CreateEnum
CREATE TYPE "TaskTypeEnum" AS ENUM ('TASK', 'MILESTONE', 'BUG', 'FEATURE_REQUEST', 'FORM_RESPONSE', 'MEETING_NOTE', 'SUBTASK', 'USER_STORY');

-- CreateTable
CREATE TABLE "Task" (
    "task_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status" NOT NULL DEFAULT 'TO_DO',
    "due_date" TIMESTAMP(3),
    "task_type" "TaskTypeEnum" NOT NULL DEFAULT 'TASK',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "Assignee" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assignee" ADD CONSTRAINT "Assignee_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignee" ADD CONSTRAINT "Assignee_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
