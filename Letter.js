
function Letter(letter, isGuessed) {
  this.letter = letter.toUpperCase();
  this.isGuessed = isGuessed;
  this.placeholder = function() {
      if (this.isGuessed){
          console.log(this.letter);
      } else {
          console.log(`_`);
      }

  };
  this.checkLetter = function(guess){
      if (guess.toUpperCase() === this.letter){
          this.isGuessed= true;
      }
      this.placeholder();
  } 
}

var A =  new Letter(`a`, false);
A.checkLetter('B');