var JsonDB = require('node-json-db');
var dataBase = new JsonDB("data/BankingDB", true, true);
var FDDetails = require('./FDDetails.js');

var dataSet;

var TMBBankDB = function () {
	this.initilize = function() {
		try {
			dataSet = dataBase.getData("/");
			console.log('DB Loaded into dataset');
		} catch(error) {
		    console.error(error);
		}
	};
	this.getDataSet = function() {
		return dataSet;
	};
	this.getAllDepositSet = function() {
		return dataBase.getData("/deposit-details");
	};

	this.addFDInformation = function(fdDetails){
		console.log(fdDetails.fdNumber);
		console.log(fdDetails.fdName);
		console.log(fdDetails.depositDate);
		console.log(fdDetails.depositAmount);
		console.log(fdDetails.maturityDate);
		console.log(fdDetails.maturityAmount);
		console.log(fdDetails.depositInterest);
		dataBase.push('/deposit-details', [fdDetails], false);
		dataBase.save();
	};
};

var fdDetails = new FDDetails();
fdDetails.fdNumber = '123123213';
fdDetails.fdName = 'Ponraj Suthanthriamani';
fdDetails.depositInterest = '7';
fdDetails.depositAmount = '100000';
fdDetails.depositDate = '2018/05/09';
fdDetails.maturityAmount = '200000';
fdDetails.maturityDate = '2019/05/08';

//var tmb = new TMBBankDB();
//tmb.initilize();
//tmb.addFDInformation(fdDetails);
module.exports = TMBBankDB;