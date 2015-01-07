'use strict';

var app = angular.module('guthub',
    ['guthub.directives', 'guthub.services']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {
        controller: 'ListCtrl',
        templateUrl:'views/list.html'
      }).when('/edit/:recipeId', {
        controller: 'EditCtrl',
        templateUrl:'views/recipeForm.html'
      }).when('/view/:recipeId', {
        controller: 'ViewCtrl',
        templateUrl:'views/viewRecipe.html'
      }).when('/new', {
        controller: 'NewCtrl',
        templateUrl:'views/recipeForm.html'
      }).otherwise({redirectTo:'/'});
}]);

app.controller('ListCtrl', function(MultiRecipeLoader, $scope) {
  $scope.recipes = MultiRecipeLoader.query();
});

app.controller('ViewCtrl', function(MultiRecipeLoader, $scope, $routeParams, $location) {
  //console.log($routeParams.recipeId);

  $scope.recipe = MultiRecipeLoader.get($routeParams.recipeId);

  $scope.edit = function() {
    $location.path('/edit/' + $routeParams.recipeId);
  };
});

app.controller('EditCtrl', function(MultiRecipeLoader, $scope, $routeParams, $location) {
  $scope.recipe = MultiRecipeLoader.get($routeParams.recipeId);

  $scope.save = function() {
    $scope.recipe.$save(function(recipe) {
      $location.path('/view/' + $routeParams.recipeId);
    });
  };

  $scope.remove = function() {
    delete $scope.recipe;
    $location.path('/');
  };
});

app.controller('NewCtrl', function(MultiRecipeLoader, $scope, $location) {
  /*
  $scope.recipe = new Recipe({
    ingredients: [ {} ]
  });
  
  $scope.recipes = MultiRecipeLoader.query();
  console.log($scope.recipes);
  */
  
  $scope.save = function() {
    $scope.recipes = MultiRecipeLoader.query();
    console.log($scope.recipes.length);
    var topID = $scope.recipes.length + 1;
    $scope.recipes.push({
      id: topID, 
      title: $scope.recipe.title,
      description: $scope.recipe.description, 
      ingredients: $scope.recipe.ingredients,
      instructions: $scope.recipe.instructions
      });
    console.log($scope.recipes);
      /*
    $scope.recipe.$save(function(recipe) {
      $location.path('/view/' + recipe.id);
    });
      */
  };
});

app.controller('IngredientsCtrl', function($scope) {
  $scope.addIngredient = function() {
    var ingredients = $scope.recipe.ingredients;
    ingredients[ingredients.length] = {};
  };

  $scope.removeIngredient = function(index) {
    $scope.recipe.ingredients.splice(index, 1);
  };
});