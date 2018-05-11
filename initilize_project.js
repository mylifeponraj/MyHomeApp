var express = require('express');
var app = express();
var router = express.Router();

var PORT = 3000;

//set view engine
app.set("view engine","jade")

var server = app.listen(PORT, function () {
    console.log('Node server is running..');
});