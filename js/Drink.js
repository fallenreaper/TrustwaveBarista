//ENUM of ingredients.
var INGREDIENTS = {
	SUGAR: "Sugar",
	CREAM: "Cream",
	WHIPPED_CREAM: "Shipped_Cream",
	STEAMED_MILK: "Steamed_Milk",
	ESPRESSO: "Espresso",
	COCOA: "Cocoa",
	FOAMED_MILK: "Foamed_Milk",
	REGULAR_COFFEE: "Regular_Coffee",
	DECAF_COFFEE: "Decaf_Coffee"
}
//Costs for ingredients.
var COSTS = {}
	COSTS[INGREDIENTS.REGULAR_COFFEE]= 0.75;
	COSTS[INGREDIENTS.DECAF_COFFEE]= 0.75;
	COSTS[INGREDIENTS.SUGAR]= 0.25;
	COSTS[INGREDIENTS.CREAM]= 0.25;
	COSTS[INGREDIENTS.STEAMED_MILK]= 0.35;
	COSTS[INGREDIENTS.FOAMED_MILK]= 0.35;
	COSTS[INGREDIENTS.ESPRESSO]= 1.10;
	COSTS[INGREDIENTS.COCOA]= 0.90;
	COSTS[INGREDIENTS.WHIPPED_CREAM]= 1;
	
//function to just turn a enum sting into a proper string.
var ConvertIString = function(ingredient){
	return ingredient.replace("_"," ");
}

//Drink object, has everything to do with the individual drink.  Ingredients, costs, etc.
//[IN] Name of the drink.
//[IN] Ingredients, hash map as per the Ingredients section
//[OUT] Drink Object.
var Drink = function(name, ingredients){
	var _name = name || "";
	var _ingredients = ingredients || {};
	var _id = _name.replace(" ", "_");
	var _cost = 0;
	
	this.getName = function(){ return _name; }
	this.setName = function(name){ 
		_name = name; 
		_id = _name.replace(" ", "_");
	}
	
	this.getId = function(){return _id;}
	
	this.getIngredients = function(){ return _ingredients;}
	
	//sets the ingredients and then recalculates the cost of the particular drink.
	this.setIngredients = function(ingredients){ 
		_ingredients = ingredients; 
		_recalculateCost();
	}
	
	this.getCost = function(){ return _cost;}
	
	//Used to calculate the cost of the items.  This is run once, but is run again if ingredients are adjusted.
	var _recalculateCost = function() {
		_cost = 0;
		//loops over ingredients to determine cost.
		for (var key in _ingredients){
			_cost += _ingredients[key] * COSTS[key];
		}
		
		//cut trailing cost issues.  Example in tests, the cost of an Americano was: 3.3000000000003, so i wanted to truncate.
		_cost = Math.floor(_cost * 100) / 100;
	};
	_recalculateCost();
	
}


//Ingredients for Items.
var coffee = {};
	coffee[INGREDIENTS.REGULAR_COFFEE]= 3;
	coffee[INGREDIENTS.SUGAR]=			1;
	coffee[INGREDIENTS.CREAM]=			1;
var decaf = {};
	decaf[INGREDIENTS.DECAF_COFFEE]=	3;
	decaf[INGREDIENTS.SUGAR]= 			1;
	decaf[INGREDIENTS.CREAM]=			1;
var latte = {};
	latte[INGREDIENTS.ESPRESSO]= 		2;
	latte[INGREDIENTS.STEAMED_MILK]= 	1;
var americano = {};
	americano[INGREDIENTS.ESPRESSO]= 	3;
var mocha = {};
	mocha[INGREDIENTS.ESPRESSO]=		1;
	mocha[INGREDIENTS.COCOA]= 			1;
	mocha[INGREDIENTS.STEAMED_MILK]=	1;
	mocha[INGREDIENTS.WHIPPED_CREAM]= 	1;
var cappuccino = {};
	cappuccino[INGREDIENTS.ESPRESSO]= 		2;
	cappuccino[INGREDIENTS.STEAMED_MILK]= 	1;
	cappuccino[INGREDIENTS.FOAMED_MILK]=	1;

//Instantiation of various drinks globals
var Coffee = new Drink("Coffee", coffee);
var Decafe = new Drink("Decaf Coffee", decaf);
var Latte =  new Drink("Caffe Latte", latte);
var Americano = new Drink("Caffe Americano", americano);
var Mocha = new Drink("Caffe Mocha", mocha);
var Cappuccino = new Drink("Cappuccino", cappuccino);

