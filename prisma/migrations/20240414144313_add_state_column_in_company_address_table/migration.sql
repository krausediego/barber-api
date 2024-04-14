/*
  Warnings:

  - Added the required column `state` to the `companies_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies_addresses" ADD COLUMN     "state" TEXT NOT NULL;
