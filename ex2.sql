SELECT RelevantOrderIds.id, OrderIdsProductIds.ProductID, OrderIdsProductIds.ProductName FROM
  (
    SELECT Orders.OrderID AS id FROM Orders INNER JOIN "Order Details"
    ON Orders.OrderID = "Order Details".OrderID WHERE Orders.CustomerID = "ALFKI"
    GROUP BY "Order Details".OrderID
    HAVING COUNT("Order Details".ProductID) >= 2
  ) AS RelevantOrderIds
  JOIN
  (
    SELECT od.OrderID AS id, p.ProductID, p.ProductName FROM "Order Details" AS od JOIN "Products" as p
    ON od.ProductID=p.ProductID
  ) AS OrderIdsProductIds
  ON RelevantOrderIds.id=OrderIdsProductIds.id

;
