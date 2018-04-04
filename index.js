var Word = require("./Word.js");
var inquirer = require("inquirer");
var grabwordBank = require("./wordBank");
var alphabet = grabwordBank.alphabet;
var userGuess;
var currentWordObj;
//add an empty array letters used later
var game = {
  wordBank: grabwordBank.wordBank,
  wins: 0,
  losses: 0,
  numberOfguesses: 8,
  wrongGuesses: [],
  usedLetters: [],
  dashesOrletters: "",
  startGame: function() {
    //ask user to start the game, then start if yes
    this.resetSettings();
    this.askThenStart(this.currentWordObj);
  },
  resetSettings: function() {
    this.numberOfguesses = 8;
    this.wrongGuesses = [];
    this.usedLetters = [];
    this.dashesOrletters = "";
    currentWordObj = null;
    this.createNewWordObj();
  },
  createNewWordObj: function() {
    currentWordObj = new Word(
      this.wordBank[Math.floor(Math.random() * this.wordBank.length)]
    );
  },
  inquireLetter: function() {
    game.dashesOrletters = currentWordObj.displayWord();
    var wordLetterObjArr = currentWordObj.letterObjArray;
    var arrayOfWordLetters = wordLetterObjArr.map(Letter => Letter.letter);
    if (game.numberOfguesses > 0 && game.dashesOrletters.includes(`_`)) {
      inquirer
        .prompt([
          {
            type: "input",
            message: "Pick a letter",
            name: "userGuess"
          }
        ])
        .then(function(inquirerResponse) {
          userGuess = inquirerResponse.userGuess;
          console.log(`You guessed ${userGuess}`);
          game.checkIfLetter(userGuess);
          game.inquireLetter();
        });
    } else if (game.numberOfguesses === 0) {
      this.displayWhenLoss();
    } else if (
      wordLetterObjArr.every(checkEverythingCorrect) === true &&
      game.numberOfguesses > 0
    ) {
      this.displayWhenWin();
    }
  },
  displayWhenWin: function() {
    game.wins++;
    console.log(`You win!`);
    this.replay();
  },
  displayWhenLoss: function() {
    console.log(`Sorry, you lost that game`);
    game.losses++;
    this.replay();
  },
  replay: function() {
    arrayOfWordLetters = this.defineCheckVars();
    console.log(
      `Correct Answer is ${arrayOfWordLetters.join("")}, \n Losses: ${
        game.losses
      } \n Wins: ${game.wins}`
    );
    this.resetSettings();
    game.inquireLetter();
  },
  defineCheckVars: function() {
    var wordLetterObjArr = currentWordObj.letterObjArray;
    var arrayOfWordLetters = wordLetterObjArr.map(Letter => Letter.letter);
    return arrayOfWordLetters;
  },
  checkIfLetter: function(guess) {
    if (
      guess.length === 1 &&
      alphabet.includes(guess.toUpperCase()) &&
      game.usedLetters.includes(guess.toUpperCase()) === false
    ) {
      currentWordObj.checkGuess(guess);
      game.usedLetters.push(guess.toUpperCase());
      this.pushWrongGuess();
    } else if (game.usedLetters.includes(guess.toUpperCase())) {
      console.log(`You have already guessed ${guess}. Pick a different letter`);
    } else {
      console.log(`${guess} is not a valid input. Please guess a letter`);
    }
  },
  pushWrongGuess: function() {
    arrayOfWordLetters = this.defineCheckVars();
    if (arrayOfWordLetters.indexOf(userGuess.toUpperCase()) === -1) {
      game.wrongGuesses.push(userGuess.toUpperCase());
      game.numberOfguesses--;
      console.log(
        `Wrong! You have ${game.numberOfguesses} incorrect attempts remaining`
      );
    }
  },
  askThenStart: function() {
    inquirer
      .prompt([
        {
          type: "confirm",
          message:
            "Do you want to start a game of Hangman (Superhero Edition)?",
          name: "Gamestart"
        }
      ])
      .then(function(inquirerResponse) {
        if (inquirerResponse.Gamestart) {
          game.inquireLetter();
        } else {
          console.log(`Let me know when you're ready to play..`);
          game.askThenStart();
        }
      });
  }
};

function checkEverythingCorrect(Letter) {
  return Letter.isGuessed === true;
}

game.startGame();
