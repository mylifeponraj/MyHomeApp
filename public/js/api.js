var FDAPI = function() {
	var FDInfo = function() {
		this.fdNumber = '';
		this.fdName = 'Name';
		this.depositInterest = '';
		this.depositAmount = '';
		this.depositDate = '';
		this.maturityAmount = '';
		this.maturityDate = '';
	};
	this.getFDDepositForm = function () {
		return new FDInfo();
	};
	this.getFormattedDate = function(date){
		
	};
	this.getNewFDForm = function(data) {
		this.info = this.getFDDepositForm();
		this.info.fdNumber = data.fdNumber;
		this.info.fdName = data.fdName;
		this.info.depositInterest = data.depositInterest;
		this.info.depositAmount = data.depositAmount;
		this.info.maturityAmount = data.maturityAmount;
		this.info.maturityDate = data.maturityDate;
		return this.info;
	};
	this.addFormRequest = function(formData) {
		$.post("/addFDForm", formData)
		.done(function(resp){
			alert('Added FD Record for '+resp+' Successfully.');
		});
	}
};