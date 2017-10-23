import sqlite3

conn = sqlite3.connect('northwind.db')

#Specify the encoding so that special characters are displayed.
conn.text_factory = lambda x: str(x, 'iso-8859-1')

c = conn.cursor()

#Drop the view if it already exists
c.execute('DROP VIEW IF EXISTS ALFKIIds')

#Create a view that is a table with two columns which contain
#the product ids and the order ids of the products customer ALFKI has ordered
c.execute('''
CREATE VIEW ALFKIIds AS SELECT "Order Details".OrderID,"Order Details".ProductID from
Orders INNER JOIN "Order Details" ON Orders.OrderID = "Order Details".OrderID 
WHERE Orders.CustomerID="ALFKI" ''')

#Select the order ID, product ID and product name of each product ALFKI has ordered
for row in c.execute('''
SELECT ALFKIIds.OrderID, Products.ProductID, Products.ProductName 
FROM ALFKIIds INNER JOIN Products ON ALFKIIds.ProductID = Products.ProductID'''):
    print(row)
