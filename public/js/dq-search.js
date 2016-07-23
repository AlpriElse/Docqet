( function() {
    var app = angular.module('dqSearch', ['ngMaterial']);

    app.controller('SearchController', ['$scope','$http' ,function($scope,$http) {
        
        $scope.schools = [];
        
        this.updateQuery = function(search) {
            if (search.length > 0) {
                $http.post('/backendServices/findSchool', {
                    schoolSearch: search
                }).then(function(res) {
                   if (res.data) {
                       $scope.schools = res.data;
                   }
                });
            } else {
                $scope.schools = [];
            }
        }        
    }]);
}());