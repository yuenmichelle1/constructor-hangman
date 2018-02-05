var Letter = require("./Letter.js");

function Word(word) {
  this.CreateletterObjArr = function() {
    var wordArray = word.split("");
    var letterObjArr = wordArray.map((letter) => new Letter (letter, false));
    return letterObjArr;
  };
  this.letterObjArray = this.CreateletterObjArr();
  this.displayWord = function() {
    var dashedWord = "";
    for (var i = 0; i < this.letterObjArray.length; i++) {
      dashedWord += this.letterObjArray[i].placeholder();
    }
    console.log(dashedWord);
    return dashedWord;
  };
  this.checkGuess = function(guess) {
    for (var i = 0; i < this.letterObjArray.length; i++) {
      this.letterObjArray[i].checkLetter(guess);
    }
    this.displayWord();
  };
}

var foo = new Word("Monkey");
// foo.displayWord();
// foo.checkGuess("u");
console.log(foo.CreateletterObjArr());

module.exports = Word;
