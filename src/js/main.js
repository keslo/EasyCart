
$(document).ready( function() {
	require('./getCartData.js');
	var addToCart = require('./addToCart.js');
	var deleteItem = require('./deleteItem');
	var miniOpenCart = require('./miniOpenCart.js');
	var openCart = require('./openCart.js');
	var isEmpty = require('./isEmpty.js');

	require('./modal.js');

	// if not price then stop script
	if ($('#sf').lenght === 0) {
		return false;
	};

	// if LS is not empty then show carts
	if (!isEmpty(getCartData())) {
		miniOpenCart();
		openCart();
	};

	// add class and button
	var classes = ['item-id', 'item-title', 'item-price', 'delete-btn'];
	var $rows = $('#sf tbody tr');
	var $link = $('<a>').addClass('add_item').text('Добавить в корзину');
	var $cell = $('<td>').append($link);
	var $cells;

	$rows.append($cell);
	$cells = $rows.find('td');

	$cells.each( function(index, cell) {
		$(cell).addClass(classes[index % classes.length]);
	});

	// event 'Add item' to button
	var $buttons = $('.add_item');

	$buttons.each( function() {
		$(this).on('click', addToCart);
	});
});