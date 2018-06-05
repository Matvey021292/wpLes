(function($) {
	// https://h17dev.online/getCrypto/
	var $crypto = $('.crypto').getCrypto({
		crypto: 5,
		show: function(data) {
			$(this).append(function() {
				var name = '<div class="crypto-name">'+ data.name +' <small>('+ data.symbol +')</small></div>';
				var trand = $.getCrypto('trand', [data.delta.day]);
				var delta = ' (' + $.getCrypto('addSymbol', [data.delta.day]) + '%)';
				var price = '<div class="crypto-price '+ trand +'">'+ data.currency.iso + $.getCrypto('fixedFormat', [data.price.current]) + delta +'</div>';
				return '<div class="crypto-item">'+ name + price +'</div>';
			}());
		}
	});

	$('input[name="crypto"]').on('change', function() {
		var count = Number($(this).val());
		$crypto.getCrypto('set', 'crypto', count);
	});

	$('select[name="currency"]').on('change', function() {
		var currency = $(this).val();
		$crypto.getCrypto('set', 'currency', currency);
	});
})(jQuery);