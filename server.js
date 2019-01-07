// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var logger = require("morgan");

//All models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
var models = require("./models");

//Set Port
var PORT = process.env.PORT || 3000;

//Initialize Express
var app = express();

// Import routes
var router = express.Router();

//Require routes
require("./config/routes")(router);

// Middleware

app.use(router);
//Use Morgan logger for logging requests
app.use(logger('dev'));
//Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");



//Set MongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newScrapper-TheChampion";

// Connect to the Mongo DB
mongoose.connect( MONGODB_URI, { useNewUrlParser: true });


// Set the app to listen on port 3000
app.listen(PORT, function() {
  console.log("App running at: http://localhost:3000/");
});

