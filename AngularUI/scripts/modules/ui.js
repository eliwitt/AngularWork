angular.module('ui.module', [])
.controller('uiCtrl', ['$scope', function($scope) {
    "use strict";
    $scope.title = "DOM manipulation with AngularJS";
    $scope.lightboxText = "Some text that should be displayed in a lightbox";
    $scope.lightboxText2 = "Some different text that should be in another lightbox";
    $scope.lightboxObject = {
        text: "some text as a separate property in an object",
        visible: false,
        toggleView: function () {
            this.visible = !this.visible;
        }
    }
}]);
