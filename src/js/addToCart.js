function addToCart(e){
	this.disabled = true;
	var $cartData = getCartData() || {};

	var $parentRow = $(this).parent().parent();
	console.log($(this), $(this).parent(), $(this).parent().parent());
	var $itemId = $parentRow.attr('data-id');
	var $itemTitle = $parentRow.find('.item-title').html();
	var $itemPrice = $parentRow.find('.item-price').html();

		if ($cartData.hasOwnProperty($itemId)){
			$cartData[$itemId][2] += 1;
		} else {
			$cartData[$itemId] = [$itemTitle, $itemPrice, 1];
		};

		if (!getCartData($cartData)){
		this.disabled = false;
	};

	miniOpenCart();
	openCart();
	return false;
};

module.exports = addToCart;