// usage: mongo [--quiet] Northwind filename.js
// Note: This script depends on the result from example 1

var resultCollection = db.example2result
resultCollection.drop()
var orderIds = db.ex1ResultCollection.aggregate([
  { "$group": { "_id": "$OrderID", "total": { "$sum": 1 } } },
  { "$match": { "total": { "$gt": 1 }}}
]).toArray().map(function(record){
  return record["_id"]
})

db.orderIdProductIdProductName.find({ "OrderID": { "$in": orderIds } }).forEach(function(record){
  resultCollection.insert(record)
})

db.resultCollection.find().forEach(function(record){
  print(record.OrderID, record.ProductID, record.ProductName)
});
