//Set Javascript Events here.
			$(function(){
				//set up tooltips
				$("input").attr("title", "Editing this field will adjust the Current AND Maximum stock of this machine. If you wish to just restock to previously design values, press the Restock button.");
				$("#restock").attr("title", "Restocks inventory to last set size capacities.");
				$(".drinks li > span").attr("title", "Click to Purchase");
				$(document).tooltip();
				
				//initially hides the bought flasher
				$("#drink_bought").hide();
				
				var adjustDrinks = function(){
				//adjust purchasable drinks to show what is acquirable.
					var drinks = CM.GetFullDrinkList();
					var drink_options = $("ul.drinks");
					for ( var drink in drinks){
						if (CM.CanMakeDrink(drink)){
							//show item
							drink_options.find("#"+drinks[drink].getId()).parent().show();
						}else{
							//hide item
							drink_options.find("#"+drinks[drink].getId()).parent().hide();
							
						}
					}
				}
				
				var appendToDrinkList = function(drink){
					var d = $("<li />").append("Dispensing: ").append(drink.getName());
					$("#acquired").append(d);
				}
				
				$("body").on("change", ".inventory input", function(){
					//adjusts the stock of ingredients.
					var name = $(this).attr("name");
					var val = $(this).val();
					
					CM.AdjustStock(name, val);
					adjustDrinks();
					
					//adjusted the max stock value after adjusting.
					$("span.stock_value."+name).html(CM.GetStock()[name]);
				});
			
				$("body").on("click", ".drinks > li", function(){ 
					//dispenses a drink and then updates stock.
					var id = $(this).index() + 1;
					var list = CM.GetFullDrinkList();
					var errorCode = CM.DispenseDrink(id);
					var ingredients = CM.GetStock();
					for (var i in ingredients){
						$("input[name='"+i+"']").val(ingredients[i])
					}
					//adjust the visible drinks per ingredients
					adjustDrinks();
					
					//show which was bought for a second.
					$("#drink_bought").html(list[id].getName()).show().fadeOut(1000);
					appendToDrinkList(list[id]);
				});
				
				$("#restock").on("click", function(){
					CM.Restock();
					var ingredients = CM.GetStock();
					for (var i in ingredients){
						$("input[name='"+i+"']").val(ingredients[i])
					}
					adjustDrinks();
					
					//empty out the purchased list.
					$("#acquired").empty();
				});
			})