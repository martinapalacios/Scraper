// Dependencies
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");

// Requiring our Note and Article models
var Note = require("./models/Note");
var Article = require("./models/Article");

// Requiring our routes
var routes = require("./routes/index");
var articles = require("./routes/articles");

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Init app
var app = express();

// View Engine
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use morgan
app.use(logger("dev"));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/ljabids", {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/", routes);
app.use("/articles", articles);

// Set Port
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});
