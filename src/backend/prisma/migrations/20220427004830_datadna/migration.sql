-- CreateTable
CREATE TABLE `Penyakit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_penyakit` VARCHAR(255) NOT NULL,
    `rantai` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prediksi` (
    `id_prediksi` INTEGER NOT NULL AUTO_INCREMENT,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nama_pasien` VARCHAR(255) NOT NULL,
    `id_penyakit` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `akurasi` DOUBLE NOT NULL,

    PRIMARY KEY (`id_prediksi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Prediksi` ADD CONSTRAINT `Prediksi_id_penyakit_fkey` FOREIGN KEY (`id_penyakit`) REFERENCES `Penyakit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
