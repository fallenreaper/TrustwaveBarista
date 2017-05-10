(function(){
	var app = angular.module("Trustwave", []);
	
	app.controller("Ingredients", function(){
		var machine = this;
		
		machine.ingredients = CM.GetStock();
		//console.log(machine.ingredients);
		/*
		MyFactory.load().then(function(data){ 
			machine.ingredients = data.data;
			});//if (MyService.get()==='undefined') MyService.load();
		*/
		//console.log(machine.ingredients);
		this.addIngredient = function(ingredient){ machine.ingredients.push(ingredient);	};
		this.GetIngredients = function(){ 
			//console.log("ping"); 
			//console.log(machine.ingredients);
			return machine.ingredients; 
		};
		
		
		
	});
	
	app.controller("Drinks", function(){
		var machine = this;
		//console.log("DRINkS:", Drinks);
		machine.drinks = CM.GetFullDrinkList();
		this.addDrink = function(Drink){machine.drinks.push(Drink)};
		this.GetDrinks = function(){ return machine.drinks;}
		
		/*
		machine.onChange = function(){
			console.log("test", arguments);
			
		}
		*/
	});
	
	/*
	app.factory("MyFactory", ["$http", function($http){
		var myService = {};
		//myService.rows = [];
		myService.get = function(){ 
			return myService.rows;
			};
		myService.load = function(){
			return $http.get("scripts/Query.php").success( function(rows){ 
//				myService.rows = rows;
				return myService.rows;
				});
			};
		return myService;
		
	}]);
	*/
	
	
})();
/*
$(function(){
	var app = angular.module("Bars",[]);
	
});
*/
var sampleData = [];
sampleData.push({title:"Test me 1", address: "Where am i", location:"somewhere", id: 4});
sampleData.push({title:"Test me 2", address: "Where am i", location:"somewhere", id: 4});
sampleData.push({title:"Test me 3", address: "Where am i", location:"somewhere", id: 4});