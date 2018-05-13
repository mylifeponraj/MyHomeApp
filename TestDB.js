var JsonDB = require('node-json-db');
var dataBase = new JsonDB("data/TestBankingDB", true, true);

dataSet = dataBase.getData("/total-details");
var suji = dataSet[0];
var raj = dataSet[0];

suji.name='Sujitra';
raj.name='Ponraj';

raj.total_deposit_amount = 0;
dataBase.push('/total-details[]', [suji, raj], true);