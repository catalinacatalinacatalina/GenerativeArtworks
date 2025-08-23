(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.canvasSketch = factory());
}(this, (function () {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var browser =
	  commonjsGlobal.performance &&
	  commonjsGlobal.performance.now ? function now() {
	    return performance.now()
	  } : Date.now || function now() {
	    return +new Date
	  };

	var isPromise_1 = isPromise;

	function isPromise(obj) {
	  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	}

	var isDom = isNode;

	function isNode (val) {
	  return (!val || typeof val !== 'object')
	    ? false
	    : (typeof window === 'object' && typeof window.Node === 'object')
	      ? (val instanceof window.Node)
	      : (typeof val.nodeType === 'number') &&
	        (typeof val.nodeName === 'string')
	}

	function getClientAPI() {
	    return typeof window !== "undefined" && window["canvas-sketch-cli"];
	}

	function defined() {
	    var arguments$1 = arguments;

	    for (var i = 0;i < arguments.length; i++) {
	        if (arguments$1[i] != null) {
	            return arguments$1[i];
	        }
	    }
	    return undefined;
	}

	function isBrowser() {
	    return typeof document !== "undefined";
	}

	function isWebGLContext(ctx) {
	    return ctx && typeof ctx.clear === "function" && typeof ctx.clearColor === "function" && typeof ctx.bufferData === "function";
	}

	function is2DContext(ctx) {
	    return ctx && typeof ctx.save === "function" && typeof ctx.scale === "function" && typeof ctx.restore === "function";
	}

	function isCanvas(element) {
	    return isDom(element) && /canvas/i.test(element.nodeName) && typeof element.getContext === "function";
	}

	var keys = createCommonjsModule(function (module, exports) {
	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	});
	var keys_1 = keys.shim;

	var is_arguments = createCommonjsModule(function (module, exports) {
	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}
	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	}});
	var is_arguments_1 = is_arguments.supported;
	var is_arguments_2 = is_arguments.unsupported;

	var deepEqual_1 = createCommonjsModule(function (module) {
	var pSlice = Array.prototype.slice;



	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	};

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (is_arguments(a)) {
	    if (!is_arguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = keys(a),
	        kb = keys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}
	});

	var dateformat = createCommonjsModule(function (module, exports) {
	/*
	 * Date Format 1.2.3
	 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
	 * MIT license
	 *
	 * Includes enhancements by Scott Trenda <scott.trenda.net>
	 * and Kris Kowal <cixar.com/~kris.kowal/>
	 *
	 * Accepts a date, a mask, or a date and a mask.
	 * Returns a formatted version of the given date.
	 * The date defaults to the current date/time.
	 * The mask defaults to dateFormat.masks.default.
	 */

	(function(global) {

	  var dateFormat = (function() {
	      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g;
	      var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
	      var timezoneClip = /[^-+\dA-Z]/g;
	  
	      // Regexes and supporting functions are cached through closure
	      return function (date, mask, utc, gmt) {
	  
	        // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
	        if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
	          mask = date;
	          date = undefined;
	        }
	  
	        date = date || new Date;
	  
	        if(!(date instanceof Date)) {
	          date = new Date(date);
	        }
	  
	        if (isNaN(date)) {
	          throw TypeError('Invalid date');
	        }
	  
	        mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);
	  
	        // Allow setting the utc/gmt argument via the mask
	        var maskSlice = mask.slice(0, 4);
	        if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
	          mask = mask.slice(4);
	          utc = true;
	          if (maskSlice === 'GMT:') {
	            gmt = true;
	          }
	        }
	  
	        var _ = utc ? 'getUTC' : 'get';
	        var d = date[_ + 'Date']();
	        var D = date[_ + 'Day']();
	        var m = date[_ + 'Month']();
	        var y = date[_ + 'FullYear']();
	        var H = date[_ + 'Hours']();
	        var M = date[_ + 'Minutes']();
	        var s = date[_ + 'Seconds']();
	        var L = date[_ + 'Milliseconds']();
	        var o = utc ? 0 : date.getTimezoneOffset();
	        var W = getWeek(date);
	        var N = getDayOfWeek(date);
	        var flags = {
	          d:    d,
	          dd:   pad(d),
	          ddd:  dateFormat.i18n.dayNames[D],
	          dddd: dateFormat.i18n.dayNames[D + 7],
	          m:    m + 1,
	          mm:   pad(m + 1),
	          mmm:  dateFormat.i18n.monthNames[m],
	          mmmm: dateFormat.i18n.monthNames[m + 12],
	          yy:   String(y).slice(2),
	          yyyy: y,
	          h:    H % 12 || 12,
	          hh:   pad(H % 12 || 12),
	          H:    H,
	          HH:   pad(H),
	          M:    M,
	          MM:   pad(M),
	          s:    s,
	          ss:   pad(s),
	          l:    pad(L, 3),
	          L:    pad(Math.round(L / 10)),
	          t:    H < 12 ? dateFormat.i18n.timeNames[0] : dateFormat.i18n.timeNames[1],
	          tt:   H < 12 ? dateFormat.i18n.timeNames[2] : dateFormat.i18n.timeNames[3],
	          T:    H < 12 ? dateFormat.i18n.timeNames[4] : dateFormat.i18n.timeNames[5],
	          TT:   H < 12 ? dateFormat.i18n.timeNames[6] : dateFormat.i18n.timeNames[7],
	          Z:    gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
	          o:    (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
	          S:    ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
	          W:    W,
	          N:    N
	        };
	  
	        return mask.replace(token, function (match) {
	          if (match in flags) {
	            return flags[match];
	          }
	          return match.slice(1, match.length - 1);
	        });
	      };
	    })();

	  dateFormat.masks = {
	    'default':               'ddd mmm dd yyyy HH:MM:ss',
	    'shortDate':             'm/d/yy',
	    'mediumDate':            'mmm d, yyyy',
	    'longDate':              'mmmm d, yyyy',
	    'fullDate':              'dddd, mmmm d, yyyy',
	    'shortTime':             'h:MM TT',
	    'mediumTime':            'h:MM:ss TT',
	    'longTime':              'h:MM:ss TT Z',
	    'isoDate':               'yyyy-mm-dd',
	    'isoTime':               'HH:MM:ss',
	    'isoDateTime':           'yyyy-mm-dd\'T\'HH:MM:sso',
	    'isoUtcDateTime':        'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
	    'expiresHeaderFormat':   'ddd, dd mmm yyyy HH:MM:ss Z'
	  };

	  // Internationalization strings
	  dateFormat.i18n = {
	    dayNames: [
	      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
	      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
	    ],
	    monthNames: [
	      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
	      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
	    ],
	    timeNames: [
	      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
	    ]
	  };

	function pad(val, len) {
	  val = String(val);
	  len = len || 2;
	  while (val.length < len) {
	    val = '0' + val;
	  }
	  return val;
	}

	/**
	 * Get the ISO 8601 week number
	 * Based on comments from
	 * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
	 *
	 * @param  {Object} `date`
	 * @return {Number}
	 */
	function getWeek(date) {
	  // Remove time components of date
	  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

	  // Change date to Thursday same week
	  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);

	  // Take January 4th as it is always in week 1 (see ISO 8601)
	  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

	  // Change date to Thursday same week
	  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

	  // Check if daylight-saving-time-switch occurred and correct for it
	  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
	  targetThursday.setHours(targetThursday.getHours() - ds);

	  // Number of weeks between target Thursday and first Thursday
	  var weekDiff = (targetThursday - firstThursday) / (86400000*7);
	  return 1 + Math.floor(weekDiff);
	}

	/**
	 * Get ISO-8601 numeric representation of the day of the week
	 * 1 (for Monday) through 7 (for Sunday)
	 * 
	 * @param  {Object} `date`
	 * @return {Number}
	 */
	function getDayOfWeek(date) {
	  var dow = date.getDay();
	  if(dow === 0) {
	    dow = 7;
	  }
	  return dow;
	}

	/**
	 * kind-of shortcut
	 * @param  {*} val
	 * @return {String}
	 */
	function kindOf(val) {
	  if (val === null) {
	    return 'null';
	  }

	  if (val === undefined) {
	    return 'undefined';
	  }

	  if (typeof val !== 'object') {
	    return typeof val;
	  }

	  if (Array.isArray(val)) {
	    return 'array';
	  }

	  return {}.toString.call(val)
	    .slice(8, -1).toLowerCase();
	}


	  if (typeof undefined === 'function' && undefined.amd) {
	    undefined(function () {
	      return dateFormat;
	    });
	  } else {
	    module.exports = dateFormat;
	  }
	})(commonjsGlobal);
	});

	/*!
	 * repeat-string <https://github.com/jonschlinkert/repeat-string>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	/**
	 * Results cache
	 */

	var res = '';
	var cache;

	/**
	 * Expose `repeat`
	 */

	var repeatString = repeat;

	/**
	 * Repeat the given `string` the specified `number`
	 * of times.
	 *
	 * **Example:**
	 *
	 * ```js
	 * var repeat = require('repeat-string');
	 * repeat('A', 5);
	 * //=> AAAAA
	 * ```
	 *
	 * @param {String} `string` The string to repeat
	 * @param {Number} `number` The number of times to repeat the string
	 * @return {String} Repeated string
	 * @api public
	 */

	function repeat(str, num) {
	  if (typeof str !== 'string') {
	    throw new TypeError('expected a string');
	  }

	  // cover common, quick use cases
	  if (num === 1) return str;
	  if (num === 2) return str + str;

	  var max = str.length * num;
	  if (cache !== str || typeof cache === 'undefined') {
	    cache = str;
	    res = '';
	  } else if (res.length >= max) {
	    return res.substr(0, max);
	  }

	  while (max > res.length && num > 1) {
	    if (num & 1) {
	      res += str;
	    }

	    num >>= 1;
	    str += str;
	  }

	  res += str;
	  res = res.substr(0, max);
	  return res;
	}

	var padLeft = function padLeft(str, num, ch) {
	  str = str.toString();

	  if (typeof num === 'undefined') {
	    return str;
	  }

	  if (ch === 0) {
	    ch = '0';
	  } else if (ch) {
	    ch = ch.toString();
	  } else {
	    ch = ' ';
	  }

	  return repeatString(ch, num - str.length) + str;
	};

	var noop = function () {};
	var link;
	var defaultExts = {
	    extension: '',
	    prefix: '',
	    suffix: ''
	};
	var supportedEncodings = ['image/png','image/jpeg','image/webp'];
	function stream(isStart, opts) {
	    if ( opts === void 0 ) opts = {};

	    return new Promise(function (resolve, reject) {
	        opts = objectAssign({}, defaultExts, opts);
	        var filename = resolveFilename(Object.assign({}, opts, {
	            extension: '',
	            frame: undefined
	        }));
	        var func = isStart ? 'streamStart' : 'streamEnd';
	        var client = getClientAPI();
	        if (client && client.output && typeof client[func] === 'function') {
	            return client[func](objectAssign({}, opts, {
	                filename: filename
	            })).then(function (ev) { return resolve(ev); });
	        } else {
	            return resolve({
	                filename: filename,
	                client: false
	            });
	        }
	    });
	}

	function streamStart(opts) {
	    if ( opts === void 0 ) opts = {};

	    return stream(true, opts);
	}

	function streamEnd(opts) {
	    if ( opts === void 0 ) opts = {};

	    return stream(false, opts);
	}

	function exportCanvas(canvas, opt) {
	    if ( opt === void 0 ) opt = {};

	    var encoding = opt.encoding || 'image/png';
	    if (!supportedEncodings.includes(encoding)) 
	        { throw new Error(("Invalid canvas encoding " + encoding)); }
	    var extension = (encoding.split('/')[1] || '').replace(/jpeg/i, 'jpg');
	    if (extension) 
	        { extension = ("." + extension).toLowerCase(); }
	    return {
	        extension: extension,
	        type: encoding,
	        dataURL: canvas.toDataURL(encoding, opt.encodingQuality)
	    };
	}

	function createBlobFromDataURL(dataURL) {
	    return new Promise(function (resolve) {
	        var splitIndex = dataURL.indexOf(',');
	        if (splitIndex === -1) {
	            resolve(new window.Blob());
	            return;
	        }
	        var base64 = dataURL.slice(splitIndex + 1);
	        var byteString = window.atob(base64);
	        var type = dataURL.slice(0, splitIndex);
	        var mimeMatch = /data:([^;]+)/.exec(type);
	        var mime = (mimeMatch ? mimeMatch[1] : '') || undefined;
	        var ab = new ArrayBuffer(byteString.length);
	        var ia = new Uint8Array(ab);
	        for (var i = 0;i < byteString.length; i++) {
	            ia[i] = byteString.charCodeAt(i);
	        }
	        resolve(new window.Blob([ab], {
	            type: mime
	        }));
	    });
	}

	function saveDataURL(dataURL, opts) {
	    if ( opts === void 0 ) opts = {};

	    return createBlobFromDataURL(dataURL).then(function (blob) { return saveBlob(blob, opts); });
	}

	function saveBlob(blob, opts) {
	    if ( opts === void 0 ) opts = {};

	    return new Promise(function (resolve) {
	        opts = objectAssign({}, defaultExts, opts);
	        var filename = opts.filename;
	        var client = getClientAPI();
	        if (client && typeof client.saveBlob === 'function' && client.output) {
	            return client.saveBlob(blob, objectAssign({}, opts, {
	                filename: filename
	            })).then(function (ev) { return resolve(ev); });
	        } else {
	            if (!link) {
	                link = document.createElement('a');
	                link.style.visibility = 'hidden';
	                link.target = '_blank';
	            }
	            link.download = filename;
	            link.href = window.URL.createObjectURL(blob);
	            document.body.appendChild(link);
	            link.onclick = (function () {
	                link.onclick = noop;
	                setTimeout(function () {
	                    window.URL.revokeObjectURL(blob);
	                    if (link.parentElement) 
	                        { link.parentElement.removeChild(link); }
	                    link.removeAttribute('href');
	                    resolve({
	                        filename: filename,
	                        client: false
	                    });
	                });
	            });
	            link.click();
	        }
	    });
	}

	function saveFile(data, opts) {
	    if ( opts === void 0 ) opts = {};

	    var parts = Array.isArray(data) ? data : [data];
	    var blob = new window.Blob(parts, {
	        type: opts.type || ''
	    });
	    return saveBlob(blob, opts);
	}

	function getTimeStamp() {
	    var dateFormatStr = "yyyy.mm.dd-HH.MM.ss";
	    return dateformat(new Date(), dateFormatStr);
	}

	function resolveFilename(opt) {
	    if ( opt === void 0 ) opt = {};

	    opt = objectAssign({}, opt);
	    if (typeof opt.file === 'function') {
	        return opt.file(opt);
	    } else if (opt.file) {
	        return opt.file;
	    }
	    var frame = null;
	    var extension = '';
	    if (typeof opt.extension === 'string') 
	        { extension = opt.extension; }
	    if (typeof opt.frame === 'number') {
	        var totalFrames;
	        if (typeof opt.totalFrames === 'number') {
	            totalFrames = opt.totalFrames;
	        } else {
	            totalFrames = Math.max(10000, opt.frame);
	        }
	        frame = padLeft(String(opt.frame), String(totalFrames).length, '0');
	    }
	    var layerStr = isFinite(opt.totalLayers) && isFinite(opt.layer) && opt.totalLayers > 1 ? ("" + (opt.layer)) : '';
	    if (frame != null) {
	        return [layerStr,frame].filter(Boolean).join('-') + extension;
	    } else {
	        var defaultFileName = opt.timeStamp;
	        return [opt.prefix,opt.name || defaultFileName,layerStr,opt.hash,opt.suffix].filter(Boolean).join('-') + extension;
	    }
	}

	var commonTypos = {
	    dimension: 'dimensions',
	    animated: 'animate',
	    animating: 'animate',
	    unit: 'units',
	    P5: 'p5',
	    pixellated: 'pixelated',
	    looping: 'loop',
	    pixelPerInch: 'pixels'
	};
	var allKeys = ['dimensions','units','pixelsPerInch','orientation','scaleToFit',
	    'scaleToView','bleed','pixelRatio','exportPixelRatio','maxPixelRatio','scaleContext',
	    'resizeCanvas','styleCanvas','canvas','context','attributes','parent','file',
	    'name','prefix','suffix','animate','playing','loop','duration','totalFrames',
	    'fps','playbackRate','timeScale','frame','time','flush','pixelated','hotkeys',
	    'p5','id','scaleToFitPadding','data','params','encoding','encodingQuality'];
	var checkSettings = function (settings) {
	    var keys = Object.keys(settings);
	    keys.forEach(function (key) {
	        if (key in commonTypos) {
	            var actual = commonTypos[key];
	            console.warn(("[canvas-sketch] Could not recognize the setting \"" + key + "\", did you mean \"" + actual + "\"?"));
	        } else if (!allKeys.includes(key)) {
	            console.warn(("[canvas-sketch] Could not recognize the setting \"" + key + "\""));
	        }
	    });
	};

	function keyboardShortcuts (opt) {
	    if ( opt === void 0 ) opt = {};

	    var handler = function (ev) {
	        if (!opt.enabled()) 
	            { return; }
	        var client = getClientAPI();
	        if (ev.keyCode === 83 && !ev.altKey && (ev.metaKey || ev.ctrlKey)) {
	            ev.preventDefault();
	            opt.save(ev);
	        } else if (ev.keyCode === 32) {
	            opt.togglePlay(ev);
	        } else if (client && !ev.altKey && ev.keyCode === 75 && (ev.metaKey || ev.ctrlKey)) {
	            ev.preventDefault();
	            opt.commit(ev);
	        }
	    };
	    var attach = function () {
	        window.addEventListener('keydown', handler);
	    };
	    var detach = function () {
	        window.removeEventListener('keydown', handler);
	    };
	    return {
	        attach: attach,
	        detach: detach
	    };
	}

	var defaultUnits = 'mm';
	var data = [['postcard',101.6,152.4],['poster-small',280,430],['poster',460,610],
	    ['poster-large',610,910],['business-card',50.8,88.9],['2r',64,89],['3r',89,127],
	    ['4r',102,152],['5r',127,178],['6r',152,203],['8r',203,254],['10r',254,305],['11r',
	    279,356],['12r',305,381],['a0',841,1189],['a1',594,841],['a2',420,594],['a3',
	    297,420],['a4',210,297],['a5',148,210],['a6',105,148],['a7',74,105],['a8',52,
	    74],['a9',37,52],['a10',26,37],['2a0',1189,1682],['4a0',1682,2378],['b0',1000,
	    1414],['b1',707,1000],['b1+',720,1020],['b2',500,707],['b2+',520,720],['b3',353,
	    500],['b4',250,353],['b5',176,250],['b6',125,176],['b7',88,125],['b8',62,88],
	    ['b9',44,62],['b10',31,44],['b11',22,32],['b12',16,22],['c0',917,1297],['c1',
	    648,917],['c2',458,648],['c3',324,458],['c4',229,324],['c5',162,229],['c6',114,
	    162],['c7',81,114],['c8',57,81],['c9',40,57],['c10',28,40],['c11',22,32],['c12',
	    16,22],['half-letter',5.5,8.5,'in'],['letter',8.5,11,'in'],['legal',8.5,14,'in'],
	    ['junior-legal',5,8,'in'],['ledger',11,17,'in'],['tabloid',11,17,'in'],['ansi-a',
	    8.5,11.0,'in'],['ansi-b',11.0,17.0,'in'],['ansi-c',17.0,22.0,'in'],['ansi-d',
	    22.0,34.0,'in'],['ansi-e',34.0,44.0,'in'],['arch-a',9,12,'in'],['arch-b',12,18,
	    'in'],['arch-c',18,24,'in'],['arch-d',24,36,'in'],['arch-e',36,48,'in'],['arch-e1',
	    30,42,'in'],['arch-e2',26,38,'in'],['arch-e3',27,39,'in']];
	var paperSizes = data.reduce(function (dict, preset) {
	    var item = {
	        units: preset[3] || defaultUnits,
	        dimensions: [preset[1],preset[2]]
	    };
	    dict[preset[0]] = item;
	    dict[preset[0].replace(/-/g, ' ')] = item;
	    return dict;
	}, {})

	var defined$1 = function () {
	    for (var i = 0; i < arguments.length; i++) {
	        if (arguments[i] !== undefined) return arguments[i];
	    }
	};

	var units = [ 'mm', 'cm', 'm', 'pc', 'pt', 'in', 'ft', 'px' ];

	var conversions = {
	  // metric
	  m: {
	    system: 'metric',
	    factor: 1
	  },
	  cm: {
	    system: 'metric',
	    factor: 1 / 100
	  },
	  mm: {
	    system: 'metric',
	    factor: 1 / 1000
	  },
	  // imperial
	  pt: {
	    system: 'imperial',
	    factor: 1 / 72
	  },
	  pc: {
	    system: 'imperial',
	    factor: 1 / 6
	  },
	  in: {
	    system: 'imperial',
	    factor: 1
	  },
	  ft: {
	    system: 'imperial',
	    factor: 12
	  }
	};

	const anchors = {
	  metric: {
	    unit: 'm',
	    ratio: 1 / 0.0254
	  },
	  imperial: {
	    unit: 'in',
	    ratio: 0.0254
	  }
	};

	function round (value, decimals) {
	  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
	}

	function convertDistance (value, fromUnit, toUnit, opts) {
	  if (typeof value !== 'number' || !isFinite(value)) throw new Error('Value must be a finite number');
	  if (!fromUnit || !toUnit) throw new Error('Must specify from and to units');

	  opts = opts || {};
	  var pixelsPerInch = defined$1(opts.pixelsPerInch, 96);
	  var precision = opts.precision;
	  var roundPixel = opts.roundPixel !== false;

	  fromUnit = fromUnit.toLowerCase();
	  toUnit = toUnit.toLowerCase();

	  if (units.indexOf(fromUnit) === -1) throw new Error('Invalid from unit "' + fromUnit + '", must be one of: ' + units.join(', '));
	  if (units.indexOf(toUnit) === -1) throw new Error('Invalid from unit "' + toUnit + '", must be one of: ' + units.join(', '));

	  if (fromUnit === toUnit) {
	    // We don't need to convert from A to B since they are the same already
	    return value;
	  }

	  var toFactor = 1;
	  var fromFactor = 1;
	  var isToPixel = false;

	  if (fromUnit === 'px') {
	    fromFactor = 1 / pixelsPerInch;
	    fromUnit = 'in';
	  }
	  if (toUnit === 'px') {
	    isToPixel = true;
	    toFactor = pixelsPerInch;
	    toUnit = 'in';
	  }

	  var fromUnitData = conversions[fromUnit];
	  var toUnitData = conversions[toUnit];

	  // source to anchor inside source's system
	  var anchor = value * fromUnitData.factor * fromFactor;

	  // if systems differ, convert one to another
	  if (fromUnitData.system !== toUnitData.system) {
	    // regular 'm' to 'in' and so forth
	    anchor *= anchors[fromUnitData.system].ratio;
	  }

	  var result = anchor / toUnitData.factor * toFactor;
	  if (isToPixel && roundPixel) {
	    result = Math.round(result);
	  } else if (typeof precision === 'number' && isFinite(precision)) {
	    result = round(result, precision);
	  }
	  return result;
	}

	var convertLength = convertDistance;
	var units_1 = units;
	convertLength.units = units_1;

	function getDimensionsFromPreset(dimensions, unitsTo, pixelsPerInch) {
	    if ( unitsTo === void 0 ) unitsTo = 'px';
	    if ( pixelsPerInch === void 0 ) pixelsPerInch = 72;

	    if (typeof dimensions === 'string') {
	        var key = dimensions.toLowerCase();
	        if (!(key in paperSizes)) {
	            throw new Error(("The dimension preset \"" + dimensions + "\" is not supported or could not be found; try using a4, a3, postcard, letter, etc."));
	        }
	        var preset = paperSizes[key];
	        return preset.dimensions.map(function (d) { return convertDistance$1(d, preset.units, unitsTo, pixelsPerInch); });
	    } else {
	        return dimensions;
	    }
	}

	function convertDistance$1(dimension, unitsFrom, unitsTo, pixelsPerInch) {
	    if ( unitsFrom === void 0 ) unitsFrom = 'px';
	    if ( unitsTo === void 0 ) unitsTo = 'px';
	    if ( pixelsPerInch === void 0 ) pixelsPerInch = 72;

	    return convertLength(dimension, unitsFrom, unitsTo, {
	        pixelsPerInch: pixelsPerInch,
	        precision: 4,
	        roundPixel: true
	    });
	}

	function checkIfHasDimensions(settings) {
	    if (!settings.dimensions) 
	        { return false; }
	    if (typeof settings.dimensions === 'string') 
	        { return true; }
	    if (Array.isArray(settings.dimensions) && settings.dimensions.length >= 2) 
	        { return true; }
	    return false;
	}

	function getParentSize(props, settings) {
	    if (!isBrowser()) {
	        return [300,150];
	    }
	    var element = settings.parent || window;
	    if (element === window || element === document || element === document.body) {
	        return [window.innerWidth,window.innerHeight];
	    } else {
	        var ref = element.getBoundingClientRect();
	        var width = ref.width;
	        var height = ref.height;
	        return [width,height];
	    }
	}

	function resizeCanvas(props, settings) {
	    var width, height;
	    var styleWidth, styleHeight;
	    var canvasWidth, canvasHeight;
	    var browser = isBrowser();
	    var dimensions = settings.dimensions;
	    var hasDimensions = checkIfHasDimensions(settings);
	    var exporting = props.exporting;
	    var scaleToFit = hasDimensions ? settings.scaleToFit !== false : false;
	    var scaleToView = !exporting && hasDimensions ? settings.scaleToView : true;
	    if (!browser) 
	        { scaleToFit = (scaleToView = false); }
	    var units = settings.units;
	    var pixelsPerInch = typeof settings.pixelsPerInch === 'number' && isFinite(settings.pixelsPerInch) ? settings.pixelsPerInch : 72;
	    var bleed = defined(settings.bleed, 0);
	    var devicePixelRatio = browser ? window.devicePixelRatio : 1;
	    var basePixelRatio = scaleToView ? devicePixelRatio : 1;
	    var pixelRatio, exportPixelRatio;
	    if (typeof settings.pixelRatio === 'number' && isFinite(settings.pixelRatio)) {
	        pixelRatio = settings.pixelRatio;
	        exportPixelRatio = defined(settings.exportPixelRatio, pixelRatio);
	    } else {
	        if (hasDimensions) {
	            pixelRatio = basePixelRatio;
	            exportPixelRatio = defined(settings.exportPixelRatio, 1);
	        } else {
	            pixelRatio = devicePixelRatio;
	            exportPixelRatio = defined(settings.exportPixelRatio, pixelRatio);
	        }
	    }
	    if (typeof settings.maxPixelRatio === 'number' && isFinite(settings.maxPixelRatio)) {
	        pixelRatio = Math.min(settings.maxPixelRatio, pixelRatio);
	    }
	    if (exporting) {
	        pixelRatio = exportPixelRatio;
	    }
	    var ref = getParentSize(props, settings);
	    var parentWidth = ref[0];
	    var parentHeight = ref[1];
	    var trimWidth, trimHeight;
	    if (hasDimensions) {
	        var result = getDimensionsFromPreset(dimensions, units, pixelsPerInch);
	        var highest = Math.max(result[0], result[1]);
	        var lowest = Math.min(result[0], result[1]);
	        if (settings.orientation) {
	            var landscape = settings.orientation === 'landscape';
	            width = landscape ? highest : lowest;
	            height = landscape ? lowest : highest;
	        } else {
	            width = result[0];
	            height = result[1];
	        }
	        trimWidth = width;
	        trimHeight = height;
	        width += bleed * 2;
	        height += bleed * 2;
	    } else {
	        width = parentWidth;
	        height = parentHeight;
	        trimWidth = width;
	        trimHeight = height;
	    }
	    var realWidth = width;
	    var realHeight = height;
	    if (hasDimensions && units) {
	        realWidth = convertDistance$1(width, units, 'px', pixelsPerInch);
	        realHeight = convertDistance$1(height, units, 'px', pixelsPerInch);
	    }
	    styleWidth = Math.round(realWidth);
	    styleHeight = Math.round(realHeight);
	    if (scaleToFit && !exporting && hasDimensions) {
	        var aspect = width / height;
	        var windowAspect = parentWidth / parentHeight;
	        var scaleToFitPadding = defined(settings.scaleToFitPadding, 40);
	        var maxWidth = Math.round(parentWidth - scaleToFitPadding * 2);
	        var maxHeight = Math.round(parentHeight - scaleToFitPadding * 2);
	        if (styleWidth > maxWidth || styleHeight > maxHeight) {
	            if (windowAspect > aspect) {
	                styleHeight = maxHeight;
	                styleWidth = Math.round(styleHeight * aspect);
	            } else {
	                styleWidth = maxWidth;
	                styleHeight = Math.round(styleWidth / aspect);
	            }
	        }
	    }
	    canvasWidth = scaleToView ? Math.round(pixelRatio * styleWidth) : Math.round(pixelRatio * realWidth);
	    canvasHeight = scaleToView ? Math.round(pixelRatio * styleHeight) : Math.round(pixelRatio * realHeight);
	    var viewportWidth = scaleToView ? Math.round(styleWidth) : Math.round(realWidth);
	    var viewportHeight = scaleToView ? Math.round(styleHeight) : Math.round(realHeight);
	    var scaleX = canvasWidth / width;
	    var scaleY = canvasHeight / height;
	    return {
	        bleed: bleed,
	        pixelRatio: pixelRatio,
	        width: width,
	        height: height,
	        dimensions: [width,height],
	        units: units || 'px',
	        scaleX: scaleX,
	        scaleY: scaleY,
	        pixelsPerInch: pixelsPerInch,
	        viewportWidth: viewportWidth,
	        viewportHeight: viewportHeight,
	        canvasWidth: canvasWidth,
	        canvasHeight: canvasHeight,
	        trimWidth: trimWidth,
	        trimHeight: trimHeight,
	        styleWidth: styleWidth,
	        styleHeight: styleHeight
	    };
	}

	var getCanvasContext_1 = getCanvasContext;
	function getCanvasContext (type, opts) {
	  if (typeof type !== 'string') {
	    throw new TypeError('must specify type string')
	  }

	  opts = opts || {};

	  if (typeof document === 'undefined' && !opts.canvas) {
	    return null // check for Node
	  }

	  var canvas = opts.canvas || document.createElement('canvas');
	  if (typeof opts.width === 'number') {
	    canvas.width = opts.width;
	  }
	  if (typeof opts.height === 'number') {
	    canvas.height = opts.height;
	  }

	  var attribs = opts;
	  var gl;
	  try {
	    var names = [ type ];
	    // prefix GL contexts
	    if (type.indexOf('webgl') === 0) {
	      names.push('experimental-' + type);
	    }

	    for (var i = 0; i < names.length; i++) {
	      gl = canvas.getContext(names[i], attribs);
	      if (gl) return gl
	    }
	  } catch (e) {
	    gl = null;
	  }
	  return (gl || null) // ensure null on fail
	}

	function createCanvasElement() {
	    if (!isBrowser()) {
	        throw new Error('It appears you are runing from Node.js or a non-browser environment. Try passing in an existing { canvas } interface instead.');
	    }
	    return document.createElement('canvas');
	}

	function createCanvas(settings) {
	    if ( settings === void 0 ) settings = {};

	    var context, canvas;
	    var ownsCanvas = false;
	    if (settings.canvas !== false) {
	        context = settings.context;
	        if (!context || typeof context === 'string') {
	            var newCanvas = settings.canvas;
	            if (!newCanvas) {
	                newCanvas = createCanvasElement();
	                ownsCanvas = true;
	            }
	            var type = context || '2d';
	            if (typeof newCanvas.getContext !== 'function') {
	                throw new Error("The specified { canvas } element does not have a getContext() function, maybe it is not a <canvas> tag?");
	            }
	            context = getCanvasContext_1(type, objectAssign({}, settings.attributes, {
	                canvas: newCanvas
	            }));
	            if (!context) {
	                throw new Error(("Failed at canvas.getContext('" + type + "') - the browser may not support this context, or a different context may already be in use with this canvas."));
	            }
	        }
	        canvas = context.canvas;
	        if (settings.canvas && canvas !== settings.canvas) {
	            throw new Error('The { canvas } and { context } settings must point to the same underlying canvas element');
	        }
	        if (settings.pixelated) {
	            context.imageSmoothingEnabled = false;
	            context.mozImageSmoothingEnabled = false;
	            context.oImageSmoothingEnabled = false;
	            context.webkitImageSmoothingEnabled = false;
	            context.msImageSmoothingEnabled = false;
	            canvas.style['image-rendering'] = 'pixelated';
	        }
	    }
	    return {
	        canvas: canvas,
	        context: context,
	        ownsCanvas: ownsCanvas
	    };
	}

	var SketchManager = function SketchManager() {
	    var this$1 = this;

	    this._settings = {};
	    this._props = {};
	    this._sketch = undefined;
	    this._raf = null;
	    this._recordTimeout = null;
	    this._lastRedrawResult = undefined;
	    this._isP5Resizing = false;
	    this._keyboardShortcuts = keyboardShortcuts({
	        enabled: function () { return this$1.settings.hotkeys !== false; },
	        save: function (ev) {
	            if (ev.shiftKey) {
	                if (this$1.props.recording) {
	                    this$1.endRecord();
	                    this$1.run();
	                } else 
	                    { this$1.record(); }
	            } else if (!this$1.props.recording) {
	                this$1.exportFrame();
	            }
	        },
	        togglePlay: function () {
	            if (this$1.props.playing) 
	                { this$1.pause(); }
	             else 
	                { this$1.play(); }
	        },
	        commit: function (ev) {
	            this$1.exportFrame({
	                commit: true
	            });
	        }
	    });
	    this._animateHandler = (function () { return this$1.animate(); });
	    this._resizeHandler = (function () {
	        var changed = this$1.resize();
	        if (changed) {
	            this$1.render();
	        }
	    });
	};

	var prototypeAccessors = { sketch: { configurable: true },settings: { configurable: true },props: { configurable: true } };
	prototypeAccessors.sketch.get = function () {
	    return this._sketch;
	};
	prototypeAccessors.settings.get = function () {
	    return this._settings;
	};
	prototypeAccessors.props.get = function () {
	    return this._props;
	};
	SketchManager.prototype._computePlayhead = function _computePlayhead (currentTime, duration) {
	    var hasDuration = typeof duration === "number" && isFinite(duration);
	    return hasDuration ? currentTime / duration : 0;
	};
	SketchManager.prototype._computeFrame = function _computeFrame (playhead, time, totalFrames, fps) {
	    return isFinite(totalFrames) && totalFrames > 1 ? Math.floor(playhead * (totalFrames - 1)) : Math.floor(fps * time);
	};
	SketchManager.prototype._computeCurrentFrame = function _computeCurrentFrame () {
	    return this._computeFrame(this.props.playhead, this.props.time, this.props.totalFrames, this.props.fps);
	};
	SketchManager.prototype._getSizeProps = function _getSizeProps () {
	    var props = this.props;
	    return {
	        width: props.width,
	        height: props.height,
	        pixelRatio: props.pixelRatio,
	        canvasWidth: props.canvasWidth,
	        canvasHeight: props.canvasHeight,
	        viewportWidth: props.viewportWidth,
	        viewportHeight: props.viewportHeight
	    };
	};
	SketchManager.prototype.run = function run () {
	    if (!this.sketch) 
	        { throw new Error("should wait until sketch is loaded before trying to play()"); }
	    if (this.settings.playing !== false) {
	        this.play();
	    }
	    if (typeof this.sketch.dispose === "function") {
	        console.warn("In canvas-sketch@0.0.23 the dispose() event has been renamed to unload()");
	    }
	    if (!this.props.started) {
	        this._signalBegin();
	        this.props.started = true;
	    }
	    this.tick();
	    this.render();
	    return this;
	};
	SketchManager.prototype._cancelTimeouts = function _cancelTimeouts () {
	    if (this._raf != null && typeof window !== "undefined" && typeof window.cancelAnimationFrame === "function") {
	        window.cancelAnimationFrame(this._raf);
	        this._raf = null;
	    }
	    if (this._recordTimeout != null) {
	        clearTimeout(this._recordTimeout);
	        this._recordTimeout = null;
	    }
	};
	SketchManager.prototype.play = function play () {
	    var animate = this.settings.animate;
	    if ("animation" in this.settings) {
	        animate = true;
	        console.warn("[canvas-sketch] { animation } has been renamed to { animate }");
	    }
	    if (!animate) 
	        { return; }
	    if (!isBrowser()) {
	        console.error("[canvas-sketch] WARN: Using { animate } in Node.js is not yet supported");
	        return;
	    }
	    if (this.props.playing) 
	        { return; }
	    if (!this.props.started) {
	        this._signalBegin();
	        this.props.started = true;
	    }
	    this.props.playing = true;
	    this._cancelTimeouts();
	    this._lastTime = browser();
	    this._raf = window.requestAnimationFrame(this._animateHandler);
	};
	SketchManager.prototype.pause = function pause () {
	    if (this.props.recording) 
	        { this.endRecord(); }
	    this.props.playing = false;
	    this._cancelTimeouts();
	};
	SketchManager.prototype.togglePlay = function togglePlay () {
	    if (this.props.playing) 
	        { this.pause(); }
	     else 
	        { this.play(); }
	};
	SketchManager.prototype.stop = function stop () {
	    this.pause();
	    this.props.frame = 0;
	    this.props.playhead = 0;
	    this.props.time = 0;
	    this.props.deltaTime = 0;
	    this.props.started = false;
	    this.render();
	};
	SketchManager.prototype.record = function record () {
	        var this$1 = this;

	    if (this.props.recording) 
	        { return; }
	    if (!isBrowser()) {
	        console.error("[canvas-sketch] WARN: Recording from Node.js is not yet supported");
	        return;
	    }
	    this.stop();
	    this.props.playing = true;
	    this.props.recording = true;
	    var exportOpts = this._createExportOptions({
	        sequence: true
	    });
	    var frameInterval = 1 / this.props.fps;
	    this._cancelTimeouts();
	    var tick = function () {
	        if (!this$1.props.recording) 
	            { return Promise.resolve(); }
	        this$1.props.deltaTime = frameInterval;
	        this$1.tick();
	        return this$1.exportFrame(exportOpts).then(function () {
	            if (!this$1.props.recording) 
	                { return; }
	            this$1.props.deltaTime = 0;
	            this$1.props.frame++;
	            if (this$1.props.frame < this$1.props.totalFrames) {
	                this$1.props.time += frameInterval;
	                this$1.props.playhead = this$1._computePlayhead(this$1.props.time, this$1.props.duration);
	                this$1._recordTimeout = setTimeout(tick, 0);
	            } else {
	                console.log("Finished recording");
	                this$1._signalEnd();
	                this$1.endRecord();
	                this$1.stop();
	                this$1.run();
	            }
	        });
	    };
	    if (!this.props.started) {
	        this._signalBegin();
	        this.props.started = true;
	    }
	    if (this.sketch && typeof this.sketch.beginRecord === "function") {
	        this._wrapContextScale(function (props) { return this$1.sketch.beginRecord(props); });
	    }
	    streamStart(exportOpts).catch(function (err) {
	        console.error(err);
	    }).then(function (response) {
	        this$1._raf = window.requestAnimationFrame(tick);
	    });
	};
	SketchManager.prototype._signalBegin = function _signalBegin () {
	        var this$1 = this;

	    if (this.sketch && typeof this.sketch.begin === "function") {
	        this._wrapContextScale(function (props) { return this$1.sketch.begin(props); });
	    }
	};
	SketchManager.prototype._signalEnd = function _signalEnd () {
	        var this$1 = this;

	    if (this.sketch && typeof this.sketch.end === "function") {
	        this._wrapContextScale(function (props) { return this$1.sketch.end(props); });
	    }
	};
	SketchManager.prototype.endRecord = function endRecord () {
	        var this$1 = this;

	    var wasRecording = this.props.recording;
	    this._cancelTimeouts();
	    this.props.recording = false;
	    this.props.deltaTime = 0;
	    this.props.playing = false;
	    return streamEnd().catch(function (err) {
	        console.error(err);
	    }).then(function () {
	        if (wasRecording && this$1.sketch && typeof this$1.sketch.endRecord === "function") {
	            this$1._wrapContextScale(function (props) { return this$1.sketch.endRecord(props); });
	        }
	    });
	};
	SketchManager.prototype._createExportOptions = function _createExportOptions (opt) {
	        if ( opt === void 0 ) opt = {};

	    return {
	        sequence: opt.sequence,
	        save: opt.save,
	        fps: this.props.fps,
	        frame: opt.sequence ? this.props.frame : undefined,
	        file: this.settings.file,
	        name: this.settings.name,
	        prefix: this.settings.prefix,
	        suffix: this.settings.suffix,
	        encoding: this.settings.encoding,
	        encodingQuality: this.settings.encodingQuality,
	        timeStamp: opt.timeStamp || getTimeStamp(),
	        totalFrames: isFinite(this.props.totalFrames) ? Math.max(0, this.props.totalFrames) : 1000
	    };
	};
	SketchManager.prototype.exportFrame = function exportFrame (opt) {
	        var this$1 = this;
	        if ( opt === void 0 ) opt = {};

	    if (!this.sketch) 
	        { return Promise.all([]); }
	    if (typeof this.sketch.preExport === "function") {
	        this.sketch.preExport();
	    }
	    var exportOpts = this._createExportOptions(opt);
	    var client = getClientAPI();
	    var p = Promise.resolve();
	    if (client && opt.commit && typeof client.commit === "function") {
	        var commitOpts = objectAssign({}, exportOpts);
	        var hash = client.commit(commitOpts);
	        if (isPromise_1(hash)) 
	            { p = hash; }
	         else 
	            { p = Promise.resolve(hash); }
	    }
	    return p.then(function (hash) { return this$1._doExportFrame(objectAssign({}, exportOpts, {
	        hash: hash || ""
	    })); }).then(function (result) {
	        if (result.length === 1) 
	            { return result[0]; }
	         else 
	            { return result; }
	    });
	};
	SketchManager.prototype._doExportFrame = function _doExportFrame (exportOpts) {
	        var this$1 = this;
	        if ( exportOpts === void 0 ) exportOpts = {};

	    this._props.exporting = true;
	    this.resize();
	    var drawResult = this.render();
	    var canvas = this.props.canvas;
	    if (typeof drawResult === "undefined") {
	        drawResult = [canvas];
	    }
	    drawResult = [].concat(drawResult).filter(Boolean);
	    drawResult = drawResult.map(function (result) {
	        var hasDataObject = typeof result === "object" && result && ("data" in result || "dataURL" in result);
	        var data = hasDataObject ? result.data : result;
	        var opts = hasDataObject ? objectAssign({}, result, {
	            data: data
	        }) : {
	            data: data
	        };
	        if (isCanvas(data)) {
	            var encoding = opts.encoding || exportOpts.encoding;
	            var encodingQuality = defined(opts.encodingQuality, exportOpts.encodingQuality, 0.95);
	            var ref = exportCanvas(data, {
	                encoding: encoding,
	                encodingQuality: encodingQuality
	            });
	                var dataURL = ref.dataURL;
	                var extension = ref.extension;
	                var type = ref.type;
	            return Object.assign(opts, {
	                dataURL: dataURL,
	                extension: extension,
	                type: type
	            });
	        } else {
	            return opts;
	        }
	    });
	    this._props.exporting = false;
	    this.resize();
	    this.render();
	    return Promise.all(drawResult.map(function (result, i, layerList) {
	        var curOpt = objectAssign({
	            extension: "",
	            prefix: "",
	            suffix: ""
	        }, exportOpts, result, {
	            layer: i,
	            totalLayers: layerList.length
	        });
	        var saveParam = exportOpts.save === false ? false : result.save;
	        curOpt.save = saveParam !== false;
	        curOpt.filename = resolveFilename(curOpt);
	        delete curOpt.encoding;
	        delete curOpt.encodingQuality;
	        for (var k in curOpt) {
	            if (typeof curOpt[k] === "undefined") 
	                { delete curOpt[k]; }
	        }
	        var savePromise = Promise.resolve({});
	        if (curOpt.save) {
	            var data = curOpt.data;
	            if (curOpt.dataURL) {
	                var dataURL = curOpt.dataURL;
	                savePromise = saveDataURL(dataURL, curOpt);
	            } else {
	                savePromise = saveFile(data, curOpt);
	            }
	        }
	        return savePromise.then(function (saveResult) { return Object.assign({}, curOpt, saveResult); });
	    })).then(function (ev) {
	        var savedEvents = ev.filter(function (e) { return e.save; });
	        if (savedEvents.length > 0) {
	            var eventWithOutput = savedEvents.find(function (e) { return e.outputName; });
	            var isClient = savedEvents.some(function (e) { return e.client; });
	            var isStreaming = savedEvents.some(function (e) { return e.stream; });
	            var item;
	            if (savedEvents.length > 1) 
	                { item = savedEvents.length; }
	             else if (eventWithOutput) 
	                { item = (eventWithOutput.outputName) + "/" + (savedEvents[0].filename); }
	             else 
	                { item = "" + (savedEvents[0].filename); }
	            var ofSeq = "";
	            if (exportOpts.sequence) {
	                var hasTotalFrames = isFinite(this$1.props.totalFrames);
	                ofSeq = hasTotalFrames ? (" (frame " + (exportOpts.frame + 1) + " / " + (this$1.props.totalFrames) + ")") : (" (frame " + (exportOpts.frame) + ")");
	            } else if (savedEvents.length > 1) {
	                ofSeq = " files";
	            }
	            var client = isClient ? "canvas-sketch-cli" : "canvas-sketch";
	            var action = isStreaming ? "Streaming into" : "Exported";
	            console.log(("%c[" + client + "]%c " + action + " %c" + item + "%c" + ofSeq), "color: #8e8e8e;", "color: initial;", "font-weight: bold;", "font-weight: initial;");
	        }
	        if (typeof this$1.sketch.postExport === "function") {
	            this$1.sketch.postExport();
	        }
	        return ev;
	    });
	};
	SketchManager.prototype._wrapContextScale = function _wrapContextScale (cb) {
	    this._preRender();
	    cb(this.props);
	    this._postRender();
	};
	SketchManager.prototype._preRender = function _preRender () {
	    var props = this.props;
	    if (is2DContext(props.context) && !props.p5) {
	        props.context.save();
	        if (this.settings.scaleContext !== false) {
	            props.context.scale(props.scaleX, props.scaleY);
	        }
	    } else if (props.p5) {
	        props.p5.scale(props.scaleX / props.pixelRatio, props.scaleY / props.pixelRatio);
	    }
	};
	SketchManager.prototype._postRender = function _postRender () {
	    var props = this.props;
	    if (is2DContext(props.context) && !props.p5) {
	        props.context.restore();
	    }
	    if (props.gl && this.settings.flush !== false && !props.p5) {
	        props.gl.flush();
	    }
	};
	SketchManager.prototype.tick = function tick () {
	    if (this.sketch && typeof this.sketch.tick === "function") {
	        this._preRender();
	        this.sketch.tick(this.props);
	        this._postRender();
	    }
	};
	SketchManager.prototype.render = function render () {
	    if (this.props.p5) {
	        this._lastRedrawResult = undefined;
	        this.props.p5.redraw();
	        return this._lastRedrawResult;
	    } else {
	        return this.submitDrawCall();
	    }
	};
	SketchManager.prototype.submitDrawCall = function submitDrawCall () {
	    if (!this.sketch) 
	        { return; }
	    var props = this.props;
	    this._preRender();
	    var drawResult;
	    if (typeof this.sketch === "function") {
	        drawResult = this.sketch(props);
	    } else if (typeof this.sketch.render === "function") {
	        drawResult = this.sketch.render(props);
	    }
	    this._postRender();
	    return drawResult;
	};
	SketchManager.prototype.update = function update (opt) {
	        var this$1 = this;
	        if ( opt === void 0 ) opt = {};

	    var notYetSupported = ["animate"];
	    Object.keys(opt).forEach(function (key) {
	        if (notYetSupported.indexOf(key) >= 0) {
	            throw new Error(("Sorry, the { " + key + " } option is not yet supported with update()."));
	        }
	    });
	    var oldCanvas = this._settings.canvas;
	    var oldContext = this._settings.context;
	    for (var key in opt) {
	        var value = opt[key];
	        if (typeof value !== "undefined") {
	            this$1._settings[key] = value;
	        }
	    }
	    var timeOpts = Object.assign({}, this._settings, opt);
	    if ("time" in opt && "frame" in opt) 
	        { throw new Error("You should specify { time } or { frame } but not both"); }
	     else if ("time" in opt) 
	        { delete timeOpts.frame; }
	     else if ("frame" in opt) 
	        { delete timeOpts.time; }
	    if ("duration" in opt && "totalFrames" in opt) 
	        { throw new Error("You should specify { duration } or { totalFrames } but not both"); }
	     else if ("duration" in opt) 
	        { delete timeOpts.totalFrames; }
	     else if ("totalFrames" in opt) 
	        { delete timeOpts.duration; }
	    if ("data" in opt) 
	        { this._props.data = opt.data; }
	    var timeProps = this.getTimeProps(timeOpts);
	    Object.assign(this._props, timeProps);
	    if (oldCanvas !== this._settings.canvas || oldContext !== this._settings.context) {
	        var ref = createCanvas(this._settings);
	            var canvas = ref.canvas;
	            var context = ref.context;
	        this.props.canvas = canvas;
	        this.props.context = context;
	        this._setupGLKey();
	        this._appendCanvasIfNeeded();
	    }
	    if (opt.p5 && typeof opt.p5 !== "function") {
	        this.props.p5 = opt.p5;
	        this.props.p5.draw = (function () {
	            if (this$1._isP5Resizing) 
	                { return; }
	            this$1._lastRedrawResult = this$1.submitDrawCall();
	        });
	    }
	    if ("playing" in opt) {
	        if (opt.playing) 
	            { this.play(); }
	         else 
	            { this.pause(); }
	    }
	    checkSettings(this._settings);
	    this.resize();
	    this.render();
	    return this.props;
	};
	SketchManager.prototype.resize = function resize () {
	    var oldSizes = this._getSizeProps();
	    var settings = this.settings;
	    var props = this.props;
	    var newProps = resizeCanvas(props, settings);
	    Object.assign(this._props, newProps);
	    var ref = this.props;
	        var pixelRatio = ref.pixelRatio;
	        var canvasWidth = ref.canvasWidth;
	        var canvasHeight = ref.canvasHeight;
	        var styleWidth = ref.styleWidth;
	        var styleHeight = ref.styleHeight;
	    var canvas = this.props.canvas;
	    if (canvas && settings.resizeCanvas !== false) {
	        if (props.p5) {
	            if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
	                this._isP5Resizing = true;
	                props.p5.pixelDensity(pixelRatio);
	                props.p5.resizeCanvas(canvasWidth / pixelRatio, canvasHeight / pixelRatio, false);
	                this._isP5Resizing = false;
	            }
	        } else {
	            if (canvas.width !== canvasWidth) 
	                { canvas.width = canvasWidth; }
	            if (canvas.height !== canvasHeight) 
	                { canvas.height = canvasHeight; }
	        }
	        if (isBrowser() && settings.styleCanvas !== false) {
	            canvas.style.width = styleWidth + "px";
	            canvas.style.height = styleHeight + "px";
	        }
	    }
	    var newSizes = this._getSizeProps();
	    var changed = !deepEqual_1(oldSizes, newSizes);
	    if (changed) {
	        this._sizeChanged();
	    }
	    return changed;
	};
	SketchManager.prototype._sizeChanged = function _sizeChanged () {
	    if (this.sketch && typeof this.sketch.resize === "function") {
	        this.sketch.resize(this.props);
	    }
	};
	SketchManager.prototype.animate = function animate () {
	    if (!this.props.playing) 
	        { return; }
	    if (!isBrowser()) {
	        console.error("[canvas-sketch] WARN: Animation in Node.js is not yet supported");
	        return;
	    }
	    this._raf = window.requestAnimationFrame(this._animateHandler);
	    var now = browser();
	    var fps = this.props.fps;
	    var frameIntervalMS = 1000 / fps;
	    var deltaTimeMS = now - this._lastTime;
	    var duration = this.props.duration;
	    var hasDuration = typeof duration === "number" && isFinite(duration);
	    var isNewFrame = true;
	    var playbackRate = this.settings.playbackRate;
	    if (playbackRate === "fixed") {
	        deltaTimeMS = frameIntervalMS;
	    } else if (playbackRate === "throttle") {
	        if (deltaTimeMS > frameIntervalMS) {
	            now = now - deltaTimeMS % frameIntervalMS;
	            this._lastTime = now;
	        } else {
	            isNewFrame = false;
	        }
	    } else {
	        this._lastTime = now;
	    }
	    var deltaTime = deltaTimeMS / 1000;
	    var newTime = this.props.time + deltaTime * this.props.timeScale;
	    if (newTime < 0 && hasDuration) {
	        newTime = duration + newTime;
	    }
	    var isFinished = false;
	    var isLoopStart = false;
	    var looping = this.settings.loop !== false;
	    if (hasDuration && newTime >= duration) {
	        if (looping) {
	            isNewFrame = true;
	            newTime = newTime % duration;
	            isLoopStart = true;
	        } else {
	            isNewFrame = false;
	            newTime = duration;
	            isFinished = true;
	        }
	        this._signalEnd();
	    }
	    if (isNewFrame) {
	        this.props.deltaTime = deltaTime;
	        this.props.time = newTime;
	        this.props.playhead = this._computePlayhead(newTime, duration);
	        var lastFrame = this.props.frame;
	        this.props.frame = this._computeCurrentFrame();
	        if (isLoopStart) 
	            { this._signalBegin(); }
	        if (lastFrame !== this.props.frame) 
	            { this.tick(); }
	        this.render();
	        this.props.deltaTime = 0;
	    }
	    if (isFinished) {
	        this.pause();
	    }
	};
	SketchManager.prototype.dispatch = function dispatch (cb) {
	    if (typeof cb !== "function") 
	        { throw new Error("must pass function into dispatch()"); }
	    cb(this.props);
	    this.render();
	};
	SketchManager.prototype.mount = function mount () {
	    this._appendCanvasIfNeeded();
	};
	SketchManager.prototype.unmount = function unmount () {
	    if (isBrowser()) {
	        window.removeEventListener("resize", this._resizeHandler);
	        this._keyboardShortcuts.detach();
	    }
	    if (this.props.canvas.parentElement) {
	        this.props.canvas.parentElement.removeChild(this.props.canvas);
	    }
	};
	SketchManager.prototype._appendCanvasIfNeeded = function _appendCanvasIfNeeded () {
	    if (!isBrowser()) 
	        { return; }
	    if (this.settings.parent !== false && this.props.canvas && !this.props.canvas.parentElement) {
	        var defaultParent = this.settings.parent || document.body;
	        defaultParent.appendChild(this.props.canvas);
	    }
	};
	SketchManager.prototype._setupGLKey = function _setupGLKey () {
	    if (this.props.context) {
	        if (isWebGLContext(this.props.context)) {
	            this._props.gl = this.props.context;
	        } else {
	            delete this._props.gl;
	        }
	    }
	};
	SketchManager.prototype.getTimeProps = function getTimeProps (settings) {
	        if ( settings === void 0 ) settings = {};

	    var duration = settings.duration;
	    var totalFrames = settings.totalFrames;
	    var timeScale = defined(settings.timeScale, 1);
	    var fps = defined(settings.fps, 24);
	    var hasDuration = typeof duration === "number" && isFinite(duration);
	    var hasTotalFrames = typeof totalFrames === "number" && isFinite(totalFrames);
	    var totalFramesFromDuration = hasDuration ? Math.floor(fps * duration) : undefined;
	    var durationFromTotalFrames = hasTotalFrames ? totalFrames / fps : undefined;
	    if (hasDuration && hasTotalFrames && totalFramesFromDuration !== totalFrames) {
	        throw new Error("You should specify either duration or totalFrames, but not both. Or, they must match exactly.");
	    }
	    if (typeof settings.dimensions === "undefined" && typeof settings.units !== "undefined") {
	        console.warn("You've specified a { units } setting but no { dimension }, so the units will be ignored.");
	    }
	    totalFrames = defined(totalFrames, totalFramesFromDuration, Infinity);
	    duration = defined(duration, durationFromTotalFrames, Infinity);
	    var startTime = settings.time;
	    var startFrame = settings.frame;
	    var hasStartTime = typeof startTime === "number" && isFinite(startTime);
	    var hasStartFrame = typeof startFrame === "number" && isFinite(startFrame);
	    var time = 0;
	    var frame = 0;
	    var playhead = 0;
	    if (hasStartTime && hasStartFrame) {
	        throw new Error("You should specify either start frame or time, but not both.");
	    } else if (hasStartTime) {
	        time = startTime;
	        playhead = this._computePlayhead(time, duration);
	        frame = this._computeFrame(playhead, time, totalFrames, fps);
	    } else if (hasStartFrame) {
	        frame = startFrame;
	        time = frame / fps;
	        playhead = this._computePlayhead(time, duration);
	    }
	    return {
	        playhead: playhead,
	        time: time,
	        frame: frame,
	        duration: duration,
	        totalFrames: totalFrames,
	        fps: fps,
	        timeScale: timeScale
	    };
	};
	SketchManager.prototype.setup = function setup (settings) {
	        var this$1 = this;
	        if ( settings === void 0 ) settings = {};

	    if (this.sketch) 
	        { throw new Error("Multiple setup() calls not yet supported."); }
	    this._settings = Object.assign({}, settings, this._settings);
	    checkSettings(this._settings);
	    var ref = createCanvas(this._settings);
	        var context = ref.context;
	        var canvas = ref.canvas;
	    var timeProps = this.getTimeProps(this._settings);
	    this._props = Object.assign({}, timeProps,
	        {canvas: canvas,
	        context: context,
	        deltaTime: 0,
	        started: false,
	        exporting: false,
	        playing: false,
	        recording: false,
	        settings: this.settings,
	        data: this.settings.data,
	        render: function () { return this$1.render(); },
	        togglePlay: function () { return this$1.togglePlay(); },
	        dispatch: function (cb) { return this$1.dispatch(cb); },
	        tick: function () { return this$1.tick(); },
	        resize: function () { return this$1.resize(); },
	        update: function (opt) { return this$1.update(opt); },
	        exportFrame: function (opt) { return this$1.exportFrame(opt); },
	        record: function () { return this$1.record(); },
	        play: function () { return this$1.play(); },
	        pause: function () { return this$1.pause(); },
	        stop: function () { return this$1.stop(); }});
	    this._setupGLKey();
	    this.resize();
	};
	SketchManager.prototype.loadAndRun = function loadAndRun (canvasSketch, newSettings) {
	        var this$1 = this;

	    return this.load(canvasSketch, newSettings).then(function () {
	        this$1.run();
	        return this$1;
	    });
	};
	SketchManager.prototype.unload = function unload () {
	        var this$1 = this;

	    this.pause();
	    if (!this.sketch) 
	        { return; }
	    if (typeof this.sketch.unload === "function") {
	        this._wrapContextScale(function (props) { return this$1.sketch.unload(props); });
	    }
	    this._sketch = null;
	};
	SketchManager.prototype.destroy = function destroy () {
	    this.unload();
	    this.unmount();
	};
	SketchManager.prototype.load = function load (createSketch, newSettings) {
	        var this$1 = this;

	    if (typeof createSketch !== "function") {
	        throw new Error("The function must take in a function as the first parameter. Example:\n  canvasSketcher(() => { ... }, settings)");
	    }
	    if (this.sketch) {
	        this.unload();
	    }
	    if (typeof newSettings !== "undefined") {
	        this.update(newSettings);
	    }
	    this._preRender();
	    var preload = Promise.resolve();
	    if (this.settings.p5) {
	        if (!isBrowser()) {
	            throw new Error("[canvas-sketch] ERROR: Using p5.js in Node.js is not supported");
	        }
	        preload = new Promise(function (resolve) {
	            var P5Constructor = this$1.settings.p5;
	            var preload;
	            if (P5Constructor.p5) {
	                preload = P5Constructor.preload;
	                P5Constructor = P5Constructor.p5;
	            }
	            var p5Sketch = function (p5) {
	                if (preload) 
	                    { p5.preload = (function () { return preload(p5); }); }
	                p5.setup = (function () {
	                    var props = this$1.props;
	                    var isGL = this$1.settings.context === "webgl";
	                    var renderer = isGL ? p5.WEBGL : p5.P2D;
	                    p5.noLoop();
	                    p5.pixelDensity(props.pixelRatio);
	                    p5.createCanvas(props.viewportWidth, props.viewportHeight, renderer);
	                    if (isGL && this$1.settings.attributes) {
	                        p5.setAttributes(this$1.settings.attributes);
	                    }
	                    this$1.update({
	                        p5: p5,
	                        canvas: p5.canvas,
	                        context: p5._renderer.drawingContext
	                    });
	                    resolve();
	                });
	            };
	            if (typeof P5Constructor === "function") {
	                new P5Constructor(p5Sketch);
	            } else {
	                if (typeof window.createCanvas !== "function") {
	                    throw new Error("{ p5 } setting is passed but can't find p5.js in global (window) scope. Maybe you did not create it globally?\nnew p5(); // <-- attaches to global scope");
	                }
	                p5Sketch(window);
	            }
	        });
	    }
	    return preload.then(function () {
	        var loader = createSketch(this$1.props);
	        if (!isPromise_1(loader)) {
	            loader = Promise.resolve(loader);
	        }
	        return loader;
	    }).then(function (sketch) {
	        if (!sketch) 
	            { sketch = {}; }
	        this$1._sketch = sketch;
	        if (isBrowser()) {
	            this$1._keyboardShortcuts.attach();
	            window.addEventListener("resize", this$1._resizeHandler);
	        }
	        this$1._postRender();
	        this$1._sizeChanged();
	        return this$1;
	    }).catch(function (err) {
	        console.warn("Could not start sketch, the async loading function rejected with an error:\n    Error: " + err.message);
	        throw err;
	    });
	};

	Object.defineProperties( SketchManager.prototype, prototypeAccessors );

	var CACHE = 'hot-id-cache';
	var runtimeCollisions = [];
	function isHotReload() {
	    var client = getClientAPI();
	    return client && client.hot;
	}

	function cacheGet(id) {
	    var client = getClientAPI();
	    if (!client) 
	        { return undefined; }
	    client[CACHE] = client[CACHE] || {};
	    return client[CACHE][id];
	}

	function cachePut(id, data) {
	    var client = getClientAPI();
	    if (!client) 
	        { return undefined; }
	    client[CACHE] = client[CACHE] || {};
	    client[CACHE][id] = data;
	}

	function getTimeProp(oldManager, newSettings) {
	    return newSettings.animate ? {
	        time: oldManager.props.time
	    } : undefined;
	}

	function canvasSketch(sketch, settings) {
	    if ( settings === void 0 ) settings = {};

	    if (settings.p5) {
	        if (settings.canvas || settings.context && typeof settings.context !== 'string') {
	            throw new Error("In { p5 } mode, you can't pass your own canvas or context, unless the context is a \"webgl\" or \"2d\" string");
	        }
	        var context = typeof settings.context === 'string' ? settings.context : false;
	        settings = Object.assign({}, settings, {
	            canvas: false,
	            context: context
	        });
	    }
	    var isHot = isHotReload();
	    var hotID;
	    if (isHot) {
	        hotID = defined(settings.id, '$__DEFAULT_CANVAS_SKETCH_ID__$');
	    }
	    var isInjecting = isHot && typeof hotID === 'string';
	    if (isInjecting && runtimeCollisions.includes(hotID)) {
	        console.warn("Warning: You have multiple calls to canvasSketch() in --hot mode. You must pass unique { id } strings in settings to enable hot reload across multiple sketches. ", hotID);
	        isInjecting = false;
	    }
	    var preload = Promise.resolve();
	    if (isInjecting) {
	        runtimeCollisions.push(hotID);
	        var previousData = cacheGet(hotID);
	        if (previousData) {
	            var next = function () {
	                var newProps = getTimeProp(previousData.manager, settings);
	                previousData.manager.destroy();
	                return newProps;
	            };
	            preload = previousData.load.then(next).catch(next);
	        }
	    }
	    return preload.then(function (newProps) {
	        var manager = new SketchManager();
	        var result;
	        if (sketch) {
	            settings = Object.assign({}, settings, newProps);
	            manager.setup(settings);
	            manager.mount();
	            result = manager.loadAndRun(sketch);
	        } else {
	            result = Promise.resolve(manager);
	        }
	        if (isInjecting) {
	            cachePut(hotID, {
	                load: result,
	                manager: manager
	            });
	        }
	        return result;
	    });
	}

	canvasSketch.canvasSketch = canvasSketch;
	canvasSketch.PaperSizes = paperSizes;

	return canvasSketch;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLXNrZXRjaC51bWQuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JpZ2h0LW5vdy9icm93c2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2lzLXByb21pc2UvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvaXMtZG9tL2luZGV4LmpzIiwiLi4vbGliL3V0aWwuanMiLCIuLi9ub2RlX21vZHVsZXMvZGVlcC1lcXVhbC9saWIva2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9kZWVwLWVxdWFsL2xpYi9pc19hcmd1bWVudHMuanMiLCIuLi9ub2RlX21vZHVsZXMvZGVlcC1lcXVhbC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9kYXRlZm9ybWF0L2xpYi9kYXRlZm9ybWF0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlcGVhdC1zdHJpbmcvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvcGFkLWxlZnQvaW5kZXguanMiLCIuLi9saWIvc2F2ZS5qcyIsIi4uL2xpYi9hY2Nlc3NpYmlsaXR5LmpzIiwiLi4vbGliL2NvcmUva2V5Ym9hcmRTaG9ydGN1dHMuanMiLCIuLi9saWIvcGFwZXItc2l6ZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvZGVmaW5lZC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb252ZXJ0LWxlbmd0aC9jb252ZXJ0LWxlbmd0aC5qcyIsIi4uL2xpYi9kaXN0YW5jZXMuanMiLCIuLi9saWIvY29yZS9yZXNpemVDYW52YXMuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2V0LWNhbnZhcy1jb250ZXh0L2luZGV4LmpzIiwiLi4vbGliL2NvcmUvY3JlYXRlQ2FudmFzLmpzIiwiLi4vbGliL2NvcmUvU2tldGNoTWFuYWdlci5qcyIsIi4uL2xpYi9jYW52YXMtc2tldGNoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9XG4gIGdsb2JhbC5wZXJmb3JtYW5jZSAmJlxuICBnbG9iYWwucGVyZm9ybWFuY2Uubm93ID8gZnVuY3Rpb24gbm93KCkge1xuICAgIHJldHVybiBwZXJmb3JtYW5jZS5ub3coKVxuICB9IDogRGF0ZS5ub3cgfHwgZnVuY3Rpb24gbm93KCkge1xuICAgIHJldHVybiArbmV3IERhdGVcbiAgfVxuIiwibW9kdWxlLmV4cG9ydHMgPSBpc1Byb21pc2U7XG5cbmZ1bmN0aW9uIGlzUHJvbWlzZShvYmopIHtcbiAgcmV0dXJuICEhb2JqICYmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSAmJiB0eXBlb2Ygb2JqLnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGlzTm9kZVxuXG5mdW5jdGlvbiBpc05vZGUgKHZhbCkge1xuICByZXR1cm4gKCF2YWwgfHwgdHlwZW9mIHZhbCAhPT0gJ29iamVjdCcpXG4gICAgPyBmYWxzZVxuICAgIDogKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHR5cGVvZiB3aW5kb3cuTm9kZSA9PT0gJ29iamVjdCcpXG4gICAgICA/ICh2YWwgaW5zdGFuY2VvZiB3aW5kb3cuTm9kZSlcbiAgICAgIDogKHR5cGVvZiB2YWwubm9kZVR5cGUgPT09ICdudW1iZXInKSAmJlxuICAgICAgICAodHlwZW9mIHZhbC5ub2RlTmFtZSA9PT0gJ3N0cmluZycpXG59XG4iLCIvLyBUT0RPOiBXZSBjYW4gcmVtb3ZlIGEgaHVnZSBjaHVuayBvZiBidW5kbGUgc2l6ZSBieSB1c2luZyBhIHNtYWxsZXJcbi8vIHV0aWxpdHkgbW9kdWxlIGZvciBjb252ZXJ0aW5nIHVuaXRzLlxuaW1wb3J0IGlzRE9NIGZyb20gXCJpcy1kb21cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENsaWVudEFQSSgpIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93W1wiY2FudmFzLXNrZXRjaC1jbGlcIl07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVkKCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcmd1bWVudHNbaV0gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQnJvd3NlcigpIHtcbiAgcmV0dXJuIHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzV2ViR0xDb250ZXh0KGN0eCkge1xuICByZXR1cm4gKFxuICAgIGN0eCAmJlxuICAgIHR5cGVvZiBjdHguY2xlYXIgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgIHR5cGVvZiBjdHguY2xlYXJDb2xvciA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgdHlwZW9mIGN0eC5idWZmZXJEYXRhID09PSBcImZ1bmN0aW9uXCJcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzMkRDb250ZXh0KGN0eCkge1xuICByZXR1cm4gKFxuICAgIGN0eCAmJlxuICAgIHR5cGVvZiBjdHguc2F2ZSA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgdHlwZW9mIGN0eC5zY2FsZSA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgdHlwZW9mIGN0eC5yZXN0b3JlID09PSBcImZ1bmN0aW9uXCJcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2FudmFzKGVsZW1lbnQpIHtcbiAgcmV0dXJuIChcbiAgICBpc0RPTShlbGVtZW50KSAmJlxuICAgIC9jYW52YXMvaS50ZXN0KGVsZW1lbnQubm9kZU5hbWUpICYmXG4gICAgdHlwZW9mIGVsZW1lbnQuZ2V0Q29udGV4dCA9PT0gXCJmdW5jdGlvblwiXG4gICk7XG59XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbidcbiAgPyBPYmplY3Qua2V5cyA6IHNoaW07XG5cbmV4cG9ydHMuc2hpbSA9IHNoaW07XG5mdW5jdGlvbiBzaGltIChvYmopIHtcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikga2V5cy5wdXNoKGtleSk7XG4gIHJldHVybiBrZXlzO1xufVxuIiwidmFyIHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPSAoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudHMpXG59KSgpID09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0c0FyZ3VtZW50c0NsYXNzID8gc3VwcG9ydGVkIDogdW5zdXBwb3J0ZWQ7XG5cbmV4cG9ydHMuc3VwcG9ydGVkID0gc3VwcG9ydGVkO1xuZnVuY3Rpb24gc3VwcG9ydGVkKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG59O1xuXG5leHBvcnRzLnVuc3VwcG9ydGVkID0gdW5zdXBwb3J0ZWQ7XG5mdW5jdGlvbiB1bnN1cHBvcnRlZChvYmplY3Qpe1xuICByZXR1cm4gb2JqZWN0ICYmXG4gICAgdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBvYmplY3QubGVuZ3RoID09ICdudW1iZXInICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ2NhbGxlZScpICYmXG4gICAgIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsICdjYWxsZWUnKSB8fFxuICAgIGZhbHNlO1xufTtcbiIsInZhciBwU2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4vbGliL2tleXMuanMnKTtcbnZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vbGliL2lzX2FyZ3VtZW50cy5qcycpO1xuXG52YXIgZGVlcEVxdWFsID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYWN0dWFsLCBleHBlY3RlZCwgb3B0cykge1xuICBpZiAoIW9wdHMpIG9wdHMgPSB7fTtcbiAgLy8gNy4xLiBBbGwgaWRlbnRpY2FsIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG5cbiAgfSBlbHNlIGlmIChhY3R1YWwgaW5zdGFuY2VvZiBEYXRlICYmIGV4cGVjdGVkIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiBhY3R1YWwuZ2V0VGltZSgpID09PSBleHBlY3RlZC5nZXRUaW1lKCk7XG5cbiAgLy8gNy4zLiBPdGhlciBwYWlycyB0aGF0IGRvIG5vdCBib3RoIHBhc3MgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnLFxuICAvLyBlcXVpdmFsZW5jZSBpcyBkZXRlcm1pbmVkIGJ5ID09LlxuICB9IGVsc2UgaWYgKCFhY3R1YWwgfHwgIWV4cGVjdGVkIHx8IHR5cGVvZiBhY3R1YWwgIT0gJ29iamVjdCcgJiYgdHlwZW9mIGV4cGVjdGVkICE9ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG9wdHMuc3RyaWN0ID8gYWN0dWFsID09PSBleHBlY3RlZCA6IGFjdHVhbCA9PSBleHBlY3RlZDtcblxuICAvLyA3LjQuIEZvciBhbGwgb3RoZXIgT2JqZWN0IHBhaXJzLCBpbmNsdWRpbmcgQXJyYXkgb2JqZWN0cywgZXF1aXZhbGVuY2UgaXNcbiAgLy8gZGV0ZXJtaW5lZCBieSBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGFzIHZlcmlmaWVkXG4gIC8vIHdpdGggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKSwgdGhlIHNhbWUgc2V0IG9mIGtleXNcbiAgLy8gKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksIGVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeVxuICAvLyBjb3JyZXNwb25kaW5nIGtleSwgYW5kIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS4gTm90ZTogdGhpc1xuICAvLyBhY2NvdW50cyBmb3IgYm90aCBuYW1lZCBhbmQgaW5kZXhlZCBwcm9wZXJ0aWVzIG9uIEFycmF5cy5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqRXF1aXYoYWN0dWFsLCBleHBlY3RlZCwgb3B0cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWRPck51bGwodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyICh4KSB7XG4gIGlmICgheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHgubGVuZ3RoICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICBpZiAodHlwZW9mIHguY29weSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgeC5zbGljZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoeC5sZW5ndGggPiAwICYmIHR5cGVvZiB4WzBdICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gb2JqRXF1aXYoYSwgYiwgb3B0cykge1xuICB2YXIgaSwga2V5O1xuICBpZiAoaXNVbmRlZmluZWRPck51bGwoYSkgfHwgaXNVbmRlZmluZWRPck51bGwoYikpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvLyBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuXG4gIGlmIChhLnByb3RvdHlwZSAhPT0gYi5wcm90b3R5cGUpIHJldHVybiBmYWxzZTtcbiAgLy9+fn5JJ3ZlIG1hbmFnZWQgdG8gYnJlYWsgT2JqZWN0LmtleXMgdGhyb3VnaCBzY3Jld3kgYXJndW1lbnRzIHBhc3NpbmcuXG4gIC8vICAgQ29udmVydGluZyB0byBhcnJheSBzb2x2ZXMgdGhlIHByb2JsZW0uXG4gIGlmIChpc0FyZ3VtZW50cyhhKSkge1xuICAgIGlmICghaXNBcmd1bWVudHMoYikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgYSA9IHBTbGljZS5jYWxsKGEpO1xuICAgIGIgPSBwU2xpY2UuY2FsbChiKTtcbiAgICByZXR1cm4gZGVlcEVxdWFsKGEsIGIsIG9wdHMpO1xuICB9XG4gIGlmIChpc0J1ZmZlcihhKSkge1xuICAgIGlmICghaXNCdWZmZXIoYikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAoaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYVtpXSAhPT0gYltpXSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB0cnkge1xuICAgIHZhciBrYSA9IG9iamVjdEtleXMoYSksXG4gICAgICAgIGtiID0gb2JqZWN0S2V5cyhiKTtcbiAgfSBjYXRjaCAoZSkgey8vaGFwcGVucyB3aGVuIG9uZSBpcyBhIHN0cmluZyBsaXRlcmFsIGFuZCB0aGUgb3RoZXIgaXNuJ3RcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChrZXlzIGluY29ycG9yYXRlc1xuICAvLyBoYXNPd25Qcm9wZXJ0eSlcbiAgaWYgKGthLmxlbmd0aCAhPSBrYi5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvL3RoZSBzYW1lIHNldCBvZiBrZXlzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLFxuICBrYS5zb3J0KCk7XG4gIGtiLnNvcnQoKTtcbiAgLy9+fn5jaGVhcCBrZXkgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChrYVtpXSAhPSBrYltpXSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvL2VxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeSBjb3JyZXNwb25kaW5nIGtleSwgYW5kXG4gIC8vfn5+cG9zc2libHkgZXhwZW5zaXZlIGRlZXAgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGtleSA9IGthW2ldO1xuICAgIGlmICghZGVlcEVxdWFsKGFba2V5XSwgYltrZXldLCBvcHRzKSkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0eXBlb2YgYSA9PT0gdHlwZW9mIGI7XG59XG4iLCIvKlxuICogRGF0ZSBGb3JtYXQgMS4yLjNcbiAqIChjKSAyMDA3LTIwMDkgU3RldmVuIExldml0aGFuIDxzdGV2ZW5sZXZpdGhhbi5jb20+XG4gKiBNSVQgbGljZW5zZVxuICpcbiAqIEluY2x1ZGVzIGVuaGFuY2VtZW50cyBieSBTY290dCBUcmVuZGEgPHNjb3R0LnRyZW5kYS5uZXQ+XG4gKiBhbmQgS3JpcyBLb3dhbCA8Y2l4YXIuY29tL35rcmlzLmtvd2FsLz5cbiAqXG4gKiBBY2NlcHRzIGEgZGF0ZSwgYSBtYXNrLCBvciBhIGRhdGUgYW5kIGEgbWFzay5cbiAqIFJldHVybnMgYSBmb3JtYXR0ZWQgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSBkYXRlIGRlZmF1bHRzIHRvIHRoZSBjdXJyZW50IGRhdGUvdGltZS5cbiAqIFRoZSBtYXNrIGRlZmF1bHRzIHRvIGRhdGVGb3JtYXQubWFza3MuZGVmYXVsdC5cbiAqL1xuXG4oZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgZGF0ZUZvcm1hdCA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0b2tlbiA9IC9kezEsNH18bXsxLDR9fHl5KD86eXkpP3woW0hoTXNUdF0pXFwxP3xbTGxvU1pXTl18XCJbXlwiXSpcInwnW14nXSonL2c7XG4gICAgICB2YXIgdGltZXpvbmUgPSAvXFxiKD86W1BNQ0VBXVtTRFBdVHwoPzpQYWNpZmljfE1vdW50YWlufENlbnRyYWx8RWFzdGVybnxBdGxhbnRpYykgKD86U3RhbmRhcmR8RGF5bGlnaHR8UHJldmFpbGluZykgVGltZXwoPzpHTVR8VVRDKSg/OlstK11cXGR7NH0pPylcXGIvZztcbiAgICAgIHZhciB0aW1lem9uZUNsaXAgPSAvW14tK1xcZEEtWl0vZztcbiAgXG4gICAgICAvLyBSZWdleGVzIGFuZCBzdXBwb3J0aW5nIGZ1bmN0aW9ucyBhcmUgY2FjaGVkIHRocm91Z2ggY2xvc3VyZVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRlLCBtYXNrLCB1dGMsIGdtdCkge1xuICBcbiAgICAgICAgLy8gWW91IGNhbid0IHByb3ZpZGUgdXRjIGlmIHlvdSBza2lwIG90aGVyIGFyZ3MgKHVzZSB0aGUgJ1VUQzonIG1hc2sgcHJlZml4KVxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBraW5kT2YoZGF0ZSkgPT09ICdzdHJpbmcnICYmICEvXFxkLy50ZXN0KGRhdGUpKSB7XG4gICAgICAgICAgbWFzayA9IGRhdGU7XG4gICAgICAgICAgZGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICBcbiAgICAgICAgZGF0ZSA9IGRhdGUgfHwgbmV3IERhdGU7XG4gIFxuICAgICAgICBpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgaWYgKGlzTmFOKGRhdGUpKSB7XG4gICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIGRhdGUnKTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgbWFzayA9IFN0cmluZyhkYXRlRm9ybWF0Lm1hc2tzW21hc2tdIHx8IG1hc2sgfHwgZGF0ZUZvcm1hdC5tYXNrc1snZGVmYXVsdCddKTtcbiAgXG4gICAgICAgIC8vIEFsbG93IHNldHRpbmcgdGhlIHV0Yy9nbXQgYXJndW1lbnQgdmlhIHRoZSBtYXNrXG4gICAgICAgIHZhciBtYXNrU2xpY2UgPSBtYXNrLnNsaWNlKDAsIDQpO1xuICAgICAgICBpZiAobWFza1NsaWNlID09PSAnVVRDOicgfHwgbWFza1NsaWNlID09PSAnR01UOicpIHtcbiAgICAgICAgICBtYXNrID0gbWFzay5zbGljZSg0KTtcbiAgICAgICAgICB1dGMgPSB0cnVlO1xuICAgICAgICAgIGlmIChtYXNrU2xpY2UgPT09ICdHTVQ6Jykge1xuICAgICAgICAgICAgZ210ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgXG4gICAgICAgIHZhciBfID0gdXRjID8gJ2dldFVUQycgOiAnZ2V0JztcbiAgICAgICAgdmFyIGQgPSBkYXRlW18gKyAnRGF0ZSddKCk7XG4gICAgICAgIHZhciBEID0gZGF0ZVtfICsgJ0RheSddKCk7XG4gICAgICAgIHZhciBtID0gZGF0ZVtfICsgJ01vbnRoJ10oKTtcbiAgICAgICAgdmFyIHkgPSBkYXRlW18gKyAnRnVsbFllYXInXSgpO1xuICAgICAgICB2YXIgSCA9IGRhdGVbXyArICdIb3VycyddKCk7XG4gICAgICAgIHZhciBNID0gZGF0ZVtfICsgJ01pbnV0ZXMnXSgpO1xuICAgICAgICB2YXIgcyA9IGRhdGVbXyArICdTZWNvbmRzJ10oKTtcbiAgICAgICAgdmFyIEwgPSBkYXRlW18gKyAnTWlsbGlzZWNvbmRzJ10oKTtcbiAgICAgICAgdmFyIG8gPSB1dGMgPyAwIDogZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuICAgICAgICB2YXIgVyA9IGdldFdlZWsoZGF0ZSk7XG4gICAgICAgIHZhciBOID0gZ2V0RGF5T2ZXZWVrKGRhdGUpO1xuICAgICAgICB2YXIgZmxhZ3MgPSB7XG4gICAgICAgICAgZDogICAgZCxcbiAgICAgICAgICBkZDogICBwYWQoZCksXG4gICAgICAgICAgZGRkOiAgZGF0ZUZvcm1hdC5pMThuLmRheU5hbWVzW0RdLFxuICAgICAgICAgIGRkZGQ6IGRhdGVGb3JtYXQuaTE4bi5kYXlOYW1lc1tEICsgN10sXG4gICAgICAgICAgbTogICAgbSArIDEsXG4gICAgICAgICAgbW06ICAgcGFkKG0gKyAxKSxcbiAgICAgICAgICBtbW06ICBkYXRlRm9ybWF0LmkxOG4ubW9udGhOYW1lc1ttXSxcbiAgICAgICAgICBtbW1tOiBkYXRlRm9ybWF0LmkxOG4ubW9udGhOYW1lc1ttICsgMTJdLFxuICAgICAgICAgIHl5OiAgIFN0cmluZyh5KS5zbGljZSgyKSxcbiAgICAgICAgICB5eXl5OiB5LFxuICAgICAgICAgIGg6ICAgIEggJSAxMiB8fCAxMixcbiAgICAgICAgICBoaDogICBwYWQoSCAlIDEyIHx8IDEyKSxcbiAgICAgICAgICBIOiAgICBILFxuICAgICAgICAgIEhIOiAgIHBhZChIKSxcbiAgICAgICAgICBNOiAgICBNLFxuICAgICAgICAgIE1NOiAgIHBhZChNKSxcbiAgICAgICAgICBzOiAgICBzLFxuICAgICAgICAgIHNzOiAgIHBhZChzKSxcbiAgICAgICAgICBsOiAgICBwYWQoTCwgMyksXG4gICAgICAgICAgTDogICAgcGFkKE1hdGgucm91bmQoTCAvIDEwKSksXG4gICAgICAgICAgdDogICAgSCA8IDEyID8gZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1swXSA6IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbMV0sXG4gICAgICAgICAgdHQ6ICAgSCA8IDEyID8gZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1syXSA6IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbM10sXG4gICAgICAgICAgVDogICAgSCA8IDEyID8gZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s0XSA6IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbNV0sXG4gICAgICAgICAgVFQ6ICAgSCA8IDEyID8gZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s2XSA6IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbN10sXG4gICAgICAgICAgWjogICAgZ210ID8gJ0dNVCcgOiB1dGMgPyAnVVRDJyA6IChTdHJpbmcoZGF0ZSkubWF0Y2godGltZXpvbmUpIHx8IFsnJ10pLnBvcCgpLnJlcGxhY2UodGltZXpvbmVDbGlwLCAnJyksXG4gICAgICAgICAgbzogICAgKG8gPiAwID8gJy0nIDogJysnKSArIHBhZChNYXRoLmZsb29yKE1hdGguYWJzKG8pIC8gNjApICogMTAwICsgTWF0aC5hYnMobykgJSA2MCwgNCksXG4gICAgICAgICAgUzogICAgWyd0aCcsICdzdCcsICduZCcsICdyZCddW2QgJSAxMCA+IDMgPyAwIDogKGQgJSAxMDAgLSBkICUgMTAgIT0gMTApICogZCAlIDEwXSxcbiAgICAgICAgICBXOiAgICBXLFxuICAgICAgICAgIE46ICAgIE5cbiAgICAgICAgfTtcbiAgXG4gICAgICAgIHJldHVybiBtYXNrLnJlcGxhY2UodG9rZW4sIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgIGlmIChtYXRjaCBpbiBmbGFncykge1xuICAgICAgICAgICAgcmV0dXJuIGZsYWdzW21hdGNoXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1hdGNoLnNsaWNlKDEsIG1hdGNoLmxlbmd0aCAtIDEpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSkoKTtcblxuICBkYXRlRm9ybWF0Lm1hc2tzID0ge1xuICAgICdkZWZhdWx0JzogICAgICAgICAgICAgICAnZGRkIG1tbSBkZCB5eXl5IEhIOk1NOnNzJyxcbiAgICAnc2hvcnREYXRlJzogICAgICAgICAgICAgJ20vZC95eScsXG4gICAgJ21lZGl1bURhdGUnOiAgICAgICAgICAgICdtbW0gZCwgeXl5eScsXG4gICAgJ2xvbmdEYXRlJzogICAgICAgICAgICAgICdtbW1tIGQsIHl5eXknLFxuICAgICdmdWxsRGF0ZSc6ICAgICAgICAgICAgICAnZGRkZCwgbW1tbSBkLCB5eXl5JyxcbiAgICAnc2hvcnRUaW1lJzogICAgICAgICAgICAgJ2g6TU0gVFQnLFxuICAgICdtZWRpdW1UaW1lJzogICAgICAgICAgICAnaDpNTTpzcyBUVCcsXG4gICAgJ2xvbmdUaW1lJzogICAgICAgICAgICAgICdoOk1NOnNzIFRUIFonLFxuICAgICdpc29EYXRlJzogICAgICAgICAgICAgICAneXl5eS1tbS1kZCcsXG4gICAgJ2lzb1RpbWUnOiAgICAgICAgICAgICAgICdISDpNTTpzcycsXG4gICAgJ2lzb0RhdGVUaW1lJzogICAgICAgICAgICd5eXl5LW1tLWRkXFwnVFxcJ0hIOk1NOnNzbycsXG4gICAgJ2lzb1V0Y0RhdGVUaW1lJzogICAgICAgICdVVEM6eXl5eS1tbS1kZFxcJ1RcXCdISDpNTTpzc1xcJ1pcXCcnLFxuICAgICdleHBpcmVzSGVhZGVyRm9ybWF0JzogICAnZGRkLCBkZCBtbW0geXl5eSBISDpNTTpzcyBaJ1xuICB9O1xuXG4gIC8vIEludGVybmF0aW9uYWxpemF0aW9uIHN0cmluZ3NcbiAgZGF0ZUZvcm1hdC5pMThuID0ge1xuICAgIGRheU5hbWVzOiBbXG4gICAgICAnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0JyxcbiAgICAgICdTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSdcbiAgICBdLFxuICAgIG1vbnRoTmFtZXM6IFtcbiAgICAgICdKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYycsXG4gICAgICAnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlcidcbiAgICBdLFxuICAgIHRpbWVOYW1lczogW1xuICAgICAgJ2EnLCAncCcsICdhbScsICdwbScsICdBJywgJ1AnLCAnQU0nLCAnUE0nXG4gICAgXVxuICB9O1xuXG5mdW5jdGlvbiBwYWQodmFsLCBsZW4pIHtcbiAgdmFsID0gU3RyaW5nKHZhbCk7XG4gIGxlbiA9IGxlbiB8fCAyO1xuICB3aGlsZSAodmFsLmxlbmd0aCA8IGxlbikge1xuICAgIHZhbCA9ICcwJyArIHZhbDtcbiAgfVxuICByZXR1cm4gdmFsO1xufVxuXG4vKipcbiAqIEdldCB0aGUgSVNPIDg2MDEgd2VlayBudW1iZXJcbiAqIEJhc2VkIG9uIGNvbW1lbnRzIGZyb21cbiAqIGh0dHA6Ly90ZWNoYmxvZy5wcm9jdXJpb3Mubmwvay9uNjE4L25ld3Mvdmlldy8zMzc5Ni8xNDg2My9DYWxjdWxhdGUtSVNPLTg2MDEtd2Vlay1hbmQteWVhci1pbi1qYXZhc2NyaXB0Lmh0bWxcbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IGBkYXRlYFxuICogQHJldHVybiB7TnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXRXZWVrKGRhdGUpIHtcbiAgLy8gUmVtb3ZlIHRpbWUgY29tcG9uZW50cyBvZiBkYXRlXG4gIHZhciB0YXJnZXRUaHVyc2RheSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XG5cbiAgLy8gQ2hhbmdlIGRhdGUgdG8gVGh1cnNkYXkgc2FtZSB3ZWVrXG4gIHRhcmdldFRodXJzZGF5LnNldERhdGUodGFyZ2V0VGh1cnNkYXkuZ2V0RGF0ZSgpIC0gKCh0YXJnZXRUaHVyc2RheS5nZXREYXkoKSArIDYpICUgNykgKyAzKTtcblxuICAvLyBUYWtlIEphbnVhcnkgNHRoIGFzIGl0IGlzIGFsd2F5cyBpbiB3ZWVrIDEgKHNlZSBJU08gODYwMSlcbiAgdmFyIGZpcnN0VGh1cnNkYXkgPSBuZXcgRGF0ZSh0YXJnZXRUaHVyc2RheS5nZXRGdWxsWWVhcigpLCAwLCA0KTtcblxuICAvLyBDaGFuZ2UgZGF0ZSB0byBUaHVyc2RheSBzYW1lIHdlZWtcbiAgZmlyc3RUaHVyc2RheS5zZXREYXRlKGZpcnN0VGh1cnNkYXkuZ2V0RGF0ZSgpIC0gKChmaXJzdFRodXJzZGF5LmdldERheSgpICsgNikgJSA3KSArIDMpO1xuXG4gIC8vIENoZWNrIGlmIGRheWxpZ2h0LXNhdmluZy10aW1lLXN3aXRjaCBvY2N1cnJlZCBhbmQgY29ycmVjdCBmb3IgaXRcbiAgdmFyIGRzID0gdGFyZ2V0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIGZpcnN0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgdGFyZ2V0VGh1cnNkYXkuc2V0SG91cnModGFyZ2V0VGh1cnNkYXkuZ2V0SG91cnMoKSAtIGRzKTtcblxuICAvLyBOdW1iZXIgb2Ygd2Vla3MgYmV0d2VlbiB0YXJnZXQgVGh1cnNkYXkgYW5kIGZpcnN0IFRodXJzZGF5XG4gIHZhciB3ZWVrRGlmZiA9ICh0YXJnZXRUaHVyc2RheSAtIGZpcnN0VGh1cnNkYXkpIC8gKDg2NDAwMDAwKjcpO1xuICByZXR1cm4gMSArIE1hdGguZmxvb3Iod2Vla0RpZmYpO1xufVxuXG4vKipcbiAqIEdldCBJU08tODYwMSBudW1lcmljIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXkgb2YgdGhlIHdlZWtcbiAqIDEgKGZvciBNb25kYXkpIHRocm91Z2ggNyAoZm9yIFN1bmRheSlcbiAqIFxuICogQHBhcmFtICB7T2JqZWN0fSBgZGF0ZWBcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqL1xuZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrKGRhdGUpIHtcbiAgdmFyIGRvdyA9IGRhdGUuZ2V0RGF5KCk7XG4gIGlmKGRvdyA9PT0gMCkge1xuICAgIGRvdyA9IDc7XG4gIH1cbiAgcmV0dXJuIGRvdztcbn1cblxuLyoqXG4gKiBraW5kLW9mIHNob3J0Y3V0XG4gKiBAcGFyYW0gIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24ga2luZE9mKHZhbCkge1xuICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgcmV0dXJuICdudWxsJztcbiAgfVxuXG4gIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB0eXBlb2YgdmFsO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgIHJldHVybiAnYXJyYXknO1xuICB9XG5cbiAgcmV0dXJuIHt9LnRvU3RyaW5nLmNhbGwodmFsKVxuICAgIC5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKTtcbn07XG5cblxuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGRhdGVGb3JtYXQ7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkYXRlRm9ybWF0O1xuICB9IGVsc2Uge1xuICAgIGdsb2JhbC5kYXRlRm9ybWF0ID0gZGF0ZUZvcm1hdDtcbiAgfVxufSkodGhpcyk7XG4iLCIvKiFcbiAqIHJlcGVhdC1zdHJpbmcgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L3JlcGVhdC1zdHJpbmc+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUsIEpvbiBTY2hsaW5rZXJ0LlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBSZXN1bHRzIGNhY2hlXG4gKi9cblxudmFyIHJlcyA9ICcnO1xudmFyIGNhY2hlO1xuXG4vKipcbiAqIEV4cG9zZSBgcmVwZWF0YFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gcmVwZWF0O1xuXG4vKipcbiAqIFJlcGVhdCB0aGUgZ2l2ZW4gYHN0cmluZ2AgdGhlIHNwZWNpZmllZCBgbnVtYmVyYFxuICogb2YgdGltZXMuXG4gKlxuICogKipFeGFtcGxlOioqXG4gKlxuICogYGBganNcbiAqIHZhciByZXBlYXQgPSByZXF1aXJlKCdyZXBlYXQtc3RyaW5nJyk7XG4gKiByZXBlYXQoJ0EnLCA1KTtcbiAqIC8vPT4gQUFBQUFcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBgc3RyaW5nYCBUaGUgc3RyaW5nIHRvIHJlcGVhdFxuICogQHBhcmFtIHtOdW1iZXJ9IGBudW1iZXJgIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHRoZSBzdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ30gUmVwZWF0ZWQgc3RyaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHJlcGVhdChzdHIsIG51bSkge1xuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleHBlY3RlZCBhIHN0cmluZycpO1xuICB9XG5cbiAgLy8gY292ZXIgY29tbW9uLCBxdWljayB1c2UgY2FzZXNcbiAgaWYgKG51bSA9PT0gMSkgcmV0dXJuIHN0cjtcbiAgaWYgKG51bSA9PT0gMikgcmV0dXJuIHN0ciArIHN0cjtcblxuICB2YXIgbWF4ID0gc3RyLmxlbmd0aCAqIG51bTtcbiAgaWYgKGNhY2hlICE9PSBzdHIgfHwgdHlwZW9mIGNhY2hlID09PSAndW5kZWZpbmVkJykge1xuICAgIGNhY2hlID0gc3RyO1xuICAgIHJlcyA9ICcnO1xuICB9IGVsc2UgaWYgKHJlcy5sZW5ndGggPj0gbWF4KSB7XG4gICAgcmV0dXJuIHJlcy5zdWJzdHIoMCwgbWF4KTtcbiAgfVxuXG4gIHdoaWxlIChtYXggPiByZXMubGVuZ3RoICYmIG51bSA+IDEpIHtcbiAgICBpZiAobnVtICYgMSkge1xuICAgICAgcmVzICs9IHN0cjtcbiAgICB9XG5cbiAgICBudW0gPj49IDE7XG4gICAgc3RyICs9IHN0cjtcbiAgfVxuXG4gIHJlcyArPSBzdHI7XG4gIHJlcyA9IHJlcy5zdWJzdHIoMCwgbWF4KTtcbiAgcmV0dXJuIHJlcztcbn1cbiIsIi8qIVxuICogcGFkLWxlZnQgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L3BhZC1sZWZ0PlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciByZXBlYXQgPSByZXF1aXJlKCdyZXBlYXQtc3RyaW5nJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFkTGVmdChzdHIsIG51bSwgY2gpIHtcbiAgc3RyID0gc3RyLnRvU3RyaW5nKCk7XG5cbiAgaWYgKHR5cGVvZiBudW0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIGlmIChjaCA9PT0gMCkge1xuICAgIGNoID0gJzAnO1xuICB9IGVsc2UgaWYgKGNoKSB7XG4gICAgY2ggPSBjaC50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIGNoID0gJyAnO1xuICB9XG5cbiAgcmV0dXJuIHJlcGVhdChjaCwgbnVtIC0gc3RyLmxlbmd0aCkgKyBzdHI7XG59O1xuIiwiaW1wb3J0IGRhdGVmb3JtYXQgZnJvbSAnZGF0ZWZvcm1hdCc7XG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xuaW1wb3J0IHBhZExlZnQgZnJvbSAncGFkLWxlZnQnO1xuaW1wb3J0IHsgZ2V0Q2xpZW50QVBJIH0gZnJvbSAnLi91dGlsJztcblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xubGV0IGxpbms7XG5sZXQgZGVmYXVsdEV4dHMgPSB7IGV4dGVuc2lvbjogJycsIHByZWZpeDogJycsIHN1ZmZpeDogJycgfTtcblxuLy8gQWx0ZXJuYXRpdmUgc29sdXRpb24gZm9yIHNhdmluZyBmaWxlcyxcbi8vIGEgYml0IHNsb3dlciBhbmQgZG9lcyBub3Qgd29yayBpbiBTYWZhcmlcbi8vIGZ1bmN0aW9uIGZldGNoQmxvYkZyb21EYXRhVVJMIChkYXRhVVJMKSB7XG4vLyAgIHJldHVybiB3aW5kb3cuZmV0Y2goZGF0YVVSTCkudGhlbihyZXMgPT4gcmVzLmJsb2IoKSk7XG4vLyB9XG5cbmNvbnN0IHN1cHBvcnRlZEVuY29kaW5ncyA9IFtcbiAgJ2ltYWdlL3BuZycsXG4gICdpbWFnZS9qcGVnJyxcbiAgJ2ltYWdlL3dlYnAnXG5dO1xuXG5mdW5jdGlvbiBzdHJlYW0gKGlzU3RhcnQsIG9wdHMgPSB7fSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIG9wdHMgPSBhc3NpZ24oe30sIGRlZmF1bHRFeHRzLCBvcHRzKTtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHJlc29sdmVGaWxlbmFtZShPYmplY3QuYXNzaWduKHt9LCBvcHRzLCB7XG4gICAgICBleHRlbnNpb246ICcnLFxuICAgICAgZnJhbWU6IHVuZGVmaW5lZFxuICAgIH0pKTtcbiAgICBjb25zdCBmdW5jID0gaXNTdGFydCA/ICdzdHJlYW1TdGFydCcgOiAnc3RyZWFtRW5kJztcbiAgICBjb25zdCBjbGllbnQgPSBnZXRDbGllbnRBUEkoKTtcbiAgICBpZiAoY2xpZW50ICYmIGNsaWVudC5vdXRwdXQgJiYgdHlwZW9mIGNsaWVudFtmdW5jXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGNsaWVudFtmdW5jXShhc3NpZ24oe30sIG9wdHMsIHsgZmlsZW5hbWUgfSkpXG4gICAgICAgIC50aGVuKGV2ID0+IHJlc29sdmUoZXYpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc29sdmUoeyBmaWxlbmFtZSwgY2xpZW50OiBmYWxzZSB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyZWFtU3RhcnQgKG9wdHMgPSB7fSkge1xuICByZXR1cm4gc3RyZWFtKHRydWUsIG9wdHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyZWFtRW5kIChvcHRzID0ge30pIHtcbiAgcmV0dXJuIHN0cmVhbShmYWxzZSwgb3B0cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHBvcnRDYW52YXMgKGNhbnZhcywgb3B0ID0ge30pIHtcbiAgY29uc3QgZW5jb2RpbmcgPSBvcHQuZW5jb2RpbmcgfHwgJ2ltYWdlL3BuZyc7XG4gIGlmICghc3VwcG9ydGVkRW5jb2RpbmdzLmluY2x1ZGVzKGVuY29kaW5nKSkgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNhbnZhcyBlbmNvZGluZyAke2VuY29kaW5nfWApO1xuICBsZXQgZXh0ZW5zaW9uID0gKGVuY29kaW5nLnNwbGl0KCcvJylbMV0gfHwgJycpLnJlcGxhY2UoL2pwZWcvaSwgJ2pwZycpO1xuICBpZiAoZXh0ZW5zaW9uKSBleHRlbnNpb24gPSBgLiR7ZXh0ZW5zaW9ufWAudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIHtcbiAgICBleHRlbnNpb24sXG4gICAgdHlwZTogZW5jb2RpbmcsXG4gICAgZGF0YVVSTDogY2FudmFzLnRvRGF0YVVSTChlbmNvZGluZywgb3B0LmVuY29kaW5nUXVhbGl0eSlcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQmxvYkZyb21EYXRhVVJMIChkYXRhVVJMKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IHNwbGl0SW5kZXggPSBkYXRhVVJMLmluZGV4T2YoJywnKTtcbiAgICBpZiAoc3BsaXRJbmRleCA9PT0gLTEpIHtcbiAgICAgIHJlc29sdmUobmV3IHdpbmRvdy5CbG9iKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBiYXNlNjQgPSBkYXRhVVJMLnNsaWNlKHNwbGl0SW5kZXggKyAxKTtcbiAgICBjb25zdCBieXRlU3RyaW5nID0gd2luZG93LmF0b2IoYmFzZTY0KTtcbiAgICBjb25zdCB0eXBlID0gZGF0YVVSTC5zbGljZSgwLCBzcGxpdEluZGV4KTtcbiAgICBjb25zdCBtaW1lTWF0Y2ggPSAvZGF0YTooW147XSspLy5leGVjKHR5cGUpO1xuICAgIGNvbnN0IG1pbWUgPSAobWltZU1hdGNoID8gbWltZU1hdGNoWzFdIDogJycpIHx8IHVuZGVmaW5lZDtcbiAgICBjb25zdCBhYiA9IG5ldyBBcnJheUJ1ZmZlcihieXRlU3RyaW5nLmxlbmd0aCk7XG4gICAgY29uc3QgaWEgPSBuZXcgVWludDhBcnJheShhYik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gICAgcmVzb2x2ZShuZXcgd2luZG93LkJsb2IoWyBhYiBdLCB7IHR5cGU6IG1pbWUgfSkpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVEYXRhVVJMIChkYXRhVVJMLCBvcHRzID0ge30pIHtcbiAgcmV0dXJuIGNyZWF0ZUJsb2JGcm9tRGF0YVVSTChkYXRhVVJMKVxuICAgIC50aGVuKGJsb2IgPT4gc2F2ZUJsb2IoYmxvYiwgb3B0cykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZUJsb2IgKGJsb2IsIG9wdHMgPSB7fSkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgb3B0cyA9IGFzc2lnbih7fSwgZGVmYXVsdEV4dHMsIG9wdHMpO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gb3B0cy5maWxlbmFtZTtcblxuICAgIGNvbnN0IGNsaWVudCA9IGdldENsaWVudEFQSSgpO1xuICAgIGlmIChjbGllbnQgJiYgdHlwZW9mIGNsaWVudC5zYXZlQmxvYiA9PT0gJ2Z1bmN0aW9uJyAmJiBjbGllbnQub3V0cHV0KSB7XG4gICAgICAvLyBuYXRpdmUgc2F2aW5nIHVzaW5nIGEgQ0xJIHRvb2xcbiAgICAgIHJldHVybiBjbGllbnQuc2F2ZUJsb2IoYmxvYiwgYXNzaWduKHt9LCBvcHRzLCB7IGZpbGVuYW1lIH0pKVxuICAgICAgICAudGhlbihldiA9PiByZXNvbHZlKGV2KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvcmNlIGRvd25sb2FkXG4gICAgICBpZiAoIWxpbmspIHtcbiAgICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgbGluay5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgIGxpbmsudGFyZ2V0ID0gJ19ibGFuayc7XG4gICAgICB9XG4gICAgICBsaW5rLmRvd25sb2FkID0gZmlsZW5hbWU7XG4gICAgICBsaW5rLmhyZWYgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICBsaW5rLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGxpbmsub25jbGljayA9IG5vb3A7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICAgIGlmIChsaW5rLnBhcmVudEVsZW1lbnQpIGxpbmsucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChsaW5rKTtcbiAgICAgICAgICBsaW5rLnJlbW92ZUF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICAgIHJlc29sdmUoeyBmaWxlbmFtZSwgY2xpZW50OiBmYWxzZSB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgbGluay5jbGljaygpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlRmlsZSAoZGF0YSwgb3B0cyA9IHt9KSB7XG4gIGNvbnN0IHBhcnRzID0gQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEgOiBbIGRhdGEgXTtcbiAgY29uc3QgYmxvYiA9IG5ldyB3aW5kb3cuQmxvYihwYXJ0cywgeyB0eXBlOiBvcHRzLnR5cGUgfHwgJycgfSk7XG4gIHJldHVybiBzYXZlQmxvYihibG9iLCBvcHRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWVTdGFtcCAoKSB7XG4gIGNvbnN0IGRhdGVGb3JtYXRTdHIgPSBgeXl5eS5tbS5kZC1ISC5NTS5zc2A7XG4gIHJldHVybiBkYXRlZm9ybWF0KG5ldyBEYXRlKCksIGRhdGVGb3JtYXRTdHIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdEZpbGUgKHByZWZpeCA9ICcnLCBzdWZmaXggPSAnJywgZXh0KSB7XG4gIC8vIGNvbnN0IGRhdGVGb3JtYXRTdHIgPSBgeXl5eS5tbS5kZC1ISC5NTS5zc2A7XG4gIGNvbnN0IGRhdGVGb3JtYXRTdHIgPSBgeXl5eS1tbS1kZCAnYXQnIGguTU0uc3MgVFRgO1xuICByZXR1cm4gYCR7cHJlZml4fSR7ZGF0ZWZvcm1hdChuZXcgRGF0ZSgpLCBkYXRlRm9ybWF0U3RyKX0ke3N1ZmZpeH0ke2V4dH1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUZpbGVuYW1lIChvcHQgPSB7fSkge1xuICBvcHQgPSBhc3NpZ24oe30sIG9wdCk7XG5cbiAgLy8gQ3VzdG9tIGZpbGVuYW1lIGZ1bmN0aW9uXG4gIGlmICh0eXBlb2Ygb3B0LmZpbGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gb3B0LmZpbGUob3B0KTtcbiAgfSBlbHNlIGlmIChvcHQuZmlsZSkge1xuICAgIHJldHVybiBvcHQuZmlsZTtcbiAgfVxuXG4gIGxldCBmcmFtZSA9IG51bGw7XG4gIGxldCBleHRlbnNpb24gPSAnJztcbiAgaWYgKHR5cGVvZiBvcHQuZXh0ZW5zaW9uID09PSAnc3RyaW5nJykgZXh0ZW5zaW9uID0gb3B0LmV4dGVuc2lvbjtcblxuICBpZiAodHlwZW9mIG9wdC5mcmFtZSA9PT0gJ251bWJlcicpIHtcbiAgICBsZXQgdG90YWxGcmFtZXM7XG4gICAgaWYgKHR5cGVvZiBvcHQudG90YWxGcmFtZXMgPT09ICdudW1iZXInKSB7XG4gICAgICB0b3RhbEZyYW1lcyA9IG9wdC50b3RhbEZyYW1lcztcbiAgICB9IGVsc2Uge1xuICAgICAgdG90YWxGcmFtZXMgPSBNYXRoLm1heCgxMDAwMCwgb3B0LmZyYW1lKTtcbiAgICB9XG4gICAgZnJhbWUgPSBwYWRMZWZ0KFN0cmluZyhvcHQuZnJhbWUpLCBTdHJpbmcodG90YWxGcmFtZXMpLmxlbmd0aCwgJzAnKTtcbiAgfVxuXG4gIGNvbnN0IGxheWVyU3RyID0gaXNGaW5pdGUob3B0LnRvdGFsTGF5ZXJzKSAmJiBpc0Zpbml0ZShvcHQubGF5ZXIpICYmIG9wdC50b3RhbExheWVycyA+IDEgPyBgJHtvcHQubGF5ZXJ9YCA6ICcnO1xuICBpZiAoZnJhbWUgIT0gbnVsbCkge1xuICAgIHJldHVybiBbIGxheWVyU3RyLCBmcmFtZSBdLmZpbHRlcihCb29sZWFuKS5qb2luKCctJykgKyBleHRlbnNpb247XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGVmYXVsdEZpbGVOYW1lID0gb3B0LnRpbWVTdGFtcDtcbiAgICByZXR1cm4gWyBvcHQucHJlZml4LCBvcHQubmFtZSB8fCBkZWZhdWx0RmlsZU5hbWUsIGxheWVyU3RyLCBvcHQuaGFzaCwgb3B0LnN1ZmZpeCBdLmZpbHRlcihCb29sZWFuKS5qb2luKCctJykgKyBleHRlbnNpb247XG4gIH1cbn1cbiIsIi8vIEhhbmRsZSBzb21lIGNvbW1vbiB0eXBvc1xuY29uc3QgY29tbW9uVHlwb3MgPSB7XG4gIGRpbWVuc2lvbjogJ2RpbWVuc2lvbnMnLFxuICBhbmltYXRlZDogJ2FuaW1hdGUnLFxuICBhbmltYXRpbmc6ICdhbmltYXRlJyxcbiAgdW5pdDogJ3VuaXRzJyxcbiAgUDU6ICdwNScsXG4gIHBpeGVsbGF0ZWQ6ICdwaXhlbGF0ZWQnLFxuICBsb29waW5nOiAnbG9vcCcsXG4gIHBpeGVsUGVySW5jaDogJ3BpeGVscydcbn07XG5cbi8vIEhhbmRsZSBhbGwgb3RoZXIgdHlwb3NcbmNvbnN0IGFsbEtleXMgPSBbXG4gICdkaW1lbnNpb25zJywgJ3VuaXRzJywgJ3BpeGVsc1BlckluY2gnLCAnb3JpZW50YXRpb24nLFxuICAnc2NhbGVUb0ZpdCcsICdzY2FsZVRvVmlldycsICdibGVlZCcsICdwaXhlbFJhdGlvJyxcbiAgJ2V4cG9ydFBpeGVsUmF0aW8nLCAnbWF4UGl4ZWxSYXRpbycsICdzY2FsZUNvbnRleHQnLFxuICAncmVzaXplQ2FudmFzJywgJ3N0eWxlQ2FudmFzJywgJ2NhbnZhcycsICdjb250ZXh0JywgJ2F0dHJpYnV0ZXMnLFxuICAncGFyZW50JywgJ2ZpbGUnLCAnbmFtZScsICdwcmVmaXgnLCAnc3VmZml4JywgJ2FuaW1hdGUnLCAncGxheWluZycsXG4gICdsb29wJywgJ2R1cmF0aW9uJywgJ3RvdGFsRnJhbWVzJywgJ2ZwcycsICdwbGF5YmFja1JhdGUnLCAndGltZVNjYWxlJyxcbiAgJ2ZyYW1lJywgJ3RpbWUnLCAnZmx1c2gnLCAncGl4ZWxhdGVkJywgJ2hvdGtleXMnLCAncDUnLCAnaWQnLFxuICAnc2NhbGVUb0ZpdFBhZGRpbmcnLCAnZGF0YScsICdwYXJhbXMnLCAnZW5jb2RpbmcnLCAnZW5jb2RpbmdRdWFsaXR5J1xuXTtcblxuLy8gVGhpcyBpcyBmYWlybHkgb3BpbmlvbmF0ZWQgYW5kIGZvcmNlcyB1c2VycyB0byB1c2UgdGhlICdkYXRhJyBwYXJhbWV0ZXJcbi8vIGlmIHRoZXkgd2FudCB0byBwYXNzIGFsb25nIG5vbi1zZXR0aW5nIG9iamVjdHMuLi5cbmV4cG9ydCBjb25zdCBjaGVja1NldHRpbmdzID0gKHNldHRpbmdzKSA9PiB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzZXR0aW5ncyk7XG4gIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgIGlmIChrZXkgaW4gY29tbW9uVHlwb3MpIHtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IGNvbW1vblR5cG9zW2tleV07XG4gICAgICBjb25zb2xlLndhcm4oYFtjYW52YXMtc2tldGNoXSBDb3VsZCBub3QgcmVjb2duaXplIHRoZSBzZXR0aW5nIFwiJHtrZXl9XCIsIGRpZCB5b3UgbWVhbiBcIiR7YWN0dWFsfVwiP2ApO1xuICAgIH0gZWxzZSBpZiAoIWFsbEtleXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgY29uc29sZS53YXJuKGBbY2FudmFzLXNrZXRjaF0gQ291bGQgbm90IHJlY29nbml6ZSB0aGUgc2V0dGluZyBcIiR7a2V5fVwiYCk7XG4gICAgfVxuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBnZXRDbGllbnRBUEkgfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdCA9IHt9KSB7XG4gIGNvbnN0IGhhbmRsZXIgPSBldiA9PiB7XG4gICAgaWYgKCFvcHQuZW5hYmxlZCgpKSByZXR1cm47XG5cbiAgICBjb25zdCBjbGllbnQgPSBnZXRDbGllbnRBUEkoKTtcbiAgICBpZiAoZXYua2V5Q29kZSA9PT0gODMgJiYgIWV2LmFsdEtleSAmJiAoZXYubWV0YUtleSB8fCBldi5jdHJsS2V5KSkge1xuICAgICAgLy8gQ21kICsgU1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG9wdC5zYXZlKGV2KTtcbiAgICB9IGVsc2UgaWYgKGV2LmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAvLyBTcGFjZVxuICAgICAgLy8gVE9ETzogd2hhdCB0byBkbyB3aXRoIHRoaXM/IGtlZXAgaXQsIG9yIHJlbW92ZSBpdD9cbiAgICAgIG9wdC50b2dnbGVQbGF5KGV2KTtcbiAgICB9IGVsc2UgaWYgKGNsaWVudCAmJiAhZXYuYWx0S2V5ICYmIGV2LmtleUNvZGUgPT09IDc1ICYmIChldi5tZXRhS2V5IHx8IGV2LmN0cmxLZXkpKSB7XG4gICAgICAvLyBDbWQgKyBLLCBvbmx5IHdoZW4gY2FudmFzLXNrZXRjaC1jbGkgaXMgdXNlZFxuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG9wdC5jb21taXQoZXYpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhdHRhY2ggPSAoKSA9PiB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyKTtcbiAgfTtcblxuICBjb25zdCBkZXRhY2ggPSAoKSA9PiB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGF0dGFjaCxcbiAgICBkZXRhY2hcbiAgfTtcbn1cbiIsImNvbnN0IGRlZmF1bHRVbml0cyA9ICdtbSc7XG5cbmNvbnN0IGRhdGEgPSBbXG4gIC8vIENvbW1vbiBQYXBlciBTaXplc1xuICAvLyAoTW9zdGx5IE5vcnRoLUFtZXJpY2FuIGJhc2VkKVxuICBbICdwb3N0Y2FyZCcsIDEwMS42LCAxNTIuNCBdLFxuICBbICdwb3N0ZXItc21hbGwnLCAyODAsIDQzMCBdLFxuICBbICdwb3N0ZXInLCA0NjAsIDYxMCBdLFxuICBbICdwb3N0ZXItbGFyZ2UnLCA2MTAsIDkxMCBdLFxuICBbICdidXNpbmVzcy1jYXJkJywgNTAuOCwgODguOSBdLFxuXG4gIC8vIFBob3RvZ3JhcGhpYyBQcmludCBQYXBlciBTaXplc1xuICBbICcycicsIDY0LCA4OSBdLFxuICBbICczcicsIDg5LCAxMjcgXSxcbiAgWyAnNHInLCAxMDIsIDE1MiBdLFxuICBbICc1cicsIDEyNywgMTc4IF0sIC8vIDXigLN4N+KAs1xuICBbICc2cicsIDE1MiwgMjAzIF0sIC8vIDbigLN4OOKAs1xuICBbICc4cicsIDIwMywgMjU0IF0sIC8vIDjigLN4MTDigLNcbiAgWyAnMTByJywgMjU0LCAzMDUgXSwgLy8gMTDigLN4MTLigLNcbiAgWyAnMTFyJywgMjc5LCAzNTYgXSwgLy8gMTHigLN4MTTigLNcbiAgWyAnMTJyJywgMzA1LCAzODEgXSxcblxuICAvLyBTdGFuZGFyZCBQYXBlciBTaXplc1xuICBbICdhMCcsIDg0MSwgMTE4OSBdLFxuICBbICdhMScsIDU5NCwgODQxIF0sXG4gIFsgJ2EyJywgNDIwLCA1OTQgXSxcbiAgWyAnYTMnLCAyOTcsIDQyMCBdLFxuICBbICdhNCcsIDIxMCwgMjk3IF0sXG4gIFsgJ2E1JywgMTQ4LCAyMTAgXSxcbiAgWyAnYTYnLCAxMDUsIDE0OCBdLFxuICBbICdhNycsIDc0LCAxMDUgXSxcbiAgWyAnYTgnLCA1MiwgNzQgXSxcbiAgWyAnYTknLCAzNywgNTIgXSxcbiAgWyAnYTEwJywgMjYsIDM3IF0sXG4gIFsgJzJhMCcsIDExODksIDE2ODIgXSxcbiAgWyAnNGEwJywgMTY4MiwgMjM3OCBdLFxuICBbICdiMCcsIDEwMDAsIDE0MTQgXSxcbiAgWyAnYjEnLCA3MDcsIDEwMDAgXSxcbiAgWyAnYjErJywgNzIwLCAxMDIwIF0sXG4gIFsgJ2IyJywgNTAwLCA3MDcgXSxcbiAgWyAnYjIrJywgNTIwLCA3MjAgXSxcbiAgWyAnYjMnLCAzNTMsIDUwMCBdLFxuICBbICdiNCcsIDI1MCwgMzUzIF0sXG4gIFsgJ2I1JywgMTc2LCAyNTAgXSxcbiAgWyAnYjYnLCAxMjUsIDE3NiBdLFxuICBbICdiNycsIDg4LCAxMjUgXSxcbiAgWyAnYjgnLCA2MiwgODggXSxcbiAgWyAnYjknLCA0NCwgNjIgXSxcbiAgWyAnYjEwJywgMzEsIDQ0IF0sXG4gIFsgJ2IxMScsIDIyLCAzMiBdLFxuICBbICdiMTInLCAxNiwgMjIgXSxcbiAgWyAnYzAnLCA5MTcsIDEyOTcgXSxcbiAgWyAnYzEnLCA2NDgsIDkxNyBdLFxuICBbICdjMicsIDQ1OCwgNjQ4IF0sXG4gIFsgJ2MzJywgMzI0LCA0NTggXSxcbiAgWyAnYzQnLCAyMjksIDMyNCBdLFxuICBbICdjNScsIDE2MiwgMjI5IF0sXG4gIFsgJ2M2JywgMTE0LCAxNjIgXSxcbiAgWyAnYzcnLCA4MSwgMTE0IF0sXG4gIFsgJ2M4JywgNTcsIDgxIF0sXG4gIFsgJ2M5JywgNDAsIDU3IF0sXG4gIFsgJ2MxMCcsIDI4LCA0MCBdLFxuICBbICdjMTEnLCAyMiwgMzIgXSxcbiAgWyAnYzEyJywgMTYsIDIyIF0sXG5cbiAgLy8gVXNlIGluY2hlcyBmb3IgTm9ydGggQW1lcmljYW4gc2l6ZXMsXG4gIC8vIGFzIGl0IHByb2R1Y2VzIGxlc3MgZmxvYXQgcHJlY2lzaW9uIGVycm9yc1xuICBbICdoYWxmLWxldHRlcicsIDUuNSwgOC41LCAnaW4nIF0sXG4gIFsgJ2xldHRlcicsIDguNSwgMTEsICdpbicgXSxcbiAgWyAnbGVnYWwnLCA4LjUsIDE0LCAnaW4nIF0sXG4gIFsgJ2p1bmlvci1sZWdhbCcsIDUsIDgsICdpbicgXSxcbiAgWyAnbGVkZ2VyJywgMTEsIDE3LCAnaW4nIF0sXG4gIFsgJ3RhYmxvaWQnLCAxMSwgMTcsICdpbicgXSxcbiAgWyAnYW5zaS1hJywgOC41LCAxMS4wLCAnaW4nIF0sXG4gIFsgJ2Fuc2ktYicsIDExLjAsIDE3LjAsICdpbicgXSxcbiAgWyAnYW5zaS1jJywgMTcuMCwgMjIuMCwgJ2luJyBdLFxuICBbICdhbnNpLWQnLCAyMi4wLCAzNC4wLCAnaW4nIF0sXG4gIFsgJ2Fuc2ktZScsIDM0LjAsIDQ0LjAsICdpbicgXSxcbiAgWyAnYXJjaC1hJywgOSwgMTIsICdpbicgXSxcbiAgWyAnYXJjaC1iJywgMTIsIDE4LCAnaW4nIF0sXG4gIFsgJ2FyY2gtYycsIDE4LCAyNCwgJ2luJyBdLFxuICBbICdhcmNoLWQnLCAyNCwgMzYsICdpbicgXSxcbiAgWyAnYXJjaC1lJywgMzYsIDQ4LCAnaW4nIF0sXG4gIFsgJ2FyY2gtZTEnLCAzMCwgNDIsICdpbicgXSxcbiAgWyAnYXJjaC1lMicsIDI2LCAzOCwgJ2luJyBdLFxuICBbICdhcmNoLWUzJywgMjcsIDM5LCAnaW4nIF1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IGRhdGEucmVkdWNlKChkaWN0LCBwcmVzZXQpID0+IHtcbiAgY29uc3QgaXRlbSA9IHtcbiAgICB1bml0czogcHJlc2V0WzNdIHx8IGRlZmF1bHRVbml0cyxcbiAgICBkaW1lbnNpb25zOiBbIHByZXNldFsxXSwgcHJlc2V0WzJdIF1cbiAgfTtcbiAgZGljdFtwcmVzZXRbMF1dID0gaXRlbTtcbiAgZGljdFtwcmVzZXRbMF0ucmVwbGFjZSgvLS9nLCAnICcpXSA9IGl0ZW07XG4gIHJldHVybiBkaWN0O1xufSwge30pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gYXJndW1lbnRzW2ldO1xuICAgIH1cbn07XG4iLCJ2YXIgZGVmaW5lZCA9IHJlcXVpcmUoJ2RlZmluZWQnKTtcbnZhciB1bml0cyA9IFsgJ21tJywgJ2NtJywgJ20nLCAncGMnLCAncHQnLCAnaW4nLCAnZnQnLCAncHgnIF07XG5cbnZhciBjb252ZXJzaW9ucyA9IHtcbiAgLy8gbWV0cmljXG4gIG06IHtcbiAgICBzeXN0ZW06ICdtZXRyaWMnLFxuICAgIGZhY3RvcjogMVxuICB9LFxuICBjbToge1xuICAgIHN5c3RlbTogJ21ldHJpYycsXG4gICAgZmFjdG9yOiAxIC8gMTAwXG4gIH0sXG4gIG1tOiB7XG4gICAgc3lzdGVtOiAnbWV0cmljJyxcbiAgICBmYWN0b3I6IDEgLyAxMDAwXG4gIH0sXG4gIC8vIGltcGVyaWFsXG4gIHB0OiB7XG4gICAgc3lzdGVtOiAnaW1wZXJpYWwnLFxuICAgIGZhY3RvcjogMSAvIDcyXG4gIH0sXG4gIHBjOiB7XG4gICAgc3lzdGVtOiAnaW1wZXJpYWwnLFxuICAgIGZhY3RvcjogMSAvIDZcbiAgfSxcbiAgaW46IHtcbiAgICBzeXN0ZW06ICdpbXBlcmlhbCcsXG4gICAgZmFjdG9yOiAxXG4gIH0sXG4gIGZ0OiB7XG4gICAgc3lzdGVtOiAnaW1wZXJpYWwnLFxuICAgIGZhY3RvcjogMTJcbiAgfVxufTtcblxuY29uc3QgYW5jaG9ycyA9IHtcbiAgbWV0cmljOiB7XG4gICAgdW5pdDogJ20nLFxuICAgIHJhdGlvOiAxIC8gMC4wMjU0XG4gIH0sXG4gIGltcGVyaWFsOiB7XG4gICAgdW5pdDogJ2luJyxcbiAgICByYXRpbzogMC4wMjU0XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHJvdW5kICh2YWx1ZSwgZGVjaW1hbHMpIHtcbiAgcmV0dXJuIE51bWJlcihNYXRoLnJvdW5kKHZhbHVlICsgJ2UnICsgZGVjaW1hbHMpICsgJ2UtJyArIGRlY2ltYWxzKTtcbn1cblxuZnVuY3Rpb24gY29udmVydERpc3RhbmNlICh2YWx1ZSwgZnJvbVVuaXQsIHRvVW5pdCwgb3B0cykge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fCAhaXNGaW5pdGUodmFsdWUpKSB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIG11c3QgYmUgYSBmaW5pdGUgbnVtYmVyJyk7XG4gIGlmICghZnJvbVVuaXQgfHwgIXRvVW5pdCkgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHNwZWNpZnkgZnJvbSBhbmQgdG8gdW5pdHMnKTtcblxuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgdmFyIHBpeGVsc1BlckluY2ggPSBkZWZpbmVkKG9wdHMucGl4ZWxzUGVySW5jaCwgOTYpO1xuICB2YXIgcHJlY2lzaW9uID0gb3B0cy5wcmVjaXNpb247XG4gIHZhciByb3VuZFBpeGVsID0gb3B0cy5yb3VuZFBpeGVsICE9PSBmYWxzZTtcblxuICBmcm9tVW5pdCA9IGZyb21Vbml0LnRvTG93ZXJDYXNlKCk7XG4gIHRvVW5pdCA9IHRvVW5pdC50b0xvd2VyQ2FzZSgpO1xuXG4gIGlmICh1bml0cy5pbmRleE9mKGZyb21Vbml0KSA9PT0gLTEpIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBmcm9tIHVuaXQgXCInICsgZnJvbVVuaXQgKyAnXCIsIG11c3QgYmUgb25lIG9mOiAnICsgdW5pdHMuam9pbignLCAnKSk7XG4gIGlmICh1bml0cy5pbmRleE9mKHRvVW5pdCkgPT09IC0xKSB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZnJvbSB1bml0IFwiJyArIHRvVW5pdCArICdcIiwgbXVzdCBiZSBvbmUgb2Y6ICcgKyB1bml0cy5qb2luKCcsICcpKTtcblxuICBpZiAoZnJvbVVuaXQgPT09IHRvVW5pdCkge1xuICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gY29udmVydCBmcm9tIEEgdG8gQiBzaW5jZSB0aGV5IGFyZSB0aGUgc2FtZSBhbHJlYWR5XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgdmFyIHRvRmFjdG9yID0gMTtcbiAgdmFyIGZyb21GYWN0b3IgPSAxO1xuICB2YXIgaXNUb1BpeGVsID0gZmFsc2U7XG5cbiAgaWYgKGZyb21Vbml0ID09PSAncHgnKSB7XG4gICAgZnJvbUZhY3RvciA9IDEgLyBwaXhlbHNQZXJJbmNoO1xuICAgIGZyb21Vbml0ID0gJ2luJztcbiAgfVxuICBpZiAodG9Vbml0ID09PSAncHgnKSB7XG4gICAgaXNUb1BpeGVsID0gdHJ1ZTtcbiAgICB0b0ZhY3RvciA9IHBpeGVsc1BlckluY2g7XG4gICAgdG9Vbml0ID0gJ2luJztcbiAgfVxuXG4gIHZhciBmcm9tVW5pdERhdGEgPSBjb252ZXJzaW9uc1tmcm9tVW5pdF07XG4gIHZhciB0b1VuaXREYXRhID0gY29udmVyc2lvbnNbdG9Vbml0XTtcblxuICAvLyBzb3VyY2UgdG8gYW5jaG9yIGluc2lkZSBzb3VyY2UncyBzeXN0ZW1cbiAgdmFyIGFuY2hvciA9IHZhbHVlICogZnJvbVVuaXREYXRhLmZhY3RvciAqIGZyb21GYWN0b3I7XG5cbiAgLy8gaWYgc3lzdGVtcyBkaWZmZXIsIGNvbnZlcnQgb25lIHRvIGFub3RoZXJcbiAgaWYgKGZyb21Vbml0RGF0YS5zeXN0ZW0gIT09IHRvVW5pdERhdGEuc3lzdGVtKSB7XG4gICAgLy8gcmVndWxhciAnbScgdG8gJ2luJyBhbmQgc28gZm9ydGhcbiAgICBhbmNob3IgKj0gYW5jaG9yc1tmcm9tVW5pdERhdGEuc3lzdGVtXS5yYXRpbztcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBhbmNob3IgLyB0b1VuaXREYXRhLmZhY3RvciAqIHRvRmFjdG9yO1xuICBpZiAoaXNUb1BpeGVsICYmIHJvdW5kUGl4ZWwpIHtcbiAgICByZXN1bHQgPSBNYXRoLnJvdW5kKHJlc3VsdCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByZWNpc2lvbiA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUocHJlY2lzaW9uKSkge1xuICAgIHJlc3VsdCA9IHJvdW5kKHJlc3VsdCwgcHJlY2lzaW9uKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnZlcnREaXN0YW5jZTtcbm1vZHVsZS5leHBvcnRzLnVuaXRzID0gdW5pdHM7XG4iLCJpbXBvcnQgcGFwZXJTaXplcyBmcm9tICcuL3BhcGVyLXNpemVzJztcbmltcG9ydCBjb252ZXJ0TGVuZ3RoIGZyb20gJ2NvbnZlcnQtbGVuZ3RoJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERpbWVuc2lvbnNGcm9tUHJlc2V0IChkaW1lbnNpb25zLCB1bml0c1RvID0gJ3B4JywgcGl4ZWxzUGVySW5jaCA9IDcyKSB7XG4gIGlmICh0eXBlb2YgZGltZW5zaW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBrZXkgPSBkaW1lbnNpb25zLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCEoa2V5IGluIHBhcGVyU2l6ZXMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBkaW1lbnNpb24gcHJlc2V0IFwiJHtkaW1lbnNpb25zfVwiIGlzIG5vdCBzdXBwb3J0ZWQgb3IgY291bGQgbm90IGJlIGZvdW5kOyB0cnkgdXNpbmcgYTQsIGEzLCBwb3N0Y2FyZCwgbGV0dGVyLCBldGMuYClcbiAgICB9XG4gICAgY29uc3QgcHJlc2V0ID0gcGFwZXJTaXplc1trZXldO1xuICAgIHJldHVybiBwcmVzZXQuZGltZW5zaW9ucy5tYXAoZCA9PiB7XG4gICAgICByZXR1cm4gY29udmVydERpc3RhbmNlKGQsIHByZXNldC51bml0cywgdW5pdHNUbywgcGl4ZWxzUGVySW5jaCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRpbWVuc2lvbnM7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnREaXN0YW5jZSAoZGltZW5zaW9uLCB1bml0c0Zyb20gPSAncHgnLCB1bml0c1RvID0gJ3B4JywgcGl4ZWxzUGVySW5jaCA9IDcyKSB7XG4gIHJldHVybiBjb252ZXJ0TGVuZ3RoKGRpbWVuc2lvbiwgdW5pdHNGcm9tLCB1bml0c1RvLCB7XG4gICAgcGl4ZWxzUGVySW5jaCxcbiAgICBwcmVjaXNpb246IDQsXG4gICAgcm91bmRQaXhlbDogdHJ1ZVxuICB9KTtcbn1cbiIsImltcG9ydCB7IGdldERpbWVuc2lvbnNGcm9tUHJlc2V0LCBjb252ZXJ0RGlzdGFuY2UgfSBmcm9tICcuLi9kaXN0YW5jZXMnO1xuaW1wb3J0IHsgaXNCcm93c2VyLCBkZWZpbmVkIH0gZnJvbSAnLi4vdXRpbCc7XG5cbmZ1bmN0aW9uIGNoZWNrSWZIYXNEaW1lbnNpb25zIChzZXR0aW5ncykge1xuICBpZiAoIXNldHRpbmdzLmRpbWVuc2lvbnMpIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiBzZXR0aW5ncy5kaW1lbnNpb25zID09PSAnc3RyaW5nJykgcmV0dXJuIHRydWU7XG4gIGlmIChBcnJheS5pc0FycmF5KHNldHRpbmdzLmRpbWVuc2lvbnMpICYmIHNldHRpbmdzLmRpbWVuc2lvbnMubGVuZ3RoID49IDIpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldFBhcmVudFNpemUgKHByb3BzLCBzZXR0aW5ncykge1xuICAvLyBXaGVuIG5vIHsgZGltZW5zaW9uIH0gaXMgcGFzc2VkIGluIG5vZGUsIHdlIGRlZmF1bHQgdG8gSFRNTCBjYW52YXMgc2l6ZVxuICBpZiAoIWlzQnJvd3NlcigpKSB7XG4gICAgcmV0dXJuIFsgMzAwLCAxNTAgXTtcbiAgfVxuXG4gIGxldCBlbGVtZW50ID0gc2V0dGluZ3MucGFyZW50IHx8IHdpbmRvdztcblxuICBpZiAoZWxlbWVudCA9PT0gd2luZG93IHx8XG4gICAgICBlbGVtZW50ID09PSBkb2N1bWVudCB8fFxuICAgICAgZWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgIHJldHVybiBbIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQgXTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIFsgd2lkdGgsIGhlaWdodCBdO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlc2l6ZUNhbnZhcyAocHJvcHMsIHNldHRpbmdzKSB7XG4gIGxldCB3aWR0aCwgaGVpZ2h0O1xuICBsZXQgc3R5bGVXaWR0aCwgc3R5bGVIZWlnaHQ7XG4gIGxldCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0O1xuXG4gIGNvbnN0IGJyb3dzZXIgPSBpc0Jyb3dzZXIoKTtcbiAgY29uc3QgZGltZW5zaW9ucyA9IHNldHRpbmdzLmRpbWVuc2lvbnM7XG4gIGNvbnN0IGhhc0RpbWVuc2lvbnMgPSBjaGVja0lmSGFzRGltZW5zaW9ucyhzZXR0aW5ncyk7XG4gIGNvbnN0IGV4cG9ydGluZyA9IHByb3BzLmV4cG9ydGluZztcbiAgbGV0IHNjYWxlVG9GaXQgPSBoYXNEaW1lbnNpb25zID8gc2V0dGluZ3Muc2NhbGVUb0ZpdCAhPT0gZmFsc2UgOiBmYWxzZTtcbiAgbGV0IHNjYWxlVG9WaWV3ID0gKCFleHBvcnRpbmcgJiYgaGFzRGltZW5zaW9ucykgPyBzZXR0aW5ncy5zY2FsZVRvVmlldyA6IHRydWU7XG4gIC8vIGluIG5vZGUsIGNhbmNlbCBib3RoIG9mIHRoZXNlIG9wdGlvbnNcbiAgaWYgKCFicm93c2VyKSBzY2FsZVRvRml0ID0gc2NhbGVUb1ZpZXcgPSBmYWxzZTtcbiAgY29uc3QgdW5pdHMgPSBzZXR0aW5ncy51bml0cztcbiAgY29uc3QgcGl4ZWxzUGVySW5jaCA9ICh0eXBlb2Ygc2V0dGluZ3MucGl4ZWxzUGVySW5jaCA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUoc2V0dGluZ3MucGl4ZWxzUGVySW5jaCkpID8gc2V0dGluZ3MucGl4ZWxzUGVySW5jaCA6IDcyO1xuICBjb25zdCBibGVlZCA9IGRlZmluZWQoc2V0dGluZ3MuYmxlZWQsIDApO1xuXG4gIGNvbnN0IGRldmljZVBpeGVsUmF0aW8gPSBicm93c2VyID8gd2luZG93LmRldmljZVBpeGVsUmF0aW8gOiAxO1xuICBjb25zdCBiYXNlUGl4ZWxSYXRpbyA9IHNjYWxlVG9WaWV3ID8gZGV2aWNlUGl4ZWxSYXRpbyA6IDE7XG5cbiAgbGV0IHBpeGVsUmF0aW8sIGV4cG9ydFBpeGVsUmF0aW87XG5cbiAgLy8gSWYgYSBwaXhlbCByYXRpbyBpcyBzcGVjaWZpZWQsIHdlIHdpbGwgdXNlIGl0LlxuICAvLyBPdGhlcndpc2U6XG4gIC8vICAtPiBJZiBkaW1lbnNpb24gaXMgc3BlY2lmaWVkLCB1c2UgYmFzZSByYXRpbyAoaS5lLiBzaXplIGZvciBleHBvcnQpXG4gIC8vICAtPiBJZiBubyBkaW1lbnNpb24gaXMgc3BlY2lmaWVkLCB1c2UgZGV2aWNlIHJhdGlvIChpLmUuIHNpemUgZm9yIHNjcmVlbilcbiAgaWYgKHR5cGVvZiBzZXR0aW5ncy5waXhlbFJhdGlvID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZShzZXR0aW5ncy5waXhlbFJhdGlvKSkge1xuICAgIC8vIFdoZW4geyBwaXhlbFJhdGlvIH0gaXMgc3BlY2lmaWVkLCBpdCdzIGFsc28gdXNlZCBhcyBkZWZhdWx0IGV4cG9ydFBpeGVsUmF0aW8uXG4gICAgcGl4ZWxSYXRpbyA9IHNldHRpbmdzLnBpeGVsUmF0aW87XG4gICAgZXhwb3J0UGl4ZWxSYXRpbyA9IGRlZmluZWQoc2V0dGluZ3MuZXhwb3J0UGl4ZWxSYXRpbywgcGl4ZWxSYXRpbyk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGhhc0RpbWVuc2lvbnMpIHtcbiAgICAgIC8vIFdoZW4gYSBkaW1lbnNpb24gaXMgc3BlY2lmaWVkLCB1c2UgdGhlIGJhc2UgcmF0aW8gcmF0aGVyIHRoYW4gc2NyZWVuIHJhdGlvXG4gICAgICBwaXhlbFJhdGlvID0gYmFzZVBpeGVsUmF0aW87XG4gICAgICAvLyBEZWZhdWx0IHRvIGEgcGl4ZWwgcmF0aW8gb2YgMSBzbyB0aGF0IHlvdSBlbmQgdXAgd2l0aCB0aGUgc2FtZSBkaW1lbnNpb25cbiAgICAgIC8vIHlvdSBzcGVjaWZpZWQsIGkuZS4gWyA1MDAsIDUwMCBdIGlzIGV4cG9ydGVkIGFzIDUwMHg1MDAgcHhcbiAgICAgIGV4cG9ydFBpeGVsUmF0aW8gPSBkZWZpbmVkKHNldHRpbmdzLmV4cG9ydFBpeGVsUmF0aW8sIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBObyBkaW1lbnNpb24gaXMgc3BlY2lmaWVkLCBhc3N1bWUgZnVsbC1zY3JlZW4gcmV0aW5hIHNpemluZ1xuICAgICAgcGl4ZWxSYXRpbyA9IGRldmljZVBpeGVsUmF0aW87XG4gICAgICAvLyBEZWZhdWx0IHRvIHNjcmVlbiBwaXhlbCByYXRpbywgc28gdGhhdCBpdCdzIGxpa2UgdGFraW5nIGEgZGV2aWNlIHNjcmVlbnNob3RcbiAgICAgIGV4cG9ydFBpeGVsUmF0aW8gPSBkZWZpbmVkKHNldHRpbmdzLmV4cG9ydFBpeGVsUmF0aW8sIHBpeGVsUmF0aW8pO1xuICAgIH1cbiAgfVxuXG4gIC8vIENsYW1wIHBpeGVsIHJhdGlvXG4gIGlmICh0eXBlb2Ygc2V0dGluZ3MubWF4UGl4ZWxSYXRpbyA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUoc2V0dGluZ3MubWF4UGl4ZWxSYXRpbykpIHtcbiAgICBwaXhlbFJhdGlvID0gTWF0aC5taW4oc2V0dGluZ3MubWF4UGl4ZWxSYXRpbywgcGl4ZWxSYXRpbyk7XG4gIH1cblxuICAvLyBIYW5kbGUgZXhwb3J0IHBpeGVsIHJhdGlvXG4gIGlmIChleHBvcnRpbmcpIHtcbiAgICBwaXhlbFJhdGlvID0gZXhwb3J0UGl4ZWxSYXRpbztcbiAgfVxuXG4gIC8vIHBhcmVudFdpZHRoID0gdHlwZW9mIHBhcmVudFdpZHRoID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHROb2RlU2l6ZVswXSA6IHBhcmVudFdpZHRoO1xuICAvLyBwYXJlbnRIZWlnaHQgPSB0eXBlb2YgcGFyZW50SGVpZ2h0ID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHROb2RlU2l6ZVsxXSA6IHBhcmVudEhlaWdodDtcblxuICBsZXQgWyBwYXJlbnRXaWR0aCwgcGFyZW50SGVpZ2h0IF0gPSBnZXRQYXJlbnRTaXplKHByb3BzLCBzZXR0aW5ncyk7XG4gIGxldCB0cmltV2lkdGgsIHRyaW1IZWlnaHQ7XG5cbiAgLy8gWW91IGNhbiBzcGVjaWZ5IGEgZGltZW5zaW9ucyBpbiBwaXhlbHMgb3IgY20vbS9pbi9ldGNcbiAgaWYgKGhhc0RpbWVuc2lvbnMpIHtcbiAgICBjb25zdCByZXN1bHQgPSBnZXREaW1lbnNpb25zRnJvbVByZXNldChkaW1lbnNpb25zLCB1bml0cywgcGl4ZWxzUGVySW5jaCk7XG4gICAgY29uc3QgaGlnaGVzdCA9IE1hdGgubWF4KHJlc3VsdFswXSwgcmVzdWx0WzFdKTtcbiAgICBjb25zdCBsb3dlc3QgPSBNYXRoLm1pbihyZXN1bHRbMF0sIHJlc3VsdFsxXSk7XG4gICAgaWYgKHNldHRpbmdzLm9yaWVudGF0aW9uKSB7XG4gICAgICBjb25zdCBsYW5kc2NhcGUgPSBzZXR0aW5ncy5vcmllbnRhdGlvbiA9PT0gJ2xhbmRzY2FwZSc7XG4gICAgICB3aWR0aCA9IGxhbmRzY2FwZSA/IGhpZ2hlc3QgOiBsb3dlc3Q7XG4gICAgICBoZWlnaHQgPSBsYW5kc2NhcGUgPyBsb3dlc3QgOiBoaWdoZXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICB3aWR0aCA9IHJlc3VsdFswXTtcbiAgICAgIGhlaWdodCA9IHJlc3VsdFsxXTtcbiAgICB9XG5cbiAgICB0cmltV2lkdGggPSB3aWR0aDtcbiAgICB0cmltSGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgLy8gQXBwbHkgYmxlZWQgd2hpY2ggaXMgYXNzdW1lZCB0byBiZSBpbiB0aGUgc2FtZSB1bml0c1xuICAgIHdpZHRoICs9IGJsZWVkICogMjtcbiAgICBoZWlnaHQgKz0gYmxlZWQgKiAyO1xuICB9IGVsc2Uge1xuICAgIHdpZHRoID0gcGFyZW50V2lkdGg7XG4gICAgaGVpZ2h0ID0gcGFyZW50SGVpZ2h0O1xuICAgIHRyaW1XaWR0aCA9IHdpZHRoO1xuICAgIHRyaW1IZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvLyBSZWFsIHNpemUgaW4gcGl4ZWxzIGFmdGVyIFBQSSBpcyB0YWtlbiBpbnRvIGFjY291bnRcbiAgbGV0IHJlYWxXaWR0aCA9IHdpZHRoO1xuICBsZXQgcmVhbEhlaWdodCA9IGhlaWdodDtcbiAgaWYgKGhhc0RpbWVuc2lvbnMgJiYgdW5pdHMpIHtcbiAgICAvLyBDb252ZXJ0IHRvIGRpZ2l0YWwvcGl4ZWwgdW5pdHMgaWYgbmVjZXNzYXJ5XG4gICAgcmVhbFdpZHRoID0gY29udmVydERpc3RhbmNlKHdpZHRoLCB1bml0cywgJ3B4JywgcGl4ZWxzUGVySW5jaCk7XG4gICAgcmVhbEhlaWdodCA9IGNvbnZlcnREaXN0YW5jZShoZWlnaHQsIHVuaXRzLCAncHgnLCBwaXhlbHNQZXJJbmNoKTtcbiAgfVxuXG4gIC8vIEhvdyBiaWcgdG8gc2V0IHRoZSAndmlldycgb2YgdGhlIGNhbnZhcyBpbiB0aGUgYnJvd3NlciAoaS5lLiBzdHlsZSlcbiAgc3R5bGVXaWR0aCA9IE1hdGgucm91bmQocmVhbFdpZHRoKTtcbiAgc3R5bGVIZWlnaHQgPSBNYXRoLnJvdW5kKHJlYWxIZWlnaHQpO1xuXG4gIC8vIElmIHdlIHdpc2ggdG8gc2NhbGUgdGhlIHZpZXcgdG8gdGhlIGJyb3dzZXIgd2luZG93XG4gIGlmIChzY2FsZVRvRml0ICYmICFleHBvcnRpbmcgJiYgaGFzRGltZW5zaW9ucykge1xuICAgIGNvbnN0IGFzcGVjdCA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgIGNvbnN0IHdpbmRvd0FzcGVjdCA9IHBhcmVudFdpZHRoIC8gcGFyZW50SGVpZ2h0O1xuICAgIGNvbnN0IHNjYWxlVG9GaXRQYWRkaW5nID0gZGVmaW5lZChzZXR0aW5ncy5zY2FsZVRvRml0UGFkZGluZywgNDApO1xuICAgIGNvbnN0IG1heFdpZHRoID0gTWF0aC5yb3VuZChwYXJlbnRXaWR0aCAtIHNjYWxlVG9GaXRQYWRkaW5nICogMik7XG4gICAgY29uc3QgbWF4SGVpZ2h0ID0gTWF0aC5yb3VuZChwYXJlbnRIZWlnaHQgLSBzY2FsZVRvRml0UGFkZGluZyAqIDIpO1xuICAgIGlmIChzdHlsZVdpZHRoID4gbWF4V2lkdGggfHwgc3R5bGVIZWlnaHQgPiBtYXhIZWlnaHQpIHtcbiAgICAgIGlmICh3aW5kb3dBc3BlY3QgPiBhc3BlY3QpIHtcbiAgICAgICAgc3R5bGVIZWlnaHQgPSBtYXhIZWlnaHQ7XG4gICAgICAgIHN0eWxlV2lkdGggPSBNYXRoLnJvdW5kKHN0eWxlSGVpZ2h0ICogYXNwZWN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlV2lkdGggPSBtYXhXaWR0aDtcbiAgICAgICAgc3R5bGVIZWlnaHQgPSBNYXRoLnJvdW5kKHN0eWxlV2lkdGggLyBhc3BlY3QpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNhbnZhc1dpZHRoID0gc2NhbGVUb1ZpZXcgPyBNYXRoLnJvdW5kKHBpeGVsUmF0aW8gKiBzdHlsZVdpZHRoKSA6IE1hdGgucm91bmQocGl4ZWxSYXRpbyAqIHJlYWxXaWR0aCk7XG4gIGNhbnZhc0hlaWdodCA9IHNjYWxlVG9WaWV3ID8gTWF0aC5yb3VuZChwaXhlbFJhdGlvICogc3R5bGVIZWlnaHQpIDogTWF0aC5yb3VuZChwaXhlbFJhdGlvICogcmVhbEhlaWdodCk7XG5cbiAgY29uc3Qgdmlld3BvcnRXaWR0aCA9IHNjYWxlVG9WaWV3ID8gTWF0aC5yb3VuZChzdHlsZVdpZHRoKSA6IE1hdGgucm91bmQocmVhbFdpZHRoKTtcbiAgY29uc3Qgdmlld3BvcnRIZWlnaHQgPSBzY2FsZVRvVmlldyA/IE1hdGgucm91bmQoc3R5bGVIZWlnaHQpIDogTWF0aC5yb3VuZChyZWFsSGVpZ2h0KTtcblxuICBjb25zdCBzY2FsZVggPSBjYW52YXNXaWR0aCAvIHdpZHRoO1xuICBjb25zdCBzY2FsZVkgPSBjYW52YXNIZWlnaHQgLyBoZWlnaHQ7XG5cbiAgLy8gQXNzaWduIHRvIGN1cnJlbnQgcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBibGVlZCxcbiAgICBwaXhlbFJhdGlvLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBkaW1lbnNpb25zOiBbIHdpZHRoLCBoZWlnaHQgXSxcbiAgICB1bml0czogdW5pdHMgfHwgJ3B4JyxcbiAgICBzY2FsZVgsXG4gICAgc2NhbGVZLFxuICAgIHBpeGVsc1BlckluY2gsXG4gICAgdmlld3BvcnRXaWR0aCxcbiAgICB2aWV3cG9ydEhlaWdodCxcbiAgICBjYW52YXNXaWR0aCxcbiAgICBjYW52YXNIZWlnaHQsXG4gICAgdHJpbVdpZHRoLFxuICAgIHRyaW1IZWlnaHQsXG4gICAgc3R5bGVXaWR0aCxcbiAgICBzdHlsZUhlaWdodFxuICB9O1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBnZXRDYW52YXNDb250ZXh0XG5mdW5jdGlvbiBnZXRDYW52YXNDb250ZXh0ICh0eXBlLCBvcHRzKSB7XG4gIGlmICh0eXBlb2YgdHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtdXN0IHNwZWNpZnkgdHlwZSBzdHJpbmcnKVxuICB9XG5cbiAgb3B0cyA9IG9wdHMgfHwge31cblxuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJyAmJiAhb3B0cy5jYW52YXMpIHtcbiAgICByZXR1cm4gbnVsbCAvLyBjaGVjayBmb3IgTm9kZVxuICB9XG5cbiAgdmFyIGNhbnZhcyA9IG9wdHMuY2FudmFzIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gIGlmICh0eXBlb2Ygb3B0cy53aWR0aCA9PT0gJ251bWJlcicpIHtcbiAgICBjYW52YXMud2lkdGggPSBvcHRzLndpZHRoXG4gIH1cbiAgaWYgKHR5cGVvZiBvcHRzLmhlaWdodCA9PT0gJ251bWJlcicpIHtcbiAgICBjYW52YXMuaGVpZ2h0ID0gb3B0cy5oZWlnaHRcbiAgfVxuXG4gIHZhciBhdHRyaWJzID0gb3B0c1xuICB2YXIgZ2xcbiAgdHJ5IHtcbiAgICB2YXIgbmFtZXMgPSBbIHR5cGUgXVxuICAgIC8vIHByZWZpeCBHTCBjb250ZXh0c1xuICAgIGlmICh0eXBlLmluZGV4T2YoJ3dlYmdsJykgPT09IDApIHtcbiAgICAgIG5hbWVzLnB1c2goJ2V4cGVyaW1lbnRhbC0nICsgdHlwZSlcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KG5hbWVzW2ldLCBhdHRyaWJzKVxuICAgICAgaWYgKGdsKSByZXR1cm4gZ2xcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBnbCA9IG51bGxcbiAgfVxuICByZXR1cm4gKGdsIHx8IG51bGwpIC8vIGVuc3VyZSBudWxsIG9uIGZhaWxcbn1cbiIsImltcG9ydCBhc3NpZ24gZnJvbSAnb2JqZWN0LWFzc2lnbic7XG5pbXBvcnQgZ2V0Q2FudmFzQ29udGV4dCBmcm9tICdnZXQtY2FudmFzLWNvbnRleHQnO1xuaW1wb3J0IHsgaXNCcm93c2VyIH0gZnJvbSAnLi4vdXRpbCc7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNhbnZhc0VsZW1lbnQgKCkge1xuICBpZiAoIWlzQnJvd3NlcigpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJdCBhcHBlYXJzIHlvdSBhcmUgcnVuaW5nIGZyb20gTm9kZS5qcyBvciBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LiBUcnkgcGFzc2luZyBpbiBhbiBleGlzdGluZyB7IGNhbnZhcyB9IGludGVyZmFjZSBpbnN0ZWFkLicpO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ2FudmFzIChzZXR0aW5ncyA9IHt9KSB7XG4gIGxldCBjb250ZXh0LCBjYW52YXM7XG4gIGxldCBvd25zQ2FudmFzID0gZmFsc2U7XG4gIGlmIChzZXR0aW5ncy5jYW52YXMgIT09IGZhbHNlKSB7XG4gICAgLy8gRGV0ZXJtaW5lIHRoZSBjYW52YXMgYW5kIGNvbnRleHQgdG8gY3JlYXRlXG4gICAgY29udGV4dCA9IHNldHRpbmdzLmNvbnRleHQ7XG4gICAgaWYgKCFjb250ZXh0IHx8IHR5cGVvZiBjb250ZXh0ID09PSAnc3RyaW5nJykge1xuICAgICAgbGV0IG5ld0NhbnZhcyA9IHNldHRpbmdzLmNhbnZhcztcbiAgICAgIGlmICghbmV3Q2FudmFzKSB7XG4gICAgICAgIG5ld0NhbnZhcyA9IGNyZWF0ZUNhbnZhc0VsZW1lbnQoKTtcbiAgICAgICAgb3duc0NhbnZhcyA9IHRydWU7XG4gICAgICB9XG4gICAgICBjb25zdCB0eXBlID0gY29udGV4dCB8fCAnMmQnO1xuICAgICAgaWYgKHR5cGVvZiBuZXdDYW52YXMuZ2V0Q29udGV4dCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzcGVjaWZpZWQgeyBjYW52YXMgfSBlbGVtZW50IGRvZXMgbm90IGhhdmUgYSBnZXRDb250ZXh0KCkgZnVuY3Rpb24sIG1heWJlIGl0IGlzIG5vdCBhIDxjYW52YXM+IHRhZz9gKTtcbiAgICAgIH1cbiAgICAgIGNvbnRleHQgPSBnZXRDYW52YXNDb250ZXh0KHR5cGUsIGFzc2lnbih7fSwgc2V0dGluZ3MuYXR0cmlidXRlcywgeyBjYW52YXM6IG5ld0NhbnZhcyB9KSk7XG4gICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgYXQgY2FudmFzLmdldENvbnRleHQoJyR7dHlwZX0nKSAtIHRoZSBicm93c2VyIG1heSBub3Qgc3VwcG9ydCB0aGlzIGNvbnRleHQsIG9yIGEgZGlmZmVyZW50IGNvbnRleHQgbWF5IGFscmVhZHkgYmUgaW4gdXNlIHdpdGggdGhpcyBjYW52YXMuYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FudmFzID0gY29udGV4dC5jYW52YXM7XG4gICAgLy8gRW5zdXJlIGNvbnRleHQgbWF0Y2hlcyB1c2VyJ3MgY2FudmFzIGV4cGVjdGF0aW9uc1xuICAgIGlmIChzZXR0aW5ncy5jYW52YXMgJiYgY2FudmFzICE9PSBzZXR0aW5ncy5jYW52YXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHsgY2FudmFzIH0gYW5kIHsgY29udGV4dCB9IHNldHRpbmdzIG11c3QgcG9pbnQgdG8gdGhlIHNhbWUgdW5kZXJseWluZyBjYW52YXMgZWxlbWVudCcpO1xuICAgIH1cblxuICAgIC8vIEFwcGx5IHBpeGVsYXRpb24gdG8gY2FudmFzIGlmIG5lY2Vzc2FyeSwgdGhpcyBpcyBtb3N0bHkgYSBjb252ZW5pZW5jZSB1dGlsaXR5XG4gICAgaWYgKHNldHRpbmdzLnBpeGVsYXRlZCkge1xuICAgICAgY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgIGNvbnRleHQubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICBjb250ZXh0Lm9JbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgIGNvbnRleHQud2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICBjb250ZXh0Lm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICBjYW52YXMuc3R5bGVbJ2ltYWdlLXJlbmRlcmluZyddID0gJ3BpeGVsYXRlZCc7XG4gICAgfVxuICB9XG4gIHJldHVybiB7IGNhbnZhcywgY29udGV4dCwgb3duc0NhbnZhcyB9O1xufVxuIiwiaW1wb3J0IGFzc2lnbiBmcm9tIFwib2JqZWN0LWFzc2lnblwiO1xuaW1wb3J0IHJpZ2h0Tm93IGZyb20gXCJyaWdodC1ub3dcIjtcbmltcG9ydCBpc1Byb21pc2UgZnJvbSBcImlzLXByb21pc2VcIjtcbmltcG9ydCB7XG4gIGlzQnJvd3NlcixcbiAgZGVmaW5lZCxcbiAgaXNXZWJHTENvbnRleHQsXG4gIGlzMkRDb250ZXh0LFxuICBpc0NhbnZhcyxcbiAgZ2V0Q2xpZW50QVBJLFxufSBmcm9tIFwiLi4vdXRpbFwiO1xuaW1wb3J0IGRlZXBFcXVhbCBmcm9tIFwiZGVlcC1lcXVhbFwiO1xuaW1wb3J0IHtcbiAgcmVzb2x2ZUZpbGVuYW1lLFxuICBzYXZlRmlsZSxcbiAgc2F2ZURhdGFVUkwsXG4gIGdldFRpbWVTdGFtcCxcbiAgZXhwb3J0Q2FudmFzLFxuICBzdHJlYW1TdGFydCxcbiAgc3RyZWFtRW5kLFxufSBmcm9tIFwiLi4vc2F2ZVwiO1xuaW1wb3J0IHsgY2hlY2tTZXR0aW5ncyB9IGZyb20gXCIuLi9hY2Nlc3NpYmlsaXR5XCI7XG5cbmltcG9ydCBrZXlib2FyZFNob3J0Y3V0cyBmcm9tIFwiLi9rZXlib2FyZFNob3J0Y3V0c1wiO1xuaW1wb3J0IHJlc2l6ZUNhbnZhcyBmcm9tIFwiLi9yZXNpemVDYW52YXNcIjtcbmltcG9ydCBjcmVhdGVDYW52YXMgZnJvbSBcIi4vY3JlYXRlQ2FudmFzXCI7XG5cbmNsYXNzIFNrZXRjaE1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9zZXR0aW5ncyA9IHt9O1xuICAgIHRoaXMuX3Byb3BzID0ge307XG4gICAgdGhpcy5fc2tldGNoID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3JhZiA9IG51bGw7XG4gICAgdGhpcy5fcmVjb3JkVGltZW91dCA9IG51bGw7XG5cbiAgICAvLyBTb21lIGhhY2t5IHRoaW5ncyByZXF1aXJlZCB0byBnZXQgYXJvdW5kIHA1LmpzIHN0cnVjdHVyZVxuICAgIHRoaXMuX2xhc3RSZWRyYXdSZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5faXNQNVJlc2l6aW5nID0gZmFsc2U7XG5cbiAgICB0aGlzLl9rZXlib2FyZFNob3J0Y3V0cyA9IGtleWJvYXJkU2hvcnRjdXRzKHtcbiAgICAgIGVuYWJsZWQ6ICgpID0+IHRoaXMuc2V0dGluZ3MuaG90a2V5cyAhPT0gZmFsc2UsXG4gICAgICBzYXZlOiAoZXYpID0+IHtcbiAgICAgICAgaWYgKGV2LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMucmVjb3JkaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmVuZFJlY29yZCgpO1xuICAgICAgICAgICAgdGhpcy5ydW4oKTtcbiAgICAgICAgICB9IGVsc2UgdGhpcy5yZWNvcmQoKTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5wcm9wcy5yZWNvcmRpbmcpIHtcbiAgICAgICAgICB0aGlzLmV4cG9ydEZyYW1lKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b2dnbGVQbGF5OiAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnBsYXlpbmcpIHRoaXMucGF1c2UoKTtcbiAgICAgICAgZWxzZSB0aGlzLnBsYXkoKTtcbiAgICAgIH0sXG4gICAgICBjb21taXQ6IChldikgPT4ge1xuICAgICAgICB0aGlzLmV4cG9ydEZyYW1lKHsgY29tbWl0OiB0cnVlIH0pO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuX2FuaW1hdGVIYW5kbGVyID0gKCkgPT4gdGhpcy5hbmltYXRlKCk7XG5cbiAgICB0aGlzLl9yZXNpemVIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgY29uc3QgY2hhbmdlZCA9IHRoaXMucmVzaXplKCk7XG4gICAgICAvLyBPbmx5IHJlLXJlbmRlciB3aGVuIHNpemUgYWN0dWFsbHkgY2hhbmdlc1xuICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZ2V0IHNrZXRjaCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2tldGNoO1xuICB9XG5cbiAgZ2V0IHNldHRpbmdzKCkge1xuICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncztcbiAgfVxuXG4gIGdldCBwcm9wcygpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvcHM7XG4gIH1cblxuICBfY29tcHV0ZVBsYXloZWFkKGN1cnJlbnRUaW1lLCBkdXJhdGlvbikge1xuICAgIGNvbnN0IGhhc0R1cmF0aW9uID0gdHlwZW9mIGR1cmF0aW9uID09PSBcIm51bWJlclwiICYmIGlzRmluaXRlKGR1cmF0aW9uKTtcbiAgICByZXR1cm4gaGFzRHVyYXRpb24gPyBjdXJyZW50VGltZSAvIGR1cmF0aW9uIDogMDtcbiAgfVxuXG4gIF9jb21wdXRlRnJhbWUocGxheWhlYWQsIHRpbWUsIHRvdGFsRnJhbWVzLCBmcHMpIHtcbiAgICByZXR1cm4gaXNGaW5pdGUodG90YWxGcmFtZXMpICYmIHRvdGFsRnJhbWVzID4gMVxuICAgICAgPyBNYXRoLmZsb29yKHBsYXloZWFkICogKHRvdGFsRnJhbWVzIC0gMSkpXG4gICAgICA6IE1hdGguZmxvb3IoZnBzICogdGltZSk7XG4gIH1cblxuICBfY29tcHV0ZUN1cnJlbnRGcmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcHV0ZUZyYW1lKFxuICAgICAgdGhpcy5wcm9wcy5wbGF5aGVhZCxcbiAgICAgIHRoaXMucHJvcHMudGltZSxcbiAgICAgIHRoaXMucHJvcHMudG90YWxGcmFtZXMsXG4gICAgICB0aGlzLnByb3BzLmZwc1xuICAgICk7XG4gIH1cblxuICBfZ2V0U2l6ZVByb3BzKCkge1xuICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IHByb3BzLndpZHRoLFxuICAgICAgaGVpZ2h0OiBwcm9wcy5oZWlnaHQsXG4gICAgICBwaXhlbFJhdGlvOiBwcm9wcy5waXhlbFJhdGlvLFxuICAgICAgY2FudmFzV2lkdGg6IHByb3BzLmNhbnZhc1dpZHRoLFxuICAgICAgY2FudmFzSGVpZ2h0OiBwcm9wcy5jYW52YXNIZWlnaHQsXG4gICAgICB2aWV3cG9ydFdpZHRoOiBwcm9wcy52aWV3cG9ydFdpZHRoLFxuICAgICAgdmlld3BvcnRIZWlnaHQ6IHByb3BzLnZpZXdwb3J0SGVpZ2h0LFxuICAgIH07XG4gIH1cblxuICBydW4oKSB7XG4gICAgaWYgKCF0aGlzLnNrZXRjaClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJzaG91bGQgd2FpdCB1bnRpbCBza2V0Y2ggaXMgbG9hZGVkIGJlZm9yZSB0cnlpbmcgdG8gcGxheSgpXCJcbiAgICAgICk7XG5cbiAgICAvLyBTdGFydCBhbiBhbmltYXRpb24gZnJhbWUgbG9vcCBpZiBuZWNlc3NhcnlcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5wbGF5aW5nICE9PSBmYWxzZSkge1xuICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfVxuXG4gICAgLy8gTGV0J3MgbGV0IHRoaXMgd2FybmluZyBoYW5nIGFyb3VuZCBmb3IgYSBmZXcgdmVyc2lvbnMuLi5cbiAgICBpZiAodHlwZW9mIHRoaXMuc2tldGNoLmRpc3Bvc2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIkluIGNhbnZhcy1za2V0Y2hAMC4wLjIzIHRoZSBkaXNwb3NlKCkgZXZlbnQgaGFzIGJlZW4gcmVuYW1lZCB0byB1bmxvYWQoKVwiXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEluIGNhc2Ugd2UgYXJlbid0IHBsYXlpbmcgb3IgYW5pbWF0ZWQsIG1ha2Ugc3VyZSB3ZSBzdGlsbCB0cmlnZ2VyIGJlZ2luIG1lc3NhZ2UuLi5cbiAgICBpZiAoIXRoaXMucHJvcHMuc3RhcnRlZCkge1xuICAgICAgdGhpcy5fc2lnbmFsQmVnaW4oKTtcbiAgICAgIHRoaXMucHJvcHMuc3RhcnRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gUmVuZGVyIGFuIGluaXRpYWwgZnJhbWVcbiAgICB0aGlzLnRpY2soKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2NhbmNlbFRpbWVvdXRzKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuX3JhZiAhPSBudWxsICYmXG4gICAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICB0eXBlb2Ygd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID09PSBcImZ1bmN0aW9uXCJcbiAgICApIHtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9yYWYpO1xuICAgICAgdGhpcy5fcmFmID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3JlY29yZFRpbWVvdXQgIT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3JlY29yZFRpbWVvdXQpO1xuICAgICAgdGhpcy5fcmVjb3JkVGltZW91dCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcGxheSgpIHtcbiAgICBsZXQgYW5pbWF0ZSA9IHRoaXMuc2V0dGluZ3MuYW5pbWF0ZTtcbiAgICBpZiAoXCJhbmltYXRpb25cIiBpbiB0aGlzLnNldHRpbmdzKSB7XG4gICAgICBhbmltYXRlID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJbY2FudmFzLXNrZXRjaF0geyBhbmltYXRpb24gfSBoYXMgYmVlbiByZW5hbWVkIHRvIHsgYW5pbWF0ZSB9XCJcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghYW5pbWF0ZSkgcmV0dXJuO1xuICAgIGlmICghaXNCcm93c2VyKCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgIFwiW2NhbnZhcy1za2V0Y2hdIFdBUk46IFVzaW5nIHsgYW5pbWF0ZSB9IGluIE5vZGUuanMgaXMgbm90IHlldCBzdXBwb3J0ZWRcIlxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMucGxheWluZykgcmV0dXJuO1xuICAgIGlmICghdGhpcy5wcm9wcy5zdGFydGVkKSB7XG4gICAgICB0aGlzLl9zaWduYWxCZWdpbigpO1xuICAgICAgdGhpcy5wcm9wcy5zdGFydGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBjb25zb2xlLmxvZygncGxheScsIHRoaXMucHJvcHMudGltZSlcblxuICAgIC8vIFN0YXJ0IGEgcmVuZGVyIGxvb3BcbiAgICB0aGlzLnByb3BzLnBsYXlpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2NhbmNlbFRpbWVvdXRzKCk7XG4gICAgdGhpcy5fbGFzdFRpbWUgPSByaWdodE5vdygpO1xuICAgIHRoaXMuX3JhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fYW5pbWF0ZUhhbmRsZXIpO1xuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMucmVjb3JkaW5nKSB0aGlzLmVuZFJlY29yZCgpO1xuICAgIHRoaXMucHJvcHMucGxheWluZyA9IGZhbHNlO1xuXG4gICAgdGhpcy5fY2FuY2VsVGltZW91dHMoKTtcbiAgfVxuXG4gIHRvZ2dsZVBsYXkoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMucGxheWluZykgdGhpcy5wYXVzZSgpO1xuICAgIGVsc2UgdGhpcy5wbGF5KCk7XG4gIH1cblxuICAvLyBTdG9wIGFuZCByZXNldCB0byBmcmFtZSB6ZXJvXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5wYXVzZSgpO1xuICAgIHRoaXMucHJvcHMuZnJhbWUgPSAwO1xuICAgIHRoaXMucHJvcHMucGxheWhlYWQgPSAwO1xuICAgIHRoaXMucHJvcHMudGltZSA9IDA7XG4gICAgdGhpcy5wcm9wcy5kZWx0YVRpbWUgPSAwO1xuICAgIHRoaXMucHJvcHMuc3RhcnRlZCA9IGZhbHNlO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICByZWNvcmQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMucmVjb3JkaW5nKSByZXR1cm47XG4gICAgaWYgKCFpc0Jyb3dzZXIoKSkge1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgXCJbY2FudmFzLXNrZXRjaF0gV0FSTjogUmVjb3JkaW5nIGZyb20gTm9kZS5qcyBpcyBub3QgeWV0IHN1cHBvcnRlZFwiXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcCgpO1xuICAgIHRoaXMucHJvcHMucGxheWluZyA9IHRydWU7XG4gICAgdGhpcy5wcm9wcy5yZWNvcmRpbmcgPSB0cnVlO1xuXG4gICAgY29uc3QgZXhwb3J0T3B0cyA9IHRoaXMuX2NyZWF0ZUV4cG9ydE9wdGlvbnMoeyBzZXF1ZW5jZTogdHJ1ZSB9KTtcblxuICAgIGNvbnN0IGZyYW1lSW50ZXJ2YWwgPSAxIC8gdGhpcy5wcm9wcy5mcHM7XG4gICAgLy8gUmVuZGVyIGVhY2ggZnJhbWUgaW4gdGhlIHNlcXVlbmNlXG4gICAgdGhpcy5fY2FuY2VsVGltZW91dHMoKTtcbiAgICBjb25zdCB0aWNrID0gKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnByb3BzLnJlY29yZGluZykgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgdGhpcy5wcm9wcy5kZWx0YVRpbWUgPSBmcmFtZUludGVydmFsO1xuICAgICAgdGhpcy50aWNrKCk7XG4gICAgICByZXR1cm4gdGhpcy5leHBvcnRGcmFtZShleHBvcnRPcHRzKS50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJlY29yZGluZykgcmV0dXJuOyAvLyB3YXMgY2FuY2VsbGVkIGJlZm9yZVxuICAgICAgICB0aGlzLnByb3BzLmRlbHRhVGltZSA9IDA7XG4gICAgICAgIHRoaXMucHJvcHMuZnJhbWUrKztcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZnJhbWUgPCB0aGlzLnByb3BzLnRvdGFsRnJhbWVzKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy50aW1lICs9IGZyYW1lSW50ZXJ2YWw7XG4gICAgICAgICAgdGhpcy5wcm9wcy5wbGF5aGVhZCA9IHRoaXMuX2NvbXB1dGVQbGF5aGVhZChcbiAgICAgICAgICAgIHRoaXMucHJvcHMudGltZSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZHVyYXRpb25cbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuX3JlY29yZFRpbWVvdXQgPSBzZXRUaW1lb3V0KHRpY2ssIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmluaXNoZWQgcmVjb3JkaW5nXCIpO1xuICAgICAgICAgIHRoaXMuX3NpZ25hbEVuZCgpO1xuICAgICAgICAgIHRoaXMuZW5kUmVjb3JkKCk7XG4gICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgdGhpcy5ydW4oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIFRyaWdnZXIgYSBzdGFydCBldmVudCBiZWZvcmUgd2UgYmVnaW4gcmVjb3JkaW5nXG4gICAgaWYgKCF0aGlzLnByb3BzLnN0YXJ0ZWQpIHtcbiAgICAgIHRoaXMuX3NpZ25hbEJlZ2luKCk7XG4gICAgICB0aGlzLnByb3BzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIFRyaWdnZXIgJ2JlZ2luIHJlY29yZCcgZXZlbnRcbiAgICBpZiAodGhpcy5za2V0Y2ggJiYgdHlwZW9mIHRoaXMuc2tldGNoLmJlZ2luUmVjb3JkID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRoaXMuX3dyYXBDb250ZXh0U2NhbGUoKHByb3BzKSA9PiB0aGlzLnNrZXRjaC5iZWdpblJlY29yZChwcm9wcykpO1xuICAgIH1cblxuICAgIC8vIEluaXRpYXRlIGEgc3RyZWFtaW5nIHN0YXJ0IGlmIG5lY2Vzc2FyeVxuICAgIHN0cmVhbVN0YXJ0KGV4cG9ydE9wdHMpXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHRoaXMuX3JhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gICAgICB9KTtcbiAgfVxuXG4gIF9zaWduYWxCZWdpbigpIHtcbiAgICBpZiAodGhpcy5za2V0Y2ggJiYgdHlwZW9mIHRoaXMuc2tldGNoLmJlZ2luID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRoaXMuX3dyYXBDb250ZXh0U2NhbGUoKHByb3BzKSA9PiB0aGlzLnNrZXRjaC5iZWdpbihwcm9wcykpO1xuICAgIH1cbiAgfVxuXG4gIF9zaWduYWxFbmQoKSB7XG4gICAgaWYgKHRoaXMuc2tldGNoICYmIHR5cGVvZiB0aGlzLnNrZXRjaC5lbmQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5fd3JhcENvbnRleHRTY2FsZSgocHJvcHMpID0+IHRoaXMuc2tldGNoLmVuZChwcm9wcykpO1xuICAgIH1cbiAgfVxuXG4gIGVuZFJlY29yZCgpIHtcbiAgICBjb25zdCB3YXNSZWNvcmRpbmcgPSB0aGlzLnByb3BzLnJlY29yZGluZztcblxuICAgIHRoaXMuX2NhbmNlbFRpbWVvdXRzKCk7XG4gICAgdGhpcy5wcm9wcy5yZWNvcmRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnByb3BzLmRlbHRhVGltZSA9IDA7XG4gICAgdGhpcy5wcm9wcy5wbGF5aW5nID0gZmFsc2U7XG5cbiAgICAvLyB0ZWxsIENMSSB0aGF0IHN0cmVhbSBoYXMgZmluaXNoZWRcbiAgICByZXR1cm4gc3RyZWFtRW5kKClcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIFRyaWdnZXIgJ2VuZCByZWNvcmQnIGV2ZW50XG4gICAgICAgIGlmIChcbiAgICAgICAgICB3YXNSZWNvcmRpbmcgJiZcbiAgICAgICAgICB0aGlzLnNrZXRjaCAmJlxuICAgICAgICAgIHR5cGVvZiB0aGlzLnNrZXRjaC5lbmRSZWNvcmQgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLl93cmFwQ29udGV4dFNjYWxlKChwcm9wcykgPT4gdGhpcy5za2V0Y2guZW5kUmVjb3JkKHByb3BzKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgX2NyZWF0ZUV4cG9ydE9wdGlvbnMob3B0ID0ge30pIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VxdWVuY2U6IG9wdC5zZXF1ZW5jZSxcbiAgICAgIHNhdmU6IG9wdC5zYXZlLFxuICAgICAgZnBzOiB0aGlzLnByb3BzLmZwcyxcbiAgICAgIGZyYW1lOiBvcHQuc2VxdWVuY2UgPyB0aGlzLnByb3BzLmZyYW1lIDogdW5kZWZpbmVkLFxuICAgICAgZmlsZTogdGhpcy5zZXR0aW5ncy5maWxlLFxuICAgICAgbmFtZTogdGhpcy5zZXR0aW5ncy5uYW1lLFxuICAgICAgcHJlZml4OiB0aGlzLnNldHRpbmdzLnByZWZpeCxcbiAgICAgIHN1ZmZpeDogdGhpcy5zZXR0aW5ncy5zdWZmaXgsXG4gICAgICBlbmNvZGluZzogdGhpcy5zZXR0aW5ncy5lbmNvZGluZyxcbiAgICAgIGVuY29kaW5nUXVhbGl0eTogdGhpcy5zZXR0aW5ncy5lbmNvZGluZ1F1YWxpdHksXG4gICAgICB0aW1lU3RhbXA6IG9wdC50aW1lU3RhbXAgfHwgZ2V0VGltZVN0YW1wKCksXG4gICAgICB0b3RhbEZyYW1lczogaXNGaW5pdGUodGhpcy5wcm9wcy50b3RhbEZyYW1lcylcbiAgICAgICAgPyBNYXRoLm1heCgwLCB0aGlzLnByb3BzLnRvdGFsRnJhbWVzKVxuICAgICAgICA6IDEwMDAsXG4gICAgfTtcbiAgfVxuXG4gIGV4cG9ydEZyYW1lKG9wdCA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLnNrZXRjaCkgcmV0dXJuIFByb21pc2UuYWxsKFtdKTtcbiAgICBpZiAodHlwZW9mIHRoaXMuc2tldGNoLnByZUV4cG9ydCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aGlzLnNrZXRjaC5wcmVFeHBvcnQoKTtcbiAgICB9XG5cbiAgICAvLyBPcHRpb25zIGZvciBleHBvcnQgZnVuY3Rpb25cbiAgICBsZXQgZXhwb3J0T3B0cyA9IHRoaXMuX2NyZWF0ZUV4cG9ydE9wdGlvbnMob3B0KTtcblxuICAgIGNvbnN0IGNsaWVudCA9IGdldENsaWVudEFQSSgpO1xuICAgIGxldCBwID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgaWYgKGNsaWVudCAmJiBvcHQuY29tbWl0ICYmIHR5cGVvZiBjbGllbnQuY29tbWl0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGNvbnN0IGNvbW1pdE9wdHMgPSBhc3NpZ24oe30sIGV4cG9ydE9wdHMpO1xuICAgICAgY29uc3QgaGFzaCA9IGNsaWVudC5jb21taXQoY29tbWl0T3B0cyk7XG4gICAgICBpZiAoaXNQcm9taXNlKGhhc2gpKSBwID0gaGFzaDtcbiAgICAgIGVsc2UgcCA9IFByb21pc2UucmVzb2x2ZShoYXNoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcFxuICAgICAgLnRoZW4oKGhhc2gpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RvRXhwb3J0RnJhbWUoXG4gICAgICAgICAgYXNzaWduKHt9LCBleHBvcnRPcHRzLCB7IGhhc2g6IGhhc2ggfHwgXCJcIiB9KVxuICAgICAgICApO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgLy8gTW9zdCBjb21tb24gdXNlY2FzZSBpcyB0byBleHBvcnQgYSBzaW5nbGUgbGF5ZXIsXG4gICAgICAgIC8vIHNvIGxldCdzIG9wdGltaXplIHRoZSB1c2VyIGV4cGVyaWVuY2UgZm9yIHRoYXQuXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAxKSByZXR1cm4gcmVzdWx0WzBdO1xuICAgICAgICBlbHNlIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgfVxuXG4gIF9kb0V4cG9ydEZyYW1lKGV4cG9ydE9wdHMgPSB7fSkge1xuICAgIHRoaXMuX3Byb3BzLmV4cG9ydGluZyA9IHRydWU7XG5cbiAgICAvLyBSZXNpemUgdG8gb3V0cHV0IHJlc29sdXRpb25cbiAgICB0aGlzLnJlc2l6ZSgpO1xuXG4gICAgLy8gRHJhdyBhdCB0aGlzIG91dHB1dCByZXNvbHV0aW9uXG4gICAgbGV0IGRyYXdSZXN1bHQgPSB0aGlzLnJlbmRlcigpO1xuXG4gICAgLy8gVGhlIHNlbGYgb3duZWQgY2FudmFzIChtYXkgYmUgdW5kZWZpbmVkLi4uISlcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLnByb3BzLmNhbnZhcztcblxuICAgIC8vIEdldCBsaXN0IG9mIHJlc3VsdHMgZnJvbSByZW5kZXJcbiAgICBpZiAodHlwZW9mIGRyYXdSZXN1bHQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGRyYXdSZXN1bHQgPSBbY2FudmFzXTtcbiAgICB9XG4gICAgZHJhd1Jlc3VsdCA9IFtdLmNvbmNhdChkcmF3UmVzdWx0KS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICAvLyBUcmFuc2Zvcm0gdGhlIGNhbnZhcy9maWxlIGRlc2NyaXB0b3JzIGludG8gYSBjb25zaXN0ZW50IGZvcm1hdCxcbiAgICAvLyBhbmQgcHVsbCBvdXQgYW55IGRhdGEgVVJMcyBmcm9tIGNhbnZhcyBlbGVtZW50c1xuICAgIGRyYXdSZXN1bHQgPSBkcmF3UmVzdWx0Lm1hcCgocmVzdWx0KSA9PiB7XG4gICAgICBjb25zdCBoYXNEYXRhT2JqZWN0ID1cbiAgICAgICAgdHlwZW9mIHJlc3VsdCA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICByZXN1bHQgJiZcbiAgICAgICAgKFwiZGF0YVwiIGluIHJlc3VsdCB8fCBcImRhdGFVUkxcIiBpbiByZXN1bHQpO1xuICAgICAgY29uc3QgZGF0YSA9IGhhc0RhdGFPYmplY3QgPyByZXN1bHQuZGF0YSA6IHJlc3VsdDtcbiAgICAgIGNvbnN0IG9wdHMgPSBoYXNEYXRhT2JqZWN0ID8gYXNzaWduKHt9LCByZXN1bHQsIHsgZGF0YSB9KSA6IHsgZGF0YSB9O1xuICAgICAgaWYgKGlzQ2FudmFzKGRhdGEpKSB7XG4gICAgICAgIGNvbnN0IGVuY29kaW5nID0gb3B0cy5lbmNvZGluZyB8fCBleHBvcnRPcHRzLmVuY29kaW5nO1xuICAgICAgICBjb25zdCBlbmNvZGluZ1F1YWxpdHkgPSBkZWZpbmVkKFxuICAgICAgICAgIG9wdHMuZW5jb2RpbmdRdWFsaXR5LFxuICAgICAgICAgIGV4cG9ydE9wdHMuZW5jb2RpbmdRdWFsaXR5LFxuICAgICAgICAgIDAuOTVcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgeyBkYXRhVVJMLCBleHRlbnNpb24sIHR5cGUgfSA9IGV4cG9ydENhbnZhcyhkYXRhLCB7XG4gICAgICAgICAgZW5jb2RpbmcsXG4gICAgICAgICAgZW5jb2RpbmdRdWFsaXR5LFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ob3B0cywgeyBkYXRhVVJMLCBleHRlbnNpb24sIHR5cGUgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb3B0cztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIE5vdyByZXR1cm4gdG8gcmVndWxhciByZW5kZXJpbmcgbW9kZVxuICAgIHRoaXMuX3Byb3BzLmV4cG9ydGluZyA9IGZhbHNlO1xuICAgIHRoaXMucmVzaXplKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICAgIC8vIEFuZCBub3cgd2UgY2FuIHNhdmUgZWFjaCByZXN1bHRcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICBkcmF3UmVzdWx0Lm1hcCgocmVzdWx0LCBpLCBsYXllckxpc3QpID0+IHtcbiAgICAgICAgLy8gQnkgZGVmYXVsdCwgaWYgcmVuZGVyaW5nIG11bHRpcGxlIGxheWVycyB3ZSB3aWxsIGdpdmUgdGhlbSBpbmRpY2VzXG4gICAgICAgIGNvbnN0IGN1ck9wdCA9IGFzc2lnbihcbiAgICAgICAgICB7XG4gICAgICAgICAgICBleHRlbnNpb246IFwiXCIsXG4gICAgICAgICAgICBwcmVmaXg6IFwiXCIsXG4gICAgICAgICAgICBzdWZmaXg6IFwiXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBleHBvcnRPcHRzLFxuICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsYXllcjogaSxcbiAgICAgICAgICAgIHRvdGFsTGF5ZXJzOiBsYXllckxpc3QubGVuZ3RoLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICAvLyBJZiBleHBvcnQgaXMgZXhwbGljaXRseSBub3Qgc2F2aW5nLCBtYWtlIHN1cmUgbm90aGluZyBzYXZlc1xuICAgICAgICAvLyBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgbGF5ZXIgc2F2ZSBvcHRpb24sIG9yIGZhbGxiYWNrIHRvIHRydWVcbiAgICAgICAgY29uc3Qgc2F2ZVBhcmFtID0gZXhwb3J0T3B0cy5zYXZlID09PSBmYWxzZSA/IGZhbHNlIDogcmVzdWx0LnNhdmU7XG4gICAgICAgIGN1ck9wdC5zYXZlID0gc2F2ZVBhcmFtICE9PSBmYWxzZTtcblxuICAgICAgICAvLyBSZXNvbHZlIGEgZnVsbCBmaWxlbmFtZSBmcm9tIGFsbCB0aGUgb3B0aW9uc1xuICAgICAgICBjdXJPcHQuZmlsZW5hbWUgPSByZXNvbHZlRmlsZW5hbWUoY3VyT3B0KTtcblxuICAgICAgICAvLyBDbGVhbiB1cCBzb21lIHBhcmFtZXRlcnMgdGhhdCBtYXkgYmUgYW1iaWd1b3VzIHRvIHRoZSB1c2VyXG4gICAgICAgIGRlbGV0ZSBjdXJPcHQuZW5jb2Rpbmc7XG4gICAgICAgIGRlbGV0ZSBjdXJPcHQuZW5jb2RpbmdRdWFsaXR5O1xuXG4gICAgICAgIC8vIENsZWFuIGl0IHVwIGZ1cnRoZXIgYnkganVzdCByZW1vdmluZyB1bmRlZmluZWQgdmFsdWVzXG4gICAgICAgIGZvciAobGV0IGsgaW4gY3VyT3B0KSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBjdXJPcHRba10gPT09IFwidW5kZWZpbmVkXCIpIGRlbGV0ZSBjdXJPcHRba107XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2F2ZVByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoe30pO1xuICAgICAgICBpZiAoY3VyT3B0LnNhdmUpIHtcbiAgICAgICAgICAvLyBXaGV0aGVyIHRvIGFjdHVhbGx5IHNhdmUgKGRvd25sb2FkKSB0aGlzIGZyYWdtZW50XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGN1ck9wdC5kYXRhO1xuICAgICAgICAgIGlmIChjdXJPcHQuZGF0YVVSTCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YVVSTCA9IGN1ck9wdC5kYXRhVVJMO1xuICAgICAgICAgICAgc2F2ZVByb21pc2UgPSBzYXZlRGF0YVVSTChkYXRhVVJMLCBjdXJPcHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzYXZlUHJvbWlzZSA9IHNhdmVGaWxlKGRhdGEsIGN1ck9wdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzYXZlUHJvbWlzZS50aGVuKChzYXZlUmVzdWx0KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGN1ck9wdCwgc2F2ZVJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApLnRoZW4oKGV2KSA9PiB7XG4gICAgICBjb25zdCBzYXZlZEV2ZW50cyA9IGV2LmZpbHRlcigoZSkgPT4gZS5zYXZlKTtcbiAgICAgIGlmIChzYXZlZEV2ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIExvZyB0aGUgc2F2ZWQgZXhwb3J0c1xuICAgICAgICBjb25zdCBldmVudFdpdGhPdXRwdXQgPSBzYXZlZEV2ZW50cy5maW5kKChlKSA9PiBlLm91dHB1dE5hbWUpO1xuICAgICAgICBjb25zdCBpc0NsaWVudCA9IHNhdmVkRXZlbnRzLnNvbWUoKGUpID0+IGUuY2xpZW50KTtcbiAgICAgICAgY29uc3QgaXNTdHJlYW1pbmcgPSBzYXZlZEV2ZW50cy5zb21lKChlKSA9PiBlLnN0cmVhbSk7XG4gICAgICAgIGxldCBpdGVtO1xuICAgICAgICAvLyBtYW55IGZpbGVzLCBqdXN0IGxvZyBob3cgbWFueSB3ZXJlIGV4cG9ydGVkXG4gICAgICAgIGlmIChzYXZlZEV2ZW50cy5sZW5ndGggPiAxKSBpdGVtID0gc2F2ZWRFdmVudHMubGVuZ3RoO1xuICAgICAgICAvLyBpbiBDTEksIHdlIGtub3cgZXhhY3QgcGF0aCBkaXJuYW1lXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50V2l0aE91dHB1dClcbiAgICAgICAgICBpdGVtID0gYCR7ZXZlbnRXaXRoT3V0cHV0Lm91dHB1dE5hbWV9LyR7c2F2ZWRFdmVudHNbMF0uZmlsZW5hbWV9YDtcbiAgICAgICAgLy8gaW4gYnJvd3Nlciwgd2UgY2FuIG9ubHkga25vdyBpdCB3ZW50IHRvIFwiYnJvd3NlciBkb3dubG9hZCBmb2xkZXJcIlxuICAgICAgICBlbHNlIGl0ZW0gPSBgJHtzYXZlZEV2ZW50c1swXS5maWxlbmFtZX1gO1xuICAgICAgICBsZXQgb2ZTZXEgPSBcIlwiO1xuICAgICAgICBpZiAoZXhwb3J0T3B0cy5zZXF1ZW5jZSkge1xuICAgICAgICAgIGNvbnN0IGhhc1RvdGFsRnJhbWVzID0gaXNGaW5pdGUodGhpcy5wcm9wcy50b3RhbEZyYW1lcyk7XG4gICAgICAgICAgb2ZTZXEgPSBoYXNUb3RhbEZyYW1lc1xuICAgICAgICAgICAgPyBgIChmcmFtZSAke2V4cG9ydE9wdHMuZnJhbWUgKyAxfSAvICR7dGhpcy5wcm9wcy50b3RhbEZyYW1lc30pYFxuICAgICAgICAgICAgOiBgIChmcmFtZSAke2V4cG9ydE9wdHMuZnJhbWV9KWA7XG4gICAgICAgIH0gZWxzZSBpZiAoc2F2ZWRFdmVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIG9mU2VxID0gYCBmaWxlc2A7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xpZW50ID0gaXNDbGllbnQgPyBcImNhbnZhcy1za2V0Y2gtY2xpXCIgOiBcImNhbnZhcy1za2V0Y2hcIjtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gaXNTdHJlYW1pbmcgPyBcIlN0cmVhbWluZyBpbnRvXCIgOiBcIkV4cG9ydGVkXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIGAlY1ske2NsaWVudH1dJWMgJHthY3Rpb259ICVjJHtpdGVtfSVjJHtvZlNlcX1gLFxuICAgICAgICAgIFwiY29sb3I6ICM4ZThlOGU7XCIsXG4gICAgICAgICAgXCJjb2xvcjogaW5pdGlhbDtcIixcbiAgICAgICAgICBcImZvbnQtd2VpZ2h0OiBib2xkO1wiLFxuICAgICAgICAgIFwiZm9udC13ZWlnaHQ6IGluaXRpYWw7XCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5za2V0Y2gucG9zdEV4cG9ydCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRoaXMuc2tldGNoLnBvc3RFeHBvcnQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBldjtcbiAgICB9KTtcbiAgfVxuXG4gIF93cmFwQ29udGV4dFNjYWxlKGNiKSB7XG4gICAgdGhpcy5fcHJlUmVuZGVyKCk7XG4gICAgY2IodGhpcy5wcm9wcyk7XG4gICAgdGhpcy5fcG9zdFJlbmRlcigpO1xuICB9XG5cbiAgX3ByZVJlbmRlcigpIHtcbiAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyBTY2FsZSBjb250ZXh0IGZvciB1bml0IHNpemluZ1xuICAgIGlmIChpczJEQ29udGV4dChwcm9wcy5jb250ZXh0KSAmJiAhcHJvcHMucDUpIHtcbiAgICAgIHByb3BzLmNvbnRleHQuc2F2ZSgpO1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2NhbGVDb250ZXh0ICE9PSBmYWxzZSkge1xuICAgICAgICBwcm9wcy5jb250ZXh0LnNjYWxlKHByb3BzLnNjYWxlWCwgcHJvcHMuc2NhbGVZKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHByb3BzLnA1KSB7XG4gICAgICBwcm9wcy5wNS5zY2FsZShcbiAgICAgICAgcHJvcHMuc2NhbGVYIC8gcHJvcHMucGl4ZWxSYXRpbyxcbiAgICAgICAgcHJvcHMuc2NhbGVZIC8gcHJvcHMucGl4ZWxSYXRpb1xuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBfcG9zdFJlbmRlcigpIHtcbiAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoaXMyRENvbnRleHQocHJvcHMuY29udGV4dCkgJiYgIXByb3BzLnA1KSB7XG4gICAgICBwcm9wcy5jb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvLyBGbHVzaCBieSBkZWZhdWx0LCB0aGlzIG1heSBiZSByZXZpc2l0ZWQgYXQgYSBsYXRlciBwb2ludC5cbiAgICAvLyBXZSBkbyB0aGlzIHRvIGVuc3VyZSB0b0RhdGFVUkwgY2FuIGJlIGNhbGxlZCBpbW1lZGlhdGVseSBhZnRlci5cbiAgICAvLyBNb3N0IGxpa2VseSBicm93c2VycyBhbHJlYWR5IGhhbmRsZSB0aGlzLCBzbyB3ZSBtYXkgcmV2aXNpdCB0aGlzIGFuZFxuICAgIC8vIHJlbW92ZSBpdCBpZiBpdCBpbXByb3ZlcyBwZXJmb3JtYW5jZSB3aXRob3V0IGFueSB1c2FiaWxpdHkgaXNzdWVzLlxuICAgIGlmIChwcm9wcy5nbCAmJiB0aGlzLnNldHRpbmdzLmZsdXNoICE9PSBmYWxzZSAmJiAhcHJvcHMucDUpIHtcbiAgICAgIHByb3BzLmdsLmZsdXNoKCk7XG4gICAgfVxuICB9XG5cbiAgdGljaygpIHtcbiAgICBpZiAodGhpcy5za2V0Y2ggJiYgdHlwZW9mIHRoaXMuc2tldGNoLnRpY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5fcHJlUmVuZGVyKCk7XG4gICAgICB0aGlzLnNrZXRjaC50aWNrKHRoaXMucHJvcHMpO1xuICAgICAgdGhpcy5fcG9zdFJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5wNSkge1xuICAgICAgdGhpcy5fbGFzdFJlZHJhd1Jlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMucHJvcHMucDUucmVkcmF3KCk7XG4gICAgICByZXR1cm4gdGhpcy5fbGFzdFJlZHJhd1Jlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc3VibWl0RHJhd0NhbGwoKTtcbiAgICB9XG4gIH1cblxuICBzdWJtaXREcmF3Q2FsbCgpIHtcbiAgICBpZiAoIXRoaXMuc2tldGNoKSByZXR1cm47XG5cbiAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5fcHJlUmVuZGVyKCk7XG5cbiAgICBsZXQgZHJhd1Jlc3VsdDtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5za2V0Y2ggPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgZHJhd1Jlc3VsdCA9IHRoaXMuc2tldGNoKHByb3BzKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnNrZXRjaC5yZW5kZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgZHJhd1Jlc3VsdCA9IHRoaXMuc2tldGNoLnJlbmRlcihwcm9wcyk7XG4gICAgfVxuXG4gICAgdGhpcy5fcG9zdFJlbmRlcigpO1xuXG4gICAgcmV0dXJuIGRyYXdSZXN1bHQ7XG4gIH1cblxuICB1cGRhdGUob3B0ID0ge30pIHtcbiAgICAvLyBDdXJyZW50bHkgdXBkYXRlKCkgaXMgb25seSBmb2N1c2VkIG9uIHJlc2l6aW5nLFxuICAgIC8vIGJ1dCBsYXRlciB3ZSB3aWxsIHN1cHBvcnQgb3RoZXIgb3B0aW9ucyBsaWtlIHN3aXRjaGluZ1xuICAgIC8vIGZyYW1lcyBhbmQgc3VjaC5cbiAgICBjb25zdCBub3RZZXRTdXBwb3J0ZWQgPSBbXCJhbmltYXRlXCJdO1xuXG4gICAgT2JqZWN0LmtleXMob3B0KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmIChub3RZZXRTdXBwb3J0ZWQuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBTb3JyeSwgdGhlIHsgJHtrZXl9IH0gb3B0aW9uIGlzIG5vdCB5ZXQgc3VwcG9ydGVkIHdpdGggdXBkYXRlKCkuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgb2xkQ2FudmFzID0gdGhpcy5fc2V0dGluZ3MuY2FudmFzO1xuICAgIGNvbnN0IG9sZENvbnRleHQgPSB0aGlzLl9zZXR0aW5ncy5jb250ZXh0O1xuXG4gICAgLy8gTWVyZ2UgbmV3IG9wdGlvbnMgaW50byBzZXR0aW5nc1xuICAgIGZvciAobGV0IGtleSBpbiBvcHQpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb3B0W2tleV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIC8vIGlnbm9yZSB1bmRlZmluZWRcbiAgICAgICAgdGhpcy5fc2V0dGluZ3Nba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1lcmdlIGluIHRpbWUgcHJvcHNcbiAgICBjb25zdCB0aW1lT3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3NldHRpbmdzLCBvcHQpO1xuICAgIGlmIChcInRpbWVcIiBpbiBvcHQgJiYgXCJmcmFtZVwiIGluIG9wdClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBzaG91bGQgc3BlY2lmeSB7IHRpbWUgfSBvciB7IGZyYW1lIH0gYnV0IG5vdCBib3RoXCIpO1xuICAgIGVsc2UgaWYgKFwidGltZVwiIGluIG9wdCkgZGVsZXRlIHRpbWVPcHRzLmZyYW1lO1xuICAgIGVsc2UgaWYgKFwiZnJhbWVcIiBpbiBvcHQpIGRlbGV0ZSB0aW1lT3B0cy50aW1lO1xuICAgIGlmIChcImR1cmF0aW9uXCIgaW4gb3B0ICYmIFwidG90YWxGcmFtZXNcIiBpbiBvcHQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiWW91IHNob3VsZCBzcGVjaWZ5IHsgZHVyYXRpb24gfSBvciB7IHRvdGFsRnJhbWVzIH0gYnV0IG5vdCBib3RoXCJcbiAgICAgICk7XG4gICAgZWxzZSBpZiAoXCJkdXJhdGlvblwiIGluIG9wdCkgZGVsZXRlIHRpbWVPcHRzLnRvdGFsRnJhbWVzO1xuICAgIGVsc2UgaWYgKFwidG90YWxGcmFtZXNcIiBpbiBvcHQpIGRlbGV0ZSB0aW1lT3B0cy5kdXJhdGlvbjtcblxuICAgIC8vIE1lcmdlIGluIHVzZXIgZGF0YSB3aXRob3V0IGNvcHlpbmdcbiAgICBpZiAoXCJkYXRhXCIgaW4gb3B0KSB0aGlzLl9wcm9wcy5kYXRhID0gb3B0LmRhdGE7XG5cbiAgICBjb25zdCB0aW1lUHJvcHMgPSB0aGlzLmdldFRpbWVQcm9wcyh0aW1lT3B0cyk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLl9wcm9wcywgdGltZVByb3BzKTtcblxuICAgIC8vIElmIGVpdGhlciBjYW52YXMgb3IgY29udGV4dCBpcyBjaGFuZ2VkLCB3ZSBzaG91bGQgcmUtdXBkYXRlXG4gICAgaWYgKFxuICAgICAgb2xkQ2FudmFzICE9PSB0aGlzLl9zZXR0aW5ncy5jYW52YXMgfHxcbiAgICAgIG9sZENvbnRleHQgIT09IHRoaXMuX3NldHRpbmdzLmNvbnRleHRcbiAgICApIHtcbiAgICAgIGNvbnN0IHsgY2FudmFzLCBjb250ZXh0IH0gPSBjcmVhdGVDYW52YXModGhpcy5fc2V0dGluZ3MpO1xuXG4gICAgICB0aGlzLnByb3BzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgIHRoaXMucHJvcHMuY29udGV4dCA9IGNvbnRleHQ7XG5cbiAgICAgIC8vIERlbGV0ZSBvciBhZGQgYSAnZ2wnIHByb3AgZm9yIGNvbnZlbmllbmNlXG4gICAgICB0aGlzLl9zZXR1cEdMS2V5KCk7XG5cbiAgICAgIC8vIFJlLW1vdW50IHRoZSBuZXcgY2FudmFzIGlmIGl0IGhhcyBubyBwYXJlbnRcbiAgICAgIHRoaXMuX2FwcGVuZENhbnZhc0lmTmVlZGVkKCk7XG4gICAgfVxuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHN1cHBvcnQgUDUuanNcbiAgICBpZiAob3B0LnA1ICYmIHR5cGVvZiBvcHQucDUgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5wcm9wcy5wNSA9IG9wdC5wNTtcbiAgICAgIHRoaXMucHJvcHMucDUuZHJhdyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2lzUDVSZXNpemluZykgcmV0dXJuO1xuICAgICAgICB0aGlzLl9sYXN0UmVkcmF3UmVzdWx0ID0gdGhpcy5zdWJtaXREcmF3Q2FsbCgpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgcGxheWluZyBzdGF0ZSBpZiBuZWNlc3NhcnlcbiAgICBpZiAoXCJwbGF5aW5nXCIgaW4gb3B0KSB7XG4gICAgICBpZiAob3B0LnBsYXlpbmcpIHRoaXMucGxheSgpO1xuICAgICAgZWxzZSB0aGlzLnBhdXNlKCk7XG4gICAgfVxuXG4gICAgY2hlY2tTZXR0aW5ncyh0aGlzLl9zZXR0aW5ncyk7XG5cbiAgICAvLyBEcmF3IG5ldyBmcmFtZVxuICAgIHRoaXMucmVzaXplKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgICByZXR1cm4gdGhpcy5wcm9wcztcbiAgfVxuXG4gIHJlc2l6ZSgpIHtcbiAgICBjb25zdCBvbGRTaXplcyA9IHRoaXMuX2dldFNpemVQcm9wcygpO1xuXG4gICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzO1xuICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcztcblxuICAgIC8vIFJlY29tcHV0ZSBuZXcgcHJvcGVydGllcyBiYXNlZCBvbiBjdXJyZW50IHNldHVwXG4gICAgY29uc3QgbmV3UHJvcHMgPSByZXNpemVDYW52YXMocHJvcHMsIHNldHRpbmdzKTtcblxuICAgIC8vIEFzc2lnbiB0byBjdXJyZW50IHByb3BzXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLl9wcm9wcywgbmV3UHJvcHMpO1xuXG4gICAgLy8gTm93IHdlIGFjdHVhbGx5IHVwZGF0ZSB0aGUgY2FudmFzIHdpZHRoL2hlaWdodCBhbmQgc3R5bGUgcHJvcHNcbiAgICBjb25zdCB7IHBpeGVsUmF0aW8sIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQsIHN0eWxlV2lkdGgsIHN0eWxlSGVpZ2h0IH0gPVxuICAgICAgdGhpcy5wcm9wcztcblxuICAgIC8vIFVwZGF0ZSBjYW52YXMgc2V0dGluZ3NcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLnByb3BzLmNhbnZhcztcbiAgICBpZiAoY2FudmFzICYmIHNldHRpbmdzLnJlc2l6ZUNhbnZhcyAhPT0gZmFsc2UpIHtcbiAgICAgIGlmIChwcm9wcy5wNSkge1xuICAgICAgICAvLyBQNS5qcyBzcGVjaWZpYyBlZGdlIGNhc2VcbiAgICAgICAgaWYgKGNhbnZhcy53aWR0aCAhPT0gY2FudmFzV2lkdGggfHwgY2FudmFzLmhlaWdodCAhPT0gY2FudmFzSGVpZ2h0KSB7XG4gICAgICAgICAgdGhpcy5faXNQNVJlc2l6aW5nID0gdHJ1ZTtcbiAgICAgICAgICAvLyBUaGlzIGNhdXNlcyBhIHJlLWRyYXcgOlxcIHNvIHdlIGlnbm9yZSBkcmF3cyBpbiB0aGUgbWVhbiB0aW1lLi4uIHNvcnRhIGhhY2t5XG4gICAgICAgICAgcHJvcHMucDUucGl4ZWxEZW5zaXR5KHBpeGVsUmF0aW8pO1xuICAgICAgICAgIHByb3BzLnA1LnJlc2l6ZUNhbnZhcyhcbiAgICAgICAgICAgIGNhbnZhc1dpZHRoIC8gcGl4ZWxSYXRpbyxcbiAgICAgICAgICAgIGNhbnZhc0hlaWdodCAvIHBpeGVsUmF0aW8sXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5faXNQNVJlc2l6aW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvcmNlIGNhbnZhcyBzaXplXG4gICAgICAgIGlmIChjYW52YXMud2lkdGggIT09IGNhbnZhc1dpZHRoKSBjYW52YXMud2lkdGggPSBjYW52YXNXaWR0aDtcbiAgICAgICAgaWYgKGNhbnZhcy5oZWlnaHQgIT09IGNhbnZhc0hlaWdodCkgY2FudmFzLmhlaWdodCA9IGNhbnZhc0hlaWdodDtcbiAgICAgIH1cbiAgICAgIC8vIFVwZGF0ZSBjYW52YXMgc3R5bGVcbiAgICAgIGlmIChpc0Jyb3dzZXIoKSAmJiBzZXR0aW5ncy5zdHlsZUNhbnZhcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgY2FudmFzLnN0eWxlLndpZHRoID0gYCR7c3R5bGVXaWR0aH1weGA7XG4gICAgICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtzdHlsZUhlaWdodH1weGA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbmV3U2l6ZXMgPSB0aGlzLl9nZXRTaXplUHJvcHMoKTtcbiAgICBsZXQgY2hhbmdlZCA9ICFkZWVwRXF1YWwob2xkU2l6ZXMsIG5ld1NpemVzKTtcbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgdGhpcy5fc2l6ZUNoYW5nZWQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGNoYW5nZWQ7XG4gIH1cblxuICBfc2l6ZUNoYW5nZWQoKSB7XG4gICAgLy8gU2VuZCByZXNpemUgZXZlbnQgdG8gc2tldGNoXG4gICAgaWYgKHRoaXMuc2tldGNoICYmIHR5cGVvZiB0aGlzLnNrZXRjaC5yZXNpemUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5za2V0Y2gucmVzaXplKHRoaXMucHJvcHMpO1xuICAgIH1cbiAgfVxuXG4gIGFuaW1hdGUoKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnBsYXlpbmcpIHJldHVybjtcbiAgICBpZiAoIWlzQnJvd3NlcigpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICBcIltjYW52YXMtc2tldGNoXSBXQVJOOiBBbmltYXRpb24gaW4gTm9kZS5qcyBpcyBub3QgeWV0IHN1cHBvcnRlZFwiXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9yYWYgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX2FuaW1hdGVIYW5kbGVyKTtcblxuICAgIGxldCBub3cgPSByaWdodE5vdygpO1xuXG4gICAgY29uc3QgZnBzID0gdGhpcy5wcm9wcy5mcHM7XG4gICAgY29uc3QgZnJhbWVJbnRlcnZhbE1TID0gMTAwMCAvIGZwcztcbiAgICBsZXQgZGVsdGFUaW1lTVMgPSBub3cgLSB0aGlzLl9sYXN0VGltZTtcblxuICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5wcm9wcy5kdXJhdGlvbjtcbiAgICBjb25zdCBoYXNEdXJhdGlvbiA9IHR5cGVvZiBkdXJhdGlvbiA9PT0gXCJudW1iZXJcIiAmJiBpc0Zpbml0ZShkdXJhdGlvbik7XG5cbiAgICBsZXQgaXNOZXdGcmFtZSA9IHRydWU7XG4gICAgY29uc3QgcGxheWJhY2tSYXRlID0gdGhpcy5zZXR0aW5ncy5wbGF5YmFja1JhdGU7XG4gICAgaWYgKHBsYXliYWNrUmF0ZSA9PT0gXCJmaXhlZFwiKSB7XG4gICAgICBkZWx0YVRpbWVNUyA9IGZyYW1lSW50ZXJ2YWxNUztcbiAgICB9IGVsc2UgaWYgKHBsYXliYWNrUmF0ZSA9PT0gXCJ0aHJvdHRsZVwiKSB7XG4gICAgICBpZiAoZGVsdGFUaW1lTVMgPiBmcmFtZUludGVydmFsTVMpIHtcbiAgICAgICAgbm93ID0gbm93IC0gKGRlbHRhVGltZU1TICUgZnJhbWVJbnRlcnZhbE1TKTtcbiAgICAgICAgdGhpcy5fbGFzdFRpbWUgPSBub3c7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc05ld0ZyYW1lID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xhc3RUaW1lID0gbm93O1xuICAgIH1cblxuICAgIGNvbnN0IGRlbHRhVGltZSA9IGRlbHRhVGltZU1TIC8gMTAwMDtcbiAgICBsZXQgbmV3VGltZSA9IHRoaXMucHJvcHMudGltZSArIGRlbHRhVGltZSAqIHRoaXMucHJvcHMudGltZVNjYWxlO1xuXG4gICAgLy8gSGFuZGxlIHJldmVyc2UgdGltZSBzY2FsZVxuICAgIGlmIChuZXdUaW1lIDwgMCAmJiBoYXNEdXJhdGlvbikge1xuICAgICAgbmV3VGltZSA9IGR1cmF0aW9uICsgbmV3VGltZTtcbiAgICB9XG5cbiAgICAvLyBSZS1zdGFydCBhbmltYXRpb25cbiAgICBsZXQgaXNGaW5pc2hlZCA9IGZhbHNlO1xuICAgIGxldCBpc0xvb3BTdGFydCA9IGZhbHNlO1xuXG4gICAgY29uc3QgbG9vcGluZyA9IHRoaXMuc2V0dGluZ3MubG9vcCAhPT0gZmFsc2U7XG5cbiAgICBpZiAoaGFzRHVyYXRpb24gJiYgbmV3VGltZSA+PSBkdXJhdGlvbikge1xuICAgICAgLy8gUmUtc3RhcnQgYW5pbWF0aW9uXG4gICAgICBpZiAobG9vcGluZykge1xuICAgICAgICBpc05ld0ZyYW1lID0gdHJ1ZTtcbiAgICAgICAgbmV3VGltZSA9IG5ld1RpbWUgJSBkdXJhdGlvbjtcbiAgICAgICAgaXNMb29wU3RhcnQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNOZXdGcmFtZSA9IGZhbHNlO1xuICAgICAgICBuZXdUaW1lID0gZHVyYXRpb247XG4gICAgICAgIGlzRmluaXNoZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zaWduYWxFbmQoKTtcbiAgICB9XG5cbiAgICBpZiAoaXNOZXdGcmFtZSkge1xuICAgICAgdGhpcy5wcm9wcy5kZWx0YVRpbWUgPSBkZWx0YVRpbWU7XG4gICAgICB0aGlzLnByb3BzLnRpbWUgPSBuZXdUaW1lO1xuICAgICAgdGhpcy5wcm9wcy5wbGF5aGVhZCA9IHRoaXMuX2NvbXB1dGVQbGF5aGVhZChuZXdUaW1lLCBkdXJhdGlvbik7XG4gICAgICBjb25zdCBsYXN0RnJhbWUgPSB0aGlzLnByb3BzLmZyYW1lO1xuICAgICAgdGhpcy5wcm9wcy5mcmFtZSA9IHRoaXMuX2NvbXB1dGVDdXJyZW50RnJhbWUoKTtcbiAgICAgIGlmIChpc0xvb3BTdGFydCkgdGhpcy5fc2lnbmFsQmVnaW4oKTtcbiAgICAgIGlmIChsYXN0RnJhbWUgIT09IHRoaXMucHJvcHMuZnJhbWUpIHRoaXMudGljaygpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgIHRoaXMucHJvcHMuZGVsdGFUaW1lID0gMDtcbiAgICB9XG5cbiAgICBpZiAoaXNGaW5pc2hlZCkge1xuICAgICAgdGhpcy5wYXVzZSgpO1xuICAgIH1cbiAgfVxuXG4gIGRpc3BhdGNoKGNiKSB7XG4gICAgaWYgKHR5cGVvZiBjYiAhPT0gXCJmdW5jdGlvblwiKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibXVzdCBwYXNzIGZ1bmN0aW9uIGludG8gZGlzcGF0Y2goKVwiKTtcbiAgICBjYih0aGlzLnByb3BzKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgbW91bnQoKSB7XG4gICAgdGhpcy5fYXBwZW5kQ2FudmFzSWZOZWVkZWQoKTtcbiAgfVxuXG4gIHVubW91bnQoKSB7XG4gICAgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLl9yZXNpemVIYW5kbGVyKTtcbiAgICAgIHRoaXMuX2tleWJvYXJkU2hvcnRjdXRzLmRldGFjaCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5jYW52YXMucGFyZW50RWxlbWVudCkge1xuICAgICAgdGhpcy5wcm9wcy5jYW52YXMucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLnByb3BzLmNhbnZhcyk7XG4gICAgfVxuICB9XG5cbiAgX2FwcGVuZENhbnZhc0lmTmVlZGVkKCkge1xuICAgIGlmICghaXNCcm93c2VyKCkpIHJldHVybjtcbiAgICBpZiAoXG4gICAgICB0aGlzLnNldHRpbmdzLnBhcmVudCAhPT0gZmFsc2UgJiZcbiAgICAgIHRoaXMucHJvcHMuY2FudmFzICYmXG4gICAgICAhdGhpcy5wcm9wcy5jYW52YXMucGFyZW50RWxlbWVudFxuICAgICkge1xuICAgICAgY29uc3QgZGVmYXVsdFBhcmVudCA9IHRoaXMuc2V0dGluZ3MucGFyZW50IHx8IGRvY3VtZW50LmJvZHk7XG4gICAgICBkZWZhdWx0UGFyZW50LmFwcGVuZENoaWxkKHRoaXMucHJvcHMuY2FudmFzKTtcbiAgICB9XG4gIH1cblxuICBfc2V0dXBHTEtleSgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0KSB7XG4gICAgICBpZiAoaXNXZWJHTENvbnRleHQodGhpcy5wcm9wcy5jb250ZXh0KSkge1xuICAgICAgICB0aGlzLl9wcm9wcy5nbCA9IHRoaXMucHJvcHMuY29udGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9wcm9wcy5nbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRUaW1lUHJvcHMoc2V0dGluZ3MgPSB7fSkge1xuICAgIC8vIEdldCB0aW1pbmcgZGF0YVxuICAgIGxldCBkdXJhdGlvbiA9IHNldHRpbmdzLmR1cmF0aW9uO1xuICAgIGxldCB0b3RhbEZyYW1lcyA9IHNldHRpbmdzLnRvdGFsRnJhbWVzO1xuICAgIGNvbnN0IHRpbWVTY2FsZSA9IGRlZmluZWQoc2V0dGluZ3MudGltZVNjYWxlLCAxKTtcbiAgICBjb25zdCBmcHMgPSBkZWZpbmVkKHNldHRpbmdzLmZwcywgMjQpO1xuICAgIGNvbnN0IGhhc0R1cmF0aW9uID0gdHlwZW9mIGR1cmF0aW9uID09PSBcIm51bWJlclwiICYmIGlzRmluaXRlKGR1cmF0aW9uKTtcbiAgICBjb25zdCBoYXNUb3RhbEZyYW1lcyA9XG4gICAgICB0eXBlb2YgdG90YWxGcmFtZXMgPT09IFwibnVtYmVyXCIgJiYgaXNGaW5pdGUodG90YWxGcmFtZXMpO1xuXG4gICAgY29uc3QgdG90YWxGcmFtZXNGcm9tRHVyYXRpb24gPSBoYXNEdXJhdGlvblxuICAgICAgPyBNYXRoLmZsb29yKGZwcyAqIGR1cmF0aW9uKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgZHVyYXRpb25Gcm9tVG90YWxGcmFtZXMgPSBoYXNUb3RhbEZyYW1lc1xuICAgICAgPyB0b3RhbEZyYW1lcyAvIGZwc1xuICAgICAgOiB1bmRlZmluZWQ7XG4gICAgaWYgKFxuICAgICAgaGFzRHVyYXRpb24gJiZcbiAgICAgIGhhc1RvdGFsRnJhbWVzICYmXG4gICAgICB0b3RhbEZyYW1lc0Zyb21EdXJhdGlvbiAhPT0gdG90YWxGcmFtZXNcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJZb3Ugc2hvdWxkIHNwZWNpZnkgZWl0aGVyIGR1cmF0aW9uIG9yIHRvdGFsRnJhbWVzLCBidXQgbm90IGJvdGguIE9yLCB0aGV5IG11c3QgbWF0Y2ggZXhhY3RseS5cIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2Ygc2V0dGluZ3MuZGltZW5zaW9ucyA9PT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgdHlwZW9mIHNldHRpbmdzLnVuaXRzICE9PSBcInVuZGVmaW5lZFwiXG4gICAgKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBZb3UndmUgc3BlY2lmaWVkIGEgeyB1bml0cyB9IHNldHRpbmcgYnV0IG5vIHsgZGltZW5zaW9uIH0sIHNvIHRoZSB1bml0cyB3aWxsIGJlIGlnbm9yZWQuYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0b3RhbEZyYW1lcyA9IGRlZmluZWQodG90YWxGcmFtZXMsIHRvdGFsRnJhbWVzRnJvbUR1cmF0aW9uLCBJbmZpbml0eSk7XG4gICAgZHVyYXRpb24gPSBkZWZpbmVkKGR1cmF0aW9uLCBkdXJhdGlvbkZyb21Ub3RhbEZyYW1lcywgSW5maW5pdHkpO1xuXG4gICAgY29uc3Qgc3RhcnRUaW1lID0gc2V0dGluZ3MudGltZTtcbiAgICBjb25zdCBzdGFydEZyYW1lID0gc2V0dGluZ3MuZnJhbWU7XG4gICAgY29uc3QgaGFzU3RhcnRUaW1lID0gdHlwZW9mIHN0YXJ0VGltZSA9PT0gXCJudW1iZXJcIiAmJiBpc0Zpbml0ZShzdGFydFRpbWUpO1xuICAgIGNvbnN0IGhhc1N0YXJ0RnJhbWUgPVxuICAgICAgdHlwZW9mIHN0YXJ0RnJhbWUgPT09IFwibnVtYmVyXCIgJiYgaXNGaW5pdGUoc3RhcnRGcmFtZSk7XG5cbiAgICAvLyBzdGFydCBhdCB6ZXJvIHVubGVzcyB1c2VyIHNwZWNpZmllcyBmcmFtZSBvciB0aW1lIChidXQgbm90IGJvdGggbWlzbWF0Y2hlZClcbiAgICBsZXQgdGltZSA9IDA7XG4gICAgbGV0IGZyYW1lID0gMDtcbiAgICBsZXQgcGxheWhlYWQgPSAwO1xuICAgIGlmIChoYXNTdGFydFRpbWUgJiYgaGFzU3RhcnRGcmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIllvdSBzaG91bGQgc3BlY2lmeSBlaXRoZXIgc3RhcnQgZnJhbWUgb3IgdGltZSwgYnV0IG5vdCBib3RoLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoaGFzU3RhcnRUaW1lKSB7XG4gICAgICAvLyBVc2VyIHNwZWNpZmllcyB0aW1lLCB3ZSBpbmZlciBmcmFtZXMgZnJvbSBGUFNcbiAgICAgIHRpbWUgPSBzdGFydFRpbWU7XG4gICAgICBwbGF5aGVhZCA9IHRoaXMuX2NvbXB1dGVQbGF5aGVhZCh0aW1lLCBkdXJhdGlvbik7XG4gICAgICBmcmFtZSA9IHRoaXMuX2NvbXB1dGVGcmFtZShwbGF5aGVhZCwgdGltZSwgdG90YWxGcmFtZXMsIGZwcyk7XG4gICAgfSBlbHNlIGlmIChoYXNTdGFydEZyYW1lKSB7XG4gICAgICAvLyBVc2VyIHNwZWNpZmllcyBmcmFtZSBudW1iZXIsIHdlIGluZmVyIHRpbWUgZnJvbSBGUFNcbiAgICAgIGZyYW1lID0gc3RhcnRGcmFtZTtcbiAgICAgIHRpbWUgPSBmcmFtZSAvIGZwcztcbiAgICAgIHBsYXloZWFkID0gdGhpcy5fY29tcHV0ZVBsYXloZWFkKHRpbWUsIGR1cmF0aW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGxheWhlYWQsXG4gICAgICB0aW1lLFxuICAgICAgZnJhbWUsXG4gICAgICBkdXJhdGlvbixcbiAgICAgIHRvdGFsRnJhbWVzLFxuICAgICAgZnBzLFxuICAgICAgdGltZVNjYWxlLFxuICAgIH07XG4gIH1cblxuICBzZXR1cChzZXR0aW5ncyA9IHt9KSB7XG4gICAgaWYgKHRoaXMuc2tldGNoKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVsdGlwbGUgc2V0dXAoKSBjYWxscyBub3QgeWV0IHN1cHBvcnRlZC5cIik7XG5cbiAgICB0aGlzLl9zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIHNldHRpbmdzLCB0aGlzLl9zZXR0aW5ncyk7XG5cbiAgICBjaGVja1NldHRpbmdzKHRoaXMuX3NldHRpbmdzKTtcblxuICAgIC8vIEdldCBpbml0aWFsIGNhbnZhcyAmIGNvbnRleHRcbiAgICBjb25zdCB7IGNvbnRleHQsIGNhbnZhcyB9ID0gY3JlYXRlQ2FudmFzKHRoaXMuX3NldHRpbmdzKTtcblxuICAgIGNvbnN0IHRpbWVQcm9wcyA9IHRoaXMuZ2V0VGltZVByb3BzKHRoaXMuX3NldHRpbmdzKTtcblxuICAgIC8vIEluaXRpYWwgcmVuZGVyIHN0YXRlIGZlYXR1cmVzXG4gICAgdGhpcy5fcHJvcHMgPSB7XG4gICAgICAuLi50aW1lUHJvcHMsXG4gICAgICBjYW52YXMsXG4gICAgICBjb250ZXh0LFxuICAgICAgZGVsdGFUaW1lOiAwLFxuICAgICAgc3RhcnRlZDogZmFsc2UsXG4gICAgICBleHBvcnRpbmc6IGZhbHNlLFxuICAgICAgcGxheWluZzogZmFsc2UsXG4gICAgICByZWNvcmRpbmc6IGZhbHNlLFxuICAgICAgc2V0dGluZ3M6IHRoaXMuc2V0dGluZ3MsXG4gICAgICBkYXRhOiB0aGlzLnNldHRpbmdzLmRhdGEsXG5cbiAgICAgIC8vIEV4cG9ydCBzb21lIHNwZWNpZmljIGFjdGlvbnMgdG8gdGhlIHNrZXRjaFxuICAgICAgcmVuZGVyOiAoKSA9PiB0aGlzLnJlbmRlcigpLFxuICAgICAgdG9nZ2xlUGxheTogKCkgPT4gdGhpcy50b2dnbGVQbGF5KCksXG4gICAgICBkaXNwYXRjaDogKGNiKSA9PiB0aGlzLmRpc3BhdGNoKGNiKSxcbiAgICAgIHRpY2s6ICgpID0+IHRoaXMudGljaygpLFxuICAgICAgcmVzaXplOiAoKSA9PiB0aGlzLnJlc2l6ZSgpLFxuICAgICAgdXBkYXRlOiAob3B0KSA9PiB0aGlzLnVwZGF0ZShvcHQpLFxuICAgICAgZXhwb3J0RnJhbWU6IChvcHQpID0+IHRoaXMuZXhwb3J0RnJhbWUob3B0KSxcbiAgICAgIHJlY29yZDogKCkgPT4gdGhpcy5yZWNvcmQoKSxcbiAgICAgIHBsYXk6ICgpID0+IHRoaXMucGxheSgpLFxuICAgICAgcGF1c2U6ICgpID0+IHRoaXMucGF1c2UoKSxcbiAgICAgIHN0b3A6ICgpID0+IHRoaXMuc3RvcCgpLFxuICAgIH07XG5cbiAgICAvLyBGb3IgV2ViR0wgc2tldGNoZXMsIGEgZ2wgdmFyaWFibGUgcmVhZHMgYSBiaXQgYmV0dGVyXG4gICAgdGhpcy5fc2V0dXBHTEtleSgpO1xuXG4gICAgLy8gVHJpZ2dlciBpbml0aWFsIHJlc2l6ZSBub3cgc28gdGhhdCBjYW52YXMgaXMgYWxyZWFkeSBzaXplZFxuICAgIC8vIGJ5IHRoZSB0aW1lIHdlIGxvYWQgdGhlIHNrZXRjaFxuICAgIHRoaXMucmVzaXplKCk7XG4gIH1cblxuICBsb2FkQW5kUnVuKGNhbnZhc1NrZXRjaCwgbmV3U2V0dGluZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkKGNhbnZhc1NrZXRjaCwgbmV3U2V0dGluZ3MpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5ydW4oKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pO1xuICB9XG5cbiAgdW5sb2FkKCkge1xuICAgIHRoaXMucGF1c2UoKTtcbiAgICBpZiAoIXRoaXMuc2tldGNoKSByZXR1cm47XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNrZXRjaC51bmxvYWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5fd3JhcENvbnRleHRTY2FsZSgocHJvcHMpID0+IHRoaXMuc2tldGNoLnVubG9hZChwcm9wcykpO1xuICAgIH1cbiAgICB0aGlzLl9za2V0Y2ggPSBudWxsO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnVubG9hZCgpO1xuICAgIHRoaXMudW5tb3VudCgpO1xuICB9XG5cbiAgbG9hZChjcmVhdGVTa2V0Y2gsIG5ld1NldHRpbmdzKSB7XG4gICAgLy8gVXNlciBkaWRuJ3Qgc3BlY2lmeSBhIGZ1bmN0aW9uXG4gICAgaWYgKHR5cGVvZiBjcmVhdGVTa2V0Y2ggIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIlRoZSBmdW5jdGlvbiBtdXN0IHRha2UgaW4gYSBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyLiBFeGFtcGxlOlxcbiAgY2FudmFzU2tldGNoZXIoKCkgPT4geyAuLi4gfSwgc2V0dGluZ3MpXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2tldGNoKSB7XG4gICAgICB0aGlzLnVubG9hZCgpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbmV3U2V0dGluZ3MgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMudXBkYXRlKG5ld1NldHRpbmdzKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGlzIGEgYml0IG9mIGEgdHJpY2t5IGNhc2U7IHdlIHNldCB1cCB0aGUgYXV0by1zY2FsaW5nIGhlcmVcbiAgICAvLyBpbiBjYXNlIHRoZSB1c2VyIGRlY2lkZXMgdG8gcmVuZGVyIGFueXRoaW5nIHRvIHRoZSBjb250ZXh0ICpiZWZvcmUqIHRoZVxuICAgIC8vIHJlbmRlcigpIGZ1bmN0aW9uLi4uIEhvd2V2ZXIsIHVzZXJzIHNob3VsZCBpbnN0ZWFkIHVzZSBiZWdpbigpIGZ1bmN0aW9uIGZvciB0aGF0LlxuICAgIHRoaXMuX3ByZVJlbmRlcigpO1xuXG4gICAgbGV0IHByZWxvYWQgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgIC8vIEJlY2F1c2Ugb2YgUDUuanMncyB1bnVzdWFsIHN0cnVjdHVyZSwgd2UgaGF2ZSB0byBkbyBhIGJpdCBvZlxuICAgIC8vIGxpYnJhcnktc3BlY2lmaWMgY2hhbmdlcyB0byBzdXBwb3J0IGl0IHByb3Blcmx5LlxuICAgIGlmICh0aGlzLnNldHRpbmdzLnA1KSB7XG4gICAgICBpZiAoIWlzQnJvd3NlcigpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBcIltjYW52YXMtc2tldGNoXSBFUlJPUjogVXNpbmcgcDUuanMgaW4gTm9kZS5qcyBpcyBub3Qgc3VwcG9ydGVkXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHByZWxvYWQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBsZXQgUDVDb25zdHJ1Y3RvciA9IHRoaXMuc2V0dGluZ3MucDU7XG4gICAgICAgIGxldCBwcmVsb2FkO1xuICAgICAgICBpZiAoUDVDb25zdHJ1Y3Rvci5wNSkge1xuICAgICAgICAgIHByZWxvYWQgPSBQNUNvbnN0cnVjdG9yLnByZWxvYWQ7XG4gICAgICAgICAgUDVDb25zdHJ1Y3RvciA9IFA1Q29uc3RydWN0b3IucDU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgc2tldGNoIHNldHVwOyBkaXNhYmxlIGxvb3AsIHNldCBzaXppbmcsIGV0Yy5cbiAgICAgICAgY29uc3QgcDVTa2V0Y2ggPSAocDUpID0+IHtcbiAgICAgICAgICAvLyBIb29rIGluIHByZWxvYWQgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgaWYgKHByZWxvYWQpIHA1LnByZWxvYWQgPSAoKSA9PiBwcmVsb2FkKHA1KTtcbiAgICAgICAgICBwNS5zZXR1cCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIGNvbnN0IGlzR0wgPSB0aGlzLnNldHRpbmdzLmNvbnRleHQgPT09IFwid2ViZ2xcIjtcbiAgICAgICAgICAgIGNvbnN0IHJlbmRlcmVyID0gaXNHTCA/IHA1LldFQkdMIDogcDUuUDJEO1xuICAgICAgICAgICAgcDUubm9Mb29wKCk7XG4gICAgICAgICAgICBwNS5waXhlbERlbnNpdHkocHJvcHMucGl4ZWxSYXRpbyk7XG4gICAgICAgICAgICBwNS5jcmVhdGVDYW52YXMoXG4gICAgICAgICAgICAgIHByb3BzLnZpZXdwb3J0V2lkdGgsXG4gICAgICAgICAgICAgIHByb3BzLnZpZXdwb3J0SGVpZ2h0LFxuICAgICAgICAgICAgICByZW5kZXJlclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChpc0dMICYmIHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICBwNS5zZXRBdHRyaWJ1dGVzKHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlKHtcbiAgICAgICAgICAgICAgcDUsXG4gICAgICAgICAgICAgIGNhbnZhczogcDUuY2FudmFzLFxuICAgICAgICAgICAgICBjb250ZXh0OiBwNS5fcmVuZGVyZXIuZHJhd2luZ0NvbnRleHQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFN1cHBvcnQgZ2xvYmFsIGFuZCBpbnN0YW5jZSBQNS5qcyBtb2Rlc1xuICAgICAgICBpZiAodHlwZW9mIFA1Q29uc3RydWN0b3IgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIG5ldyBQNUNvbnN0cnVjdG9yKHA1U2tldGNoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5jcmVhdGVDYW52YXMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBcInsgcDUgfSBzZXR0aW5nIGlzIHBhc3NlZCBidXQgY2FuJ3QgZmluZCBwNS5qcyBpbiBnbG9iYWwgKHdpbmRvdykgc2NvcGUuIE1heWJlIHlvdSBkaWQgbm90IGNyZWF0ZSBpdCBnbG9iYWxseT9cXG5uZXcgcDUoKTsgLy8gPC0tIGF0dGFjaGVzIHRvIGdsb2JhbCBzY29wZVwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwNVNrZXRjaCh3aW5kb3cpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJlbG9hZFxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBMb2FkIHRoZSB1c2VyJ3Mgc2tldGNoXG4gICAgICAgIGxldCBsb2FkZXIgPSBjcmVhdGVTa2V0Y2godGhpcy5wcm9wcyk7XG4gICAgICAgIGlmICghaXNQcm9taXNlKGxvYWRlcikpIHtcbiAgICAgICAgICBsb2FkZXIgPSBQcm9taXNlLnJlc29sdmUobG9hZGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9hZGVyO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChza2V0Y2gpID0+IHtcbiAgICAgICAgaWYgKCFza2V0Y2gpIHNrZXRjaCA9IHt9O1xuICAgICAgICB0aGlzLl9za2V0Y2ggPSBza2V0Y2g7XG5cbiAgICAgICAgLy8gT25jZSB0aGUgc2tldGNoIGlzIGxvYWRlZCB3ZSBjYW4gYWRkIHRoZSBldmVudHNcbiAgICAgICAgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICAgICAgdGhpcy5fa2V5Ym9hcmRTaG9ydGN1dHMuYXR0YWNoKCk7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5fcmVzaXplSGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wb3N0UmVuZGVyKCk7XG5cbiAgICAgICAgLy8gVGhlIGluaXRpYWwgcmVzaXplKCkgaW4gdGhlIGNvbnN0cnVjdG9yIHdpbGwgbm90IGhhdmVcbiAgICAgICAgLy8gdHJpZ2dlcmVkIGEgcmVzaXplKCkgZXZlbnQgb24gdGhlIHNrZXRjaCwgc2luY2UgaXQgd2FzIGJlZm9yZVxuICAgICAgICAvLyB0aGUgc2tldGNoIHdhcyBsb2FkZWQuIFNvIHdlIHNlbmQgdGhlIHNpZ25hbCBoZXJlLCBhbGxvd2luZ1xuICAgICAgICAvLyB1c2VycyB0byByZWFjdCB0byB0aGUgaW5pdGlhbCBzaXplIGJlZm9yZSBmaXJzdCByZW5kZXIuXG4gICAgICAgIHRoaXMuX3NpemVDaGFuZ2VkKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBcIkNvdWxkIG5vdCBzdGFydCBza2V0Y2gsIHRoZSBhc3luYyBsb2FkaW5nIGZ1bmN0aW9uIHJlamVjdGVkIHdpdGggYW4gZXJyb3I6XFxuICAgIEVycm9yOiBcIiArXG4gICAgICAgICAgICBlcnIubWVzc2FnZVxuICAgICAgICApO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTa2V0Y2hNYW5hZ2VyO1xuIiwiaW1wb3J0IFNrZXRjaE1hbmFnZXIgZnJvbSAnLi9jb3JlL1NrZXRjaE1hbmFnZXInO1xuaW1wb3J0IFBhcGVyU2l6ZXMgZnJvbSAnLi9wYXBlci1zaXplcyc7XG5pbXBvcnQgeyBnZXRDbGllbnRBUEksIGRlZmluZWQgfSBmcm9tICcuL3V0aWwnO1xuXG5jb25zdCBDQUNIRSA9ICdob3QtaWQtY2FjaGUnO1xuY29uc3QgcnVudGltZUNvbGxpc2lvbnMgPSBbXTtcblxuZnVuY3Rpb24gaXNIb3RSZWxvYWQgKCkge1xuICBjb25zdCBjbGllbnQgPSBnZXRDbGllbnRBUEkoKTtcbiAgcmV0dXJuIGNsaWVudCAmJiBjbGllbnQuaG90O1xufVxuXG5mdW5jdGlvbiBjYWNoZUdldCAoaWQpIHtcbiAgY29uc3QgY2xpZW50ID0gZ2V0Q2xpZW50QVBJKCk7XG4gIGlmICghY2xpZW50KSByZXR1cm4gdW5kZWZpbmVkO1xuICBjbGllbnRbQ0FDSEVdID0gY2xpZW50W0NBQ0hFXSB8fCB7fTtcbiAgcmV0dXJuIGNsaWVudFtDQUNIRV1baWRdO1xufVxuXG5mdW5jdGlvbiBjYWNoZVB1dCAoaWQsIGRhdGEpIHtcbiAgY29uc3QgY2xpZW50ID0gZ2V0Q2xpZW50QVBJKCk7XG4gIGlmICghY2xpZW50KSByZXR1cm4gdW5kZWZpbmVkO1xuICBjbGllbnRbQ0FDSEVdID0gY2xpZW50W0NBQ0hFXSB8fCB7fTtcbiAgY2xpZW50W0NBQ0hFXVtpZF0gPSBkYXRhO1xufVxuXG5mdW5jdGlvbiBnZXRUaW1lUHJvcCAob2xkTWFuYWdlciwgbmV3U2V0dGluZ3MpIHtcbiAgLy8gU3RhdGljIHNrZXRjaGVzIGlnbm9yZSB0aGUgdGltZSBwZXJzaXN0ZW5jeVxuICByZXR1cm4gbmV3U2V0dGluZ3MuYW5pbWF0ZSA/IHsgdGltZTogb2xkTWFuYWdlci5wcm9wcy50aW1lIH0gOiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGNhbnZhc1NrZXRjaCAoc2tldGNoLCBzZXR0aW5ncyA9IHt9KSB7XG4gIGlmIChzZXR0aW5ncy5wNSkge1xuICAgIGlmIChzZXR0aW5ncy5jYW52YXMgfHwgKHNldHRpbmdzLmNvbnRleHQgJiYgdHlwZW9mIHNldHRpbmdzLmNvbnRleHQgIT09ICdzdHJpbmcnKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbiB7IHA1IH0gbW9kZSwgeW91IGNhbid0IHBhc3MgeW91ciBvd24gY2FudmFzIG9yIGNvbnRleHQsIHVubGVzcyB0aGUgY29udGV4dCBpcyBhIFwid2ViZ2xcIiBvciBcIjJkXCIgc3RyaW5nYCk7XG4gICAgfVxuXG4gICAgLy8gRG8gbm90IGNyZWF0ZSBhIGNhbnZhcyBvbiBzdGFydHVwLCBzaW5jZSBQNS5qcyBkb2VzIHRoYXQgZm9yIHVzXG4gICAgY29uc3QgY29udGV4dCA9IHR5cGVvZiBzZXR0aW5ncy5jb250ZXh0ID09PSAnc3RyaW5nJyA/IHNldHRpbmdzLmNvbnRleHQgOiBmYWxzZTtcbiAgICBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIHNldHRpbmdzLCB7IGNhbnZhczogZmFsc2UsIGNvbnRleHQgfSk7XG4gIH1cblxuICBjb25zdCBpc0hvdCA9IGlzSG90UmVsb2FkKCk7XG4gIGxldCBob3RJRDtcbiAgaWYgKGlzSG90KSB7XG4gICAgLy8gVXNlIGEgbWFnaWMgbmFtZSBieSBkZWZhdWx0LCBmb3JjZSB1c2VyIHRvIGRlZmluZSBlYWNoIHNrZXRjaCBpZiB0aGV5XG4gICAgLy8gcmVxdWlyZSBtb3JlIHRoYW4gb25lIGluIGFuIGFwcGxpY2F0aW9uLiBPcGVuIHRvIG90aGVyIGlkZWFzIG9uIGhvdyB0byB0YWNrbGVcbiAgICAvLyB0aGlzIGFzIHdlbGwuLi5cbiAgICBob3RJRCA9IGRlZmluZWQoc2V0dGluZ3MuaWQsICckX19ERUZBVUxUX0NBTlZBU19TS0VUQ0hfSURfXyQnKTtcbiAgfVxuICBsZXQgaXNJbmplY3RpbmcgPSBpc0hvdCAmJiB0eXBlb2YgaG90SUQgPT09ICdzdHJpbmcnO1xuXG4gIGlmIChpc0luamVjdGluZyAmJiBydW50aW1lQ29sbGlzaW9ucy5pbmNsdWRlcyhob3RJRCkpIHtcbiAgICBjb25zb2xlLndhcm4oYFdhcm5pbmc6IFlvdSBoYXZlIG11bHRpcGxlIGNhbGxzIHRvIGNhbnZhc1NrZXRjaCgpIGluIC0taG90IG1vZGUuIFlvdSBtdXN0IHBhc3MgdW5pcXVlIHsgaWQgfSBzdHJpbmdzIGluIHNldHRpbmdzIHRvIGVuYWJsZSBob3QgcmVsb2FkIGFjcm9zcyBtdWx0aXBsZSBza2V0Y2hlcy4gYCwgaG90SUQpO1xuICAgIGlzSW5qZWN0aW5nID0gZmFsc2U7XG4gIH1cblxuICBsZXQgcHJlbG9hZCA9IFByb21pc2UucmVzb2x2ZSgpO1xuXG4gIGlmIChpc0luamVjdGluZykge1xuICAgIC8vIE1hcmsgdGhpcyBhcyBhbHJlYWR5IHNwb3R0ZWQgaW4gdGhpcyBydW50aW1lIGluc3RhbmNlXG4gICAgcnVudGltZUNvbGxpc2lvbnMucHVzaChob3RJRCk7XG5cbiAgICBjb25zdCBwcmV2aW91c0RhdGEgPSBjYWNoZUdldChob3RJRCk7XG4gICAgaWYgKHByZXZpb3VzRGF0YSkge1xuICAgICAgY29uc3QgbmV4dCA9ICgpID0+IHtcbiAgICAgICAgLy8gR3JhYiBuZXcgcHJvcHMgZnJvbSBvbGQgc2tldGNoIGluc3RhbmNlXG4gICAgICAgIGNvbnN0IG5ld1Byb3BzID0gZ2V0VGltZVByb3AocHJldmlvdXNEYXRhLm1hbmFnZXIsIHNldHRpbmdzKTtcbiAgICAgICAgLy8gRGVzdHJveSB0aGUgb2xkIGluc3RhbmNlXG4gICAgICAgIHByZXZpb3VzRGF0YS5tYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgLy8gUGFzcyBhbG9uZyBuZXcgcHJvcHNcbiAgICAgICAgcmV0dXJuIG5ld1Byb3BzO1xuICAgICAgfTtcblxuICAgICAgLy8gTW92ZSBhbG9uZyB0aGUgbmV4dCBkYXRhLi4uXG4gICAgICBwcmVsb2FkID0gcHJldmlvdXNEYXRhLmxvYWQudGhlbihuZXh0KS5jYXRjaChuZXh0KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcHJlbG9hZC50aGVuKG5ld1Byb3BzID0+IHtcbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFNrZXRjaE1hbmFnZXIoKTtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmIChza2V0Y2gpIHtcbiAgICAgIC8vIE1lcmdlIHdpdGggaW5jb21pbmcgZGF0YVxuICAgICAgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBzZXR0aW5ncywgbmV3UHJvcHMpO1xuXG4gICAgICAvLyBBcHBseSBzZXR0aW5ncyBhbmQgY3JlYXRlIGEgY2FudmFzXG4gICAgICBtYW5hZ2VyLnNldHVwKHNldHRpbmdzKTtcblxuICAgICAgLy8gTW91bnQgdG8gRE9NXG4gICAgICBtYW5hZ2VyLm1vdW50KCk7XG5cbiAgICAgIC8vIGxvYWQgdGhlIHNrZXRjaCBmaXJzdFxuICAgICAgcmVzdWx0ID0gbWFuYWdlci5sb2FkQW5kUnVuKHNrZXRjaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IFByb21pc2UucmVzb2x2ZShtYW5hZ2VyKTtcbiAgICB9XG4gICAgaWYgKGlzSW5qZWN0aW5nKSB7XG4gICAgICBjYWNoZVB1dChob3RJRCwgeyBsb2FkOiByZXN1bHQsIG1hbmFnZXIgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pO1xufVxuXG4vLyBUT0RPOiBGaWd1cmUgb3V0IGEgbmljZSB3YXkgdG8gZXhwb3J0IHRoaW5ncy5cbmNhbnZhc1NrZXRjaC5jYW52YXNTa2V0Y2ggPSBjYW52YXNTa2V0Y2g7XG5jYW52YXNTa2V0Y2guUGFwZXJTaXplcyA9IFBhcGVyU2l6ZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNhbnZhc1NrZXRjaDtcbiJdLCJuYW1lcyI6WyJnbG9iYWwiLCJsZXQiLCJhcmd1bWVudHMiLCJpc0RPTSIsImlzQXJndW1lbnRzIiwib2JqZWN0S2V5cyIsImRlZmluZSIsInRoaXMiLCJyZXBlYXQiLCJjb25zdCIsImFzc2lnbiIsImRlZmluZWQiLCJjb252ZXJ0RGlzdGFuY2UiLCJnZXRDYW52YXNDb250ZXh0IiwicmlnaHROb3ciLCJpc1Byb21pc2UiLCJkZWVwRXF1YWwiLCJQYXBlclNpemVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Q0FBQTs7Ozs7O0NBUUEsSUFBSSxxQkFBcUIsR0FBRyxNQUFNLENBQUMscUJBQXFCLENBQUM7Q0FDekQsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7Q0FDckQsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDOztDQUU3RCxTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUU7RUFDdEIsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7R0FDdEMsTUFBTSxJQUFJLFNBQVMsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO0dBQzdFOztFQUVELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ25COztDQUVELFNBQVMsZUFBZSxHQUFHO0VBQzFCLElBQUk7R0FDSCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtJQUNuQixPQUFPLEtBQUssQ0FBQztJQUNiOzs7OztHQUtELElBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFD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QUcsQ0FBQyxDQUFDLENBQUM7V0FDWixDQUFDLEtBQUssQ0FBQztXQUNQLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1dBQ1osQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1dBQ2YsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztXQUM3QixDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7V0FDMUUsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1dBQzFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztXQUMxRSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7V0FDMUUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQztXQUN4RyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxH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QUFnQixJQUFLLEtBQ3ZCLENBQUUsZ0JBQWlCLEtBQU0sTUFHekIsQ0FBRSxLQUFNLEdBQUksSUFDWixDQUFFLEtBQU0sR0FBSTtLQUNaLENBQUUsS0FBTSxJQUFLLEtBQ2IsQ0FBRSxLQUFNLElBQUssS0FDYixDQUFFLEtBQU0sSUFBSyxLQUNiLENBQUUsS0FBTSxJQUFLLEtBQ2IsQ0FBRSxNQUFPLElBQUssS0FDZCxDQUFFO0tBQU8sSUFBSyxLQUNkLENBQUUsTUFBTyxJQUFLLEtBR2QsQ0FBRSxLQUFNLElBQUssTUFDYixDQUFFLEtBQU0sSUFBSyxLQUNiLENBQUUsS0FBTSxJQUFLLEtBQ2IsQ0FBRTtLQUFNLElBQUssS0FDYixDQUFFLEtBQU0sSUFBSyxLQUNiLENBQUUsS0FBTSxJQUFLLEtBQ2IsQ0FBRSxLQUFNLElBQUssS0FDYixDQUFFLEtBQU0sR0FBSSxLQUNaLENBQUUsS0FBTTtLQUFJLElBQ1osQ0FBRSxLQUFNLEdBQUksSUFDWixDQUFFLE1BQU8sR0FBSSxJQUNiLENBQUUsTUFBTyxLQUFNLE1BQ2YsQ0FBRSxNQUFPLEtBQU0sTUFDZixDQUFFLEtBQU07S0FBTSxNQUNkLENBQUUsS0FBTSxJQUFLLE1BQ2IsQ0FBRSxNQUFPLElBQUssTUFDZCxDQUFFLEtBQU0sSUFBSyxLQUNiLENBQUUsTUFBTyxJQUFLLEtBQ2QsQ0FBRSxLQUFNO0tBQUssS0FDYixDQUFFLEtBQU0sSUFBSyxLQUNiLENBQUUsS0FBTSxJQUFLLEtBQ2IsQ0FBRSxLQUFNLElBQUssS0FDYixDQUFFLEtBQU0sR0FBSSxLQUNaLENBQUUsS0FBTSxHQUFJO0tBQ1osQ0FBRSxLQUFNLEdBQUksSUFDWixDQUFFLE1BQU8sR0FBSSxJQUNiLENBQUUsTUFBTyxHQUFJLElBQ2IsQ0FBRSxNQUFPLEdBQUksSUFDYixDQUFFLEtBQU0sSUFBSyxNQUNiLENBQUU7S0FBTSxJQUFLLEtBQ2IsQ0FBRSxLQUFNLElBQUssS0FDYixDQUFFLEtBQU0sSUFBSyxLQUNiLENBQUUsS0FBTSxJQUFLLEtBQ2IsQ0FBRSxLQUFNLElBQUssS0FDYixD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
