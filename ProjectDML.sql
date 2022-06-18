
--get all attributes of Customers
SELECT * FROM Customers;

--remove cutomer with the id
DELETE FROM Customers WHERE customerID = :customerID

--add new customer
INSERT INTO Customers(customerID, fname, lname)
VALUES(:customerID, :fname, :lname)

--get all attributes of Employees
SELECT * FROM Employees;

--remove Employee 
DELETE FROM Employees where employeeID = :employeeID

--add new Employee into the list
INSERT INTO Employees(fname, lname, position, phoneNumber)
VALUES(:fname, :lname, :position, :phoneNumber)

--email, phone number
SELECT * FROM Accounts;

--insert account information of email and address
--connects to customer takes the customerID
INSERT INTO Acounts(accountID, customerID, email, address)
VALUES(:accountID, :customerID, :email, :address)

--get all attributes from Items
SELECT * FROM Items;

--insert new item
INSERT INTO Items(itemID, name, price)
VLAUES(:itemID, :name, :price)

--update Item information
UPDATE Items
SET name= :name, price= :price
WHERE itemID = :itemID;

--delete item
DELETE FROM Items where itemID = :itemID

--get all attributes from Orders
SELECT * FROM Orders;

--insert new order
INSERT INTO Orders(orderID, totalPrice, customerID, employeeID)
VALUES(:orderID, :totalPrice, :customerID, :employeeID)

--delete order
DELETE FROM Orders where orderID = :orderID

--get all atributes from PurchaceOrdsrs
SELECT * FROM PurchaseOrders;

--delete Purchase Order 
DELETE FROM PurchaseOrders where orderID = Orders:orderID

--search for a Purchase Order
SELECT * FROM PurchaseOrders
WHere orderID = :orderID;
