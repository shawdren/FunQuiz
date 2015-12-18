(function () {
	app.controller('QuizController', function ($rootScope, $scope, $location, userService, quizService) {
		var self = this;
		if (!userService.user.email) {
			$location.path('/login');
		}
		self.save = function () {
			var answer = [self.answer1, self.answer2, self.answer3, self.answer4];
			quizService.add(self.quiz, answer, self.rightAnswer, self.category, function (d) {
				if (d.status.code === '200') {
					self.reset();
				} else {

				}
			});
		}
		self.reset = function () {
			self.quiz = '';
			self.answer1 = '';
			self.answer2 = '';
			self.answer3 = '';
			self.answer4 = '';
			self.rightAnswer = '';
			self.category = '';
		};
	});
})();