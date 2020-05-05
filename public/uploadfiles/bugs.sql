-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2020 at 07:57 PM
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
(1000, 1001, 1001, 3, 1, 'edited bug', 0, 'asfd asdf asd asd f', 'asdf asd fasd fasd f', 1000, '2020-04-16', 1000, '', 2, 1, 1, '1', 0, '0000-00-00', 0, '0000-00-00', 1),
(1001, 1001, 0, 4, 1, 'it isn\'t sorting in the right order ', 1, 'for some reason it isn\'t sorting properly in ascending order. it is sorting in descending order ', 'got to the function sort() and change inequality', 1000, '2020-04-16', 0, '', 1, 0, 0, '', 0, '0000-00-00', 0, '0000-00-00', 1),
(1002, 1001, 1002, 3, 3, 'asdfa', 1, 'asdf a asdf as', ' asdfa asd asdf asd a', 1000, '2020-04-16', 1000, 'asdf a sdf', 1, 3, 0, '', 0, '0000-00-00', 0, '0000-00-00', 1),
(1003, 1001, 0, 3, 3, 'sadfs ', 0, ' asd f', 'asd f asd', 1000, '2020-04-21', 0, '', 1, 0, 0, '', 0, '0000-00-00', 0, '0000-00-00', 1),
(1004, 1001, 0, 2, 1, 'asd f', 0, 'asd f', 'asd f', 1000, '2020-04-17', 0, '', 1, 0, 0, '', 0, '0000-00-00', 0, '0000-00-00', 1),
(1005, 1001, 1003, 5, 3, 'asdfasd as asd sad ', 1, ' asd  asdf asd as fas ', 'as dasd asd ad a sdaa sdf', 1000, '2020-04-17', 1000, 'asd sad asd ', 2, 4, 4, '3', 1000, '2020-04-22', 1000, '2020-04-23', 1),
(1006, 1001, 0, 5, 3, 'hhjj hjh jh jh ', 1, 'jlk;jlk;j lkj kl;j ;l ', 'kjl;j kl;j ;lkj ;lkj l;kj ;l ', 1000, '2020-04-19', 0, '', 1, 0, 0, '', 0, '0000-00-00', 0, '0000-00-00', 2),
(1007, 1001, 1001, 1, 1, 'asdf asdf asdasd a', 1, 'asd fasdasd fasdf asdf asdf ', 'asd fasd fasd fasd fasdf', 1000, '2020-04-19', 1000, 'a sdasdfasd asd asdasdf', 1, 1, 1, '1', 1000, '2020-04-20', 1000, '2020-04-20', 1),
(1008, 1001, 1001, 1, 1, 'sadff', 1, 'sadf', 'sadf', 1000, '2020-04-19', 1000, 'sadf', 1, 1, 1, '1', 1000, '2020-04-20', 1000, '2020-04-20', 1),
(1009, 1008, 1023, 4, 3, 'Ada isn\'t workingz', 0, 'I tried to make it work and it still doesn\'t work and I\'m at my wits end \r\n', 'switch to another language', 1013, '2020-04-28', 1009, '', 1, 1, 5, '1', 1012, '2020-04-28', 1013, '2020-04-28', 1),
(1010, 1009, 0, 2, 3, 'this aint working', 1, 'problem ', 'please suggest me a fix ', 1008, '2020-04-29', 0, '', 1, 0, 0, '--', 0, '0000-00-00', 0, '0000-00-00', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bugs`
--
ALTER TABLE `bugs`
  ADD PRIMARY KEY (`bug_id`,`prog_id`),
  ADD KEY `prog_id` (`prog_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bugs`
--
ALTER TABLE `bugs`
  MODIFY `bug_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1011;

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
