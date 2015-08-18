function getCartData(item) {
	if (item) {
		localStorage.setItem('cart', JSON.stringify(item));
		return false;
	} else {
		return JSON.parse(localStorage.getItem('cart'));
	};	
};

module.exports = getCartData;