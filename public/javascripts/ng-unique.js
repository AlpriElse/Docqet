
(function() {
    angular.module('ng-unique', []).directive('ng-uniq', ['$http', function ($http) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                elem.on('blur', function () {
                    console.log(elem.val());
                });
            }
        }
    }]);
}());
