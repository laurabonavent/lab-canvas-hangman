class Hangman {
  constructor(words) {
    this.words = words;
    // ... your code goes here
    this.secretWord = this.pickWord();
    this.letters = []; // all unique letters tried
    this.guessedLetters = ''; // the already found letters
    this.errorsLeft = 8;
  }
  pickWord() {
    // ... your code goes here
    const rand = Math.floor(Math.random()*this.words.length);
    return this.words[rand];
  }
  checkIfLetter(key) {
    // ... your code goes here
    const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    if (alphabet.includes(key)) {
      return true;
    } else {
      return alert ('NOT A LETTER!');
    }
  }
  checkClickedLetters(letter) {
    // ... your code goes here
    if (this.letters.includes(letter)) {
      // already present
      return alert(`${letter} Already used!`);
    } else {
      // not already present
      this.letters.push(letter);
      return true;
    }
  }
  addCorrectLetter(letter) {
    // ... your code goes here
    this.guessedLetters+= letter;
    return this.guessedLetters
  }
  addWrongLetter(letter) {
    // ... your code goes here
    if (this.errorsLeft>0){
      hangmanCanvas.writeWrongLetter(letter, this.errorsLeft);
      console.log(`cette lettre n'existe pas ${letter}`)
      this.errorsLeft += -1;
    }
  }
  checkGameOver() {
    // ... your code goes here
    if (this.errorsLeft ===0) {
      return true
    } else {
      return false
    }
  }
  checkWinner() {
    // ... your code goes here
    if (this.guessedLetters.length === this.secretWord.length) {
      return true;
    } else {
      return false;
    }
  }
}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    // HINT (uncomment when start working on the canvas portion of the lab)
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
  });
}

document.addEventListener('keydown', event => {
  // React to user pressing a key
  // ... your code goes here
  let letter = event.key;
  console.log(letter)
  if (hangman.checkIfLetter(letter)) {
    if (hangman.checkClickedLetters(letter)) {
      if (hangman.secretWord.includes(letter)) {
        hangmanCanvas.writeCorrectLetter(letter);
          if (hangman.checkWinner()) {
            setTimeout(() => {
              hangmanCanvas.winner();
            }, 500);
            
          }
        }
        else {
          hangman.addWrongLetter(letter);

          hangmanCanvas.drawHangman(hangman.errorsLeft);
          
          if (hangman.checkGameOver()) {
            hangmanCanvas.gameOver();
          }
        }
      
    }
  }
});
/*Si la touche pressée est une lettre de l'alphabet - ok
  - Alors:
    Si cette lettre n'a jamais été essayé avant - ok 
      - Alors
        Si la lettre est contenue dans le mot secret: - ok 
          - Alors:
            - on affiche la lettre à sa place - ok
            - on vérifie si gagné ok
          - Sinon:
            - on affiche la lettre en haut a droite
            - on trace une étape du pendu
            - on vérifie si perdu
      - Sinon: rien
  - Sinon: on ignore la touche*/ 