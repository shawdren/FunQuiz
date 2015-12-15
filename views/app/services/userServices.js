(function () {
	app.factory('userService', function ($http) {
		var self = this;
		var baseHost = 'http://' + location.host;
		self.user = {};
		self.login = function (email, password,callback) {
			var data = {};
			data.email = email;
			data.password = password;
			/*
			$http.get(host + "/api/v1/user")
				.success(function (data) {
					console.info(data.length);
				})
				.error(function () {
					console.error("Failed to save.");
				});
				*/
			$http.post(baseHost + "/api/v1/user/login", data)
				.success(function (data) {
					self.user = data.user;
					callback(data);
				})
				.error(function (data) {
					console.error("Failed to save.");
				});
		   
		};
		self.register = function(email, password, callback){
			var data = {email:email, password: password};
			$http.post(baseHost + "/api/v1/user/register", data)
				.success(function (data) {
					self.user = data.user;
					callback(data);
				})
				.error(function (data) {
					console.error("Failed to save.");
				});
			
		};
		return self;
	});
})();
