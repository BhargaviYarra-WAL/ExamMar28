var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//const mongoose = require("mongoose");
var mysqlRouter = require("./routes/mysql");
var indexRouter = require("./routes/index");
var cookieRouter = require("./routes/cookie");
var mysqlpoolRouter = require("./routes/mysqlpool");
var categoryRoute = require("./routes/category");
var dishesRoute = require("./routes/dishes");
var carsqlRoute = require("./routes/carsqlpool");

var app = express();
{
  /*
let mongoConnUrl = "mongodb://localhost/westsidenode";
mongoose.connect(mongoConnUrl, { useNewUrlParser: true });
let db = mongoose.connection;
db.on("error", function (error) {
  console.log("unable to connect to mongoDB");
  console.log(error);
});
db.on("open", function () {
  console.log("we are connected to mongodb server via mongoose");
});*/
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/index", indexRouter);
app.use("/cookie", cookieRouter);
app.use("/mysql", mysqlRouter);
app.use("/mysqlpool", mysqlpoolRouter);
app.use("/category", categoryRoute);
app.use("/dishes", dishesRoute);
app.use("/carsqlpool", carsqlRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
