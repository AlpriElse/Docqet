(function() {
    var app = angular.module('dqSignup', ['ngMessages']);

    app.controller('SignupController', ['$scope','$http','$window', function($scope, $http, $window) {
        $scope.signup = function() {
            console.log('Signing up...');
            $http.post('/signup',{
                email: $scope.email,
                name: $scope.name,
                password: $scope.password,
                betakey: $scope.betakey
            }).then(function(res) {
                if(res.data.success) {
                    $window.location = '/home';
                } else {
                    $scope.signupError = true;
                    $scope.signupStatus.internalServerError = true;
                }
            });
        }
        $scope.signupStatus = {
            internalServerError: false
        }
    }]);

    app.directive('dqUniqueEmail', ['$http', function($http) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                elm.on('blur', function(){
                    scope.$apply(function() {
                        $http({
                            method: 'POST',
                            url: '/backendServices/checkEmail',
                            data: {
                                email: elm.val()
                            }
                        }).success(function(data, status, headers, config) {
                            ctrl.$setValidity('unique', data);
                        });
                    });
                });
            }
        }
    }]);
}());
