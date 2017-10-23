// usage: mongo [--quiet] Northwind filename.js
// Note: This script depends on the result from example 1

// Create a collection for the result of ex2 
var resultCollection = db.ex2ResultCollection
// Make sure it is empty
resultCollection.drop()

// Find all the orders from ex1 that have more than 1 type
// of product
var orderIds = db.ex1ResultCollection.aggregate([
  // The records are grouped by the OrderID attribute. In each group
  // a 'total' attribute is added which holds information about 
  // how many records had the same OrderID as the group record
  { "$group": { "_id": "$OrderID", "total": { "$sum": 1 } } },
  // With $match the results are filtered so that only records
  // that have 'total' greater than 1 are allowed.
  { "$match": { "total": { "$gt": 1 }}}
]).toArray().map(function(record){
  // Only return the "_id" attribute, which corresponds to OrderID
  return record["_id"]
})

// Add all the orders from ex1 that have ids in orderIds
db.ex1ResultCollection.find({ "OrderID": { "$in": orderIds } }).forEach(function(record){
  resultCollection.insert(record)
})

// Print the result
resultCollection.find().forEach(function(record){
  print(record.OrderID, record.ProductID, record.ProductName)
});
