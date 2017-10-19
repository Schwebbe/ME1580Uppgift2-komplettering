var express = require("express");
var pouchDB = require("pouchdb");
var bodyParser = require("body-parser");

/* Custom modules */
var getNasa = require("./custom_modules/get-nasa.js");

var app = express();

var dbName = "nasadb"; // Database name
exports.dbName;

var database = new pouchDB("http://localhost:5984/" + dbName); // Create database reference.

app.use(bodyParser.json()); //create parser for JSON
app.use(bodyParser.urlencoded({ extended: true })); //Create a parser for x-www-form-urlencoded.

getNasa();

/* CRUD-Operations */

//  GET.
app.get("/" + dbName, function(req, res) {
    database.allDocs({include_docs: true}).then(function(result) {
        res.jsonp(result.rows.map(function(item) {
            return item.doc;
        }));
    }, function(error) {
        res.status(400).send(error);
    });
});

// POST.

app.post("/" + dbName, function(req, res) {
    database.post(req.body).then(function(result) {
        res.send(console.log(""));
        res.end();
    }, function(error) {
        res.status(400).send(error);
    });
});




app.listen(3000);
console.log("Server is running on port 3000");