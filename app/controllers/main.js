var args = $.args;

var api = new reste();
var api2 = new reste();
var api3 = new reste();
var api4 = new reste();

var returnedMiles;
var pickerValue = "AC";

// now we can do our one-time configure
api.config({
    debug: true, // allows logging to console of ::REST:: messages
    errorsAsObjects: false, // Default: false. New in 1.4.5, will break 1.4.4 apps that handle errors
    autoValidateParams: true, // set to true to throw errors if <param> url properties are not passed
    validatesSecureCertificate: false, // Optional: If not specified, default behaviour from http://goo.gl/sJvxzS is kept.
    timeout: 4000,
    url: "https://aircoin-disrupt.herokuapp.com",
    requestHeaders: {
        "Content-Type": "application/json"
    },
    methods: [{
        name: "getAllMiles",
        get: "/getAllMiles",
    }],
    onError: function(e, retry) {
        var dialog = Ti.UI.createAlertDialog({
            title: "Connection error",
            message: "There was an error connecting to the server, check your network connection and  retry.",
            buttonNames: ['Retry']
        });

        dialog.addEventListener("click", function() {
            retry();
        });
        dialog.show();
    },
    onLoad: function(e, callback) {
		for (var j=0; j<= e.length-1; j++) {
			var row = Ti.UI.createTableViewRow({title: "Program: " + e[j].airline + '    -    ' + e[j].miles + ' miles', obj: e[j], color:'#FFF', font: {fontFamily: 'AvenirNextCondensed-Medium', fontSize:18} });
			$.marketPlaceTV.appendRow(row, {animationStyle: Ti.UI.iOS.RowAnimationStyle.LEFT});
		}
	}
});

api2.config({
    debug: true, // allows logging to console of ::REST:: messages
    errorsAsObjects: true, // Default: false. New in 1.4.5, will break 1.4.4 apps that handle errors
    autoValidateParams: true, // set to true to throw errors if <param> url properties are not passed
    validatesSecureCertificate: false, // Optional: If not specified, default behaviour from http://goo.gl/sJvxzS is kept.
    timeout: 4000,
    url: "https://aircoin-disrupt.herokuapp.com",
    requestHeaders: {
        "Content-Type": "application/json"
    },
    methods: [{
        name: "addMiles",
        post: "/addMiles?user_token=<ethaddress>&airline=<ffp>&user=<username>&password=<password>",
    }],
    onError: function(e, retry) {
        var dialog = Ti.UI.createAlertDialog({
            title: "Connection error",
            message: "There was an error connecting to the server, check your network connection and  retry.",
            buttonNames: ['Retry']
        });

        dialog.addEventListener("click", function() {
            retry();
        });
        dialog.show();
    },
    onLoad: function(e, callback) {
		Ti.API.info('API2 ' + JSON.stringify(e));
		$.yourMilesSV.scrollToView($.view2);
		$.usernameTI.value = '';
		$.passwordTI.value = '';
		//$.milesBalance.text = "You have " + e.coins + " Miles";
		$.myAirBits.text = "Add your Miles                               You have " + e.coins + " ₳";
		$.picker.setSelectedRow(0,0,false);
	}
});
api3.config({
    debug: true, // allows logging to console of ::REST:: messages
    errorsAsObjects: true, // Default: false. New in 1.4.5, will break 1.4.4 apps that handle errors
    autoValidateParams: true, // set to true to throw errors if <param> url properties are not passed
    validatesSecureCertificate: false, // Optional: If not specified, default behaviour from http://goo.gl/sJvxzS is kept.
    timeout: 4000,
    url: "https://aircoin-disrupt.herokuapp.com",
    requestHeaders: {
        "Content-Type": "application/json"
    },
    methods: [{
        name: "getBalanceFromAirline",
        get: "/getBalanceFromAirline?airline=<airline>&username=<username>&password=<password>",
    }],
    onError: function(e, retry) {
        var dialog = Ti.UI.createAlertDialog({
            title: "Connection error",
            message: "There was an error connecting to the server, check your network connection and  retry.",
            buttonNames: ['Retry']
        });

        dialog.addEventListener("click", function() {
            retry();
        });
        dialog.show();
    },
    onLoad: function(e, callback) {
		Ti.API.info('API3 ' + JSON.stringify(e));
		returnedMiles = e.miles;
		$.yourMilesSV.scrollToView($.view2);
		$.usernameTI.value = '';
		$.passwordTI.value = '';
		$.milesBalance.text = "You have " + returnedMiles + " Miles";
		$.picker.setSelectedRow(0,0,false);
		pickerValue = null;
	}
});
api4.config({
    debug: true, // allows logging to console of ::REST:: messages
    errorsAsObjects: true, // Default: false. New in 1.4.5, will break 1.4.4 apps that handle errors
    autoValidateParams: true, // set to true to throw errors if <param> url properties are not passed
    validatesSecureCertificate: false, // Optional: If not specified, default behaviour from http://goo.gl/sJvxzS is kept.
    timeout: 4000,
    url: "https://aircoin-disrupt.herokuapp.com",
    requestHeaders: {
        "Content-Type": "application/json"
    },
    methods: [{
        name: "getOneMiles",
        get: "/getOneMiles?user_token=<ethaddress>",
    }],
    onError: function(e, retry) {
        var dialog = Ti.UI.createAlertDialog({
            title: "Connection error",
            message: "There was an error connecting to the server, check your network connection and  retry.",
            buttonNames: ['Retry']
        });

        dialog.addEventListener("click", function() {
            retry();
        });
        dialog.show();
    },
    onLoad: function(e, callback) {
		$.myAirBits.text = "Add your Miles                               You have " + e.coins + " ₳";
	}
});
// ₳
function onOpen() {
	api.getAllMiles({}); // Marketplace
	api4.getOneMiles({ethaddress: Alloy.Globals.ethAddress});
};

function getBalance() {
	api3.getBalanceFromAirline({
		airline: pickerValue, 
		username: $.usernameTI.value,
		password: $.passwordTI.value
	});
};
 
function addMiles() {
	Ti.API.info('On CLick Add Miles Label');
	api2.addMiles({
		ethaddress: Alloy.Globals.ethAddress,
		ffp: pickerValue,
		username: $.usernameTI.value,
		password: $.passwordTI.value
	});
};

function keepAirmiles(e) {
	$.yourMilesSV.scrollToView($.view1);
};
function exchangeAirmiles(e) {
	addMiles();
	setTimeout(function() {
		//api4.getOneMiles({ethaddress: Alloy.Globals.ethAddress});
		$.yourMilesSV.scrollToView($.view1);
	}, 220);
};

function getSelectedPicker(e) {
	Ti.API.info('e ' + JSON.stringify(e));
	pickerValue = e.row.data;
};
