(function () {
    app.controller('UserController', function ($rootScope, $scope, $location, userService, alertService) {
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
                    d.path = 'login';
                    d.title = 'error';
                    alertService.setData(d.status.message);
                    //self.alert = "ui-turn-on='modal1'";
                    //todo: if login has error should be pop up out.
                }
            });
        };
        self.register = function () {
            userService.register(self.email, self.password, function (d) {
                if (d.status.code === '200') {
                    $location.path('/dashboard');
                } else {
                    d.path = 'login';
                    d.title = 'error';
                    alertService.setData(d.status.message);
                    //self.alert = "ui-turn-on='modal1'";
                    //todo: if login has error should be pop up out.
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