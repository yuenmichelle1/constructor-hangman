var Letter = require("./Letter.js");

// var A = new Letter(`a`, false);
// A.checkLetter("B");

function Word(word) {
  this.CreateletterObj = function() {
    var wordArray = word.split("");
    var letterObjArr = [];
    for (var i = 0; i < wordArray.length; i++) {
      letterObjArr.push(new Letter(`${wordArray[i]}`, false));
    }
    return letterObjArr;
  };
  this.displayWord = function() {
    var dashedWord = "";
    for (var i = 0; i < this.CreateletterObj().length; i++) {
      dashedWord += this.CreateletterObj()[i].placeholder();
    }
    console.log(dashedWord);
  };
  this.checkGuess = function(guess) {
    for (var i = 0; i < this.CreateletterObj().length; i++) {
      this.CreateletterObj()[i].checkLetter(guess);
      console.log(this.CreateletterObj()[i].isGuessed);
    }
    this.displayWord();
  };
}

var foo = new Word("foo");

foo.displayWord();
foo.checkGuess("F");
