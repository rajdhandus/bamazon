require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA
});

inquirer
  .prompt([
    {
      message: "Welcome Store Manager! What do you want to do?",
      type: "list",
      name: "action",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    }
  ])
  .then(function(answer) {
    var action_chosen = answer.action;
    switch (action_chosen) {
      case "View Products for Sale":
        viewProducts();
        break;
      case "View Low Inventory":
        viewLowInventory();
        break;
      case "Add to Inventory":
        addToInventory();
        break;
      case "Add New Product":
        addNewProduct();
        break;
      default:
        break;
    }
  });

function viewProducts() {
  // console.log("viewProducts");
  executeSQL("SELECT * FROM products", "", function(err, sqlResult) {
    if (err) throw err;
    for (let i = 0; i < sqlResult.length; i++) {
      console.log("Item ID : " + sqlResult[i].item_id);
      console.log("Product Name : " + sqlResult[i].product_name);
      console.log("Department Name : " + sqlResult[i].department_name);
      console.log("Unit Price : " + sqlResult[i].price);
      console.log("Quantity Available : " + sqlResult[i].stock_quantity);
      console.log("****************************************************");
    }
  });
}

function viewLowInventory() {
  // console.log("viewLowInventory");
  executeSQL("SELECT * FROM products where stock_quantity < 5", "", function(
    err,
    sqlResult
  ) {
    if (err) throw err;
    for (let i = 0; i < sqlResult.length; i++) {
      console.log("Item ID : " + sqlResult[i].item_id);
      console.log("Product Name : " + sqlResult[i].product_name);
      console.log("Department Name : " + sqlResult[i].department_name);
      console.log("Unit Price : " + sqlResult[i].price);
      console.log("Quantity Available : " + sqlResult[i].stock_quantity);
      console.log("****************************************************");
    }
  });
}

function addToInventory() {
  // console.log("addToInventory");
  var item_number;
  var item_quantity;
  inquirer
    .prompt([
      {
        message: "Which item do you want to stock up on?",
        type: "input",
        name: "item_number"
      },
      {
        message: "How much inventory do you want to add?",
        type: "input",
        name: "item_quantity"
      }
    ])
    .then(function(answer) {
      console.log(answer);
      item_number = answer.item_number;
      item_quantity = answer.item_quantity;
      console.log("item_number :- " + item_number);
      console.log("item_quantity :- " + item_quantity);
      executeSQL(
        "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",
        [item_quantity, item_number],
        function(err, sqlResult) {
          if (err) throw err;
          console.log(sqlResult);
        }
      );
    });
}

function addNewProduct() {
  // console.log("addNewProduct");
  inquirer
    .prompt([
      {
        message: "What is the name of the product you would like to add?",
        type: "input",
        name: "product_name"
      },
      {
        message: "What is the department name for this product?",
        type: "input",
        name: "department_name"
      },
      {
        message: "What is the unit price for this product?",
        type: "input",
        name: "price"
      },
      {
        message: "How many units would you like to add to the inventory?",
        type: "input",
        name: "stock_quantity"
      }
    ])
    .then(function(answers) {
      console.log(answers);
      executeSQL(
        "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)",
        [
          answers.product_name,
          answers.department_name,
          answers.price,
          answers.stock_quantity
        ],
        function(err, data) {
          if (err) throw err;
          // console.log(data);
        }
      );
    });
}

function executeSQL(query, params, callBackAfterQuery) {
  connection.query(query, params, function(err, data) {
    callBackAfterQuery(err, data);
  });
  connection.end();
}
