/*
  Warnings:

  - You are about to drop the column `institution` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Staff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "institution",
DROP COLUMN "phone",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");
