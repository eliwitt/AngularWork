// teamAppModule.JS

var teamApp = angular.module('myTeamApp', [])
.controller('teamCtrl', ['$scope', function ($scope) {
    $scope.pageTitle = "Team Generator";
    $scope.people = [];

	$scope.add = function(){
		
		$scope.people.push($scope.name);
	   	$scope.name = "";
	   	//console.log($scope.people[0].member);
	   	//console.log($scope);
	};

	$scope.remove = function(index){
	    	$scope.people.splice(index, 1);
	};
}]);