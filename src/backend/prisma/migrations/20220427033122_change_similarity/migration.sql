/*
  Warnings:

  - You are about to drop the column `akurasi` on the `prediksi` table. All the data in the column will be lost.
  - Added the required column `similarity` to the `Prediksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prediksi` DROP COLUMN `akurasi`,
    ADD COLUMN `similarity` DOUBLE NOT NULL;
