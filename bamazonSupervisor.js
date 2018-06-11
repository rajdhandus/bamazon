var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");
require("dotenv").config();

var table = new Table({
  head: [
    "department_id",
    "department_name",
    "over_head_costs",
    "product_sales",
    "total_profit"
  ]
});

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA
});

inquirer
  .prompt([
    {
      message: "What would you like to do?",
      type: "list",
      name: "option",
      choices: ["View Product Sales by Department", "Create New Department"]
    }
  ])
  .then(function(answer) {
    console.log(answer);
    if (answer.option === "View Product Sales by Department") {
      viewProductSales();
    } else if (answer.option === "Create New Department") {
      createNewDepartment();
    }
  });

function viewProductSales() {
  connection.query("SELECT * FROM departments", function(err, response) {
    if (err) throw err;
    for (var i = 0; i < response.length; i++) {
      var row = [];
      row.push(response[i].department_id);
      row.push(response[i].department_name);
      row.push(response[i].over_head_costs);
      row.push(response[i].product_sales);
      row.push(response[i].total_profit);
      table.push(row);
    }
    console.log(table.toString());
  });
  connection.end();
}

function createNewDepartment() {
  inquirer
    .prompt([
      {
        message: "What is the department name?",
        type: "input",
        name: "department_name"
      },
      {
        message: "What is the over head costs?",
        type: "input",
        name: "over_head_costs"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO departments (department_name, over_head_costs, product_sales,total_profit) VALUES(?,?,0.0,0.0)",
        [answer.department_name, answer.over_head_costs],
        function(err, data) {
          if (err) throw err;
          console.log("New department created!");
          connection.end();
        }
      );
    });
}
