var app = angular.module('FunQuiz', [
    'ngRoute',
    'mobile-angular-ui',
    'mobile-angular-ui.gestures',
    'mobile-angular-ui.core.sharedState'
]);

(function () {

    app.run(function ($transform) {
        window.$transform = $transform;
    });
    app.config(function ($routeProvider) {
        $routeProvider.when('/', { templateUrl: 'home.html', reloadOnSearch: false, controller: 'MainController as homeCtrl' });
        $routeProvider.when('/home', { templateUrl: 'home.html', reloadOnSearch: false, controller: 'MainController as homeCtrl' });
        $routeProvider.when('/list/:type', { templateUrl: 'category.html', reloadOnSearch: false, controller: 'ListController as listCtrl' });
        $routeProvider.when('/test/:id', { templateUrl: 'test.html', reloadOnSearch: false, controller: 'TestController as testCtrl' });
        $routeProvider.when('/result', { templateUrl: 'result.html', reloadOnSearch: false, controller: 'ResultController as resultCtrl' });
        $routeProvider.when('/login', { templateUrl: 'login.html', reloadOnSearch: false, controller: 'UserController as userCtrl' });
        $routeProvider.when('/alert', { templateUrl: 'alert.html', reloadOnSearch: false, controller: 'AlertController as alertCtrl' });
        $routeProvider.when('/quiz/add', { templateUrl: 'addquiz.html', reloadOnSearch: false, controller: 'QuizController as quizCtrl' });
        $routeProvider.when('/dashboard', { templateUrl: 'dashboard.html', reloadOnSearch: false, controller: 'UserController as userCtrl' });
        $routeProvider.when('/about', { templateUrl: 'about.html', reloadOnSearch: false });
    });


    app.controller('MainController', function ($rootScope, $scope, $routeParams, $location, userService) {
        var self = this;
        self.user = userService.user;
        self.beginTest = function () {
            $location.path('/test/1');
        };
        console.log($routeParams);
        // Needed for the loading screen
        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.loading = false;
        });
    });

    app.controller('ListController', function ($rootScope, $scope, $routeParams) {
        var self = this;
        // 
        // 'Scroll' screen
        // 
        var scrollItems = Categories;

        if ($routeParams.type === '1') {
            self.titleContent = '刷题';
        }
        if ($routeParams.type === '2') {
            self.titleContent = '出题';
        }
        if ($routeParams.type === '3') {
            self.titleContent = '设置';
        }
        self.scrollItems = scrollItems;
        $scope.scrollItems = scrollItems;
        // Needed for the loading screen
        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.loading = false;
        });
    });

    app.controller('TestController', function ($rootScope, $scope, $routeParams, $location, userService, quizService) {
        var self = this;
        self.titleContent = '请选择一个答案';
        quizService.getQuiz({}, function (d) {
            var quiz = [];
            if (d.status.code === '200') {
                quiz = d.data;
            }

            self.index = 0;
            self.result = 0;
            self.chooseAnwser = function (x, y, z) {
                var isRight = false;
                if (x == y.right_answer) {
                    self.result++;
                    isRight = true;
                }
                quizService.updateQuiz(y._id, isRight, function (d) { });
                if (userService.user.email) {
                    userService.updateQuiz(userService.user.email, isRight, function (d) { });
                };
                if (self.index === quiz.length - 1) {
                    var score = {};
                    score.reuslt = self.result;
                    quizService.score = score;
                    $location.path('result');
                }
                self.index++;
                self.testItem = quiz[self.index];
            };
            self.testItem = quiz[self.index]
        });

        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.loading = false;
        });
    });


    app.controller('ResultController', function ($rootScope, $scope, $routeParams, $location, userService, quizService) {
        var self = this;

        if (!quizService.score) {
            $location.path('/test/1/');
        }
        self.result = quizService.score.reuslt;
        self.continuePlay = function () {
            $location.path('/test/1/');
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
