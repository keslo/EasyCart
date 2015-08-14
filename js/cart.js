/*
::::::::::::::::::::::::::::::::::::::::
 Snippet name: easyCartModx
 Short Desc: builds shoping cart for site on MODX
 Version: 0.1
 Authors: 
	Anton Kolesnikov (info@kanby.ru)
 Date: July 14, 2015
::::::::::::::::::::::::::::::::::::::::
*/


window.onload = function() {
	
	/* инициализация таблицы-прайса
	Вначале проверяем наличие таблицы-прайса на странице.
	Класс таблицы с прайсом должен быть => table-price.
	Подразумевается такая структура колонок таблицы прайса:

		| Артикул | Наименование | Стоимость |
		
	*/

	// проверяем наличие прайса на странице
	function priceOnPage(){
		if (document.getElementsByTagName('table').lenght === 0) {
			var tables = document.getElementsByTagName('table');

			for (var i=0, tablesLength = tables.length; i<tablesLength; i++) {
				if (tables[i].classList.contains('table-price')) {
					return tables[i];
				};
			};
		};
	};

	// если прайса нет на странице, то останавливаем весь скрипт
	if (priceOnPage() === undefined) {
		return false;
	};

	// задаем использумые классы элементов таблицы
	var option = ['item-id', 'item-title', 'item-price'];

	// берем tr - строка с данными
	var table = priceOnPage();
	var itemBox = table.getElementsByTagName('tr');
	
	for (var i=1, itemRowTotal = itemBox.length; i<itemRowTotal; i++) {
		
		// добавляем ячейку td для кнопки
		var td = document.createElement("td");
		itemBox[i].appendChild(td); 

		var item = itemBox[i].getElementsByTagName('td');

		// добавляем классы ячейкам td
		for (var j=0, itemCellTotal = item.length; j<itemCellTotal; j++) {
			
			// добавляем кнопку "Добавить" в каждую строку tr
			if (j == item.length-1) {
				item[j].innerHTML = '<a class="add_item">Добавить в корзину</a>';
				continue;
			}
			
			item[j].setAttribute('class', option[j]);
		};
	};
	
	/* Набор стандартных кроссбраузерных функций */
	
	// кроссбраузерная установка обработчиков
	function addEvent(el, type, handler) {
		if (el.addEventListener) {
			/* Chrome, Mozilla, Opera, Safari */
			el.addEventListener(type, handler);
		} else {
			/* IE */
			elem.attachEvent('on' +type, function() {
				handler.call(elem);
			});
		};
		return false;
	};
	
	// получение/запись данных в LocalStorage
	function getCartData(item) {
		if (item) {
			// если передаются даныне, то записываем...
			localStorage.setItem('cart', JSON.stringify(item));
			return false;
		} else {
			// ... либо получаем
			return JSON.parse(localStorage.getItem('cart'));
		};	
	};

	// проверка объекта на пустоту
	function isEmpty(obj) {
		var count = 0;
		for (var key in obj) {
			count++;
		};

		if (count>0) {
			return false;
		};
		return true;
	};

	/* Основной функционал */

	// если LS не пуст, то показываем мини-корзину и формируем таблицу в модальном окне
	if (!isEmpty(getCartData())) {
		miniOpenCart();
		openCart();
	};

	// Добавляем товар в корзину
	function addToCart(e){
		this.disabled = true; // блокируем кнопку на время операции с корзиной
		var cartData = getCartData() || {}; // получаем данные корзины или создаём новый объект, если данных еще нет
      	var parentBox = this.parentNode.parentNode; // родительский элемент кнопки "Добавить в корзину"
      	var itemId = parentBox.getAttribute('data-id'); // ID товара
      	var itemTitle = parentBox.querySelector('.item-title').innerHTML; // название товара
      	var itemPrice = parentBox.querySelector('.item-price').innerHTML; // стоимость товара

  		if (cartData.hasOwnProperty(itemId)){ // если такой товар уже в корзине, то добавляем +1 к его количеству
  			cartData[itemId][2] += 1;
  		} else { // если товара в корзине еще нет, то добавляем в объект
  			cartData[itemId] = [itemTitle, itemPrice, 1];
  		};

  		if (!getCartData(cartData)){ // Обновляем данные в LocalStorage
    		this.disabled = false; // разблокируем кнопку после обновления LS
    	};

		miniOpenCart(); // показываем корзину
		openCart();
		return false;
	};
	
	// Удаляем товар из корзины
	function deleteItem() {
		var cartData = getCartData();
		var id = this.parentNode.parentNode.getAttribute('data-id');
		delete cartData[id];
		getCartData(cartData);
		openCart();

		// если пусто, то удаляем виджет корзины и модальное окно
		if (isEmpty(cartData)) {
			var miniCart = document.getElementById('mini_cart');
			miniCart.style.visibility = 'hidden';
			miniCart.classList.remove('fadeIn');

			var cartModal = document.getElementById('cartModal');
			cartModal.classList.remove('in');
		};
	};

	// Добавляем обработчик на кнопки
	var items = document.getElementsByClassName('add_item');
	for (var i=0; i<items.length; i++) {
		addEvent(items[i], 'click', addToCart);
	};
	
	// мини карта корзины
	function miniOpenCart() {
		var items = getCartData();
		var count = 0;
		
		for (var key in items) {
			count++;
		};
		
		var miniCart = document.getElementById('mini_cart');
		miniCart.classList.add('animated');
		miniCart.classList.add('fadeIn');
		miniCart.style.visibility = 'visible';
		document.getElementById('count').innerHTML = count;
	};
	
	// формируем и показываем корзину
	function openCart() {
		var data = getCartData();

		// формируем корзину в модальном окне
		var output = '<table class="table"><tr><td>Наименование</td><td>Цена</td><td>Кол-во</td><td></td></tr><tr>';

		for (var key in data) {
			output += '<tr data-id="' + key + '">';
			
			for (var i=0; i<data[key].length; i++) {
				output += '<td>' + data[key][i] + '</td>';
			};
			
			output += '<td><a class="delete_item">Удалить</a></td>';
			output += '</tr>';
		};
		
		output += '</table>';
		
		var cart = document.getElementById('cart-in-modal');
		cart.innerHTML = output;

		//  добавялем кнопку "Удалить"
		var deleteItems = cart.getElementsByClassName('delete_item');
		
		for (var i=0; i<deleteItems.length; i++) {
			addEvent(deleteItems[i], 'click', deleteItem);
		};

		// формируем шаблон report для eForm
		var report = '<table><tr><td>Наименование</td><td>Цена</td><td>Кол-во</td></tr><tr>';

		for (var key in data) {
			report += '<tr>';

			for (var i=0; i<data[key].length; i++) {
				report += '<td>' +data[key][i]+ '</td>';
			};

			report += '</tr>';
		};

		var input = document.getElementById('input-cart-modal');
		input.value = report;
	};

	/* Модальное окно */
	(function() {
		var temp = $('#myModal_form').html();
		$("body").on("submit", "#cart_modal", function(e) {
			e.preventDefault();
			var m_method=$(this).attr('method');
			var m_action=$(this).attr('action');
			var m_data=$(this).serialize();
			$.ajax({
				type: m_method,
				url: m_action,
				data: m_data,
				resetForm: 'true',
				success: function(result){
					var response = $(result).find('#myModal_form').html();
					$('#myModal_form').html(response);
					localStorage.clear();

					// удаляем мини-корзину
					if (isEmpty(getCartData())) {
						var miniCart = document.getElementById('mini_cart');
						miniCart.style.visibility = 'hidden';
					};

					// скрываем модальное окно
					$('#myModal_form').html(temp);
					var cartModal = document.getElementById('cartModal');
					cartModal.classList.remove('in');

				},
				error: function(err) {
					var response = $(result).find('#myModal_form').html();
					$('#myModal_form').html(response);
				}
			});
		});
	}());
}

