-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2014 at 03:59 PM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `accessory`
--

CREATE TABLE IF NOT EXISTS `accessory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `length` varchar(100) NOT NULL,
  `in_stock` int(100) NOT NULL,
  `in_use` int(100) NOT NULL,
  `department` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `accessory`
--

INSERT INTO `accessory` (`id`, `category`, `type`, `length`, `in_stock`, `in_use`, `department`) VALUES
(1, 'cable', 'ethernet', '8ft', 3, 5, 'IS'),
(2, 'Mouse', 'laser', '6ft', 4, 10, 'IS');

-- --------------------------------------------------------

--
-- Table structure for table `drum_amount`
--

CREATE TABLE IF NOT EXISTS `drum_amount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(200) NOT NULL,
  `amount` int(200) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `drum_amount`
--

INSERT INTO `drum_amount` (`id`, `model`, `amount`, `date`) VALUES
(1, 'Drum', 18, '2013-07-19'),
(2, 'undefined', 2, '2014-02-25');

-- --------------------------------------------------------

--
-- Table structure for table `paper`
--

CREATE TABLE IF NOT EXISTS `paper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `stock` int(11) NOT NULL,
  `department` varchar(50) NOT NULL,
  `timestamp` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `paper`
--

INSERT INTO `paper` (`id`, `type`, `stock`, `department`, `timestamp`) VALUES
(1, 'Type', 0, 'Department', '0000-00-00'),
(2, 'Type', 0, 'Department', '0000-00-00'),
(3, 'Type', 0, 'Department', '0000-00-00'),
(4, 'Type', 0, 'Department', '0000-00-00'),
(5, 'Type', 0, 'Department', '0000-00-00'),
(6, 'Type', 0, 'Department', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `printer`
--

CREATE TABLE IF NOT EXISTS `printer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `network` varchar(150) NOT NULL,
  `branch` varchar(100) NOT NULL,
  `desk` varchar(100) NOT NULL,
  `ip` varchar(50) NOT NULL,
  `toner_type` varchar(50) NOT NULL,
  `drum_type` varchar(50) NOT NULL,
  `toner_replaced` date NOT NULL,
  `drum_replaced` date NOT NULL,
  `toner_amount` int(100) NOT NULL,
  `drum_amount` int(100) NOT NULL,
  `printer_amount` int(100) NOT NULL,
  `maintenance_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `printer`
--

INSERT INTO `printer` (`id`, `model`, `name`, `network`, `branch`, `desk`, `ip`, `toner_type`, `drum_type`, `toner_replaced`, `drum_replaced`, `toner_amount`, `drum_amount`, `printer_amount`, `maintenance_date`) VALUES
(1, 'Kyocera', 'R_1920_NA', 'DC03', 'Carterville', 'Carol', '10.0.0.56', 'FS1920', 'FS1920', '2014-02-20', '2014-02-20', 0, 0, 3, '2014-02-20'),
(2, '3', '4', '4', '2', '3', '2', '2', '2', '2014-04-08', '2014-04-08', 55, 55, 2, '2014-04-08');

-- --------------------------------------------------------

--
-- Table structure for table `server`
--

CREATE TABLE IF NOT EXISTS `server` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `hd` varchar(100) NOT NULL,
  `ram` varchar(100) NOT NULL,
  `os` varchar(100) NOT NULL,
  `version` varchar(100) NOT NULL,
  `ip` varchar(100) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `server`
--

INSERT INTO `server` (`id`, `name`, `model`, `hd`, `ram`, `os`, `version`, `ip`, `date`) VALUES
(1, 'Server1', 'c', 'e', 'g', 'i', 'k', '10.0.0.20', '2013-08-13'),
(2, 'Server2', 'd', 'f', 'h', 'j', 'l', '10.0.0.30', '2013-08-13');

-- --------------------------------------------------------

--
-- Table structure for table `software`
--

CREATE TABLE IF NOT EXISTS `software` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `version` varchar(200) NOT NULL,
  `keys` varchar(200) NOT NULL,
  `department` varchar(200) NOT NULL,
  `restriction` varchar(200) NOT NULL,
  `location` varchar(200) NOT NULL,
  `note` varchar(200) NOT NULL,
  `arch` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `toner_amount`
--

CREATE TABLE IF NOT EXISTS `toner_amount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(200) NOT NULL,
  `amount` int(200) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `toner_amount`
--

INSERT INTO `toner_amount` (`id`, `model`, `amount`, `date`) VALUES
(1, 'Toner', 18, '2013-07-19'),
(2, 'undefined', 2, '2014-02-25');

-- --------------------------------------------------------

--
-- Table structure for table `workstation`
--

CREATE TABLE IF NOT EXISTS `workstation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `hd` varchar(100) NOT NULL,
  `ram` varchar(100) NOT NULL,
  `version` varchar(100) NOT NULL,
  `ip` varchar(100) NOT NULL,
  `user` varchar(100) NOT NULL,
  `extension` varchar(100) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `workstation`
--

INSERT INTO `workstation` (`id`, `name`, `model`, `hd`, `ram`, `version`, `ip`, `user`, `extension`, `date`) VALUES
(1, 'Jordan', 'Lenovo', '750GB', '8GB', 'Windows 7', '10.0.0.140', 'jordan', '203', '0000-05-05');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
