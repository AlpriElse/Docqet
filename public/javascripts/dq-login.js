!(function() {
    var app = angular.module('dqLogin', ['ngMessages']);

    app.controller('LoginController', ['$scope','$http','$window',function($scope,$http,$window) {
        $scope.login = function(){
            console.log('Logging in...');
            $http.post('/login', {
                email: $scope.email,
                password: $scope.password
            }).then(function(res) {
                if(res.data.success) {
                    $window.location = '/home';
                } else {
                    //  Unknown Email yet to be implemented
                    $scope.badLogin = true;
                    $scope.invalidLogin = true;
                }
            });
        }
        $scope.badLogin = false;
        $scope.loginStatus = {
            unknownEmail: false,
            invalidLogin: false
        }
    }]);
}());
