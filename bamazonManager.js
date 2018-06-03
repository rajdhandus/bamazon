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
  console.log("viewProducts");
  executeSQL("SELECT * FROM products", function(err, sqlResult) {
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
  console.log("viewLowInventory");
}

function addToInventory() {
  console.log("addToInventory");
}

function addNewProduct() {
  console.log("addNewProduct");
}

function executeSQL(query, callBackAfterQuery) {
  connection.query(query, function(err, data) {
    callBackAfterQuery(err, data);
  });
  connection.end();
}
