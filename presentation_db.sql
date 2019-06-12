-- MySQL dump 10.16  Distrib 10.1.40-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: restaurant_site
-- ------------------------------------------------------
-- Server version	10.1.40-MariaDB-0ubuntu0.18.04.1

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
INSERT INTO `account` VALUES ('0b53782c-8528-11e9-a67a-5cf93891eba8','user01@test.com','aad415a73c4cef1ef94a5c00b2642b571a3e5494536328ad960db61889bd9368',0),('0e8696b4-8528-11e9-a67a-5cf93891eba8','user02@test.com','76431fac8a187241af8f3f37156deb94732f52fb45eb07ec4f462051bd82f183',0),('14e2456c-8528-11e9-a67a-5cf93891eba8','user03@test.com','d64243e8519cce2304fffb92d31acaca622585011b40439c97e9274fae146189',0),('49f1427c-3399-417b-9976-b4f385889129','1','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',1),('59f9db4e-83aa-11e9-a67a-5cf93891eba1','abc@test.com','ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',0),('c9c39990-852d-11e9-a67a-5cf93891eba8','manager01@test.com','352a6b25a73554517d0596c5ef15c53ca0a2fd5d7d8d298650a3da3854932838',1),('ca9b5886-8527-11e9-a67a-5cf93891eba8','manager02@test.com','0ca302ff56a83712ba3dd56c4d9af592e53afcae0bab78f3358d15786717ffbb',1),('fe50adb6-8527-11e9-a67a-5cf93891eba8','manager03@test.com','98ac88788bd3ff96812b1b4581c128f5211d191e568e22029176c1eecf545b8d',1);
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
  `additional_info` text,
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
INSERT INTO `booking` VALUES ('016006d1-497c-44f9-91ed-b167bb4d0ace','7c841efa-852f-11e9-a67a-5cf93891eba8','44345caf-4617-4b4d-94c7-f5edfd5ade94','09:00:00','2019-06-10',1,NULL),('029b98c2-d340-418a-b518-cfc3cd0cd805','030ea7c0-852f-11e9-a67a-5cf93891eba8','ba3bae30-0ccc-45c9-9635-c5064f5933e6','12:00:00','2019-06-12',1,NULL),('059cf286-dc09-4d19-abc2-c7e3b848a244','7c841efa-852f-11e9-a67a-5cf93891eba8','82f261af-6e1b-4fa9-ba2d-705dc0d2e080','12:30:00','2019-06-12',1,NULL),('0f89a7bc-823a-41c6-a460-88b9a095583c','030ea7c0-852f-11e9-a67a-5cf93891eba8','ec50487f-53e5-4c2e-9237-765b2b9868e5','12:00:00','2019-06-12',1,NULL),('1234','7c841efa-852f-11e9-a67a-5cf93891eba8','123','09:00:00','2019-06-10',4,NULL),('18afd490-7776-4ea0-a499-536f3941cea4','7c841efa-852f-11e9-a67a-5cf93891eba8','bf8d8309-e64f-45c0-8c3f-96d9d85ed3e2','11:30:00','2019-06-11',1,NULL),('29bea0af-2fe8-4deb-b77f-c04059c21aa6','7c841efa-852f-11e9-a67a-5cf93891eba8','07f6a44e-7a35-447d-a4f4-29fa2b57e5d2','12:30:00','2019-06-12',1,NULL),('2cabf6b1-83e2-4c53-8da5-d61575e793d8','030ea7c0-852f-11e9-a67a-5cf93891eba8','d69f58d9-6da4-4e32-90b7-15b59737302d','12:00:00','2019-06-12',2,NULL),('366a5696-b997-430c-9833-93fe175c0aad','7c841efa-852f-11e9-a67a-5cf93891eba8','54a4d206-cd18-42fa-9e1c-2e8f7ce1a31d','11:30:00','2019-06-11',1,NULL),('36bd605c-3d0b-490a-b55b-93f53f33b7ff','030ea7c0-852f-11e9-a67a-5cf93891eba8','c3adef46-9b93-401e-b468-75077b752fd3','11:30:00','2019-06-11',1,NULL),('37d724b2-1242-4516-b885-f3e09e5ac962','030ea7c0-852f-11e9-a67a-5cf93891eba8','76b12b2c-35b3-44f8-8451-dc81b0ee9e6b','00:00:00','2019-06-11',1,NULL),('400a749a-077e-4ffd-b657-d16feaf1f51d','7c841efa-852f-11e9-a67a-5cf93891eba8','6c01b342-390c-44f1-bb35-72ce709c0a9d','11:30:00','2019-06-11',1,NULL),('46387521-6949-4809-a665-c07a7fcb411f','7c841efa-852f-11e9-a67a-5cf93891eba8','a70d5709-83b9-467d-941f-a9660e8110c1','11:30:00','2019-06-11',1,NULL),('48dce4f8-c073-469d-965a-08e6f3d0d818','7c841efa-852f-11e9-a67a-5cf93891eba8','5bafff2a-7c2e-4211-a04f-ce9620caca7d','15:00:00','2019-06-11',1,NULL),('5216c927-108a-44c1-8a6f-ea681637aa8d','030ea7c0-852f-11e9-a67a-5cf93891eba8','4efbaec4-104c-45aa-95a9-b91dfa86a7f5','12:30:00','2019-06-11',1,NULL),('61b3b2d7-84d7-4356-b2f3-5b20ec4139dd','030ea7c0-852f-11e9-a67a-5cf93891eba8','8579ca4c-6529-4d4a-a921-1290944c649f','12:30:00','2019-06-12',1,NULL),('70884e84-3f4e-40d6-87a1-80a9ae3e3d95','7c841efa-852f-11e9-a67a-5cf93891eba8','9252da3e-0931-4600-bf23-a859ed24eec9','09:00:00','2019-06-10',1,NULL),('7312de1a-bfbb-40d2-abb0-86856378d653','030ea7c0-852f-11e9-a67a-5cf93891eba8','c7b54a90-8184-45b6-b3eb-6555a700462b','12:30:00','2019-06-12',1,NULL),('76531180-1c97-4082-8b95-ff2687dc497d','7c841efa-852f-11e9-a67a-5cf93891eba8','dfb8dbc2-0dfc-4505-9f3b-c9eb8a535d7e','09:00:00','2019-06-10',1,NULL),('7a18b394-ad3b-483f-840e-dd19d7b5adef','7c841efa-852f-11e9-a67a-5cf93891eba8','1dd97766-689c-49a7-b432-854da0059676','11:30:00','2019-06-11',1,NULL),('80249382-2b66-43e3-8152-ccaf92635051','8a5af668-852d-11e9-a67a-5cf93891eba8','28679bda-d59c-4c70-9db4-8447e8643246','12:30:00','2019-06-12',1,NULL),('84182159-ccdc-48d8-bf7a-c3ea84c34970','030ea7c0-852f-11e9-a67a-5cf93891eba8','ec13254f-cf1b-41cc-8b75-271cf55659c0','12:30:00','2019-06-11',1,NULL),('86ce6118-4829-413a-ba79-db7263842c24','030ea7c0-852f-11e9-a67a-5cf93891eba8','06356895-5762-4a29-b6b5-8dfb9489665c','12:30:00','2019-06-12',1,NULL),('9c7ad494-f705-457f-ae5f-a6c2b9afb4a9','7c841efa-852f-11e9-a67a-5cf93891eba8','af044913-983a-4565-9a29-2438facb70d7','12:30:00','2019-06-12',1,NULL),('a5f647bb-68ec-4a53-ac88-f9e9b5a3fd7d','7c841efa-852f-11e9-a67a-5cf93891eba8','bd15d23f-9c90-48be-9f33-f0e9392be9dc','11:00:00','2019-06-11',1,NULL),('b9f4f74d-9f08-4fc7-9fd8-ebd912958ecf','7c841efa-852f-11e9-a67a-5cf93891eba8','0d331ebf-7315-4b7b-b4aa-b28b89620232','13:00:00','2019-06-11',1,NULL),('c0aa4888-289e-4852-a78f-663815fef570','7c841efa-852f-11e9-a67a-5cf93891eba8','73e66dd3-d532-4c70-a007-ed5630474520','11:30:00','2019-06-11',1,NULL),('c1b16897-d14d-4c04-a54a-8cc8bf58da39','7c841efa-852f-11e9-a67a-5cf93891eba8','4595d9cc-5998-41a8-b7d5-354794d7fbef','12:30:00','2019-06-12',1,NULL),('c9098706-68d7-4446-9fe0-80c4af81a329','030ea7c0-852f-11e9-a67a-5cf93891eba8','b4e011fa-7a02-4397-8625-afb7ea076431','12:30:00','2019-06-12',1,NULL),('c929e392-f67f-4d76-ae91-e523fbacecef','7c841efa-852f-11e9-a67a-5cf93891eba8','e77342f3-218d-4b32-ad6d-16857c9dbe0b','11:30:00','2019-06-11',1,NULL),('caf9dd80-862e-448b-ae35-6456a7e51ab0','030ea7c0-852f-11e9-a67a-5cf93891eba8','08449ddd-f65a-496d-944d-7f28ac9081c0','12:30:00','2019-06-12',1,NULL),('cbcd48f6-fabe-4061-92ed-62d8b187276f','030ea7c0-852f-11e9-a67a-5cf93891eba8','ae09a77d-c978-4cf6-89cd-f62f64be307c','12:00:00','2019-06-12',1,NULL),('cdf6712d-be1e-4ce4-9d9e-5d4945562062','7c841efa-852f-11e9-a67a-5cf93891eba8','d2144073-82c9-43ee-bc9b-0fbdc6b1e23a','09:00:00','2019-06-10',1,NULL),('d837ba0b-5b29-4f03-aad1-d02d175337f4','030ea7c0-852f-11e9-a67a-5cf93891eba8','ef7e3143-1335-460c-a405-37f46ef74365','11:00:00','2019-06-11',1,NULL),('db6f8ff7-e9bb-4f86-9835-3841de50a9a9','7c841efa-852f-11e9-a67a-5cf93891eba8','3266004d-56c2-4d8c-946d-21500147fdb6','12:30:00','2019-06-12',1,NULL),('e6c73662-25fd-4ac3-bb72-bd9da29ac7c5','030ea7c0-852f-11e9-a67a-5cf93891eba8','9ea68b4d-7487-41f7-9001-d7b072bf0ddb','12:30:00','2019-06-12',1,NULL),('ec9d3730-e5b0-41e2-8a11-3f150fcc64fd','7c841efa-852f-11e9-a67a-5cf93891eba8','a5c85d6c-0772-4709-b6d8-9dca7d5b1c27','12:30:00','2019-06-12',1,NULL),('edea2179-c8c0-4fcd-a6c8-1365eac527f8','030ea7c0-852f-11e9-a67a-5cf93891eba8','250e9807-e3b0-44c9-bd8a-d0b7a19975b3','12:30:00','2019-06-11',1,NULL),('f6e833b5-12a1-45b8-b72c-fd5abec39d81','030ea7c0-852f-11e9-a67a-5cf93891eba8','a2090c44-4b6d-4c7f-b3ac-e258877205e6','00:00:00','2019-06-11',1,NULL),('ff0fd3c9-03ca-4041-aef9-b0f16f0901be','7c841efa-852f-11e9-a67a-5cf93891eba8','0a3364f8-33ef-40d5-95f2-98d13db358fc','11:30:00','2019-06-11',1,NULL);
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
INSERT INTO `guest` VALUES ('06356895-5762-4a29-b6b5-8dfb9489665c',NULL,'','','424'),('07f6a44e-7a35-447d-a4f4-29fa2b57e5d2',NULL,'Taj','Pereira','412257440'),('08449ddd-f65a-496d-944d-7f28ac9081c0',NULL,'Taj','Pereira','424'),('0a3364f8-33ef-40d5-95f2-98d13db358fc',NULL,'Taj','Pereira','412257440'),('0d331ebf-7315-4b7b-b4aa-b28b89620232',NULL,'Taj','Pereira','412257440'),('123','49f1427c-3399-417b-9976-b4f385889129','test_first','test_last','12345'),('1dd97766-689c-49a7-b432-854da0059676',NULL,'Taj','Pereira','412257440'),('250e9807-e3b0-44c9-bd8a-d0b7a19975b3',NULL,'Taj','Pereira','412257440'),('28679bda-d59c-4c70-9db4-8447e8643246',NULL,'Luan','fsa','04515453'),('3266004d-56c2-4d8c-946d-21500147fdb6',NULL,'Taj','Pereira','412257440'),('44345caf-4617-4b4d-94c7-f5edfd5ade94',NULL,'Taj','Pereira','412257440'),('4595d9cc-5998-41a8-b7d5-354794d7fbef',NULL,'Taj','Pereira','412257440'),('4efbaec4-104c-45aa-95a9-b91dfa86a7f5',NULL,'Taj','Pereira','412257440'),('54a4d206-cd18-42fa-9e1c-2e8f7ce1a31d',NULL,'Taj','Pereira','412257440'),('58470834-8522-11e9-a67a-5cf93891eba8','59f9db4e-83aa-11e9-a67a-5cf93891eba1','2name','3name','03456980011'),('5bafff2a-7c2e-4211-a04f-ce9620caca7d',NULL,'Taj','Pereira','412257440'),('6c01b342-390c-44f1-bb35-72ce709c0a9d',NULL,'Taj','Pereira','412257440'),('73204b52-8522-11e9-a67a-5cf93891eba8',NULL,'2name','3name','03456980011'),('73e66dd3-d532-4c70-a007-ed5630474520',NULL,'Taj','Pereira','412257440'),('76b12b2c-35b3-44f8-8451-dc81b0ee9e6b',NULL,'','',''),('82f261af-6e1b-4fa9-ba2d-705dc0d2e080',NULL,'Taj','Pereira','412257440'),('8579ca4c-6529-4d4a-a921-1290944c649f',NULL,'Taj','Pereira','424'),('9252da3e-0931-4600-bf23-a859ed24eec9',NULL,'','',''),('9ea68b4d-7487-41f7-9001-d7b072bf0ddb',NULL,'Taj','Pereira','424'),('a2090c44-4b6d-4c7f-b3ac-e258877205e6',NULL,'Taj','Pereira','412257440'),('a5c85d6c-0772-4709-b6d8-9dca7d5b1c27',NULL,'Taj','Pereira','412257440'),('a70d5709-83b9-467d-941f-a9660e8110c1',NULL,'Taj','Pereira','412257440'),('ae09a77d-c978-4cf6-89cd-f62f64be307c',NULL,'','',''),('af044913-983a-4565-9a29-2438facb70d7',NULL,'Taj','Pereira','412257440'),('b4e011fa-7a02-4397-8625-afb7ea076431',NULL,'Taj','Pereira','424'),('ba3bae30-0ccc-45c9-9635-c5064f5933e6',NULL,'','','412257440'),('bd15d23f-9c90-48be-9f33-f0e9392be9dc',NULL,'Taj','Pereira','412257440'),('bf8d8309-e64f-45c0-8c3f-96d9d85ed3e2',NULL,'Taj','Pereira','412257440'),('c3adef46-9b93-401e-b468-75077b752fd3',NULL,'Taj','Pereira','412257440'),('c7b54a90-8184-45b6-b3eb-6555a700462b',NULL,'Taj','Pereira','424'),('d0eae892-83aa-11e9-a67a-5cf93891eba8','59f9db4e-83aa-11e9-a67a-5cf93891eba1','1name','2name','0456789098'),('d2144073-82c9-43ee-bc9b-0fbdc6b1e23a',NULL,'Taj','Pereira','412257440'),('d69f58d9-6da4-4e32-90b7-15b59737302d',NULL,'Taj','Pereira','412257440'),('dfb8dbc2-0dfc-4505-9f3b-c9eb8a535d7e',NULL,'Taj','Pereira','412257440'),('e77342f3-218d-4b32-ad6d-16857c9dbe0b',NULL,'','',''),('ec13254f-cf1b-41cc-8b75-271cf55659c0',NULL,'Taj','Pereira','412257440'),('ec50487f-53e5-4c2e-9237-765b2b9868e5',NULL,'','',''),('ef7e3143-1335-460c-a405-37f46ef74365',NULL,'Taj','Pereira','412257440');
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
  `est_id` varchar(36) NOT NULL,
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
INSERT INTO `rest_img_url` VALUES ('030ea7c0-852f-11e9-a67a-5cf93891eba8','030ea7c0-852f-11e9-a67a-5cf93891eba8','images/restaurants/2.jpg',0),('7c841efa-852f-11e9-a67a-5cf93891eba8','7c841efa-852f-11e9-a67a-5cf93891eba8','images/restaurants/4.jpg',0),('8a5af668-852d-11e9-a67a-5cf93891eba8','8a5af668-852d-11e9-a67a-5cf93891eba8','images/restaurants/3.jpg',0),('eggless-01','030ea7c0-852f-11e9-a67a-5cf93891eba8','images/restaurantPage/eggless01.jpg',1),('eggless-02','030ea7c0-852f-11e9-a67a-5cf93891eba8','images/restaurantPage/eggless02.jpg',1),('eggless-03','030ea7c0-852f-11e9-a67a-5cf93891eba8','images/restaurantPage/eggless03.jpg',1),('eggless-04','030ea7c0-852f-11e9-a67a-5cf93891eba8','images/restaurantPage/eggless04.jpg',1),('eggless-05','030ea7c0-852f-11e9-a67a-5cf93891eba8','images/restaurantPage/eggless05.jpg',1),('eggless-06','030ea7c0-852f-11e9-a67a-5cf93891eba8','images/restaurantPage/eggless06.jpg',1),('farina-01','7c841efa-852f-11e9-a67a-5cf93891eba8','images/restaurantPage/farina-01.jpg',1),('farina-02','7c841efa-852f-11e9-a67a-5cf93891eba8','images/restaurantPage/farina-02.jpg',1),('farina-03','7c841efa-852f-11e9-a67a-5cf93891eba8','images/restaurantPage/farina-03.jpg',1),('farina-04','7c841efa-852f-11e9-a67a-5cf93891eba8','images/restaurantPage/farina-04.jpg',1),('farina-05','7c841efa-852f-11e9-a67a-5cf93891eba8','images/restaurantPage/farina-05.jpg',1),('farina-06','7c841efa-852f-11e9-a67a-5cf93891eba8','images/restaurantPage/farina-06.jpg',1),('parisi-01','8a5af668-852d-11e9-a67a-5cf93891eba8','images/restaurantPage/1.jpg',1),('parisi-02','8a5af668-852d-11e9-a67a-5cf93891eba8','images/restaurantPage/2.jpg',1),('parisi-03','8a5af668-852d-11e9-a67a-5cf93891eba8','images/restaurantPage/3.jpg',1),('parisi-04','8a5af668-852d-11e9-a67a-5cf93891eba8','images/restaurantPage/4.jpg',1),('parisi-05','8a5af668-852d-11e9-a67a-5cf93891eba8','images/restaurantPage/5.jpg',1),('parisi-06','8a5af668-852d-11e9-a67a-5cf93891eba8','images/restaurantPage/6.jpg',1);
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
  KEY `restaurant_id` (`restaurant_id`),
  CONSTRAINT `rest_open_times_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rest_open_times`
