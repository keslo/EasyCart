/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	$(document).ready( function() {
		__webpack_require__(1);
		var addToCart = __webpack_require__(2);
		var deleteItem = __webpack_require__(3);
		var miniOpenCart = __webpack_require__(4);
		var openCart = __webpack_require__(5);
		var isEmpty = __webpack_require__(6);

		__webpack_require__(7);

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

/***/ },
/* 1 */
/***/ function(module, exports) {

	function getCartData(item) {
		if (item) {
			localStorage.setItem('cart', JSON.stringify(item));
			return false;
		} else {
			return JSON.parse(localStorage.getItem('cart'));
		};	
	};

	module.exports = getCartData;

/***/ },
/* 2 */
/***/ function(module, exports) {

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

	module.exports = addToCart;

/***/ },
/* 3 */
/***/ function(module, exports) {

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

/***/ },
/* 4 */
/***/ function(module, exports) {

	function miniOpenCart() {
		var $items = getCartData();
		var $count = 0;
		
		for (var key in $items) {
			$count++;
		};

		$('#mini_cart').addClass('animated fadeIn').css('visibility', 'visible');
		$('#count').text($count);
	};

	module.exports = miniOpenCart;

/***/ },
/* 5 */
/***/ function(module, exports) {

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

	module.exports = openCart;

/***/ },
/* 6 */
/***/ function(module, exports) {

	function isEmpty(obj) {
		return $.isEmptyObject(obj);
	};

	module.exports = isEmpty;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = (function() {
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

/***/ }
/******/ ]);