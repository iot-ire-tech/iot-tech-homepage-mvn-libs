// Add Tp Cart
//		for (let i = 0; i < imageArray.length; i++) {
//			shoppingItems[i].addEventListener("click", function () {
//				console.log("you clicked region number " + i);
//			});
//		}

var shoppingItems = new Map()
$(document).on("change ", '.quantity', function () {
	var id = parseInt($(this).attr("id").split("_")[1])
	tmp = shoppingItems.get(id)
	tmp.quantity = parseInt($("#quantity_" + id).val());
	shoppingItems.set(id, tmp)

	calcRt(shoppingItems)
});
$(document).on("click", '.shop', function () {
	var id = parseInt($(this).attr("id").split("_")[1])


	if ($(this).is(':checked')) {
		shoppingItems.set(id,
			{
				"accountId": $("#accountId_" + id).text(),
				"cost": parseFloat($("#cost_" + id).text()),
				"description": $("#desc_" + id).text(),
				"name": $("#name_" + id).text(),
				"quantity": 1
			}
		)

		$("#firstrow").after(mycart.addItem(shoppingItems.get(id), id))

		calcRt(shoppingItems)

	} else {
// Remove item from bill
		shoppingItems.delete(id)
		// Update Cart Widget
		$("#item_" + id).empty().remove();

		calcRt(shoppingItems)

	}

});

function calcRt(shoppingItems) {
	var rt = 0.00;
	var st = 0.00;

	shoppingItems.forEach(function (item) {
		st = item.cost * item.quantity
		rt += st;
	})
	$("#rt").text(rt);
}
//# sourceURL=stripe_shop_change_shopping.js