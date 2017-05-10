//this will need to include the Drink.js file to understand enums.

/*
[IN] stock:  Map of key:value pairs of ingredients and the number of each in the machine.
[IN] drinks: Map of Drinks.
[OUT] CoffeeMachineObject
*/
var CoffeeMachine = function(stock, drinks){
	
	var _drink_choices = drinks || {};
	//the stock items which are stored in the machine.
	var _maxStock = stock || {};
	var _stock = {};
	for (var key in _maxStock)
	{ 
		_stock[key] = _maxStock[key];
	}
	
	this.CanMakeDrink = function(drink){
		//return T/F value
		if (! _drink_choices.hasOwnProperty(drink)) {
			return false;
		}
		var drink = _drink_choices[drink];
		var ingredients = drink.getIngredients();
		var failed = false;
		for (var key in ingredients){
			if (!(_stock[key] && _stock[key] >= ingredients[key])){
				console.log("Stock item causing Failure: "+key);
				failed = true;
				break;
			}
		}
		return !failed;
		
	}
	
	//adjusts the stock item with the number input.
	//[IN] Stock Item
	//[IN] Volume
	//[OUT] Int.   0 success, -1, for error.
	this.AdjustStock = function(stockItem, number){
		if (! _maxStock[stockItem] || isNaN(number)) return -1;
		
		_maxStock[stockItem] = number; 
		_stock[stockItem] = number;
		return 0;
	}
	//adjusts the stock item with the number input.
	//[IN] Stock Item
	//[IN] Volume
	//[OUT] Int.   0 success, -1, for invalid drink, -2 for unmakable.
	this.DispenseDrink = function(drink){
		//console.log("Drink:", drink.getName());
		if (! _drink_choices.hasOwnProperty(drink)) return -1;
		if (! this.CanMakeDrink(drink)) return -2;
		
		var drink = _drink_choices[drink];
		var ingredients = drink.getIngredients();
		for (var key in ingredients){
			_stock[key] -= ingredients[key];
		}
		return 0;
	}
	
	//restocks the drinks to the defined default, or user entered.
	this.Restock = function(){
		_stock = {};
		for (var key in _maxStock){
			_stock[key] = _maxStock[key];
		}
	}
	
	//returns the stock.
	this.GetStock = function(){
		return _stock;
	}
	//returns the max stock, which is adjusted when you adjust the stock.
	this.GetMaxStock = function(){ 
		return _maxStock; 
	}
	
	//returns the full drink list.
	this.GetFullDrinkList = function (){ return _drink_choices; }
	//returns available drinks.
	this.AvailableDrinks = function(){
		var options = {};
		for ( var drink in _drink_choices){
			if (this.CanMakeDrink(drink)){ 
				options[drink] = _drink_choices[drink];
			}
		}
		return options;
	}
}

//Drinks are defined in Drink.js.  These are defined objects in there.
var Drinks = {
	1:Coffee,
	2:Decafe,
	3:Latte,
	4:Americano,
	5:Mocha,
	6:Cappuccino
};
var InitialStock = {};
//set init stock to 10 for all ingredients.  DEFAULT
//this value will also be the max allowable stock.
for (var item in INGREDIENTS){
	InitialStock[INGREDIENTS[item]] = 10;
}
