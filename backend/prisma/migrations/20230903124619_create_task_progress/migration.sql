-- CreateTable
CREATE TABLE "task_progress" (
    "id" VARCHAR(255) NOT NULL,
    "status" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "task_id" TEXT NOT NULL,
    "participant_id" TEXT NOT NULL,

    CONSTRAINT "task_progress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "task_progress" ADD CONSTRAINT "task_progress_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_progress" ADD CONSTRAINT "task_progress_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
