var api = new FDAPI();

var $ = jQuery.noConflict();
$(document).ready(function() {
	$('#expandBtn').click(function() {
		console.info('Expand Icon Clicked...');
	    var x = document.getElementById("myTopnav");
	    if (x.className === "topnav") {
	    	console.info('Adding Responsive...');
	        $('#myTopnav').addClass('responsive');
	    } else {
	    	console.info('removing Responsive...');
	    	$('#myTopnav').removeClass('responsive');
	    }
	});
	
	$('#addFrmBtn').click(function() {
		formData = api.getFDDepositForm();
		formData.fdNumber = $('#fdNumber').val();
		formData.fdName = $('#fdName').val();
		formData.depositInterest = $('#depositInterest').val();
		formData.depositAmount = $('#depositAmount').val();
		formData.depositDate = $('#depositDate').val();
		formData.maturityAmount = $('#maturityAmount').val();
		formData.maturityDate = $('#maturityDate').val();
		api.addFormRequest(formData);
	});
	
	 $('#fdTable').DataTable();
});