/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Tafels = __webpack_require__(1);
	
	var _Tafels2 = _interopRequireDefault(_Tafels);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.Tafels = _Tafels2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Expression = __webpack_require__(2);
	
	var _Expression2 = _interopRequireDefault(_Expression);
	
	var _Timer = __webpack_require__(3);
	
	var _Timer2 = _interopRequireDefault(_Timer);
	
	var _Score = __webpack_require__(4);
	
	var _Score2 = _interopRequireDefault(_Score);
	
	var _Question = __webpack_require__(5);
	
	var _Question2 = _interopRequireDefault(_Question);
	
	var _Log = __webpack_require__(6);
	
	var _Log2 = _interopRequireDefault(_Log);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tafels = function () {
	    function Tafels(elTimer, elCorrect, elFail, elTotal, elQuestion, elInput, elTable, total, nrMin, nrMax) {
	        _classCallCheck(this, Tafels);
	
	        this.total = total;
	        this.score = new _Score2.default(elCorrect, elFail, elTotal, total);
	        this.timer = new _Timer2.default(elTimer);
	        this.question = new _Question2.default(elQuestion, elInput);
	        this.log = new _Log2.default(elTable);
	        this.nrMin = nrMin;
	        this.nrMax = nrMax;
	        this.init();
	    }
	
	    _createClass(Tafels, [{
	        key: 'init',
	        value: function init() {
	            this.count = 0;
	            this.previousEx = null;
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            this.reset();
	            this.timer.start();
	            this.ask();
	        }
	    }, {
	        key: 'exists',
	        value: function exists(num1, num2) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = this.result[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var res = _step.value;
	
	                    if (res.num1 == num1 && res.num2 == num2) {
	                        return true;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            return false;
	        }
	    }, {
	        key: 'res',
	        value: function res(ex, _res) {
	            this.previousEx = ex;
	
	            this.count++;
	
	            ex.isCorrect(_res) ? this.score.addCorrect() : this.score.addIncorrect();
	
	            this.log.add(ex, _res);
	
	            if (this.count == this.total) {
	                return this.finish();
	            }
	
	            this.ask();
	        }
	    }, {
	        key: 'ask',
	        value: function ask() {
	            if (this.count == this.total) {
	                return;
	            }
	
	            var ex = void 0;
	            do {
	                ex = new _Expression2.default(this.nrMin, this.nrMax);
	            } while (this.previousEx && this.previousEx.equals(ex));
	            this.question.ask(ex, this.res.bind(this, ex));
	        }
	    }, {
	        key: 'finish',
	        value: function finish() {
	            $('.finish').removeClass('hidden');
	            this.question.hide();
	            this.timer.stop();
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            $('.finish').addClass('hidden');
	            this.score.init();
	            this.timer.init();
	            this.question.init();
	            this.question.show();
	            this.log.init();
	            this.count = 0;
	        }
	    }]);
	
	    return Tafels;
	}();
	
	exports.default = Tafels;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Expression = function () {
	    function Expression(minNum, maxNum) {
	        _classCallCheck(this, Expression);
	
	        this.minNum = minNum;
	        this.maxNum = maxNum;
	        this.init();
	    }
	
	    _createClass(Expression, [{
	        key: "init",
	        value: function init() {
	            do {
	                this.num1 = Math.round(Math.random() * this.maxNum);
	                this.num2 = Math.round(Math.random() * 10);
	            } while (this.num1 < this.minNum);
	            this.res = this.num1 * this.num2;
	        }
	    }, {
	        key: "toString",
	        value: function toString() {
	            return this.num1 + " * " + this.num2;
	        }
	    }, {
	        key: "isCorrect",
	        value: function isCorrect(val) {
	            return val == this.res;
	        }
	    }, {
	        key: "equals",
	        value: function equals(ex) {
	            return this.num1 == ex.num1 && this.num2 == ex.num2;
	        }
	    }]);
	
	    return Expression;
	}();
	
	exports.default = Expression;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Timer = function () {
	    function Timer(element) {
	        _classCallCheck(this, Timer);
	
	        this.element = element;
	        this.init();
	    }
	
	    _createClass(Timer, [{
	        key: 'init',
	        value: function init() {
	            this.seconds = 0;
	            this.stop();
	            this.output();
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            this.timerInterval = window.setInterval(function () {
	                this.output();
	                this.seconds++;
	            }.bind(this), 1000);
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            if (this.timerInterval) {
	                clearInterval(this.timerInterval);
	            }
	            this.timerInterval = null;
	        }
	    }, {
	        key: 'output',
	        value: function output() {
	            this.element.text(this.format());
	        }
	    }, {
	        key: 'format',
	        value: function format() {
	            var minutes = Math.floor(this.seconds / 60);
	            var seconds = Math.floor(this.seconds - minutes * 60);
	            return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	        }
	    }]);
	
	    return Timer;
	}();
	
	exports.default = Timer;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Score = function () {
	    function Score(elementCorrect, elementIncorrect, elementTotal, nrTotal) {
	        _classCallCheck(this, Score);
	
	        this.elementCorrect = elementCorrect;
	        this.elementIncorrect = elementIncorrect;
	        this.elementTotal = elementTotal;
	        this.nrTotal = nrTotal;
	        this.init();
	    }
	
	    _createClass(Score, [{
	        key: "init",
	        value: function init() {
	            this.correct = 0;
	            this.incorrect = 0;
	            this.show();
	        }
	    }, {
	        key: "getCorrect",
	        value: function getCorrect() {
	            return this.correct;
	        }
	    }, {
	        key: "getIncorrect",
	        value: function getIncorrect() {
	            return this.incorrect;
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            this.elementCorrect.text(this.correct);
	            this.elementIncorrect.text(this.incorrect);
	            this.elementTotal.text(this.correct + this.incorrect + " van " + this.nrTotal);
	        }
	    }, {
	        key: "addCorrect",
	        value: function addCorrect() {
	            this.correct++;
	            this.show();
	        }
	    }, {
	        key: "addIncorrect",
	        value: function addIncorrect() {
	            this.incorrect++;
	            this.show();
	        }
	    }]);
	
	    return Score;
	}();
	
	exports.default = Score;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Question = function () {
	    function Question(elQuestion, elInput) {
	        _classCallCheck(this, Question);
	
	        this.elQuestion = elQuestion;
	        this.elInput = elInput;
	        this.init();
	    }
	
	    _createClass(Question, [{
	        key: 'init',
	        value: function init() {
	            this.elQuestion.text('');
	            this.elInput.val('');
	            this.elInput.off('keyup');
	            this.elInput.removeClass('correct fail');
	        }
	    }, {
	        key: 'ask',
	        value: function ask(exp, callback) {
	            this.elQuestion.text(exp.toString());
	            this.elInput.focus();
	            this.elInput.on('keyup', this.onKeyup.bind(this, exp, callback));
	        }
	    }, {
	        key: 'onKeyup',
	        value: function onKeyup(exp, callback, e) {
	            var element = $(e.target);
	            var val = parseInt(element.val());
	            if (e.which == 13) {
	                element.val('');
	                if (isNaN(val)) {
	                    return;
	                }
	                element.addClass(exp.isCorrect(val) ? 'correct' : 'fail');
	                setTimeout(function () {
	                    element.removeClass('correct fail');
	                }, 3000);
	                element.off('keyup');
	                return callback(val);
	            }
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.elQuestion.closest('div.row').addClass('hidden');
	            this.elInput.closest('div.row').addClass('hidden');
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            this.elQuestion.closest('div.row').removeClass('hidden');
	            this.elInput.closest('div.row').removeClass('hidden');
	        }
	    }]);
	
	    return Question;
	}();
	
	exports.default = Question;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Log = function () {
	    function Log(elTable) {
	        _classCallCheck(this, Log);
	
	        this.elTable = elTable;
	        this.init();
	    }
	
	    _createClass(Log, [{
	        key: 'init',
	        value: function init() {
	            this.elTable.empty().append('<tbody></tbody>');
	        }
	    }, {
	        key: 'add',
	        value: function add(ex, answer) {
	            var res = ex.isCorrect(answer);
	            this.elTable.prepend('<tr class="' + (res ? 'success' : 'danger') + '">\n                    <td class="text-right" style="width: 50%">' + ex.toString() + '</td>\n                    <td class="text-center">' + (res ? '=' : '&ne;') + '</td>\n                    <td class="text-left" style="width: 50%">' + answer + '</td>\n                </tr>');
	        }
	    }]);
	
	    return Log;
	}();
	
	exports.default = Log;

/***/ }
/******/ ]);
//# sourceMappingURL=MainTafels.js.map