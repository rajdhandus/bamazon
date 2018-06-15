USE bamazon;

CREATE TABLE departments(
    department_id INTEGER(4) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs INTEGER(10) NOT NULL,
    product_sales DECIMAL(20,2) NOT NULL,
    total_profit DECIMAL(20,2) NOT NULL,
    PRIMARY KEY(department_id)
);


INSERT into departments (department_name,over_head_costs,product_sales,total_profit) 
VALUES ("tools", 1000, 1234.0, 1234.0), 
("appliances", 1000, 1234.0, 1234.0), 
("lighting", 1000, 1234.0, 1234.0), 
("heating & cooling", 1000, 1234.0, 1234.0), 
("outdoor living", 1000, 1234.0, 1234.0);