/*!
 * @jQuery hiTechDec v1.0.0: jQuery плагин для склонения числительных
 *
 * @author: hiTech office
 *
 * @license: MIT license: http://opensource.org/licenses/MIT
 */

 (function($, window, undefined) {
 	'use strict';
 	$.fn.hiTechDec = function(options) {
 		options = $.extend({
 			event: 'DOMSubtreeModified',
 			lang: 'ru',
 			items: []
 		}, options);

 		return this.each(function() {
 			var $this = $(this), $selector, variant, ending, value;
 			checkNumber($this, $selector, variant, ending, value);
 			if (options.event !== false) {
 				$this.on(options.event, function() {
 					checkNumber($this, $selector, variant, ending, value);
 				});
 			}
 		});

 		function checkNumber($this, $selector, variant, ending, value) {
 			if ($this.prop('localName') !== 'input') {
 				value = $this.text();
 			} else {
 				value = $this.val();
 			}

 			value = Number(value.replace(/[^0-9]/gim, ''));

 			if (options.lang === 'ru') {
 				for (var prop in options.items) {
 					$selector = options.items[prop]['selector'], ending = options.items[prop]['ending'], variant = options.items[prop]['variant'];
 					if (ending === 'man') {
 						if (!variant) {
 							$selector.text(decEndMan(value));
 						} else {
 							$selector.text(decEndSelfMan(variant[0], variant[1], variant[2], value));
 						}
 					}
 					else if (ending === 'oth') {
 						if (!variant) {
 							$selector.text(decEndOth(value));
 						} else {
 							$selector.text(decEndSelfOth(variant[0], variant[1], value)); // new if else
 						}
 					} else {
 						$selector.text(decRu(variant[0], variant[1], variant[2], value));
 					}
 				}
 			} 
 			else if (options.lang === 'en') {
 				for (var prop in options.items) {
 					$selector = options.items[prop]['selector'], ending = options.items[prop]['ending'], variant = options.items[prop]['variant'];
 					if (!ending) {
 						if (typeof variant === 'string') {
 							$selector.text(decEn(variant, value));
 						}
 						else if (typeof variant === 'object') {
 							$selector.text(decRu(variant[0], variant[1], variant[2], value));
 						}
 					} else {
 						$selector.text(decEndEn(value));
 					}
 				}
 			}
 		}

 		function decRu(a, b, c, s) {
 			var variants = [a, b, c], index = s % 100;
 			if (index >= 11 && index <= 14) {
 				index = 0;
 			} else {
 				index = (index %= 10) < 5 ? (index > 2 ? 2 : index): 0;
 			}
 			return variants[index];
 		}

 		function decEndOth(s) {
 			var variants = ['-яя', '-ая'], index = s % 10;
 			if (s % 100 == 13) {
 				index = 1;
 			} else if (index == 3) {
 				index = 0;
 			} else {
 				index = 1;
 			}
 			return variants[index];
 		}

 		function decEndMan(s) {
 			var variants = ['-ый', '-ой', '-ий'], index = s % 10;
 			if ((s % 100) >= 11 && (s % 100) <= 19) {
 				index = 0;
 			} else if (index == 3) {
 				index = 2;
 			} else if (index == 2 || (index >= 6 && index <= 8)) {
 				index = 1;
 			} else {
 				index = 0;
 			}
 			return variants[index];
 		}

 		function decEndSelfOth(a, b, s) {
 			var variants = [a, b], index = s % 10;
 			if (s % 100 == 13) {
 				index = 1;
 			} else if (index == 3) {
 				index = 0;
 			} else {
 				index = 1;
 			}
 			return variants[index];
 		}

 		function decEndSelfMan(a, b, c, s) {
 			var variants = [a, b, c], index = s % 10;
 			if ((s % 100) >= 11 && (s % 100) <= 19) {
 				index = 0;
 			} else if (index == 3) {
 				index = 2;
 			} else if (index == 2 || (index >= 6 && index <= 8)) {
 				index = 1;
 			} else {
 				index = 0;
 			}
 			return variants[index];
 		}

 		function decEndEn(s) {
 			var variants = ['-st', '-nd', '-rd', '-th'], index = s % 10;
 			if (index == 1) {
 				index = 0;
 			} else if (index == 2) {
 				index = 1;
 			} else if (index == 3) {
 				index = 2;
 			} else {
 				index = 3;
 			}
 			return variants[index];
 		}

 		function decEn(a, s) {
 			if (s == 1) {
 				return a;
 			} else if (s > 1) {
 				return a + 's';
 			}
 		}

 	};
 })(jQuery, window);