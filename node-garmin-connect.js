var request = require('request'),
	loginForm = require('./loginForm.json');

module.exports = function() {

	function login(callback) {
		request('https://connect.garmin.com/signin', function (error, response, body) {
			if (!error) {
				request(
					{ 	
						method: 'POST',
						uri: 'https://connect.garmin.com/signin',
						form: loginForm
					}
					, function (error, response, body) { 
						callback(error, response, body);
				});
			}
		});
	}
	
	function getRuns(callback) {
		request('https://connect.garmin.com/proxy/activity-search-service-1.2/json/activities?&start=0&limit=50', function (error, response, body) {					
			if (response.statusCode == 403) {
				login(function(error, response, body) {
					getRuns(function(error, response, body) {
						callback(error, response, body);
					});
				});
			} else {	
				callback(error, response, body);
			}
		});
	}
	
	return {
		"getRuns": getRuns
	}
}
