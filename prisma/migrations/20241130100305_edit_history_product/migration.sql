/*
  Warnings:

  - You are about to drop the column `history_product` on the `history` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `history` DROP COLUMN `history_product`;

-- CreateTable
CREATE TABLE `history_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `history_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `history_product` ADD CONSTRAINT `history_product_history_id_fkey` FOREIGN KEY (`history_id`) REFERENCES `history`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `history` RENAME INDEX `history_user_id_idx` TO `user_id`;
