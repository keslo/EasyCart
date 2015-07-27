window.onload = function() {
	var itemBoxClass = 'item_box';
	var cartContainId = 'cart_content';
	var itemLockStorName = 'cart';
	var itemAddClass = 'add_item';
	// атрибут для id товара
	var dataId = 'data_id';
	// класс с названием товара
	var itemTitleClass = '.item_title';
	// класс с ценой товара
	var itemPriceClass = '.item_price';
	var checkoutId = 'checkout';
	var clearCartId = 'clear_cart';

	/* Вспомогательные функции */

	/* кроссбрузерная установка обработчика */
	function addEvent(elem, type, handler) {
		if (elem.addEventListener) {
			/* Chrome, Mozilla, Opera, Safari */
			elem.addEventListener(type, handler, false);
		} else {
			/* IE */
			elem.attachEvent('on' +type, function() {
				handler.call(elem);
			});
		}
		return false;
	};

	/* получение данных из LocalStorage */
	function getCartData() {
		return JSON.parse(localStorage.getItem(itemLockStorName));
	};

	/* запись в LocalStorage */
	function setCartData(data) {
		localStorage.setItem(itemLockStorName, JSON.stringify(data));
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
		var itemId = this.getAttribute('data-id');
		// название товара
		var itemTitle = parentElem.querySelector(itemTitleClass).innerHTML;
		// стоимость товара
		var itemPrice = parentElem.querySelector(itemPriceClass).innerHTML;

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
		};

		console.log('Товар добавлен');

		var contain = document.getElementById(cartContainId);
		console.log(contain.className);
		openCart();
		if (contain.className !== 'animated bounceInLeft') {
			contain.className = 'animated bounceInLeft';
		};

		return false;

	};

	/* удаляем товар из Корзины */
	function deleteItemCart() {
		// ссылка на атрибут id в строке товара в table : this > td > tr
		var id = this.parentNode.parentNode.getAttribute('data-id');
		// получаем список товара
		var cartData = getCartData() || {};
		// удаляем товар
		delete cartData[id];
		// отправляем изменения в LocalStorage
		setCartData(cartData);
		// имитируем событие "оформить заказ"
		document.getElementById(checkoutId).click();
		console.log('Товар удален');

		// удаляем корзину с экрана
		if (Object.keys(cartData) == '') {
			var contain = document.getElementById(cartContainId);
			contain.className = 'animated bounceOutLeft';
		}
	};

	/* устанавливаем событие "Добавить..." на каждый товар */
	// ищем все карточки товаров...
	var itemBox = document.querySelectorAll('.' +itemBoxClass);
	for (var i = 0; i<itemBox.length; i++) {
		// ...а в них кнопки и добавляем обработчик
		addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
	};

	/* Формируем и отображаем корзину товаров */
	function openCart() {
		// получаем данные из LocalStorage
		var cartData = getCartData();
		var cartContain = document.getElementById(cartContainId);
		var totalItem = '';

		// еслик корзина не пуста, то формируем html вывод
		if (cartData !== null) {
			totalItem = '<table class="shopping_list"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th></tr>';
			for (item in cartData) {
				// добавляем в tr в data-id номер товара
				totalItem += '<tr data-id=' +item+ '>';
				// наполняем карточку товара
				for (var i=0; i<cartData[item].length; i++) {
					totalItem += '<td>' +cartData[item][i]+ '</td>';
				};
				// добавляем кнопку "Удалить..."
				totalItem += '<td><button class="delete_item">Удалить товар</button></td>';
				totalItem += '</tr>';
			}
			totalItem += '</table>';

			// добавляем сформированную корзину на страницу
			cartContain.innerHTML = totalItem;

			// добавляем событие "Удалить..." на кнопки в корзине
			var delBtn = document.getElementsByClassName('delete_item');
			for (var i=0; i<delBtn.length; i++) {
				addEvent(delBtn[i], 'click', deleteItemCart);
			};

		} else {
			// если в корзине пусто, то сообщаем об этом
			cartContain.innerHTML = 'В корзине пусто!';
		}
		return false;
	};

	/* Открыть корзину */
	addEvent(document.getElementById('checkout'), 'click', openCart);

	/* Очистить корзину */
	addEvent(document.getElementById('clear_cart'), 'click', function(e) {
		localStorage.removeItem(itemLockStorName);
		var cartContain = document.getElementById(cartContainId);
		cartContain.innerHTML = 'Корзина очищена.';

		// показываем корзину на экране
		var contain = document.getElementById(cartContainId);
		contain.className = 'animated bounceOutLeft';
	});

};
