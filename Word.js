var Letter = require("./Letter.js");

function Word(word) {
  this.createLetterObjArr = function() {
    //split word into array of letters
    var wordArray = word.split("");
    //create new array of new letter objects
    var letterObjArr = wordArray.map(letter => new Letter(letter, false));
    //if the word is >1 word phrase, find the index of the letter object of the " " and change its boolean to True so game will not check for the " "
    letterObjArr.forEach(letterObj => spacesLogic(letterObj));
    return letterObjArr;
  };
  this.letterObjArray = this.createLetterObjArr();
  this.displayWord = function() {
    var dashedWord = this.letterObjArray.map(letterObj => letterObj.placeholder()).join(" ");
    console.log(dashedWord);
    return dashedWord;
  };
  this.checkGuess = function(guess) {
    this.letterObjArray.forEach(letterObj => letterObj.checkLetter(guess));
  };
}

//if the object Letter's letter value is a space then change isGuessed to True
function spacesLogic(obj) {
  if (obj.letter === " "){
    obj.isGuessed= true;
  }
} 


module.exports = Word;
