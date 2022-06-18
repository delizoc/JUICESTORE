// index.js

/*
    SETUP
*/
const express = require('express');   // We are using the express library for the web server
const app     = express();            // We need to instantiate an express object to interact with the server in our code

var path = require('path');
app.set('port', 3000);
const HOSTNAME = process.env.HOSTNAME || 'localhost'


// Set up handlebars
const exp_handle = require('express-handlebars')
app.engine('handlebars', exp_handle())
app.set('views', path.join(__dirname, '../JUICESTORE/views'))
app.set('view engine', 'handlebars')
/*
    ROUTES
*/
app.use(express.static('public')); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require('./database/db-connector')

//GET
const getLatestOrder = 'SELECT orderID FROM Orders ORDER BY orderID DESC LIMIT 1;'


//DISPLAY
const displayAccounts = 'SELECT * FROM Accounts ORDER BY accountID;';
const displayCustomers = 'SELECT * FROM Customers ORDER BY customerID;';
const displayEmployees = 'SELECT * FROM Employees ORDER BY employeeID;';
const displayItems = 'SELECT * FROM Items ORDER BY itemID;';
const displayOrders = 'SELECT * FROM Orders ORDER BY orderID; ';
const displayPurchaseOrders= 'SELECT * FROM PurchaseOrders ORDER BY orderID;';
const displayTotalPrice = 'SELECT PurchaseOrders.orderID, SUM(Items.price) as total FROM PurchaseOrders INNER JOIN Items ON PurchaseOrders.itemID=Items.itemID GROUP BY orderID;';

//DELETE
const deleteAccount = 'DELETE FROM Accounts WHERE accountID = ?;';
const deleteCustomer = 'DELETE FROM Customers WHERE customerID = ?;';
const deleteEmployee = 'DELETE FROM Employees WHERE employeeID = ?;';
const deleteItem = 'DELETE FROM Items WHERE itemID = ?;';
const deleteOrder = 'DELETE FROM Orders WHERE orderID = ?;';
const deletePurchaseOrder = 'DELETE FROM PurchaseOrders WHERE orderID = ? AND itemID = ?;';

//UPDATE
const updateAccount = 'UPDATE Accounts SET customerID = ?, email = ?, address = ? WHERE accountID = ?;';
const updateCustomer = 'UPDATE Customers SET fname = ?, lname = ? WHERE customerID = ?;';
const updateEmployee = 'UPDATE Employees SET fname = ?, lname = ?, position = ?, phoneNumber = ? WHERE employeeID = ?;';
const updateItem = 'UPDATE Items SET name = ?, price = ? WHERE itemID = ?;';
const updateOrder = 'UPDATE Orders SET customerID = ?, employeeID = ? WHERE orderID = ?;';
const updatePurchaseOrder = 'UPDATE PurchaseOrders SET orderID = ?, itemID = ? WHERE orderID = ? AND itemID = ?;';

//INSERT
const insertAccount = 'INSERT INTO Accounts(customerID, email, address) VALUES(?,?,?);';
const insertCustomer = 'INSERT INTO Customers(fname, lname) VALUES(?,?);';
const insertEmployee = 'INSERT INTO Employees(fname, lname, position, phoneNumber) VALUES(?,?,?,?);';
const insertItem = 'INSERT INTO Items(name, price) VALUES(?,?);';
const insertOrder = 'INSERT INTO Orders(employeeID, customerID) VALUES(?,?);';


// Home Page
app.get('/',function(req,res,next){
    res.render('home');
});

// Accounts Page
app.get('/accounts',function(req,res,next){
    var context = {};
    db.pool.query(displayAccounts, function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.accountsResults = {rows: rows}
      db.pool.query(displayCustomers, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.custResults = {rows: rows}
        res.render('accounts', context);
        });
    });
});

app.post('/insert-Account', (req, res, next) =>{
    db.pool.query(insertAccount, [req.body.customerID, req.body.email, req.body.address], (err, result) => {
      if(err){
        next(err);
        return;
      }
      res.send(result);
    })
})
  
