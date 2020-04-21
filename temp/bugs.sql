-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 01, 2020 at 07:24 AM
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
  `treat_as` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  MODIFY `bug_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bugs`
--
ALTER TABLE `bugs`
  ADD CONSTRAINT `area_id` FOREIGN KEY (`area_id`) REFERENCES `areas` (`area_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prog_id` FOREIGN KEY (`prog_id`) REFERENCES `programs` (`prog_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
