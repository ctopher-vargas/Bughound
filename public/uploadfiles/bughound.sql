-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2020 at 05:17 AM
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
-- Database: `bughound`
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

-- --------------------------------------------------------

--
-- Table structure for table `bugs`
--

CREATE TABLE `bugs` (
  `bug_id` int(11) NOT NULL,
  `prog_id` int(11) NOT NULL,
  `area_id` int(11) DEFAULT NULL,
  `report_type` tinyint(6) NOT NULL,
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
-- Dumping data for table `bugs`
--

INSERT INTO `bugs` (`bug_id`, `prog_id`, `area_id`, `report_type`, `severity`, `problem_summary`, `reproducible`, `problem`, `suggested_fix`, `reported_by`, `date`, `assigned_to`, `comments`, `status`, `priority`, `resolution`, `resolution_version`, `resolved_by`, `resolved_date`, `tested_by`, `tested_date`, `treat_as`) VALUES
(1000, 1001, NULL, 1, 1, 'fdsghfdsgh sdfg', 1, 'asfd asdf asd asd f', 'asdf asd fasd fasd f', 1, '2020-04-16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
(1000, 'christopher vargas', 'topher', '123', 3);

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `prog_id` int(11) NOT NULL,
  `program` varchar(32) NOT NULL,
  `program_release` varchar(32) NOT NULL,
  `program_version` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`prog_id`, `program`, `program_release`, `program_version`) VALUES
(1001, 'heapsort', 'asdf', 'asdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`area_id`,`prog_id`),
  ADD KEY `prog_id` (`prog_id`);

--
-- Indexes for table `bugs`
--
ALTER TABLE `bugs`
  ADD PRIMARY KEY (`bug_id`,`prog_id`),
  ADD KEY `prog_id` (`prog_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`prog_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `areas`
--
ALTER TABLE `areas`
  MODIFY `area_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1001;

--
-- AUTO_INCREMENT for table `bugs`
--
ALTER TABLE `bugs`
  MODIFY `bug_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1001;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1006;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `prog_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1002;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `areas`
--
ALTER TABLE `areas`
  ADD CONSTRAINT `bug_prog_id` FOREIGN KEY (`prog_id`) REFERENCES `programs` (`prog_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bugs`
--
ALTER TABLE `bugs`
  ADD CONSTRAINT `prog_id` FOREIGN KEY (`prog_id`) REFERENCES `programs` (`prog_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