--

LOCK TABLES `rest_open_times` WRITE;
/*!40000 ALTER TABLE `rest_open_times` DISABLE KEYS */;
INSERT INTO `rest_open_times` VALUES ('030ea7c0-852f-11e9-a67a-5cf93891eba8','Friday','08:00:00','23:00:00'),('030ea7c0-852f-11e9-a67a-5cf93891eba8','Monday','08:00:00','23:00:00'),('030ea7c0-852f-11e9-a67a-5cf93891eba8','Saturday','08:00:00','23:00:00'),('030ea7c0-852f-11e9-a67a-5cf93891eba8','Sunday','08:00:00','23:00:00'),('030ea7c0-852f-11e9-a67a-5cf93891eba8','Thursday','08:00:00','23:00:00'),('030ea7c0-852f-11e9-a67a-5cf93891eba8','Wednesday','08:00:00','23:00:00'),('030ea7c0-852f-11e9-a67a-5cf93891eba8','Tuesday','08:00:00','23:00:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Monday','08:00:00','23:00:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Tuesday','08:00:00','23:00:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Wednesday','08:00:00','23:00:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Thursday','08:00:00','23:00:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Friday','08:00:00','23:00:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Saturday','08:00:00','23:00:00'),('7c841efa-852f-11e9-a67a-5cf93891eba8','Sunday','08:00:00','23:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Monday','08:00:00','23:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Tuesday','08:00:00','23:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Wednesday','08:00:00','23:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Thursday','08:00:00','23:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Friday','08:00:00','23:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Saturday','08:00:00','23:00:00'),('8a5af668-852d-11e9-a67a-5cf93891eba8','Sunday','08:00:00','23:00:00');
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
  `diet_options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `review_count` int(11) DEFAULT '0',
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
INSERT INTO `restaurant` VALUES ('030ea7c0-852f-11e9-a67a-5cf93891eba8','c9c39990-852d-11e9-a67a-5cf93891eba8','Eggless Dessert Cafe','{\"Street\": \"162 Goodwood Rd\", \"Suburb\": \"Goodwood\", \"State\": \"SA\", \"Postal_code\": \"5034\"}','(08) 8272 0777',40,'Seasonal, homemade vegan cakes and tarts made without eggs, served in an arty little dessert bar.','$','{\"Dessert\": true}','{\"Vegan\": true, \"Gluten-free\": true}',1),('7c841efa-852f-11e9-a67a-5cf93891eba8','ca9b5886-8527-11e9-a67a-5cf93891eba8','Farina 00 Pasta and Wine','{\"Street\": \"128 King William Rd\", \"Suburb\": \"Goodwood\", \"State\": \"SA\", \"Postal_code\": \"5034\"}','(08) 8271 1109',50,'All Pasta is made fresh daily using Tipo 00 flour, Semola and Free Range Eggs. All Sauces made fresh.','$$','{\"Italian\": true}','{\"Vegan\": true, \"Gluten-free\": true}',0),('8a5af668-852d-11e9-a67a-5cf93891eba8','c9c39990-852d-11e9-a67a-5cf93891eba8','Parisis','{\"Street\" : \"138 King William Rd\", \"Suburb\": \"Hyde Park\", \"State\": \"SA\", \"Postal_code\": \"5061\", \"Country\": \"Australia\"}','(08) 8373 5142',65,'Stylish black-and-white locale, with framed prints and a caged courtyard, for Modern Italian food.','$$','{\"Italian\": true}','{\"Gluten-free\": true}',2);
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
INSERT INTO `review` VALUES ('37b6c19c-8cfb-479f-9187-04707ff42a8f','7c841efa-852f-11e9-a67a-5cf93891eba8','49f1427c-3399-417b-9976-b4f385889129','RuiQi','Loved the setting!','Moderate',4,5,5,5,5),('6c9492d9-220e-4e93-a4e1-2df826171421','030ea7c0-852f-11e9-a67a-5cf93891eba8','49f1427c-3399-417b-9976-b4f385889129','Brian','Loved this food!!!','Moderate',5,5,5,5,5),('8e85ce8a-7305-4903-bcec-0cd3d6f280a7','030ea7c0-852f-11e9-a67a-5cf93891eba8','49f1427c-3399-417b-9976-b4f385889129','Taj','Great!','Moderate',5,5,5,5,5),('a27ad983-ac9f-44a2-b4cc-21e6474abc33','8a5af668-852d-11e9-a67a-5cf93891eba8','49f1427c-3399-417b-9976-b4f385889129','Luan','The food was ok... Could have had better service too!','Moderate',5,5,3,3,5);
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

-- Dump completed on 2019-06-12 12:00:41
