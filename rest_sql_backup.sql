-- MySQL dump 10.17  Distrib 10.3.14-MariaDB, for osx10.14 (x86_64)
--
-- Host: localhost    Database: restaurant_site
-- ------------------------------------------------------
-- Server version	10.3.14-MariaDB

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `account_id` varchar(36) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` char(64) NOT NULL,
  `is_manager` tinyint(1) NOT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('0b53782c-8528-11e9-a67a-5cf93891eba8','user01@test.com','aad415a73c4cef1ef94a5c00b2642b571a3e5494536328ad960db61889bd9368',0),('0e8696b4-8528-11e9-a67a-5cf93891eba8','user02@test.com','76431fac8a187241af8f3f37156deb94732f52fb45eb07ec4f462051bd82f183',0),('14e2456c-8528-11e9-a67a-5cf93891eba8','user03@test.com','d64243e8519cce2304fffb92d31acaca622585011b40439c97e9274fae146189',0),('59f9db4e-83aa-11e9-a67a-5cf93891eba1','abc@test.com','ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',0),('c9c39990-852d-11e9-a67a-5cf93891eba8','manager01@test.com','352a6b25a73554517d0596c5ef15c53ca0a2fd5d7d8d298650a3da3854932838',1),('ca9b5886-8527-11e9-a67a-5cf93891eba8','manager02@test.com','0ca302ff56a83712ba3dd56c4d9af592e53afcae0bab78f3358d15786717ffbb',1),('fe50adb6-8527-11e9-a67a-5cf93891eba8','manager03@test.com','98ac88788bd3ff96812b1b4581c128f5211d191e568e22029176c1eecf545b8d',1);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking` (
  `booking_id` varchar(36) NOT NULL,
  `restaurant_id` varchar(36) NOT NULL,
  `guest_id` varchar(36) NOT NULL,
  `start_time` time NOT NULL,
  `date` date NOT NULL,
  `guest_number` int(11) NOT NULL,
  `additional_info` text DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `restaurant_id` (`restaurant_id`),
  KEY `guest_id` (`guest_id`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`guest_id`) REFERENCES `guest` (`guest_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest`
--

DROP TABLE IF EXISTS `guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guest` (
  `guest_id` varchar(36) NOT NULL,
  `account_id` varchar(36) DEFAULT NULL,
  `name_first` varchar(50) NOT NULL,
  `name_last` varchar(50) DEFAULT NULL,
  `phone_number` varchar(15) NOT NULL,
  PRIMARY KEY (`guest_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `guest_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest`
--

LOCK TABLES `guest` WRITE;
/*!40000 ALTER TABLE `guest` DISABLE KEYS */;
INSERT INTO `guest` VALUES ('58470834-8522-11e9-a67a-5cf93891eba8','59f9db4e-83aa-11e9-a67a-5cf93891eba1','2name','3name','03456980011'),('73204b52-8522-11e9-a67a-5cf93891eba8',NULL,'2name','3name','03456980011'),('d0eae892-83aa-11e9-a67a-5cf93891eba8','59f9db4e-83aa-11e9-a67a-5cf93891eba1','1name','2name','0456789098');
/*!40000 ALTER TABLE `guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rest_booking_est_time`
--

DROP TABLE IF EXISTS `rest_booking_est_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rest_booking_est_time` (
  `restaurant_id` varchar(36) NOT NULL,
  `account_id` varchar(36) NOT NULL,
  `duration` float(4,2) NOT NULL,
  `guest_min` int(11) NOT NULL,
  `guest_max` int(11) NOT NULL,
  PRIMARY KEY (`duration`,`guest_min`,`guest_max`),
  KEY `restaurant_id` (`restaurant_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `rest_booking_est_time_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rest_booking_est_time_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rest_booking_est_time`
--

LOCK TABLES `rest_booking_est_time` WRITE;
/*!40000 ALTER TABLE `rest_booking_est_time` DISABLE KEYS */;
/*!40000 ALTER TABLE `rest_booking_est_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rest_img_url`
--

DROP TABLE IF EXISTS `rest_img_url`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rest_img_url` (
  `img_id` varchar(36) NOT NULL,
  `restaurant_id` varchar(36) NOT NULL,
  `img_url` varchar(2083) DEFAULT NULL,
  `is_menu` tinyint(1) NOT NULL,
  PRIMARY KEY (`img_id`),
  KEY `restaurant_id` (`restaurant_id`),
  CONSTRAINT `rest_img_url_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rest_img_url`
--

LOCK TABLES `rest_img_url` WRITE;
/*!40000 ALTER TABLE `rest_img_url` DISABLE KEYS */;
/*!40000 ALTER TABLE `rest_img_url` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rest_open_times`
--

DROP TABLE IF EXISTS `rest_open_times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rest_open_times` (
  `restaurant_id` varchar(36) NOT NULL,
  `day` varchar(10) NOT NULL,
  `start` time NOT NULL,
  `end` time NOT NULL,
  PRIMARY KEY (`day`,`start`,`end`),
  KEY `restaurant_id` (`restaurant_id`),
  CONSTRAINT `rest_open_times_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rest_open_times`
--

LOCK TABLES `rest_open_times` WRITE;
/*!40000 ALTER TABLE `rest_open_times` DISABLE KEYS */;
/*!40000 ALTER TABLE `rest_open_times` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restaurant` (
  `restaurant_id` varchar(36) NOT NULL,
  `account_id` varchar(36) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `phone` varchar(15) NOT NULL,
  `capacity` int(11) NOT NULL,
  `description` text NOT NULL,
  `cost` varchar(3) NOT NULL,
  `cuisine` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `diet_options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `review_count` int(11) DEFAULT 0,
  PRIMARY KEY (`restaurant_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `restaurant_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES ('030ea7c0-852f-11e9-a67a-5cf93891eba8','c9c39990-852d-11e9-a67a-5cf93891eba8','Eggless Dessert Cafe','{\"Street\": \"162 Goodwood Rd\", \"Suburb\": \"Goodwood\", \"State\": \"SA\", \"Postal_code\": \"5034\"}','(08) 8272 0777',40,'Seasonal, homemade vegan cakes and tarts made without eggs, served in an arty little dessert bar.','$','{\"Dessert\": true}','{\"Vegan\": true, \"Gluten-free\": true}',1),('7c841efa-852f-11e9-a67a-5cf93891eba8','ca9b5886-8527-11e9-a67a-5cf93891eba8','Farina 00 Pasta and Wine','{\"Street\": \"128 King William Rd\", \"Suburb\": \"Goodwood\", \"State\": \"SA\", \"Postal_code\": \"5034\"}','(08) 8271 1109',50,'All Pasta is made fresh daily using Tipo 00 flour, Semola and Free Range Eggs. All Sauces made fresh.','$$','{\"Italian\": true}','{}',0),('8a5af668-852d-11e9-a67a-5cf93891eba8','c9c39990-852d-11e9-a67a-5cf93891eba8','Parisis','{\"Street\" : \"138 King William Rd\", \"Suburb\": \"Hyde Park\", \"State\": \"SA\", \"Postal_code\": \"5061\", \"Country\": \"Australia\"}','(08) 8373 5142',65,'Stylish black-and-white locale, with framed prints and a caged courtyard, for Modern Italian food.','$$','{\"Italian\": true}','{\"Gluten-free\": true}',2);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `review_id` varchar(36) NOT NULL,
  `restaurant_id` varchar(36) NOT NULL,
  `account_id` varchar(36) NOT NULL,
  `name_display` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `noise` varchar(10) NOT NULL,
  `rating_overall` int(11) NOT NULL,
  `rating_value` int(11) NOT NULL,
  `rating_service` int(11) NOT NULL,
  `rating_food` int(11) NOT NULL,
  `rating_ambience` int(11) NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `restaurant_id` (`restaurant_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-02 22:16:34
