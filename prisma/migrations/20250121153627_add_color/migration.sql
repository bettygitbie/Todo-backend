/*
  Warnings:

  - Added the required column `color` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Todo` ADD COLUMN `color` VARCHAR(191) NOT NULL;
