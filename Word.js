var Letter = require("./Letter.js");

function Word(word) {
  this.CreateletterObjArr = function() {
    var wordArray = word.split("");
    var letterObjArr = wordArray.map(letter => new Letter(letter, false));
    return letterObjArr;
  };
  this.letterObjArray = this.CreateletterObjArr();
  this.displayWord = function() {
    var dashedWord = this.letterObjArray.map(letterObj => letterObj.placeholder()).join(" ");
    console.log(dashedWord);
    return dashedWord;
  };
  this.checkGuess = function(guess) {
    this.letterObjArray.forEach(letterObj => letterObj.checkLetter(guess));
    this.displayWord();
  };
}

// var foo = new Word("Monkey");
// // foo.displayWord();
// foo.checkGuess("m");
// console.log(foo.CreateletterObjArr());

module.exports = Word;
