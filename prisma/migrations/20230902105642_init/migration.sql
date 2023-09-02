/*
  Warnings:

  - A unique constraint covering the columns `[kodeunik]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_kodeunik_key" ON "user"("kodeunik");
