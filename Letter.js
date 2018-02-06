function Letter(letter, isGuessed) {
  this.letter = letter.toUpperCase();
  this.isGuessed = isGuessed;
  this.placeholder = function() {
    if (this.isGuessed) {
      return this.letter;
    } else {
      return `_`;
    }
  };
  this.checkLetter = function(guess) {
    if (guess.toUpperCase() === this.letter) {
      this.isGuessed = true;
    }
  };
}

module.exports = Letter;
