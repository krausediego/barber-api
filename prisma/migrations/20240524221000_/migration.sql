/*
  Warnings:

  - The primary key for the `companies_invites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `companies_invites` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "companies_invites" DROP CONSTRAINT "companies_invites_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "companies_invites_pkey" PRIMARY KEY ("id");
