(function () {
    app.controller('UserController', function ($rootScope, $scope, $location, userService) {
        var self = this;
        self.beginTest = function () {
            $location.path('/test/1');
        };
        if (!userService.user.email) {
            $location.path('/login');
        };

        self.quiz_count = userService.user.quiz_count;
        self.right_count = userService.user.right_count;
        self.combo_count = userService.user.combo_count;
        self.score = userService.user.score;
        self.level = userService.user.level;
        self.email = userService.user.email;

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