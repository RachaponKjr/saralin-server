-- AlterTable
ALTER TABLE `product` MODIFY `status` ENUM('AVAILABLE', 'NOT_AVAILABLE', 'SOLD') NOT NULL DEFAULT 'AVAILABLE';
