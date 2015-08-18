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