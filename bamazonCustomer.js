require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA
});

connection.connect(function(err) {
  if (err) throw err;
  inquirer
    .prompt([
      {
        message: "What item would you like to buy? (Enter the ITEM_ID #)",
        type: "input",
        name: "item_id"
      },
      {
        message: "How many units would you like to buy?",
        type: "input",
        name: "quantity"
      }
    ])
    .then(function(answers) {
      var query = "SELECT stock_quantity FROM products WHERE ?";
      var item_id = parseInt(answers.item_id);
      connection.query(query, { item_id: item_id }, function(err, data) {
        if (err) throw err;
        else if (data.length === 0) {
          console.log("No result from the DataBase");
        } else {
          if (data[0].stock_quantity < answers.quantity) {
            console.log("Insufficient quantity!");
          } else {
            var new_stock_quantity = data[0].stock_quantity - answers.quantity;
            connection.query(
              "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
              [new_stock_quantity, item_id],
              function(error, response) {
                if (err) throw err;
                // console.log(response);
                console.log("Purchase was successful!");
              }
            );
          }
        }
        connection.end();
      });
    });
});

function queryDataBase(query, params) {
  connection.query(query, params, function(err, data) {
    if (err) throw err;
    return data;
  });
}
