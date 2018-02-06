var Word = require("./Word.js");
var inquirer = require("inquirer");
var alphabet = [`A`,`B`,`C`, `D`,`E`,`F`,`G`, `H`,`I`,`J`,`K`,`L`,`M`,`N`,`O`,`P`,`Q`,`R`, `S`,`T`,`U`, `V`, `W`,`X`,`Y`,`Z`];


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
  wrongGuesses: [],
  startGame: function() {
    //ask user to start the game, then start if yes
    this.currentWordObj = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
    AskThenStart(this.currentWordObj);
  }
};

function InquireLetter(currentWordObj) {
  if (game.numberOfguesses > 0) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Pick a letter",
          name: "userGuess"
        }
      ])
      .then(function(inquirerResponse) {
        console.log(`you guessed ${inquirerResponse.userGuess}`);
        if (
          inquirerResponse.userGuess.length === 1 &&
          alphabet.includes(inquirerResponse.userGuess.toUpperCase())
        ) {
          currentWordObj.checkGuess(inquirerResponse.userGuess);
        } else {
          console.log(
            `${
              inquirerResponse.userGuess
            } is not a valid input. Please guess a letter`
          );
          InquireLetter();
        }
      });
  }
}

function AskThenStart(currentWordObj) {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Do you want to start a game of Hangman (Superhero Edition)?",
        name: "Gamestart"
      }
    ])
    .then(function(inquirerResponse) {
      if (inquirerResponse.Gamestart) {
        currentWordObj.displayWord();
        InquireLetter(currentWordObj);
      } else {
        console.log(`Let me know when you're ready to play..`);
        AskThenStart(currentWordObj);
      }
    });
}

// function keepGuessing() {
//   while (currentWordObj.displayWord().includes(`-`) || numberOfguesses === 0) {
//     InquireLetter();
//   }
// }

// keepGuessing();
// var currentWordObj = new Word(game.wordBank[Math.floor(Math.random() * game.wordBank.length)]);

game.startGame();
