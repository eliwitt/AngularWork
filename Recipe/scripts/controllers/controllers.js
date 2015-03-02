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
  $scope.recipe = new Recipes({
    ingredients: [ {
                    amount: '0.00',
                    amountUnits: '',
                    ingredientName: ''
                } ]
  });

   $scope.save = function(recipe) {
    //$scope.recipes = MultiRecipeLoader.query();
    console.log($scope.recipes.then.length);
    var topID = $scope.recipes.then.length + 1;
    $scope.recipe = ({
      id: topID,
      title: recipe.title,
      ingredients: [ {
                    amount: '0.00',
                    amountUnits: '',
                    ingredientName: ''
                } ],
      description: recipe.description,
      instructions: recipe.instructions
    });
    $scope.recipes.push(
      recipe
      );
    //console.log($scope.recipes);
      /*
ingredients: $scope.recipe.ingredients,
*/
    $scope.recipe.$save(function(recipe) {
      $location.path('/view/' + recipe.id);
    });
      
  };
});

app.controller('IngredientsCtrl', function($scope) {
  $scope.addIngredient = function(recipe) {
    //var ingredients = $scope.recipes.ingredients+1;
    //ingredients[ingredients.length] = {};

   recipe.ingredients.push([{
                    amount: '0.00',
                    amountUnits: '',
                    ingredientName: ''
                }]);
  };

  $scope.removeIngredient = function(index) {
    $scope.recipe.ingredients.splice(index, 1);
  };
});