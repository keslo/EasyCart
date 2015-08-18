function deleteItem() {
	var $cartData = getCartData();
	var $itemId = $(this).parent().parent().attr('data-id');

	delete $cartData[$itemId];

	getCartData($cartData);
	openCart();

	if (isEmpty($cartData)) {
		$('#mini_cart').css('visibility','hidden').removeClass('fadeIn');
		$('#cartModal').modal('hide')
	}
};

module.exports = deleteItem;