var Word = require("./Word.js");
var inquirer = require("inquirer");

var game = {
  wordBank: [
    `Thor`,
    `Spiderman`,
    `Batman`,
    `Superman`,
    `Flash`,
    `Wonderwoman`,
    `Aquaman`,
    `Daredevil`,
    `Hulk`,
    `Thing`,
    `Wolverine`,
    `Supergirl`,
    `Cyborg`
  ],
  wins: 0,
  losses: 0,
  numberOfguesses: 8,
  wrongGuesses: []
};

var currentWordObj = new Word(
  game.wordBank[Math.floor(Math.random() * game.wordBank.length)]
);
currentWordObj.displayWord();

