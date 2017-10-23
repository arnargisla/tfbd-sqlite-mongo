import sqlite3

conn = sqlite3.connect('northwind.db')

#Specify the encoding so that special characters are displayed.
conn.text_factory = lambda x: str(x, 'iso-8859-1')

c = conn.cursor()

#Drop the view if it already exists
c.execute('DROP VIEW IF EXISTS ALFKIProductIds')

#Create a view that is a table with one column, the product ids of the products custoemr ALFKI has ordered
c.execute('''CREATE VIEW ALFKIProductIds AS SELECT "Order Details".ProductID from
Orders INNER JOIN "Order Details" ON Orders.OrderID = "Order Details".OrderID WHERE Orders.CustomerID="ALFKI" ''')

#Select and print out the product ID and product name of each product customer ALFKI has ordered
for row in c.execute('SELECT Products.ProductID, Products.ProductName FROM ALFKIProductIds INNER JOIN Products ON ALFKIProductIds.ProductID = Products.ProductID'):
    print(row)
    
