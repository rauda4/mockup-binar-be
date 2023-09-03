/*
  Warnings:

  - Added the required column `keterangan` to the `todolist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todolist" ADD COLUMN     "keterangan" TEXT NOT NULL;
