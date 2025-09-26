-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: faculty_db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booked_class`
--

DROP TABLE IF EXISTS `booked_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booked_class` (
  `bkcl_id` int NOT NULL AUTO_INCREMENT,
  `class_id` int DEFAULT NULL,
  `schedule_id` int DEFAULT NULL,
  `faculty_name` varchar(50) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`bkcl_id`),
  KEY `fk_class_id` (`class_id`),
  KEY `fk_schedule_id` (`schedule_id`),
  CONSTRAINT `fk_class_id` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`),
  CONSTRAINT `fk_schedule_id` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booked_class`
--

LOCK TABLES `booked_class` WRITE;
/*!40000 ALTER TABLE `booked_class` DISABLE KEYS */;
INSERT INTO `booked_class` VALUES (13,1002,1001,'Teja Kundaikar','1',NULL);
/*!40000 ALTER TABLE `booked_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `class_id` int NOT NULL,
  `class_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `floor` int DEFAULT NULL,
  `engaged` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1001,'FF1',1,1),(1002,'FF2',1,0),(1003,'FF3',1,0),(1004,'FF4',1,0),(1005,'FF5',1,0),(1006,'FF6',1,0),(1007,'FF7',1,0),(1008,'FF8',1,1);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `faculty_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`faculty_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (101,'Gaurpriya Chodanker','gaurpriyachodanker@unigoa.ac.in','$2b$10$o1oRJb71eW1pocwxyYpgQ.j3uyf8UtuSgQc/5TXZ2PWAd8sNse4lS'),(102,'Swapnil Fadte','swapnilfadte@unigoa.ac.in','$2b$10$06xzu8SzvK8IP5Hp5uYZUuWbvyN/Vy9/s1erT3Jz6I0RWAL.wdVxG'),(103,'Teja Kundaikar','tejakundaikar@unigoa.ac.in','$2b$10$7fiN99QezKSwkoMNsriwNOoXq2RZrZi15ymkXYs6UxHBOQlc5lJNG'),(104,'Ramdas Karmali','ramdaskarmali@unigoa.ac.in','$2b$10$O0BNFIRDqzvyYjnl8Gd5Hum7RLULNKePg5vq8/9OUFa2WatSlpiPG'),(105,'Jyoti Pawar','jyotipawar@unigoa.ac.in','$2b$10$tuUzfg9ZGbEMNOYC4lHoC.V3JYRPT6kIo3Bw9LA0wZgCN5voE4roy'),(106,'Yma Pinto','ymapinto@unigoa.ac.in','$2b$10$5KSz/gVJP7fMSMhZEKPqEO4EgqTcOubC.PxSkutMAHlBCjyh7uqVm'),(107,'Hanumant Redkar','hanumantredkar@unigoa.ac.in','$2b$10$rhMIepLUcHAjy7/WlC/ECefbI68SAdo3dB37gzNzbIUkq5jgou6xC'),(108,'Sarvesh Velip','sarveshvelip@unigoa.ac.in','$2b$10$EYKB5GChaOR3N4CHlpW8Z.wunN.UYbTXy9s9O16Dq./L1yJAmNbsy'),(109,'Ramrao Wagh','ramraowagh@unigoa.ac.in','$2b$10$QK/UTQwIfZo4hXa5/G0Lr.KKGOIVFdFQTCzwjruK6cJw6V99mIfQ6');
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programme`
--

DROP TABLE IF EXISTS `programme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programme` (
  `programme_id` varchar(10) NOT NULL,
  `programme_name` varchar(100) NOT NULL,
  PRIMARY KEY (`programme_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programme`
--

LOCK TABLES `programme` WRITE;
/*!40000 ALTER TABLE `programme` DISABLE KEYS */;
INSERT INTO `programme` VALUES ('p1','MCA'),('p2','DS'),('p3','AI'),('p4','MSCI');
/*!40000 ALTER TABLE `programme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `schedule_id` int NOT NULL,
  `day` varchar(20) NOT NULL,
  `timeslot_id` int DEFAULT NULL,
  `class_id` int DEFAULT NULL,
  `faculty_id` int DEFAULT NULL,
  `programme_id` varchar(10) DEFAULT NULL,
  `subject_id` varchar(10) DEFAULT NULL,
  `engaged_flag` int DEFAULT NULL,
  `other_faculty` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `timeslot_id` (`timeslot_id`),
  KEY `class_id` (`class_id`),
  KEY `faculty_id` (`faculty_id`),
  KEY `programme_id` (`programme_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`timeslot_id`) REFERENCES `timeslot` (`timeslot_id`),
  CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`),
  CONSTRAINT `schedule_ibfk_3` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`),
  CONSTRAINT `schedule_ibfk_4` FOREIGN KEY (`programme_id`) REFERENCES `programme` (`programme_id`),
  CONSTRAINT `schedule_ibfk_5` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1001,'Monday',9,1002,107,'p1','s4',0,NULL),(1002,'Monday',9,1001,103,'p1','s6',1,'Hanumant Redkar'),(1003,'Monday',9,1003,108,'p1','s5',1,NULL),(1004,'Monday',6,1008,107,'p1','s1',1,NULL),(1005,'Monday',7,1008,106,'p1','s2',1,NULL);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `subject_id` varchar(10) NOT NULL,
  `subject_name` varchar(100) NOT NULL,
  `subject_code` varchar(45) NOT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES ('s1','Web Development','CSA-207'),('s2','DBMS','CSA-508'),('s3','Machine Learning','CSA-509'),('s4','Web Development Lab','CSA-510'),('s5','DBMS Lab','CSA-511'),('s6','Machine Learning Lab','CSA-512'),('s7','Agile Methodology','CSA-527');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timeslot`
--

DROP TABLE IF EXISTS `timeslot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timeslot` (
  `timeslot_id` int NOT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  PRIMARY KEY (`timeslot_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeslot`
--

LOCK TABLES `timeslot` WRITE;
/*!40000 ALTER TABLE `timeslot` DISABLE KEYS */;
INSERT INTO `timeslot` VALUES (1,'09:30:00','10:30:00'),(2,'10:30:00','11:30:00'),(3,'11:30:00','12:30:00'),(4,'12:30:00','01:30:00'),(5,'01:30:00','02:30:00'),(6,'02:30:00','03:30:00'),(7,'03:30:00','04:30:00'),(8,'04:30:00','04:30:00'),(9,'09:30:00','01:30:00'),(10,'09:30:00','11:30:00'),(11,'10:30:00','12:30:00'),(12,'11:30:00','01:30:00'),(13,'12:30:00','02:30:00'),(14,'01:30:00','03:30:00'),(15,'02:30:00','04:30:00'),(16,'03:30:00','05:30:00');
/*!40000 ALTER TABLE `timeslot` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-10  9:49:49
