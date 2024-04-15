/*
  Warnings:

  - Changed the type of `lat` on the `companies_addresses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `long` on the `companies_addresses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "companies_addresses" DROP COLUMN "lat",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
DROP COLUMN "long",
ADD COLUMN     "long" DOUBLE PRECISION NOT NULL;
