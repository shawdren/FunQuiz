(function () {
	app.controller('UserController', function ($rootScope, $scope, $location, userService) {
        var self = this;
		console.log($scope);
		self.login = function () {
			userService.login(self.email, self.password, function (d) {
				if (d.status.code === '200') {
					$location.path('/');
				}
			});
		};
		self.register = function(){
			userService.register(self.email, self.password, function(d){
				if (d.status.code === '200') {
					$location.path('/');
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