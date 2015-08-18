function miniOpenCart() {

	var getCartData = require('./getCartData.js');

	var $items = getCartData();
	var $count = 0;
	
	for (var key in $items) {
		$count++;
	};

	$('#mini_cart').addClass('animated fadeIn').css('visibility', 'visible');
	$('#count').text($count);
};

module.exports = miniOpenCart;