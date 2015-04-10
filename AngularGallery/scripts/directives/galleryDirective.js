angular.module('gallery.directive', [])
.directive('myGallery', function () {
    "use strict"
    return {
        restrict: 'A',
        scope: {
            images: "=myImages",
            title: "=myTitle"
        },
        controller: function($scope, $element, $attrs){
            $scope.mainImage = $scope.images[0];
            $scope.showMainImage = false;
            $scope.selectImage = function(image, title){
                $scope.mainImage = image;
                $scope.mainTitle = title;
                $scope.showMainImage = true;
            };
            $scope.close = function(e){
                if(e){
                    e.preventDefault()
                };
                $scope.showMainImage = false;
            };
        },
        templateUrl: "scripts/directives/templates/gallery.html"
    }
});