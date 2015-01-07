angular.module('ui.directives', [])
.directive('myLightbox', function () {
    "use strict"
    return {
        restrict: 'AEC',
        transclude: true,
        scope: {
            content: "=myLightbox"
        },
        templateUrl: "scripts/directives/templates/lightbox.html"
    }
})
.directive('myAccordion', function () {
    "use strict"
    return {
        restrict: 'AEC',
        transclude: true,
        controller: function($scope, $element){
            this.items = [];
            this.addItem = function (item) {
                this.items.push(item);
            };
            this.closeAll = function () {
                angular.forEach(this.items, function (item) {
                    item.closeMe();
                })
            }
        },
        template: "<div class='accordion' data-ng-transclude></div>"
    }
})
.directive('myItem', function () {
    "use strict"
    return {
        restrict: 'AEC',
        require: "^myAccordion",
        transclude: true,
        scope: {
            title: "@"
        },
        link: function(scope, element, attrs, parentCtrl){
            scope.open = false;
            scope.closeMe = function () {
                scope.open = false;
            },
            scope.toggle = function () {
                if (scope.open) {
                    scope.closeMe();
                }
                else {
                    parentCtrl.closeAll();
                    scope.open = true;
                }
            };
            parentCtrl.addItem(scope);
        },
        template: "<h2 data-ng-click='toggle()'>{{title}}</h2><div class='accordionContent' data-ng-transclude data-ng-show='open'></div>"
    }
});