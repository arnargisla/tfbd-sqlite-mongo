// usage: mongo --quiet Northwind filename.js

db.ex3ResultCollection.drop();

db.employees.find().forEach(function(employee){
  var newRecord = {
    "FirstName": employee.FirstName,
    "LastName": employee.LastName,
    "Title": employee.Title,
    "TotalRevenue": findTotalRevenueForEmployee(employee.EmployeeID)
  }
  if(newRecord.TotalRevenue > 100000){
    db.ex3ResultCollection.insert(newRecord);
  }
});

function findTotalRevenueForEmployee(employeeId){
  var revenue = 0;
  findEmployeeOrders(employeeId).forEach(function(order){
    revenue += findTotalOrderValue(order.OrderID);
  });
  return revenue;
}

function findEmployeeOrders(employeeId){
  return db.orders.find({EmployeeID: employeeId});
}

function findTotalOrderValue(orderId){
  var value = 0;
  findOrderOrderDetails(orderId).forEach(function(orderDetails){
    value += findOrderDetailsValue(orderDetails);
  });
  return value;
}

function findOrderDetailsValue(orderDetails){
  var quantity = orderDetails.Quantity;
  var product = db.products.findOne({ProductID: orderDetails.ProductID});
  var unitPrice = product.UnitPrice;
  return quantity * unitPrice;
}

function findOrderOrderDetails(orderId){
  return db["order-details"].find({OrderID: orderId});
}

db.ex3ResultCollection.find().sort({"TotalRevenue":-1}).forEach(function(employee){
  print(
      employee.FirstName,
      employee.LastName,
      employee.Title, 
      employee.TotalRevenue);
});
