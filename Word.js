var Letter = require("./Letter.js");

var A = new Letter(`a`, false);
A.checkLetter("b");
console.log(A.placeholder());

function Word(word) {
  this.CreateletterObjArr = function() {
    var wordArray = word.split("");
    var letterObjArr = [];
    for (var i = 0; i < wordArray.length; i++) {
      letterObjArr.push(new Letter(`${wordArray[i]}`, false));
    }
    return letterObjArr;
  };
  this.letterObjArray = this.CreateletterObjArr();
  this.displayWord = function() {
    var dashedWord = "";
    for (var i = 0; i < this.letterObjArray.length; i++) {
      dashedWord += this.letterObjArray[i].placeholder();
    }
    console.log(dashedWord);
  };
  this.checkGuess = function(guess) {
    for (var i = 0; i < this.letterObjArray.length; i++) {
      this.letterObjArray[i].checkLetter(guess);
    }
    this.displayWord();
  };
}

var foo = new Word("Funny");
console.log(foo.CreateletterObjArr());
foo.displayWord();
foo.checkGuess("N");

module.exports = Word;
