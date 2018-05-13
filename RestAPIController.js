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
	app.get('/getPopulatedFDDetails', function(req, res) {
		console.info("Retriving all FD Details...");
		let totalDepositRecord = jsonDB.getAllDepositSet();
		this.ponrajTotalDeposit = 0;
		this.ponrajTotalMaturity = 0;
		this.sujitraTotalDeposit = 0;
		this.sujitraTotalMaturity = 0;

		for(let index = 0; index < totalDepositRecord.length; index ++) {
			this.name = totalDepositRecord[index].fdName;
			if(this.name === 'Ponraj Suthanthiramani') {
				this.ponrajTotalDeposit += parseInt(totalDepositRecord[index].depositAmount);
				this.ponrajTotalMaturity += parseInt(totalDepositRecord[index].maturityAmount);
				console.info('Ponraj: '+ponrajTotalDeposit+' : '+ponrajTotalMaturity)
			}
			else {
				this.sujitraTotalDeposit += parseInt(totalDepositRecord[index].depositAmount);
				this.sujitraTotalMaturity += parseInt(totalDepositRecord[index].maturityAmount);
				console.info('Suji: '+sujitraTotalDeposit+' : '+sujitraTotalMaturity)
			}
		}
		jsonDB.updateMaturityDepositAmount('Ponraj Suthanthiramani', ponrajTotalMaturity);
		jsonDB.updateMaturityDepositAmount('Sujitra Devi Dhayalan', sujitraTotalMaturity);
		
		jsonDB.updateTotalDepositAmount('Ponraj Suthanthiramani', ponrajTotalDeposit);
		jsonDB.updateTotalDepositAmount('Sujitra Devi Dhayalan', sujitraTotalDeposit);

		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(jsonDB.getAllTotalSet()));
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