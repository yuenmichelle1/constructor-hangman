var Word = require("./Word.js");
var inquirer = require("inquirer");
var alphabet = [
  `A`,
  `B`,
  `C`,
  `D`,
  `E`,
  `F`,
  `G`,
  `H`,
  `I`,
  `J`,
  `K`,
  `L`,
  `M`,
  `N`,
  `O`,
  `P`,
  `Q`,
  `R`,
  `S`,
  `T`,
  `U`,
  `V`,
  `W`,
  `X`,
  `Y`,
  `Z`
];

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

function InquireLetter() {
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
      // //check if userGuess is a letter (i.e. not a symbol and not more than length 1)
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

// function keepGuessing() {
//   while (currentWordObj.displayWord().includes(`-`) || numberOfguesses === 0) {
//     InquireLetter();
//   }
// }

// keepGuessing();
InquireLetter();