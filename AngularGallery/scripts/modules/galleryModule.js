angular.module('gallery.module', [])
.controller('galleryCtrl', ['$scope', function($scope) {
    "use strict";
    $scope.galleryTitle = "Wittie Gallery";
    $scope.galleryImages = [
        {
            main: "images/15 - 4.jpg",
            thumb: "images/15 - 4_thumb.jpg",
            title: "Julia Paperplate",
            description: "I cannot explain how crazy my wife is"
        },
        {
            main: "images/Desert Botanical Garden 019.jpg",
            thumb: "images/Desert Botanical Garden 019_thumb.jpg",
            title: "Phoenix",
            description: "I loved the desert environment"
        },
        {
            main: "images/IMG_0751.jpg",
            thumb: "images/IMG_0751_thumb.jpg",
            title: "Yorktown",
            description: "I loved watching the ships"
        },
        {
            main: "images/S8001204.jpg",
            thumb: "images/S8001204_thumb.jpg",
            title: "Colorado Springs",
            description: "From garden of the gods view of Pike peak"
        },
        {
            main: "images/S8001214.jpg",
            thumb: "images/S8001214_thumb.jpg",
            title: "Garden of the Gods",
            description: "I cannot explain how awesome this image actually is"
        },
        {
            main: "images/S8001257.jpg",
            thumb: "images/S8001257_thumb.jpg",
            title: "Stage Coach",
            description: "The stage coach"
        }
    ]
}]);
