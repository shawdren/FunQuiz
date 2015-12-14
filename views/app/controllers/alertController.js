(function () {
	app.controller('AlertController', function ($rootScope, $scope, $location, alertService) {
        var self = this;
		self.data = alertService.data;
		// Needed for the loading screen
		$rootScope.$on('$routeChangeStart', function () {
			$rootScope.loading = true;
		});

		$rootScope.$on('$routeChangeSuccess', function () {
			$rootScope.loading = false;
		});
	});
})();