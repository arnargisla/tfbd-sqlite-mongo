import sqlite3

conn = sqlite3.connect('northwind.db')

#Specify the encoding so that special characters are displayed.
conn.text_factory = lambda x: str(x, 'iso-8859-1')

c = conn.cursor()

for row in c.execute('''SELECT Orders.OrderID FROM Orders INNER JOIN "Order Details"
                     ON Orders.OrderID = "Order Details".OrderID WHERE Orders.CustomerID = "ALFKI"
                     GROUP BY "Order Details".OrderID
                     HAVING COUNT("Order Details".ProductID) >= 2'''):
    print(row)
