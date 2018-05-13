var JsonDB = require('node-json-db');
var dataBase = new JsonDB("data/BankingDB", true, true);
var FDDetails = require('./FDDetails.js');

var dataSet;
var sujitra;
var ponraj;
var modified = false;
var TMBBankDB = function () {
	this.initilize = function() {
		try {
			dataSet = dataBase.getData("/");
			console.log('DB Loaded into dataset');
			totalDS = dataBase.getData("/total-details");
			sujitra = totalDS[0];
			ponraj = totalDS[1];

		} catch(error) {
		    console.error(error);
		}
	};
	this.getDataSet = function() {
		return dataSet;
	};
	this.getPonrajTotalRecord = function() {
		let totalDetailsArray = dataBase.getData("/total-details");
		return totalDetailsArray[1];
	};
	this.getSujiTotalRecord = function() {
		let totalDetailsArray = dataBase.getData("/total-details");
		return totalDetailsArray[0];
	};
	this.updateTotalDepositAmount = function(setData, setValue) {
		if(setData === 'Ponraj Suthanthiramani') {
			ponraj.total_deposit_amount = setValue;
//			dataBase.push('/total-details[1]/total_deposit_amount', setValue, true);
		}
		else {
			sujitra.total_deposit_amount = setValue;
//			dataBase.push('/total-details[0]/total_deposit_amount', setValue, true);
		}
		dataBase.push('/total-details', [sujitra, ponraj], true);
		modified = true;
	};
	this.updateMaturityDepositAmount = function(setData, setValue) {
		if(setData === 'Ponraj Suthanthiramani') {
			ponraj.total_maturity_amount = setValue;
//			dataBase.push('/total-details[1]/total_maturity_amount', setValue, true);
		}
		else {
			sujitra.total_maturity_amount = setValue;
//			dataBase.push('/total-details[0]/total_maturity_amount', setValue, true);
		}
		dataBase.push('/total-details', [sujitra, ponraj], true);
		modified = modified
	};
	this.getAllDepositSet = function() {
		return dataBase.getData("/deposit-details");
	};
	this.getAllTotalSet = function() {
		if(modified) {
			dataBase.reload();
			modified = false;
		}
		return dataBase.getData("/total-details");
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