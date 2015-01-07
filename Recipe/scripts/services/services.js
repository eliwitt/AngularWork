'use strict';

var services = angular.module('guthub.services',
    ['ngResource']);

services.factory('MultiRecipeLoader', function($http) {
  var json = $http.get('recipes.json').then(function(response) { 
    return response.data;
  });
// http://www.dwmkerr.com/promises-in-angularjs-the-definitive-guide/
  var Recipes = function(data) {
    if (data) angular.copy(data, this);
  };

  Recipes.query = function() {
    return json.then(function(data){
      return data.map(function(recipes){
        return new Recipes(recipes);
      });
    })
  };

  Recipes.get = function(id) {
    return json.then(function(data) {
      var result = null;
      angular.forEach(data, function(recipes){
        if (recipes.id == id) result = new Recipes(recipes);
      });
      //console.log(result);
      return result;
    })
  };

  return Recipes;
});

/*
services.factory('Recipe', ['$resource',
    function($resource) {
  return $resource('http://localhost/AngularWrk/Recipe/recipes.json');
  //return $resource('recipes/:id', {id: '@id'});
}]);

services.factory('MultiRecipeLoader', ['Recipe', '$q',
    function(Recipe, $q) {
  return function() {
    var delay = $q.defer();
    Recipe.query(function(recipes) {
      delay.resolve(recipes);
    }, function() {
      delay.reject('Unable to fetch recipes');
    });
    console.log(recipes);
    return delay.promise;
  };
}]);

services.factory('RecipeLoader', ['Recipe', '$route', '$q',
    function(Recipe, $route, $q) {
  return function() {
    var delay = $q.defer();
    Recipe.get({id: $route.current.params.recipeId}, function(recipe) {
      delay.resolve(recipe);
    }, function() {
      delay.reject('Unable to fetch recipe '  + $route.current.params.recipeId);
    });
    return delay.promise;
  };
}]);



  Recipes.insertRecipe = function(title, description, instructions) {
    var topID = 4;
    json.push({
        "id": topID,
        "title": title,
        "description": description,
        "ingredients": [{}],
        "instructions": instructions
      });
  };
*/