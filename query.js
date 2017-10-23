function get_results(result) {
  print(tojson(result));
}

var orderDetails = db["order-details"]

var applicableOrderIds = db.orders.find({
  "CustomerID": "ALFKI"
},{
  "OrderID":1, "_id":0
}).toArray().map(
  function(record) { return record["OrderID"] }
);

var resultCollection = db.orderIdProductIdProductName
db.orderIdProductIdProductName.drop()

var orderIdsProductIds = orderDetails.find({
  "OrderID": {
    "$in": applicableOrderIds
  },
},{
  "OrderID":1,
  "_id":0,
  "ProductID":1,
}).forEach(function(record) {
  var productName = db.products.find({
    ProductID: record.ProductID
  },
  {
    ProductName:1,
    "_id":0
  })[0].ProductName
  
  var newRec = {
    "OrderID": record.OrderID,
    "ProductID": record.ProductID,
    "ProductName": productName
  }
  resultCollection.insert(newRec)
})

// 2
var resultCollection = db.example2result
resultCollection.drop()
var orderIds = db.orderIdProductIdProductName.aggregate([
  { "$group": { "_id": "$OrderID", "total": { "$sum": 1 } } },
  { "$match": { "total": { "$gt": 1 }}}
]).toArray().map(function(record){
  return record["_id"]
})

db.orderIdProductIdProductName.find({ "OrderID": { "$in": orderIds } }).forEach(function(record){
  resultCollection.insert(record)
})

