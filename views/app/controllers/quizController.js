(function () {
	app.controller('QuizController', function ($rootScope, $scope, $location, userService, quizService) {
		var self = this;
		if (!userService.user.email) {
			$location.path('/login');
		};
		self.save = function () {
			var answer = [];
			if(self.answer1){
				answer.push(self.answer1);
			}
			if(self.answer2){
				answer.push(self.answer2);
			}
			if(self.answer3){
				answer.push(self.answer3);
			}
			if(self.answer4){
				answer.push(self.answer4);
			}
			quizService.add(self.quiz, answer, self.rightAnswer, self.category,self.tag, function (d) {
				if (d.status.code === '200') {
					self.reset();
				} else {

				}
			});
		};
		self.update = function(quizId){
			
		};
		self.reset = function () {
			self.quiz = '';
			self.answer1 = '';
			self.answer2 = '';
			self.answer3 = '';
			self.answer4 = '';
			self.rightAnswer = '';
			self.category = '';
			self.tag = '';
		};
	});
})();