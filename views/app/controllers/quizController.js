(function(){
	app.controller('QuizController', function ($rootScope, $scope, $location, userService) {
    var self = this;
	if(!userService.user.email){
		$location.path('/login');
	}
	self.save = function(){
		
	}
  });
})();