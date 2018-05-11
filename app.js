var express = require('express');
var layout = require('express-layout');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');

var app = express();
var router = express.Router();

var PORT = 3000;

//set view engine
console.log('Adding Jade as a View Engine.');
app.set("view engine","jade");
app.set('views','./views');

var staticPath = __dirname+"\\public\\";
console.log('Setting static path to Public folder:'+staticPath);

console.log('Adding the Default Layout.');
app.set('layout', layout());
console.log('Adding Cookie Parser.');
app.use(cookieParser());
console.log('Adding JSON object over the request capability.');
app.use(bodyParser.json());
console.log('Adding t he URL Encoding to have extended properties.');
app.use(bodyParser.urlencoded({ extended: true }));
console.log('Adding static path to the Node Server.');
app.use(express.static(staticPath));

//Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true });

console.log('Initilizing the REST Handling Module.');
var restAPI = new (require('./RestAPIController.js'))(app, urlencodedParser, staticPath);
restAPI.initilize();

var server = app.listen(PORT, function () {
	console.log('****************************************************');
	console.log('***  Node Server has been started at port: 3000  ***');
	console.log('****************************************************');
});