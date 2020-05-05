-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 29, 2020 at 07:40 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bughound`
--

-- --------------------------------------------------------

--
-- Table structure for table `bugs`
--

CREATE TABLE `bugs` (
  `bug_id` int(11) NOT NULL,
  `prog_id` int(11) NOT NULL,
  `area_id` int(11) NOT NULL,
  `severity` tinyint(4) NOT NULL,
  `problem_summary` varchar(64) NOT NULL,
  `reproducible` tinyint(1) NOT NULL,
  `problem` varchar(255) NOT NULL,
  `suggested_fix` varchar(255) NOT NULL,
  `reported_by` int(11) NOT NULL,
  `date` date NOT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `priority` tinyint(4) DEFAULT NULL,
  `resolution` tinyint(4) DEFAULT NULL,
  `resolution_version` varchar(32) DEFAULT NULL,
  `resolved_by` int(11) DEFAULT NULL,
  `resolved_date` date DEFAULT NULL,
  `tested_by` int(11) DEFAULT NULL,
  `tested_date` date DEFAULT NULL,
  `treat_as` tinyint(1) DEFAULT NULL,
  `report_type` tinyint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bugs`
--

INSERT INTO `bugs` (`bug_id`, `prog_id`, `area_id`, `severity`, `problem_summary`, `reproducible`, `problem`, `suggested_fix`, `reported_by`, `date`, `assigned_to`, `comments`, `status`, `priority`, `resolution`, `resolution_version`, `resolved_by`, `resolved_date`, `tested_by`, `tested_date`, `treat_as`, `report_type`) VALUES
(1001, 1008, 1030, 1, 'crashes2345', 0, 'crashes when pushing submit 2', 'null id2', 1010, '2020-05-16', 1011, 'fix it chris2', 1, 1, 1, '1', 1013, '2020-06-03', 1013, '2020-02-01', 1, 1),
(1002, 1012, 1047, 3, 'sfas2', 0, 'safd', 'dsfas', 1017, '2020-04-23', 1014, 'sdfafds4', 2, 5, 5, '2', 1019, '2020-04-12', 1018, '2020-04-30', 2, 5),
(1003, 1013, 1058, 3, 'safdf', 1, 'sfasd', 'dasfd', 1013, '2020-04-06', 1017, 'sdfasd', 2, 4, 7, '3', 1011, '2020-04-05', 1018, '2020-04-20', 1, 2),
(1004, 1008, 1030, 1, 'ilksjdfal', 1, 'sdljfaldk', 'kf;sldfk', 1010, '2020-04-08', 1010, 'gsfda', 1, 1, 1, '1', 1010, '2020-04-14', 1010, '2020-04-13', 1, 4),
(1005, 1008, 1032, 3, 'qqq', 0, 'qq', 'qqqq', 1010, '2020-04-02', 1016, 'dsfs', 1, 3, 5, '2', 1015, '2020-04-30', 1015, '2020-04-13', 2, 5),
(1006, 1008, 1030, 1, 'dfd', 1, 'dfdfa', 'fdfas', 1010, '2020-04-09', 1011, 'cvasd', 1, 2, 4, '3', 1011, '2020-04-08', 1011, '2020-04-30', 1, 2),
(1007, 1015, 1066, 3, 'qq', 1, 'qq', 'qq', 1010, '2020-04-10', 1010, 'qq', 1, 2, 2, '1', 1011, '2020-04-10', 1011, '2020-04-15', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bugs`
--
ALTER TABLE `bugs`
  ADD PRIMARY KEY (`bug_id`,`prog_id`,`area_id`),
  ADD KEY `prog_id` (`prog_id`),
  ADD KEY `area_id` (`area_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bugs`
--
ALTER TABLE `bugs`
  MODIFY `bug_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1008;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bugs`
--
ALTER TABLE `bugs`
  ADD CONSTRAINT `prog_id` FOREIGN KEY (`prog_id`) REFERENCES `programs` (`prog_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
