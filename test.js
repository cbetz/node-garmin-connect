var nodeGarminConnect = require('./node-garmin-connect');

var testClient = new nodeGarminConnect();

testClient.getRuns(function(error, response, body) {
	if (!error) {
		console.log(body);
	} else {
		console.log(error);
	}
});