var app = angular.module('iSammy', ['ngAnimate']);

var s;

app.filter('ucfirst', function() {

	return function(input) {
		if (input == null) return;
	 	input = input.toLowerCase();
	 	return input.substring(0,1).toUpperCase()+input.substring(1);
	}

});

app.controller('myController', function($scope) {

 	s = $scope;

 	$scope.totalGrams = 0;
 	$scope.totalGramsToDisplay = 0;
 	
 	$scope.newRecycleModel = null;
 	$scope.showNewRecycle = false;
 	
 	$scope.showBadge = false;
 	$scope.badge = null;
 	$scope.badges = [{ name: 'lightbulb', grams: 300 }, 
 					{ name: 'tree', grams: 700 }, 
 					{ name: 'dolphin', grams: 1000 }, 
 					{ name: 'planet', grams: 1300 }];
 	

 	$scope.mock = function() {
 		
 		var randomType = 'paper', maximumGrams = 250, randomGrams;

 		setInterval(function() {
 			$scope.$apply(function() {
 				randomGrams = Math.floor((Math.random() * maximumGrams) + 40);
 				randomType = (randomType == 'plastic') ? 'paper' : 'plastic';

	 			$scope.newRecycle({ type: randomType, grams: randomGrams });
 			});
 		}, 4000);


 	}

 	$scope.init = function() {
 		$scope.mock(); 		
 		
 	};

 	$scope.newRecycle = function(newRecycle) {
 		
 		$scope.newRecycleModel = newRecycle;
 		$scope.showNewRecycle = true;

 		setTimeout(function() {
 			$scope.$apply(function() {
	 			$scope.showNewRecycle = false;
		 		$scope.totalGrams += newRecycle.grams;
 			});
 		}, 1500);

 	}

 	$scope.newBadge = function(badge) {

 		if (badge.name == $scope.badge) return;

 		$scope.showBadge = false;
 		setTimeout(function() {
 			$scope.$apply(function() {

 				$scope.badge = badge.name;
		 		$scope.showBadge = true;

 			});
 		}, 100);
 	}

 	$scope.$watch('totalGrams', function(newValue, oldValue) {
 		if (newValue == 0) return;
		
		var interval = setInterval(function() {
			oldValue++;
			$scope.$apply(function() {
				$scope.totalGramsToDisplay = oldValue;
			});
			if (oldValue >= newValue) {
				clearInterval(interval);
			}
		}, 1);

		for (i = $scope.badges.length - 1; i > -1; i--) {
			var badge = $scope.badges[i];
			if (newValue >= badge.grams) {
				$scope.newBadge(badge);
				break;
			}
		}
		/*
		_.each($scope.badges.reverse(), function(badge) {
			if (newValue >= badge.grams) {
				$scope.newBadge(badge);
				break;
			}
		});*/

 	});

 });