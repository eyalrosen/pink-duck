 var app = angular.module('iSammy', ['ngAnimate']);

var s;

 app.controller('myController', function($scope) {

 	s = $scope;

 	$scope.totalGrams = 0;
 	$scope.newPlasticRecycle = false;
 	$scope.newPaperRecycle = false;
 	$scope.newRecycleModel = null;

 	var mock = function() {
 		
 		var list = [
 			{ type: 'plastic', grams: 215 },
 			{ type: 'paper', grams: 310 },
 			{ type: 'plastic', grams: 532 },
 			{ type: 'paper', grams: 821 },
 			{ type: 'paper', grams: 512 }
 		];

 		var i = 0;

 		setInterval(function() {
 			$scope.$apply(function() {
	 			$scope.newRecycle(list[i]);
	 			if (i == list.length - 1) {
	 				i = 0;			
	 			} else {
		 			i++; 	
	 			}
 			});
 		}, 3000);


 	}

 	$scope.init = function() {
 		mock();
 	};

 	$scope.newRecycle = function(newRecycle) {
 		
 		$scope.newRecycleModel = newRecycle;
 		if (newRecycle.type == 'plastic') {
 			$scope.newPlasticRecycle = true; 			
 		} else {
 			$scope.newPaperRecycle = true;
 		}

 		setTimeout(function() {
 			$scope.$apply(function() {
	 			$scope.newPlasticRecycle = false;
	 			$scope.newPaperRecycle = false;
		 		$scope.totalGrams += newRecycle.grams;
 			});
 		}, 1500);

 	}

 });