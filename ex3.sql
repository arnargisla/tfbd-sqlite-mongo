SELECT Employees.FirstName, Employees.LastName, Employees.Title, SUM(OrderDetails.Quantity) * SUM(Products.UnitPrice) AS TotalRevenue
FROM Employees 
LEFT JOIN Orders 
ON Employees.EmployeeID=Orders.EmployeeID
JOIN "Order Details" AS OrderDetails
ON Orders.OrderID=OrderDetails.OrderID
JOIN Products
ON Products.ProductID=OrderDetails.ProductID
GROUP BY Employees.EmployeeID
HAVING TotalRevenue>10000000
ORDER BY TotalRevenue DESC
;

