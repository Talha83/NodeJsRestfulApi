/*
 * Getting Started Instructions
 * 
 * 1) install dependencies by using ngp install
 * 2) install gulp -g (to be able to run it from Command line
 * 3) to start the server, run gulp instead of node command (e.g. gulp) 
 * it will monitor changes and restart the server itself!
 * 
 * For Unit Tests, use the following npm command (if it doesn't install itself): npm install gulp-mocha should sinon --save
*/

/**
 * Module dependencies.
 */

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    http = require('http');

var db = mongoose.connect("mongodb://localhost:27017/CustomerApi");
var Customer = require('./models/customerModel.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var customerRouter = require("./routes/customerRoutes.js")(Customer);

app.use("/api/Customers", customerRouter);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
