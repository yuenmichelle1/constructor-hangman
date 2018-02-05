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
    return dashedWord;
  };
//   this.checkGuess = function(guess) {
//     for (var i = 0; i < this.CreateletterObj().length; i++) {
//       this.CreateletterObj()[i].letter.checkLetter(guess);
//     }
//   };

}

var foo = new Word("FOO");

console.log(foo.displayWord());

