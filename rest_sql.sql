-- MySQL dump 10.17  Distrib 10.3.14-MariaDB, for osx10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: restaurant_site
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
-- Current Database: `restaurant_site`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `restaurant_site` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `restaurant_site`;

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
INSERT INTO `account` VALUES ('0b53782c-8528-11e9-a67a-5cf93891eba8','user01@test.com','aad415a73c4cef1ef94a5c00b2642b571a3e5494536328ad960db61889bd9368',0),('0e8696b4-8528-11e9-a67a-5cf93891eba8','user02@test.com','76431fac8a187241af8f3f37156deb94732f52fb45eb07ec4f462051bd82f183',0),('14e2456c-8528-11e9-a67a-5cf93891eba8','user03@test.com','d64243e8519cce2304fffb92d31acaca622585011b40439c97e9274fae146189',0),('26b729a8-036c-48de-b177-eac4e12d8696','manager04@test.com','556a476cb20872710337b5fb5e8b7ca326a5c435c1b6716801bc218e13239c37',1),('682fbe2d-1a0a-404d-ac50-cb0ecfcbd7f8','user04@test.com','e12f9df2347fbce1fde80e9034e96b90eb3a593de0e02f348e40a932e15ffb17',0),('c9c39990-852d-11e9-a67a-5cf93891eba8','manager01@test.com','352a6b25a73554517d0596c5ef15c53ca0a2fd5d7d8d298650a3da3854932838',1),('ca9b5886-8527-11e9-a67a-5cf93891eba8','manager02@test.com','0ca302ff56a83712ba3dd56c4d9af592e53afcae0bab78f3358d15786717ffbb',1),('fe50adb6-8527-11e9-a67a-5cf93891eba8','manager03@test.com','98ac88788bd3ff96812b1b4581c128f5211d191e568e22029176c1eecf545b8d',1);
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
INSERT INTO `booking` VALUES ('2534f2d0-86e4-11e9-9575-5cf93891eba8','7c841efa-852f-11e9-a67a-5cf93891eba8','a2af6fa8-86e2-11e9-9575-5cf93891eba8','18:00:00','2019-03-04',2,NULL),('2ec269be-86e3-11e9-9575-5cf93891eba8','030ea7c0-852f-11e9-a67a-5cf93891eba8','a2aebe00-86e2-11e9-9575-5cf93891eba8','19:30:00','2019-02-04',2,NULL),('3ada568c-86a0-11e9-a67a-5cf93891eba8','8a5af668-852d-11e9-a67a-5cf93891eba8','58470834-8522-11e9-a67a-5cf93891eba8','11:30:00','2019-09-01',4,NULL),('3ea1f02d-4ca3-4b11-82c7-08422ee2b9a8','8a5af668-852d-11e9-a67a-5cf93891eba8','5812f4a4-b324-4a83-a0a6-27e7135dee04','14:30:00','2019-09-02',4,'lactose-intolerent'),('4a5252fe-86a0-11e9-a67a-5cf93891eba8','7c841efa-852f-11e9-a67a-5cf93891eba8','73204b52-8522-11e9-a67a-5cf93891eba8','12:30:00','2019-09-01',10,NULL),('63fdc2b2-86e4-11e9-9575-5cf93891eba8','8a5af668-852d-11e9-a67a-5cf93891eba8','a2af6fa8-86e2-11e9-9575-5cf93891eba8','18:00:00','2019-03-05',11,NULL),('7bb8e95e-86e4-11e9-9575-5cf93891eba8','8a5af668-852d-11e9-a67a-5cf93891eba8','a2af7188-86e2-11e9-9575-5cf93891eba8','18:00:00','2019-03-05',20,NULL),('ae842d04-86e3-11e9-9575-5cf93891eba8','030ea7c0-852f-11e9-a67a-5cf93891eba8','a2af7188-86e2-11e9-9575-5cf93891eba8','20:30:00','2019-02-04',2,'birthday');
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
INSERT INTO `guest` VALUES ('5812f4a4-b324-4a83-a0a6-27e7135dee04',NULL,'Lucy',NULL,'0432678908'),('58470834-8522-11e9-a67a-5cf93891eba8',NULL,'2name','3name','03456980011'),('73204b52-8522-11e9-a67a-5cf93891eba8',NULL,'2name','3name','03456980011'),('a2aebe00-86e2-11e9-9575-5cf93891eba8','0b53782c-8528-11e9-a67a-5cf93891eba8','user01','guest01','0412345667'),('a2af6fa8-86e2-11e9-9575-5cf93891eba8','0b53782c-8528-11e9-a67a-5cf93891eba8','user01','guest02','0422345667'),('a2af7188-86e2-11e9-9575-5cf93891eba8','0e8696b4-8528-11e9-a67a-5cf93891eba8','user02','guest01','0422345667'),('d0eae892-83aa-11e9-a67a-5cf93891eba8',NULL,'1name','2name','0456789098');
/*!40000 ALTER TABLE `guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rest_booking_est_time`
--

DROP TABLE IF EXISTS `rest_booking_est_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rest_booking_est_time` (
  `est_id` varchar(36) NOT NULL,
  `restaurant_id` varchar(36) NOT NULL,
  `account_id` varchar(36) NOT NULL,
  `duration` float(4,2) NOT NULL,
  `guest_min` int(11) NOT NULL,
  `guest_max` int(11) NOT NULL,
  PRIMARY KEY (`est_id`),
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
INSERT INTO `rest_booking_est_time` VALUES ('3dd42b0c-86a4-11e9-a67a-5cf93891eba8','7c841efa-852f-11e9-a67a-5cf93891eba8','ca9b5886-8527-11e9-a67a-5cf93891eba8',3.00,1,4),('3dd455d2-86a4-11e9-a67a-5cf93891eba8','7c841efa-852f-11e9-a67a-5cf93891eba8','ca9b5886-8527-11e9-a67a-5cf93891eba8',5.00,5,50),('3dd463ce-86a4-11e9-a67a-5cf93891eba8','8a5af668-852d-11e9-a67a-5cf93891eba8','c9c39990-852d-11e9-a67a-5cf93891eba8',5.00,5,65),('3dd6257e-86a4-11e9-a67a-5cf93891eba8','8a5af668-852d-11e9-a67a-5cf93891eba8','c9c39990-852d-11e9-a67a-5cf93891eba8',3.00,1,4),('d2dca018-86a3-11e9-a67a-5cf93891eba8','030ea7c0-852f-11e9-a67a-5cf93891eba8','c9c39990-852d-11e9-a67a-5cf93891eba8',4.00,1,40);
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
INSERT INTO `rest_img_url` VALUES ('0c055528-85c9-11e9-a67a-5cf93891eba8','7c841efa-852f-11e9-a67a-5cf93891eba8','/images/restaurantPage/1',0),('3a00116e-85c1-11e9-a67a-5cf93891eba8','7c841efa-852f-11e9-a67a-5cf93891eba8','/images/restaurantPage/2',0),('3a0016c8-85c1-11e9-a67a-5cf93891eba8','7c841efa-852f-11e9-a67a-5cf93891eba8','/images/restaurantPage/3',0),('3a001952-85c1-11e9-a67a-5cf93891eba8','7c841efa-852f-11e9-a67a-5cf93891eba8','/images/restaurantPage/4',0),('3a001b50-85c1-11e9-a67a-5cf93891eba8','7c841efa-852f-11e9-a67a-5cf93891eba8','/images/restaurantPage/5',0),('3a00f494-85c1-11e9-a67a-5cf93891eba8','7c841efa-852f-11e9-a67a-5cf93891eba8','/images/restaurantPage/6',0),('eb5371ae-85c1-11e9-a67a-5cf93891eba8','030ea7c0-852f-11e9-a67a-5cf93891eba8','/images/restaurantPage/eggless01',0),('eb538c70-85c1-11e9-a67a-5cf93891eba8','030ea7c0-852f-11e9-a67a-5cf93891eba8','/images/restaurantPage/eggless02',0),('eb539ecc-85c1-11e9-a67a-5cf93891eba8','030ea7c0-852f-11e9-a67a-5cf93891eba8','/images/restaurantPage/eggless03',0),('eb53a156-85c1-11e9-a67a-5cf93891eba8','030ea7c0-852f-11e9-a67a-5cf93891eba8','/images/restaurantPage/eggless04',0),('eb53a3f4-85c1-11e9-a67a-5cf93891eba8','030ea7c0-852f-11e9-a67a-5cf93891eba8','/images/restaurantPage/eggless05',0),('eb53a692-85c1-11e9-a67a-5cf93891eba8','030ea7c0-852f-11e9-a67a-5cf93891eba8','/images/restaurantPage/eggless06',0);
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
INSERT INTO `rest_open_times` VALUES ('030ea7c0-852f-11e9-a67a-5cf93891eba8','Friday','19:30:00','23:30:00'),('030ea7c0-852f-11e9-a67a-5cf93891eba8','Saturday','19:30:00','23:30:00'),('030ea7c0-852f-11e9-a67a-5cf93891eba8','Thursday','19:30:00','23:30:00'),('030ea7c0-852f-11e9-a67a-5cf93891eba8','Tuesday','19:30:00','23:30:00'),('030ea7c0-852f-11e9-a67a-5cf93891eba8','Wednesday','19:30:00','23:30:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Friday','12:00:00','15:30:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Friday','17:30:00','20:00:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Monday','17:30:00','20:00:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Saturday','12:00:00','15:30:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Saturday','17:30:00','20:00:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Sunday','12:00:00','15:30:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Sunday','17:30:00','20:00:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Thursday','17:30:00','20:00:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Tuesday','17:30:00','20:00:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Wednesday','17:30:00','20:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Friday','11:30:00','15:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Friday','17:30:00','22:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Monday','11:30:00','15:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Monday','17:30:00','22:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Saturday','17:30:00','22:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Sunday','11:30:00','15:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Sunday','17:30:00','22:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Thursday','11:30:00','15:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Thursday','17:30:00','22:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Tuesday','11:30:00','15:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Tuesday','17:30:00','22:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Wednesday','11:30:00','15:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Wednesday','17:30:00','22:00:00');
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
INSERT INTO `restaurant` VALUES ('030ea7c0-852f-11e9-a67a-5cf93891eba8','c9c39990-852d-11e9-a67a-5cf93891eba8','Eggless Dessert Cafe','{\"street\": \"162 Goodwood Rd\", \"suburb\": \"Goodwood\", \"state\": \"SA\", \"postal_code\": \"5034\"}','(08) 8272 0777',40,'Seasonal, homemade vegan cakes and tarts made without eggs, served in an arty little dessert bar.','$','{\"dessert\": true}','{\"vegan\": true, \"gluten-free\": true}',1),('7c841efa-852f-11e9-a67a-5cf93891eba8','ca9b5886-8527-11e9-a67a-5cf93891eba8','Farina 00 Pasta and Wine','{\"street\": \"128 King William Rd\", \"suburb\": \"Goodwood\", \"state\": \"SA\", \"postal_code\": \"5034\"}','(08) 8271 1109',50,'All Pasta is made fresh daily using Tipo 00 flour, Semola and Free Range Eggs. All Sauces made fresh.','$$','{\"Italian\": true}','{\"vegetarian\": true, \"gluten-free\": true}',1),('8a5af668-852d-11e9-a67a-5cf93891eba8','c9c39990-852d-11e9-a67a-5cf93891eba8','Parisis','{\"street\" : \"138 King William Rd\", \"suburb\": \"Hyde Park\", \"state\": \"SA\", \"postal_code\": \"5061\"}','(08) 8373 5142',65,'Stylish black-and-white locale, with framed prints and a caged courtyard, for Modern Italian food.','$$','{\"Italian\": true}','{\"vegetarian\": true, \"gluten-free\": true}',2);
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
INSERT INTO `review` VALUES ('1a355e78-86e5-11e9-9575-5cf93891eba8','7c841efa-852f-11e9-a67a-5cf93891eba8','0b53782c-8528-11e9-a67a-5cf93891eba8','usrnme8987','This is a review','quiet',4,4,3,3,4),('648508b0-86e6-11e9-9575-5cf93891eba8','030ea7c0-852f-11e9-a67a-5cf93891eba8','0b53782c-8528-11e9-a67a-5cf93891eba8','usrnme89872','This is another review','moderate',2,2,3,3,1),('648516f2-86e6-11e9-9575-5cf93891eba8','8a5af668-852d-11e9-a67a-5cf93891eba8','0b53782c-8528-11e9-a67a-5cf93891eba8','usrnme8987','This is a good review','quiet',5,5,5,3,5),('64851864-86e6-11e9-9575-5cf93891eba8','8a5af668-852d-11e9-a67a-5cf93891eba8','0e8696b4-8528-11e9-a67a-5cf93891eba8','lalala3','Restaurant is pretty good','moderate',4,3,4,3,4),('64851ab2-86e6-11e9-9575-5cf93891eba8','030ea7c0-852f-11e9-a67a-5cf93891eba8','0e8696b4-8528-11e9-a67a-5cf93891eba8','lalala3','Another review - restaurant is pretty good','moderate',4,5,4,3,4);
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

-- Dump completed on 2019-06-05 21:34:11
