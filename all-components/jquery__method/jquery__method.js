(function($, window, undefined) {
	'use strict';
	$.extend({
		method: function(setting) {
			var setting = $.extend({}, {
				color: 'green',
				background: 'black'
			}, setting);
			/* START */
			$('.method').css({
				color: setting.color,
				background: setting.background
			});
			/* END */
		}
	});
})(jQuery, window);

// Инициализация для демонстрации
(function($) {
	$.method();
})(jQuery);

// Иницилизация с параметрами по умолчанию
// $.method();

// Инициализация с параметрами
// $.method({
//	color: 'red'
// });