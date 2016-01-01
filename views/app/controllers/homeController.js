var app = angular.module('FunQuiz', [
    'ngRoute',
    'ngAnimate',
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
        $routeProvider.when('/test/:type/:id', { templateUrl: 'test.html', reloadOnSearch: false, controller: 'TestController as testCtrl' });
        $routeProvider.when('/result', { templateUrl: 'result.html', reloadOnSearch: false, controller: 'ResultController as resultCtrl' });
        $routeProvider.when('/login', { templateUrl: 'login.html', reloadOnSearch: false, controller: 'UserController as userCtrl' });
        $routeProvider.when('/quiz/add', { templateUrl: 'addquiz.html', reloadOnSearch: false, controller: 'QuizController as quizCtrl' });
        $routeProvider.when('/dashboard', { templateUrl: 'dashboard.html', reloadOnSearch: false, controller: 'UserController as userCtrl' });
        $routeProvider.when('/about', { templateUrl: 'about.html', reloadOnSearch: false });
    });

    app.controller('IndexController', function ($rootScope, $scope, $routeParams, $location, userService) {
        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.loading = false;
        });
    });

    app.controller('MainController', function ($rootScope, $scope, $routeParams, $location, userService) {
        var self = this;
        self.user = userService.user;
        self.beginTest = function () {
            $location.path('/test/last/1');
        };
        // Needed for the loading screen
        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.loading = false;
        });
    });

    app.controller('ListController', function ($rootScope, $scope, $routeParams, userService, quizService) {
        var self = this;
        quizService.category(function (data) {
            self.type = $routeParams.type;
            if ($routeParams.type === 'category') {
                self.titleContent = '按类别';
                self.scrollItems = data.data.category;
                $scope.scrollItems = data.data.category;
            } else if ($routeParams.type === 'tag') {
                self.titleContent = '按标签';
                self.scrollItems = data.data.tag;
                $scope.scrollItems = data.data.tag;
            }

            // Needed for the loading screen
            $rootScope.$on('$routeChangeStart', function () {
                $rootScope.loading = true;
            });

            $rootScope.$on('$routeChangeSuccess', function () {
                $rootScope.loading = false;
            });
        });


    });

    app.controller('TestController', function ($rootScope, $scope, $routeParams, $location, $transform, userService, quizService) {
        var self = this;
        self.titleContent = '请选择一个答案';
        var filter = {};
        filter[$routeParams.type] = $routeParams.id;
        quizService.getQuiz(filter, function (d) {
            var quiz = [];
            if (d.status.code === '200') {
                quiz = d.data;
            } else {
                $scope.title = '提示';
                $scope.message = d.status.message;
                $rootScope.Ui.toggle('modal1');
            }

            self.index = 0;
            self.result = 0;
            self.combo = 0;
            self.chooseAnwser = function (x, y, z) {
                var isRight = false;
                if (x == y.right_answer) {
                    self.result++;
                    isRight = true;
                    quizService.score.combo += 1;
                } else {
                    quizService.score.combo = 0;
                }

                self.combo = quizService.score.combo;
                quizService.updateQuiz(y._id, isRight, function (d) { });
                if (userService.user.email) {
                    userService.updateQuiz(userService.user.email, isRight, quizService.score.combo, function (d) { });
                };

                if (self.index === quiz.length - 1) {
                    quizService.score.result = self.result;
                    quizService.score.count = self.index;
                    $location.path('result');
                }
                self.index++;
                self.testItem = quiz[self.index];
            };
            self.testItem = quiz[self.index]
            //$scope.testItem = (quiz[self.index]).shuffle();
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
            $location.path('/test/last/1');
        }
        self.result = quizService.score.result;
        self.continuePlay = function () {
            $location.path('/test/last/1');
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
