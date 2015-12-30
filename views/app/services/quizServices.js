(function () {
    app.factory('quizService', function ($http) {
        var self = this;
        var baseHost = 'http://' + location.host;

        self.score = { result: 0, combo: 0, count: 0 };
        self.category = function (callback) {
            var data = {};
            var category = {};
            if (category.length !== 0) {
                $http.get(baseHost + "/api/v1/quiz/category", data)
                    .success(function (quiz) {
                        callback(quiz);
                    })
                    .error(function (quiz) {
                        console.error("Failed to get.");
                    });
            }
        };

        self.add = function (quiz, answer, rightAnswer, category, tag, email, callback) {
            var data = {};
            data.quiz = quiz;
            data.answer = answer;
            data.rightAnswer = rightAnswer;
            data.category = category;
            data.tag = tag;
            data.email = email;
            $http.post(baseHost + "/api/v1/quiz/add", data)
                .success(function (quiz) {
                    self.quiz = quiz.data;
                    callback(quiz);
                })
                .error(function (quiz) {
                    console.error("Failed to save.");
                });
        };

        self.updateQuiz = function (quizId, isRight, callback) {
            var data = {};
            data.quizId = quizId;
            data.isRight = isRight;
            $http.post(baseHost + "/api/v1/quiz/updatequiz", data)
                .success(function (quiz) {
                    self.quiz = quiz.data;
                    callback(quiz);
                })
                .error(function (quiz) {
                    console.error("Failed to save.");
                });
        };

        self.getQuiz = function (query, callback) {
            var data = {};
            data.query = query;
            $http.get(baseHost + "/api/v1/quiz/getall?filter=" + JSON.stringify(data.query), data)
                .success(function (quiz) {
                    self.quiz = quiz.data;
                    callback(quiz);
                })
                .error(function (quiz) {
                    console.error("Failed to get.");
                });
        };
        return self;
    });
})();