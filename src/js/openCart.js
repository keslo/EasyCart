function openCart() {

	var getCartData = require('./getCartData.js');

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