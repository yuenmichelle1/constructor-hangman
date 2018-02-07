var Word = require("./Word.js");
var inquirer = require("inquirer");
var alphabet = [`A`,`B`,`C`, `D`,`E`,`F`,`G`, `H`,`I`,`J`,`K`,`L`,`M`,`N`,`O`,`P`,`Q`,`R`, `S`,`T`,`U`, `V`, `W`,`X`,`Y`,`Z`];
var userGuess;
//add an empty array letters used later
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
  dashesOrletters: "",
  startGame: function() {
    //ask user to start the game, then start if yes
    this.resetSettings();
    this.currentWordObj = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
    AskThenStart(this.currentWordObj);
  },
  resetSettings: function(){
    this.numberOfguesses = 8;
    this.wrongGuesses =[];
    this.dashesOrletters = "";
  }
};

function InquireLetter(currentWordObj) {
  game.dashesOrletters = currentWordObj.displayWord();
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
        userGuess= inquirerResponse.userGuess;
        console.log(`Correct! you guessed ${userGuess}`);
        if (
          userGuess.length === 1 &&
          alphabet.includes(userGuess.toUpperCase())
        ) {
          currentWordObj.checkGuess(userGuess);
          pushWrongGuess(currentWordObj);
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

function pushWrongGuess (currentWordObj) {
  //if user guesses Wrong (i.e. isGuessed for every Letter Obj in array is false), then push userGuess
  var wordLetterObjArr = currentWordObj.letterObjArray;
  var arrayOfWordLetters = wordLetterObjArr.map(Letter => Letter.letter);
  
  if (arrayOfWordLetters.indexOf(userGuess.toUpperCase()) === -1){
    game.wrongGuesses.push(userGuess.toUpperCase());
    game.numberOfguesses--;
    console.log(`Wrong! You have ${game.numberOfguesses} remaining`);
  }
  
}



game.startGame();
