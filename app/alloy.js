Alloy.Globals.ethAddress;

var reste = require("reste");
Alloy.Globals.api = new reste();

// now we can do our one-time configure
Alloy.Globals.api.config({
    debug: true, // allows logging to console of ::REST:: messages
    errorsAsObjects: false, // Default: false. New in 1.4.5, will break 1.4.4 apps that handle errors
    autoValidateParams: true, // set to true to throw errors if <param> url properties are not passed
    validatesSecureCertificate: false, // Optional: If not specified, default behaviour from http://goo.gl/sJvxzS is kept.
    timeout: 4000,
    url: "https://aircoin-disrupt.herokuapp.com/",
    requestHeaders: {
        "Content-Type": "application/json"
    },
    methods: [{
        name: "registerUser",
        post: "/registerUser?user_token=<ethaddress>",
        onLoad: function(e, callback) {
	        callback(e);
	    }
    }, {
        name: "executeTrade",
        post: "/executeTrade"
    }, {
        name: "addMiles",
        post: "/addMiles"
    }, {
        name: "getPersonMiles",
        get: "/getOneMiles"
    }, {
        name: "getAllMiles",
        get: "/getAllMiles"
    }, {
    	name: "getOneUser",
    	get:"/getOneUser"
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
        callback(e);
    }
});