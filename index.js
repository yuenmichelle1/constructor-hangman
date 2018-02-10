var Word = require("./Word.js");
var inquirer = require("inquirer");
var grabwordBank = require("./wordBank");
var alphabet = grabwordBank.alphabet;
var userGuess;
var currentWordObj = null;
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
    AskThenStart(this.currentWordObj);
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
  }
};

function InquireLetter() {
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
        checkIfLetter(userGuess);
        InquireLetter();
      });
  } else if (game.numberOfguesses === 0) {
    displayWhenLoss();
  } else if (
    wordLetterObjArr.every(checkEverythingCorrect) === true &&
    game.numberOfguesses > 0
  ) {
    displayWhenWin();
  }
}

function checkIfLetter(guess) {
  if (guess.length === 1 && alphabet.includes(guess.toUpperCase()) && game.usedLetters.includes(guess.toUpperCase()) === false) {
    currentWordObj.checkGuess(guess);
    game.usedLetters.push(guess.toUpperCase());
    pushWrongGuess();
  } else if (game.usedLetters.includes(guess.toUpperCase())) {
    console.log(`You have already guessed ${guess}. Pick a different letter`);
  } else {
    console.log(`${guess} is not a valid input. Please guess a letter`);
  }
}

function AskThenStart() {
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
        InquireLetter();
      } else {
        console.log(`Let me know when you're ready to play..`);
        AskThenStart();
      }
    });
}

function defineCheckVars() {
  var wordLetterObjArr = currentWordObj.letterObjArray;
  var arrayOfWordLetters = wordLetterObjArr.map(Letter => Letter.letter);
  return arrayOfWordLetters;
}

function pushWrongGuess() {
  arrayOfWordLetters = defineCheckVars();
  if (arrayOfWordLetters.indexOf(userGuess.toUpperCase()) === -1) {
    game.wrongGuesses.push(userGuess.toUpperCase());
    game.numberOfguesses--;
    console.log(
      `Wrong! You have ${game.numberOfguesses} incorrect attempts remaining`
    );
  }
}

//displayCorrectAnswer when loss
function displayWhenLoss() {
  console.log(`Sorry, you lost that game`);
  game.losses++;
  replay();
}

function checkEverythingCorrect(Letter) {
  return Letter.isGuessed === true;
}

function displayWhenWin() {
  game.wins++;
  console.log(`You win!`);
  replay();
}

function replay() {
  arrayOfWordLetters = defineCheckVars();
  console.log(
    `Correct Answer is ${arrayOfWordLetters.join("")}, \n Losses: ${
      game.losses
    } \n Wins: ${game.wins}`
  );
  game.resetSettings();
  InquireLetter();
}

game.startGame();
