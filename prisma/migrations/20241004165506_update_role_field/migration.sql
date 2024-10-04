/*
  Warnings:

  - Made the column `firstname` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tel` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `firstname` VARCHAR(191) NOT NULL,
    MODIFY `lastname` VARCHAR(191) NOT NULL,
    MODIFY `tel` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('Admin', 'Teacher', 'ExamTech', 'Technology') NOT NULL;
