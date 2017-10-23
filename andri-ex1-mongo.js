// usage: mongo --quiet Northwind filename.js

// Find the relevant ids
var orderIds = db.orders.find(
{
    "CustomerID": "ALFKI"
},
{
    "OrderID": 1,
    "_id": 0
}).toArray().map(function(r){return r["OrderID"]});


var orderDetailsIds = db["order-details"].find(
{
    "OrderID": {$in: orderIds}
},
{
    "OrderID": 1,
    "ProductID": 1,
    "_id": 0
}).toArray();

// Clear the database where the result will be stored
db.ex1ResultCollection.drop()

orderDetailsIds.forEach(function(record){
    db.ex1ResultCollection.insert({
        "OrderID": record.OrderID,
        "ProductID": record.ProductID,
        "ProductName": db.products.find(
            { "ProductID": record.ProductID },
            { "ProductName": 1, "_id":0 }
        ).toArray()[0].ProductName
    });
});

db.ex1ResultCollection.find().forEach(function(record){
  print(record.OrderID, record.ProductID, record.ProductName);
});
