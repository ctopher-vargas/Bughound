-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2020 at 04:18 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bugout`
--

-- --------------------------------------------------------

--
-- Table structure for table `areas`
--

CREATE TABLE `areas` (
  `area_id` int(11) NOT NULL,
  `prog_id` int(11) NOT NULL,
  `area` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `areas`
--

INSERT INTO `areas` (`area_id`, `prog_id`, `area`) VALUES
(1081, 1047, 'Ada95 Parser'),
(1082, 1047, 'Ada95 Lexer'),
(1083, 1047, 'Ada95 IDE'),
(1084, 1048, 'logon'),
(1085, 1048, 'start'),
(1086, 1048, 'db maintenance'),
(1087, 1048, 'search'),
(1088, 1048, 'insert new'),
(1089, 1048, 'search results'),
(1090, 1048, 'add edit areas'),
(1091, 1048, 'add employees'),
(1092, 1048, 'add programs'),
(1093, 1049, 'lexer'),
(1094, 1049, 'parser'),
(1095, 1049, 'code generator'),
(1096, 1049, 'linker'),
(1097, 1050, 'lexer'),
(1098, 1050, 'parser'),
(1099, 1050, 'code generator'),
(1100, 1050, 'linker'),
(1101, 1051, 'Lexer '),
(1102, 1051, 'Parser'),
(1103, 1051, 'Code generator'),
(1104, 1051, 'linker'),
(1105, 1051, 'ide'),
(1106, 1052, 'lexer'),
(1107, 1052, 'parser'),
(1108, 1052, 'code generator'),
(1109, 1052, 'linker'),
(1110, 1052, 'ide'),
(1111, 1053, 'editor'),
(1112, 1053, 'spell checker'),
(1113, 1053, 'dynodraw'),
(1114, 1053, 'formulator'),
(1116, 1048, 'view bugs'),
(1117, 1048, 'export');

-- --------------------------------------------------------

--
-- Table structure for table `bugs`
--
-- Error reading structure for table bugout.bugs: #1033 - Incorrect information in file: '.\bugout\bugs.frm'
-- Error reading data for table bugout.bugs: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'FROM `bugout`.`bugs`' at line 1

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `emp_id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `userlevel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`emp_id`, `name`, `username`, `password`, `userlevel`) VALUES
(1005, 'Chris Vargas', 'chris', '123', 3),
(1021, 'alex nassif', 'alex', '123', 1),
(1028, 'Bob', 'smithbob', '123', 3),
(1029, 'Sue', 'jonessue', '123', 2),
(1030, 'Habib', 'smithhabib', '123', 2),
(1031, 'Yoshi', 'jonesyoshi', '123', 3),
(1032, 'Francois', 'smithfrancois', '123', 2),
(1033, 'Becky', 'jonesbecky', '123', 1),
(1034, 'Felix', 'smithfelix', '123', 2);

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--
-- Error reading structure for table bugout.programs: #1932 - Table 'bugout.programs' doesn't exist in engine
-- Error reading data for table bugout.programs: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'FROM `bugout`.`programs`' at line 1

--
-- Indexes for dumped tables
--

--
-- Indexes for table `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`area_id`),
  ADD KEY `foreign_key` (`prog_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`emp_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `areas`
--
ALTER TABLE `areas`
  MODIFY `area_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1118;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1035;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `areas`
--
ALTER TABLE `areas`
  ADD CONSTRAINT `foreign_key` FOREIGN KEY (`prog_id`) REFERENCES `programs` (`prog_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
