(function () {
    app.factory('userService', function ($http) {
        var self = this;
        var baseHost = 'http://' + location.host;
        self.user = {};
        self.getUser = function (email, callback) {
            var data = {};
            data.email = email;

            $http.post(baseHost + "/api/v1/user", data)
                .success(function (user) {
                    self.user = user.data;
                    callback(user);
                })
                .error(function () {
                    console.error("Failed to save.");
                });

        };
        self.login = function (email, password, callback) {
            var data = {};
            data.email = email;
            data.password = password;
            $http.post(baseHost + "/api/v1/user/login", data)
                .success(function (user) {
                    self.user = user.data;
                    callback(user);
                })
                .error(function (user) {
                    console.error("Failed to save.");
                });

        };
        self.register = function (email, password, callback) {
            var data = { email: email, password: password };
            $http.post(baseHost + "/api/v1/user/register", data)
                .success(function (user) {
                    self.user = user.data;
                    callback(user);
                })
                .error(function (user) {
                    console.error("Failed to save.");
                });

        };
        self.updateQuiz = function (email, isRight, combo, callback) {
            var data = {};
            data.email = email;
            data.isRight = isRight;
            data.combo = combo;
            $http.post(baseHost + "/api/v1/user/updatequiz", data)
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
