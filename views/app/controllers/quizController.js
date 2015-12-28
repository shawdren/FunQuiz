(function () {
	app.controller('QuizController', function ($rootScope, $scope, $location, userService, quizService) {
		var self = this;
		if (!userService.user.email) {
			$location.path('/login');
		};
		self.save = function () {
			var answer = [];
			if (self.answer1) {
				answer.push(self.answer1);
			}
			if (self.answer2 && self.answer2 !== self.answer1) {
				answer.push(self.answer2);
			}
			if (self.answer3 && self.answer3 !== self.answer2) {
				answer.push(self.answer3);
			}
			if (self.answer4 && self.answer4 !== self.answer3) {
				answer.push(self.answer4);
			}
			quizService.add(self.quiz, answer, self.rightAnswer, self.category, self.tag, userService.user.email, function (d) {
				if (d.status.code === '200') {
					self.reset();
				} else {
                    $scope.title = '提示';
					$scope.message = d.status.message;
					$rootScope.Ui.toggle('modal1');
				}
			});
		};

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
	app.animation('.repeat-animation1', function () {
		return {
			enter: function (element, done) {
				console.log("entering...");
				element.css({
					position: 'relative',
					left: -10,
					opacity: 0
				});
				element.animate({
					left: 0,
					opacity: 1
				}, done);
			},
			leave: function (element, done) {
				element.css({
					position: 'relative',
					left: 0,
					opacity: 1
				});
				element.animate({
					left: -10,
					opacity: 0
				}, done);
			},
			move: function (element, done) {
				element.css({
					left: "2px",
					opacity: 0.5
				});
				element.animate({
					left: "0px",
					opacity: 1
				}, done);
			}
		};
	});
})();