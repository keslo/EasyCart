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
	
	function getCartData(item) {
		if (item) {
			localStorage.setItem('cart', JSON.stringify(item));
			return false;
		} else {
			return JSON.parse(localStorage.getItem('cart'));
		};	
	};

	function isEmpty(obj) {
		return $.isEmptyObject(obj);
	};

	/* Main functions */

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
	
	function miniOpenCart() {
		var $items = getCartData();
		var $count = 0;
		
		for (var key in $items) {
			$count++;
		};

		$('#mini_cart').addClass('animated fadeIn').css('visibility', 'visible');
		$('#count').text($count);
	};
	
	// OpenCart in Modal
	function openCart() {
		var $data = getCartData();

		var $output = '<table class="table"><tr><td>Наименование</td><td>Цена</td><td>Кол-во</td><td></td></tr><tr>';

		for (var key in $data) {
			$output += '<tr data-id="' + key + '">';
			
			for (var i=0; i<$data[key].length; i++) {
				$output += '<td>' + $data[key][i] + '</td>';
			};
			
			$output += '<td><a class="delete_item">Удалить</a></td>';
			$output += '</tr>';
		};
		
		$output += '</table>';
		
		$('#cart-in-modal').html($output);

		$('.delete_item').each( function() {
			$(this).on('click', deleteItem);
		});

		// report data eForm
		var $report = '<table><tr><td>Наименование</td><td>Цена</td><td>Кол-во</td></tr><tr>';

		for (var key in $data) {
			$report += '<tr>';

			for (var i=0; i<$data[key].length; i++) {
				$report += '<td>' +$data[key][i]+ '</td>';
			};

			$report += '</tr>';
		};

		$report += '</table>';

		$('#input-cart-modal').val($report);
	};

	/* End functions  */

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

	/* Modal */
	(function() {
		var $temp = $('#myModal_form').html();

		$("body").on("submit", "#cart_modal", function(e) {
			e.preventDefault();
			var $m_method=$(this).attr('method');
			var $m_action=$(this).attr('action');
			var $m_data=$(this).serialize();
			$.ajax({
				type: $m_method,
				url:  $m_action,
				data: $m_data,
				resetForm: 'true',
				success: function(result){
					var $response = $(result).find('#myModal_form').html();
					$('#myModal_form').html($response);
					localStorage.clear();

					// hide MiniCart
					if (isEmpty(getCartData())) {
						$('#mini_cart').css('visibility','hidden');
					};

					// hide Modal
					$('#myModal_form').html($temp);
					$('#cartModal').modal('hide');
				},
				error: function(err) {
					var $response = $(result).find('#myModal_form').html();
					$('#myModal_form').html($response);
				}
			});
		});
	}());
}

