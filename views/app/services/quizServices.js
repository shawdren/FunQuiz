(function () {
	app.factory('quizService', function ($http) {
		var self = this;
		var baseHost = 'http://' + location.host;
		self.user = {};
		self.add = function (quiz, answer, rightAnswer, category,tag, callback) {
			var data = {};
			data.quiz = quiz;
			data.answer = answer;
			data.rightAnswer = rightAnswer;
			data.category = category;
			data.tag = tag;
			$http.post(baseHost + "/api/v1/quiz/add", data)
				.success(function (quiz) {
					self.quiz = quiz.data;
					callback(quiz);
				})
				.error(function (quiz) {
					console.error("Failed to save.");
				});
		};
		return self;
	});
})();