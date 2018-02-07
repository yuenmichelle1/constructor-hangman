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
  if (game.numberOfguesses > 0 && currentWordObj.displayWord().includes(`_`)) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Pick a letter",
          name: "userGuess"
        }
      ])
      .then(function(inquirerResponse) {
        var userGuess= inquirerResponse.userGuess;
        console.log(`you guessed ${userGuess}`);
        if (
          userGuess.length === 1 &&
          alphabet.includes(userGuess.toUpperCase())
        ) {
          currentWordObj.checkGuess(userGuess);
        } else {
          console.log(
            `${userGuess} is not a valid input. Please guess a letter`
          );
        }
        InquireLetter(currentWordObj);
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
        InquireLetter(currentWordObj);
      } else {
        console.log(`Let me know when you're ready to play..`);
        AskThenStart(currentWordObj);
      }
    });
}


game.startGame();
