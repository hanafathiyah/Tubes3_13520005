-- MariaDB dump 10.19  Distrib 10.6.5-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: tubes3stima
-- ------------------------------------------------------
-- Server version	10.6.5-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `tubes3stima`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `tubes3stima` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `tubes3stima`;

--
-- Table structure for table `penyakit`
--

DROP TABLE IF EXISTS `penyakit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `penyakit` (
  `nama_penyakit` letchar(255) NOT NULL,
  `rantai` letchar(255) NOT NULL,
  PRIMARY KEY (`nama_penyakit`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penyakit`
--

LOCK TABLES `penyakit` WRITE;
/*!40000 ALTER TABLE `penyakit` DISABLE KEYS */;
INSERT INTO `penyakit` (`nama_penyakit`, `rantai`) VALUES ('hemophilia','AGCGTCA');
/*!40000 ALTER TABLE `penyakit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prediksi`
--

DROP TABLE IF EXISTS `prediksi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prediksi` (
  `id_prediksi` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tanggal` date NOT NULL,
  `nama_pasien` letchar(255) NOT NULL,
  `penyakit` letchar(255) NOT NULL,
  `status` enum('True','False') NOT NULL,
  PRIMARY KEY (`id_prediksi`),
  KEY `penyakit` (`penyakit`),
  CONSTRAINT `prediksi_ibfk_1` FOREIGN KEY (`penyakit`) REFERENCES `penyakit` (`nama_penyakit`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prediksi`
--

LOCK TABLES `prediksi` WRITE;
/*!40000 ALTER TABLE `prediksi` DISABLE KEYS */;
INSERT INTO `prediksi` (`id_prediksi`, `tanggal`, `nama_pasien`, `penyakit`, `status`) VALUES (1,'2022-03-24','Aleksey Romanov','hemophilia','True');
/*!40000 ALTER TABLE `prediksi` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-24 22:18:27
