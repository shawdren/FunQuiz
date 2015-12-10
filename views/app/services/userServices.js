(function () {
	app.factory('userService', function ($http) {
		var self = this;
		self.login = function (email, password,callback) {
			var data = {};
			data.email = email;
			data.password = password;
			var host = location.host;
			host = 'http://' + host;
			/*
			$http.get(host + "/api/v1/user")
				.success(function (data) {
					console.info(data.length);
				})
				.error(function () {
					console.error("Failed to save.");
				});
				*/

			$http.post(host + "/api/v1/user/login", data)
				.success(function (data) {
					callback(data);
				})
				.error(function (data) {
					console.error("Failed to save.");
				});
		   
		};
		return self;
	});
})();
