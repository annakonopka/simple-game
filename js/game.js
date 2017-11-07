import {Woman} from "./woman.js";
import {Bag} from "./bag.js";

export function Game() {
    this.board = document.getElementById('board').querySelectorAll('div');
    this.woman = new Woman();
    this.bag = new Bag();
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
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
        } else if (this.woman.direction === 'down'){
            this.woman.y = this.woman.y + 1;
        }

        this.showWoman();
        this.gameOver();
        this.checkBagCollision();

    }
    var self = this;
    this.startGame = setInterval(function () {
        this.idSetInterval = self.moveWoman();
    }, 250);
    this.hideVisibleWoman = function () {
        if (document.querySelector('.woman') != null) {
            document.querySelector('.woman').classList.remove('woman');
        }
    }

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
    }

    var score = document.getElementById('introduction').querySelector('.score');

    this.checkBagCollision = function() {
        if (this.bag.x == this.woman.x && this.woman.y == this.bag.y) {
            console.log("position's conflict");
            this.board[this.index(this.bag.x, this.bag.y)].classList.remove('bag');
            this.score += 1;
            console.log(this.score);
            score.innerText = this.score;
            console.log(score);
            this.bag = new Bag;
            this.showBag();
        }
    }

    this.gameOver = function() {
        if ((this.woman.x < 0) || (this.woman.x > 9)) {
            this.hideVisibleWoman();
            clearInterval(this.startGame);
            this.gameOverScreen();
        } else if (this.woman.y < 0 || this.woman.y > 9) {
            this.hideVisibleWoman();
            clearInterval(this.startGame);
            this.gameOverScreen();
        }
    }

    var body = document.querySelector("body");

    this.gameOverScreen = function() {
       body.classList.add('go');
       body.innerHTML = '<section id="score-table"><div id="introduction"><h3>Kupionych torebek: <span class="score">' + this.score + '</span>.</h3><h3>Następnym razem wyrwiesz więcej!</h3></div></section><div class="bground"><div class="circle"><h1>G<span>A</span>ME OVER</h1></div></div>'
    }
}
