// usage: mongo [--quiet] Northwind filename.js
var orderDetails = db["order-details"]

// Create a collection wherein the result will be stored.
var resultCollection = db.orderIdProductIdProductName
// Clear the data from the result collections
resultCollection.drop()

// Find the order ids for ALFKI
var applicableOrderIds = db.orders.find({
  "CustomerID": "ALFKI"
},{
  "OrderID":1, "_id":0
}).toArray().map(function(record) {
    return record["OrderID"] 
});

// Find all the product Ids for the products in the orders
// that correspond to the ids in applicableOrderIds
var orderIdsProductIds = orderDetails.find({
  "OrderID": {
    "$in": applicableOrderIds
  },
},{
  "OrderID":1,
  "_id":0,
  "ProductID":1,
})

// Populate the result collection with records containing
// the order id, product id and product names.
orderIdsProductIds.forEach(function(record) {
  // find the name that corresponds to the records
  // product id.
  var productName = db.products.findOne({
    ProductID: record.ProductID
  },
  {
    ProductName:1,
    "_id":0
  }).ProductName
  
  // Create a new record with the combined data
  var newRec = {
    "OrderID": record.OrderID,
    "ProductID": record.ProductID,
    "ProductName": productName
  }
  resultCollection.insert(newRec)
})

// Print the result
resultCollection.find({},{"_id":0}).forEach(function(record){
  print(record.OrderID, record.ProductID, record.ProductName)
})
