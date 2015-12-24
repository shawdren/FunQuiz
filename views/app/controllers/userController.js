(function () {
    app.controller('UserController', function ($rootScope, $scope, $location, userService) {
        var self = this;
        self.beginTest = function () {
            $location.path('/test/1');
        };
        if (!userService.user.email) {
            $location.path('/login');
        } else {
            userService.getUser(userService.user.email, function (user) {
                self.quiz_count = user.data.quiz_count;
                self.right_count = user.data.right_count;
                self.combo_count = user.data.combo_count;
                self.score = user.data.score;
                self.level = user.data.level;
                self.email = user.data.email;
            });
        }



        self.login = function () {
            userService.login(self.email, self.password, function (d) {
                if (d.status.code === '200') {
                    $location.path('/dashboard');
                } else {
                    $scope.title = '提示';
                    $scope.message = d.status.message;
                    $rootScope.Ui.toggle('modal1');
                }
            });
        };
        self.register = function () {
            if (self.password && self.password !== self.confirmPassword) {
                $scope.title = '提示';
                $scope.message = '两次输入的密码不一致！';
                $rootScope.Ui.toggle('modal1');
            }
            userService.register(self.email, self.password, function (d) {
                if (d.status.code === '200') {
                    $location.path('/dashboard');
                } else {
                    $scope.title = '提示';
                    $scope.message = d.status.message;
                    $rootScope.Ui.toggle('modal1');
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