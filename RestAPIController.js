var JsonDB = require('./DataBase.js');

var jsonDB = new JsonDB();
var app;
var urlencodedParser;
var staticPath;

function loadLoginFailePage(response, res) {
	console.log(response);
	res.end(JSON.stringify(response));
}

var RestController = function(appNode, encoder, path) {
	app = appNode;
	urlencodedParser = encoder;
	staticPath = path;

	this.initilize = function() {
		jsonDB.initilize();
	};

	console.log('Adding the New FD Addition Router');
	app.post('/addFDForm', function(req, res) {
		console.info("Adding form action is called...");
		jsonDB.addFDInformation(req.body);
		res.end(req.body.fdName);
	});

	console.log('Adding the Query all FD Details Router');
	app.get('/getAllFDDetails', function(req, res) {
		console.info("Retriving all FD Details...");
		res.render('banking', {
	    	'title': 'FD Details',
	    	'data': jsonDB.getAllDepositSet()
	    });
	});
	
	console.log('Adding the Home Router');
	app.get('/home', function (req, res) {
	    res.render('home', {
	    	title: 'Welcome'
	    });
	});
	console.log('Adding the Banking Router');
	app.get('/banking', function (req, res) {
	    res.render('banking', {
	    	title: 'FD Details',
	    	data: jsonDB.getAllDepositSet()
	    });
	});
	console.log('Adding the Settings Router');
	app.get('/settings', function (req, res) {
	    res.render('settings', {
	    	title: 'Settings Module'
	    });
	});
	console.log('Adding the Automation Router');
	app.get('/automation', function (req, res) {
	    res.render('automation', {
	    	title: 'Automation Module'
	    });
	});

};

module.exports = RestController;