/*
  Warnings:

  - Added the required column `lat` to the `companies_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `companies_addresses` table without a default value. This is not possible if the table is not empty.
  - Made the column `number` on table `companies_addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zip_code` on table `companies_addresses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "companies_addresses" ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "long" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "number" SET NOT NULL,
ALTER COLUMN "zip_code" SET NOT NULL;
