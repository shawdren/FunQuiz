(function () {
	app.controller('UserController', function ($rootScope, $scope, $location, userService, alertService) {
        var self = this;
		console.log($scope);
		self.login = function () {
			userService.login(self.email, self.password, function (d) {
				if (d.status.code === '200') {
					$location.path('/home');
				}else{
					d.path = 'login';
					d.title = 'error';
					alertService.setData(d.status.message);
					//self.alert = "ui-turn-on='modal1'";
					//todo: if login has error should be pop up out.
				}
			});
		};
		self.register = function () {
			userService.register(self.email, self.password, function (d) {
				if (d.status.code === '200') {
					$location.path('/home');
				} else {
					d.path = 'login';
					d.title = 'error';
					alertService.setData(d.status.message);
					//self.alert = "ui-turn-on='modal1'";
					//todo: if login has error should be pop up out.
				}
			});
		};
		// Needed for the loading screen
		$rootScope.$on('$routeChangeStart', function () {
			$rootScope.loading = true;
		});

		$rootScope.$on('$routeChangeSuccess', function () {
			$rootScope.loading = false;
		});
	});
})();