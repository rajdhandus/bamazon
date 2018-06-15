DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(20,2) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
product_sales DECIMAL(20,2) NOT NULL,
PRIMARY KEY(item_id)
);


INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) 
VALUES ("hammer", "tools", 21.43, 80, 0.0),
 ("nails", "tools", 1.23, 120,0.0),
 ("refrigerator", "appliances", 1799.95, 20, 0.0),
 ("washing machine", "appliances", 455.00, 4, 0.0),
 ("chandelier", "lighting", 155.00, 90, 0.0),
 ("pendant lights", "lighting", 161.10, 3, 0.0),
 ("thermostats", "heating & cooling", 45.00, 120, 0.0),
 ("air purifiers", "heating & cooling", 345.87, 125, 0.0),
 ("switches", "electrical", 25.00, 245, 0.0),
 ("wire connectors","electrical",6.27, 999, 0.0),
 ("protectors","electrical", 12.00, 564, 0.0);
