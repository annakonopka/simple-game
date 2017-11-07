import {Woman} from "./woman.js";
import {Bag} from "./bag.js";
import {Game} from "./game.js";

var game = new Game();

game.showWoman();
game.showBag();
game.startGame;

document.addEventListener('keydown', function (event) {
    game.turnWoman(event);

});
