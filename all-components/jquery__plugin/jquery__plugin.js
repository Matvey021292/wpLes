(function($, window, undefined) {
	'use strict';
	var defaults = {
		color: 'red',
		background: 'black'
	};

	var methods = {
		init: function($this, setting) {
			var setting = function() {
				var object = $.extend({}, defaults, setting);
				$this.data('setting', object);
				return object;
			}();
			/* START */
			$this.css({
				color: setting.color,
				background: setting.background
			});
			/* END */
		},
		set: function($this, key, value) {
			var setting = $this.data('setting');
			setting[key] = value;
			methods.init($this, setting);
		},
		get: function($this, key) {
			var setting = $this.data('setting');
			return Object.getOwnPropertyDescriptor(setting, key).value;
		},
		destroy: function($this) {
			$this.removeData('setting').fadeOut(200, function() {
				$(this).empty().show();
			});
		}
	};

	$.fn.plugin = function(setting, key, value) {
		if (typeof setting === 'object' || !setting) {
			return this.each(function() {
				methods.init($(this), setting);
			});
		} else if (typeof setting === 'string') {
			switch(setting.toLowerCase()) {
				case 'set': {
					return methods.set(this, key, value);
				}
				case 'get': {
					return methods.get(this, key);
				}
				case 'destroy': {
					return methods.destroy(this);
				}
			}
		}
	};

})(jQuery, window);

// Инициализация для демонстрации
(function($) {
	$('.plugin').plugin();
})(jQuery);

// Название плагина изменять в этой строке: $.fn.plugin = function(setting, key, value) { ...

// Инициализация с параметрами по умолчанию
// $('div').plugin();

// Инициализация с параметрами
// $('div').plugin({
//	color: 'green'
// });

// Метод SET. Реактивное изменение параметров иницилизированого плагина. Можно протестировать в console
// $('div').plugin('set', 'color', 'yellow');

// Метод GET. Получение значения параметра. Можно протестировать в console
// $('div').plugin('get', 'color'); //> yellow

// Метод DESTROY. Удаление, разрушение, отвязка плагина. Можно протестировать в console
// $('div').plugin('destroy');