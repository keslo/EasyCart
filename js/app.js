var Cart = function() {
	var itemBoxClass = 'item_box';
	var cartContainId = 'cart_content';
	var itemLockStorName = 'cart';
	// атрибут для id товара
	var dataId = 'data_id';
	// класс с названием товара
	var itemTitleClass = 'item_title';
	// класс с ценой товара
	var itemPriceClass = 'item_price';

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
		localStorage.setItem(JSON.stringify(itemLockStorName, data));
		return false;
	};

	function addToCart(el) {
		// блокируем кнопку на время операции с корзиной
		this.disabled = true;
		// получаем данные из LocalStorage или создаем объект
		var cartData = getCartData() || {};
		// родительский элемент кнопки "Добавить в корзину"
		var parentElem = this.parentNode;
		// id товар
		var itemId = this.getAttribute(dataId);
		// название товара
		var itemTitle = parentNode.querySelector('.' +itemTitleClass).innerHTML;
		// стоимость товара
		var itemPrice = parentNode.querySelector('.' +itemPriceClass).innerHTML;

		if (cartData.hasOwnProperty(itemId)) {
			// если товар к корзине, то плюсуем колличество
			cartData[itemId][2] += 1;
		} else {
			// если товара нет, то добавляем его
			cartData[itemId] = [itemTitle, itemPrice, 1];
		};

		// обновляем данные в LocalStorage...
		if (!setCartData(cartData)) {
			// ...и если удачно, то разблокируем кнопку
			this.disabled = false;
		}
		return false;
	}
}