app.delete('/delete-Account',function(req,res,next){
    db.pool.query(deleteAccount, [req.body.accountID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
});
  
app.put('/update-Account',function(req,res,next){
    db.pool.query(updateAccount, [req.body.customerID, req.body.email, req.body.address, req.body.accountID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
});



// Customers Page
app.get('/customers',function(req,res,next){
    var context = {};
    db.pool.query(displayCustomers, function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
    context.customersResults = {rows: rows}
    res.render('customers', context);
    });
});
app.post('/insert-Customer', (req, res, next) =>{
    db.pool.query(insertCustomer, [req.body.fname, req.body.lname], (err, result) => {
      if(err){
        next(err);
        return;
      }
      res.send(result);
    })
})
  
app.delete('/delete-Customer',function(req,res,next){
    db.pool.query(deleteCustomer, [req.body.customerID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
});
  
app.put('/update-Customer',function(req,res,next){
    db.pool.query(updateCustomer, [req.body.fname, req.body.lname, req.body.customerID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
});


// Employees Page
app.get('/employees',function(req,res,next){
    var context = {};
    db.pool.query(displayEmployees, function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
    context.employeesResults = {rows: rows}
    res.render('employees', context);
    });
});
app.post('/insert-Employee', (req, res, next) =>{
    db.pool.query(insertEmployee, [req.body.fname, req.body.lname, req.body.position, req.body.phoneNumber], (err, result) => {
      if(err){
        next(err);
        return;
      }
      res.send(result);
    })
})
  
app.delete('/delete-Employee',function(req,res,next){
    db.pool.query(deleteEmployee, [req.body.employeeID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
});
  
app.put('/update-Employee',function(req,res,next){
    db.pool.query(updateEmployee, [req.body.fname, req.body.lname, req.body.position, req.body.phoneNumber, req.body.employeeID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
});





// Items Page
app.get('/items',function(req,res,next){
    var context = {};
    db.pool.query(displayItems, function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
    context.itemsResults = {rows: rows}
    res.render('items', context);
    });
});
app.post('/insert-Item', (req, res, next) =>{
    db.pool.query(insertItem, [req.body.name, req.body.price], (err, result) => {
      if(err){
        next(err);
        return;
      }
      res.send(result);
    })
})
  
app.delete('/delete-Item',function(req,res,next){
    db.pool.query(deleteItem, [req.body.itemID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
});
  
app.put('/update-Item',function(req,res,next){
    console.log("HI");
    db.pool.query(updateItem, [req.body.name, req.body.price, req.body.itemID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
});


// Orders Page
app.get('/Orders',function(req,res,next){
    var context = {};
    db.pool.query(displayOrders, function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
    context.ordersResults = {rows: rows}
      db.pool.query(displayCustomers, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
      context.custsResults = {rows: rows}
      db.pool.query(displayEmployees, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.empResults = {rows: rows}
        db.pool.query(displayItems, function(err, rows, fields){
          if(err){
            next(err);
            return;
          }
          context.itemResults = {rows: rows}
          db.pool.query(displayTotalPrice, function(err, rows, fields){
            if(err){
              next(err);
              return;
            }
            context.totalPriceResults = {rows: rows}
            res.render('orders', context);
          });
        });
      });
    });
  });
});

app.get('/orders-latest',function(req,res,next){
  var context = {};
  db.pool.query(getLatestOrder, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.latestRow = {rows: rows}
    res.json(context.latestRow);
  });
});

app.post('/insert-Order', (req, res, next) =>{
    db.pool.query(insertOrder, [req.body.employeeID, req.body.customerID], (err, result) => {
      if(err){
        next(err);
        return;
      }
      res.send(result);
    })
})
  
app.delete('/delete-Order',function(req,res,next){
    db.pool.query(deleteOrder, [req.body.orderID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
});
  
app.put('/update-Order',function(req,res,next){
  console.log(req.body)
    db.pool.query(updateOrder, [req.body.customerID, req.body.employeeID, req.body.orderID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
});


// PurchaseOrders Page
app.get('/purchaseOrders',function(req,res,next){
    var context = {};
    db.pool.query(displayPurchaseOrders, function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
    context.purchaseOrdersResults = {rows: rows}
    db.pool.query(displayItems, function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.itResults = {rows: rows}
      db.pool.query(displayOrders, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.ordResults = {rows: rows}
        res.render('purchaseOrders', context);
      });
    });
  });
});

app.post('/insert-PurchaseOrder', (req, res, next) =>{
  const {orderId, filteredItems} = req.body;
  let query = 'INSERT INTO PurchaseOrders(orderID, itemID) VALUES ';
  for(let id of filteredItems){
    query += `(${orderId},${id}),`;
  }
  const newQuery = query.replace(/.$/,";");
    db.pool.query(newQuery,(err, result) => {
      if(err){
        next(err);
        return;
      }
      res.json(result);
    })
  });
  
  app.delete('/delete-PurchaseOrder',function(req,res,next){
    db.pool.query(deletePurchaseOrder, [req.body.orderID, req.body.itemID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
  });
  
  app.put('/update-PurchaseOrder',function(req,res,next){
    db.pool.query(updatePurchaseOrder, [req.body.new_orderID, req.body.new_itemID, req.body.old_orderID, req.body.old_itemID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
  });

/*
    LISTENER
*/


// 404 and 500 routes
app.use(function(req,res){
    res.status(404);
    res.render("404");
  });
  
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render("500");
});

// path to server printed to console
app.listen(app.get('port'), function(){
  console.log(`Express started on http://${HOSTNAME}:${app.get('port')}; press Ctrl-C to terminate.`);
});