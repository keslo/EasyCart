(function() {
	var itemBoxClass = 'item_box';
	var cartContainId = 'cart_content';
	var itemLockStorName = 'cart';
	// атрибут для id товара
	var dataId = 'data_id';
	// класс с названием товара
	var itemTitleClass = 'item_title';
	// класс с ценой товара
	var itemPriceClass = 'item_price';
	var checkoutId = 'checkout';

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

	/* добавяем товар в Корзину */
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
	};

	/* удаляем товар из Корзины */
	function deleteItemCart() {
		// ссылка на атрибут id в строке товара в table : this > td > tr
		var id = this.parentNode.parentNode.getAttribute('data_id');
		// получаем список товара
		var cartData = getCartData() || {};
		// удаляем товар
		delete cartData[id];
		// отправляем изменения в LocalStorage
		setCartData(cartData);
		// имитируем событие "оформить заказ"
		document.getElementById(checkoutId).click();
	};

}());
