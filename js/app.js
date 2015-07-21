var Cart = function() {
	var itemBoxClass = 'item_box';
	var cartContainId = 'cart_content';
	var itemLockStorName = 'cart';

	/* Вспомогательные функции */

	/* кроссбрузерная установка обработчика */
	function addEvent(el, type, handler) {
		if (el.addEventListener) {
			/* Chrome, Mozilla, Opera, Safari */
			el.addEventLstener(type, handler, false);
		} else {
			/* IE */
			el.attachEvent('on' +type, function() {
				handler.call(el);
			});
		}
	};

	/* получение данных из LocalStorage */
	function getCartData() {
		return JSON.parse(localStorage.getItem(itemLockStorName));
	};

	/* запись в LocalStorage */
	function setCartData(data) {
	}
}
