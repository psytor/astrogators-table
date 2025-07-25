/*
  Warnings:

  - Changed the type of `unit_type` on the `Character` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "unit_type",
ADD COLUMN     "unit_type" INTEGER NOT NULL;
