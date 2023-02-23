-- AlterTable
ALTER TABLE "pairs" ADD COLUMN     "team_id" TEXT NOT NULL DEFAULT 'undefined';

-- AlterTable
ALTER TABLE "participants" ADD COLUMN     "team_id" TEXT NOT NULL DEFAULT 'undefined';

-- AddForeignKey
ALTER TABLE "pairs" ADD CONSTRAINT "pairs_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
