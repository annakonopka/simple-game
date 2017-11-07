/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _woman = __webpack_require__(3);

var _bag = __webpack_require__(1);

var _game = __webpack_require__(2);

var game = new _game.Game();

game.showWoman();
game.showBag();
game.startGame;

document.addEventListener('keydown', function (event) {
    game.turnWoman(event);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Bag = Bag;
function Bag() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Game = Game;

var _woman = __webpack_require__(3);

var _bag = __webpack_require__(1);

function Game() {
    this.board = document.getElementById('board').querySelectorAll('div');
    this.woman = new _woman.Woman();
    this.bag = new _bag.Bag();
    this.score = 0;
    this.index = function (x, y) {
        return x + y * 10;
    };

    this.showWoman = function () {
        this.hideVisibleWoman();
        if (this.board[this.index(this.woman.x, this.woman.y)] != undefined) {
            this.board[this.index(this.woman.x, this.woman.y)].classList.add('woman');
        }
    };

    this.showBag = function () {
        this.board[this.index(this.bag.x, this.bag.y)].classList.add('bag');
    };

    this.moveWoman = function () {
        if (this.woman.direction === 'right') {
            this.woman.x = this.woman.x + 1;
        } else if (this.woman.direction === 'left') {
            this.woman.x = this.woman.x - 1;
        } else if (this.woman.direction === 'up') {
            this.woman.y = this.woman.y - 1;
        } else if (this.woman.direction === 'down') {
            this.woman.y = this.woman.y + 1;
        }

        this.showWoman();
        this.gameOver();
        this.checkBagCollision();
    };
    var self = this;
    this.startGame = setInterval(function () {
        this.idSetInterval = self.moveWoman();
    }, 250);
    this.hideVisibleWoman = function () {
        if (document.querySelector('.woman') != null) {
            document.querySelector('.woman').classList.remove('woman');
        }
    };

    this.turnWoman = function (event) {
        switch (event.which) {
            case 37:
                this.woman.direction = 'left';
                break;
            case 38:
                this.woman.direction = 'up';
                break;
            case 39:
                this.woman.direction = 'right';
                break;
            case 40:
                this.woman.direction = 'down';
                break;
        }
    };

    var score = document.getElementById('introduction').querySelector('.score');

    this.checkBagCollision = function () {
        if (this.bag.x == this.woman.x && this.woman.y == this.bag.y) {
            console.log("position's conflict");
            this.board[this.index(this.bag.x, this.bag.y)].classList.remove('bag');
            this.score += 1;
            console.log(this.score);
            score.innerText = this.score;
            console.log(score);
            this.bag = new _bag.Bag();
            this.showBag();
        }
    };

    this.gameOver = function () {
        if (this.woman.x < 0 || this.woman.x > 9) {
            this.hideVisibleWoman();
            clearInterval(this.startGame);
            this.gameOverScreen();
        } else if (this.woman.y < 0 || this.woman.y > 9) {
            this.hideVisibleWoman();
            clearInterval(this.startGame);
            this.gameOverScreen();
        }
    };

    var body = document.querySelector("body");

    this.gameOverScreen = function () {
        body.classList.add('go');
        body.innerHTML = '<section id="score-table"><div id="introduction"><h3>Kupionych torebek: <span class="score">' + this.score + '</span>.</h3><h3>Następnym razem wyrwiesz więcej!</h3></div></section><div class="bground"><div class="circle"><h1>G<span>A</span>ME OVER</h1></div></div>';
    };
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Woman = Woman;
function Woman() {
    this.x = 0;
    this.y = 0;
    this.direction = 'right';
}

/***/ })
/******/ ]);