-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: npa
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (5,'Gened'),(2,'Humanities'),(1,'Information Technology'),(3,'Mathematics and Science'),(4,'Social Sciences');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  `sheet_id` int NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `'fk_comment_user_user_id'_idx` (`user_id`),
  KEY `'fk_comment_shhet_sheet_id'_idx` (`sheet_id`),
  CONSTRAINT `'fk_comment_shhet_sheet_id'` FOREIGN KEY (`sheet_id`) REFERENCES `sheet` (`sheet_id`),
  CONSTRAINT `'fk_comment_user_user_id'` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `major`
--

DROP TABLE IF EXISTS `major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `major` (
  `major_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`major_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `major`
--

LOCK TABLES `major` WRITE;
/*!40000 ALTER TABLE `major` DISABLE KEYS */;
INSERT INTO `major` VALUES (2,'BIT'),(3,'DSBA'),(1,'IT');
/*!40000 ALTER TABLE `major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sheet`
--

DROP TABLE IF EXISTS `sheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sheet` (
  `sheet_id` int NOT NULL AUTO_INCREMENT,
  `file` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`sheet_id`),
  KEY `'fk_user_id'_idx` (`user_id`),
  KEY `'fk_sheet_category_category_id'_idx` (`category_id`),
  CONSTRAINT `'fk_sheet_category_category_id'` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `'fk_sheet_user_user_id'` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sheet`
--

LOCK TABLES `sheet` WRITE;
/*!40000 ALTER TABLE `sheet` DISABLE KEYS */;
INSERT INTO `sheet` VALUES (9,'uploads\\1684218229625.pdf','Math','2023-05-10 06:23:49',1,3),(10,'uploads\\1684223555643.pdf','Java Final 2023','2023-05-16 07:52:35',1,1);
/*!40000 ALTER TABLE `sheet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `student_no` varchar(8) NOT NULL,
  `information` text,
  `major_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `student_no_UNIQUE` (`student_no`),
  KEY `'fk_student_user_user_id'_idx` (`user_id`),
  CONSTRAINT `'fk_student_user_user_id'` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'63070021','Hello World\nSawatdee\nNihao',1,1),(2,'63070037','',1,2),(3,'63070022',NULL,2,5),(4,'63070034',NULL,3,6);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `token_id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`token_id`),
  UNIQUE KEY `token_UNIQUE` (`token`),
  KEY `'fk_user_id'_idx` (`user_id`),
  CONSTRAINT `'fk_token_user_user_id'` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (34,'k4dQmKI5PZEXqufQbaO3eMxcaRvQNCCu',1);
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','student') NOT NULL DEFAULT 'student',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'jeeraphat','sakulsubwattana','63070021@it.kmitl.ac.th','$2b$10$leUV00qct0SSEcPq/yEokeoGieQJ1nFuBrQiP4AULK0t79EVJ4LK2','student'),(2,'Chinatip','Chanpong','63070037@it.kmitl.ac.th','$2b$10$6MetO53AqEioAHfO5EsBAOq.9Nx4nJ37a.XmtMYxqGMVBvrJshuku','student'),(3,'Admin','Admin','admin@admin.com','$2b$10$6MetO53AqEioAHfO5EsBAOq.9Nx4nJ37a.XmtMYxqGMVBvrJshuku','admin'),(5,'Jutamas','Chana','63070022@it.kmitl.ac.th','$2b$10$7fs//K4V3nYiz89GlKbBf.lRmlVvvFiRojLBK/qN4bkr4u4wmzY8.','student'),(6,'Chairawich','Iam','63070034@it.kmitl.ac.th','$2b$10$PT.fVOR723HuJWcBHM3mNuXI0TvFDjNhhVRMnhZxmYCAcDXLkECYa','student');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-16 15:04:27
