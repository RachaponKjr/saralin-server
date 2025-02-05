/*
  Warnings:

  - You are about to alter the column `status` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(255)`.
  - You are about to alter the column `date_of_birth` on the `user_info` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - Made the column `address_line2` on table `locations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postal_code` on table `locations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `latitude` on table `locations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `locations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `fabrictype` MODIFY `tags` TEXT NULL;

-- AlterTable
ALTER TABLE `locations` MODIFY `address_line2` VARCHAR(255) NOT NULL,
    MODIFY `postal_code` VARCHAR(10) NOT NULL,
    MODIFY `latitude` DECIMAL(9, 6) NOT NULL,
    MODIFY `longitude` DECIMAL(9, 6) NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `status` VARCHAR(255) NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE `user_info` MODIFY `date_of_birth` DATETIME(3) NULL;
