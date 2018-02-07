

var Word = require("./Word.js");
var inquirer = require("inquirer");
var alphabet = [`A`,`B`,`C`, `D`,`E`,`F`,`G`, `H`,`I`,`J`,`K`,`L`,`M`,`N`,`O`,`P`,`Q`,`R`, `S`,`T`,`U`, `V`, `W`,`X`,`Y`,`Z`];
var userGuess;
var currentWordObj = null;
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
    AskThenStart(this.currentWordObj);
  },
  resetSettings: function(){
    this.numberOfguesses = 8;
    this.wrongGuesses =[];
    this.dashesOrletters = "";
    currentWordObj = null;
    this.createNewWordObj();
  },
  createNewWordObj: function(){
    currentWordObj= new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
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
        userGuess= inquirerResponse.userGuess;
        console.log(`You guessed ${userGuess}`);
        if (
          userGuess.length === 1 &&
          alphabet.includes(userGuess.toUpperCase())
        ) {
          currentWordObj.checkGuess(userGuess);
          pushWrongGuess();
        } else {
          console.log(
            `${userGuess} is not a valid input. Please guess a letter`
          );
        }
        InquireLetter();
      });
  } else if (game.numberOfguesses === 0){
    displayWhenLoss();
  } else if (wordLetterObjArr.every(checkEverythingCorrect) === true && game.numberOfguesses>0) {
    displayWhenWin();
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

// function createArraysforWordChecks (){
// var wordLetterObjArr = currentWordObj.letterObjArray;
// var arrayOfWordLetters = wordLetterObjArr.map(Letter => Letter.letter); 
// }

function pushWrongGuess () {
  var wordLetterObjArr = currentWordObj.letterObjArray;
  var arrayOfWordLetters = wordLetterObjArr.map(Letter => Letter.letter); 
  if (arrayOfWordLetters.indexOf(userGuess.toUpperCase()) === -1){
    game.wrongGuesses.push(userGuess.toUpperCase());
    game.numberOfguesses--;
    console.log(`Wrong! You have ${game.numberOfguesses} remaining`);
  } 
}

//displayCorrectAnswer when loss
function displayWhenLoss () {
  game.losses++;
  replay();
}

function checkEverythingCorrect (Letter){
  return (Letter.isGuessed === true);
}

function displayWhenWin () {
  game.wins++;
  console.log(`You win!`);
  replay();
}

function replay (){
  var wordLetterObjArr = currentWordObj.letterObjArray;
  var arrayOfWordLetters = wordLetterObjArr.map(Letter => Letter.letter); 
  console.log(`Correct Answer is ${arrayOfWordLetters.join('')}, \n Losses: ${game.losses} \n Wins: ${game.wins}`);
  setTimeout(() => {
    game.resetSettings();
    InquireLetter();
  }, 2000);

}


game.startGame();
