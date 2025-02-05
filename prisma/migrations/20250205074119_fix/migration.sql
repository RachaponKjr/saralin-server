-- AlterTable
ALTER TABLE `locations` MODIFY `address_line2` VARCHAR(255) NULL,
    MODIFY `postal_code` VARCHAR(10) NULL,
    MODIFY `latitude` DECIMAL(9, 6) NULL,
    MODIFY `longitude` DECIMAL(9, 6) NULL;
