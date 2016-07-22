( function() {
    var app = angular.module('dqSearch', []);

    app.controller('SearchController', ['$scope','$http' ,function($scope,$http) {
                
        $scope.updateQuery = function() {
            $http.post('/backendServices/findSchool', {
                schoolSearch: $scope.schoolSearch
            }).then(function(res) {
               if (res.data) {
                    $scope.schools = res.data;   
               }
            });
        }
        //Lulz Alfri u a scrub
        
    }]);
}());