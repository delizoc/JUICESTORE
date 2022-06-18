-- --------------------------------------------------------
--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
CREATE TABLE `Customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Customers`
--

INSERT INTO `Customers` (`customerID`,`fname`, `lname`) VALUES
(123,'Jess', 'Do'),
(124,'Lette', 'Smith'),
(125,'Joe', 'Smith');
-- --------------------------------------------------------
--
-- Table structure for table `Employees`
--
DROP TABLE IF EXISTS `Employees`;
CREATE TABLE `Employees` (
  `employeeID` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` (`employeeID`,`fname`, `lname`,`position`, `phoneNumber`) VALUES
(1,'Jessica', 'Douangphachanh', 'Supervisor', '206-555-1842'),
(2,'Colette', 'DeLizo', 'Associate', '425-248-1873'),
(3,'Micheal', 'McGrath', 'Associate', '509-843-2342');


-- --------------------------------------------------------
--
-- Table structure for table `Accounts`
--
DROP TABLE IF EXISTS `Accounts`;
CREATE TABLE `Accounts` (
  `accountID` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `customerID` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255),
  CONSTRAINT `fk_accounts_customerID` FOREIGN KEY (`customerID`) REFERENCES `Customers`(`customerID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Accounts`
--

INSERT INTO `Accounts` (`accountID`,`customerID`, `email`, `address`) VALUES
(10,(SELECT `customerID` from `Customers` where `fname` = 'Jess' and `lname` = 'Do'), 'jdo@gmail.com', '1419 12th Ave E Seattle WA 98102'),
(20,(SELECT `customerID` from `Customers` where `fname` = 'Lette' and `lname` = 'Smith'), 'lsmith@gmail.com', '1212 15th Ave W Lynnwood WA 98036'),
(30,(SELECT `customerID` from `Customers` where `fname` = 'Joe' and `lname` = 'Smith'), 'jsmith@gmail.com', '1582 201st PL SW Everett WA 9845');


-- --------------------------------------------------------
--
-- Table structure for table `Items`
--
DROP TABLE IF EXISTS `Items`;
CREATE TABLE `Items` (
  `itemID` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `price` decimal(4,2) NOT NULL,
  KEY `idx_fk_price` (`price`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Items`
--

INSERT INTO `Items` (`itemID`, `name`, `price`) VALUES
(12, 'Orange', 1.75),
(22, 'Mango', 2.50),
(32, 'Strawberry', 3.00),
(42, 'Banana', 1.50),
(52, 'Kiwi', 3.75);

-- --------------------------------------------------------
--
-- Table structure for table `Orders`
--
DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
  `orderID` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `customerID` int,
  `employeeID` int,
  CONSTRAINT `fk_orders_cid` FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_eid` FOREIGN KEY (`employeeID`) REFERENCES `Employees` (`employeeID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`orderID`, `customerID`, `employeeID`) VALUES
(100, (SELECT `customerID` from `Customers` where `fname` = 'Jess' and `lname` = 'Do'),(SELECT `employeeID` from `Employees` where `fname` = 'Jessica')),
(101, (SELECT `customerID` from `Customers` where `fname` = 'Lette' and `lname` = 'Smith'),(SELECT `employeeID` from `Employees` where `fname` = 'Jessica')),
(102, (SELECT `customerID` from `Customers` where `fname` = 'Joe' and `lname` = 'Smith'),(SELECT `employeeID` from `Employees` where `fname` = 'Micheal'));

-- --------------------------------------------------------
--
-- Table structure for table `PurchaseOrders`
--
DROP TABLE IF EXISTS `PurchaseOrders`;
CREATE TABLE `PurchaseOrders` (
  `orderID` int(11) NOT NULL,
  `itemID` int(11) NOT NULL,
  PRIMARY KEY (`orderID`,`itemID`),
  FOREIGN KEY (`orderID`) REFERENCES `Orders` (`orderID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`itemID`) REFERENCES `Items` (`itemID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

--
-- Dumping data for table `Orders`
--

INSERT INTO `PurchaseOrders` (`orderID`, `itemID`) VALUES
((SELECT `orderID` from `Orders` where `orderID` = 100),(SELECT `itemID` FROM `Items` where `itemID` = 42)),
((SELECT `orderID` from `Orders` where `orderID` = 101),(SELECT `itemID` FROM `Items` where `itemID` = 52)),
((SELECT `orderID` from `Orders` where `orderID` = 102),(SELECT `itemID` FROM `Items` where `itemID` = 22));
-- --------------------------------------------------------
