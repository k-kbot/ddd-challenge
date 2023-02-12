/*
  Warnings:

  - You are about to drop the column `pairId` on the `participants` table. All the data in the column will be lost.
  - Added the required column `pair_id` to the `participants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "participants" DROP CONSTRAINT "participants_pairId_fkey";

-- AlterTable
ALTER TABLE "participants" DROP COLUMN "pairId",
ADD COLUMN     "pair_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_pair_id_fkey" FOREIGN KEY ("pair_id") REFERENCES "pairs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
