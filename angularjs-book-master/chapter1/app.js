angular.module('myApp', [])
.directive('toNumeric', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            ctrl.$parsers.unshift(function (value) {
                var valid = !isNaN(value);
                ctrl.$setValidity('ValNum', valid);
                return valid ? value : '';
            });
        }
    };
});