const words = 0, variables = 1, methods = 2;
let wordIndex = 0, wins = 0;

let game = [
    {
        term: [ ['s', 'q', 'u', 'a', 't'], ['d', 'e', 'a', 'd', 'l', 'i','f', 't'], ['b', 'e', 'n', 'c', 'h'],  ['l', 'u', 'n', 'g', 'e'], ['d', 'i', 'p']]
    },
    {   
        usedLetters: [],
        blank: [],
        newWord: document.getElementById('blanks'),
        guesses: document.getElementById('past_guesses'),
        nbrOfGuessesLeft: document.getElementById('guessesLeft'),
        newButton: document.createElement('button'),
        newH4: document.createElement('h4'),
        newDiv: [document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div')],
        newGame: document.getElementById('newGame'),
        accessMainContent: document.getElementById('centralContent'),
        accessRightContent: document.getElementById('rightContent'),
        accessLeftContent: document.getElementById('leftContent')
    },
    {   startNewGame() {
            if (wordIndex < game[words].term.length - 1) {
                alert('Next Word!')
                wordIndex++;
                game[variables].usedLetters = [];
                game[variables].guesses.innerHTML = game[variables].usedLetters.toString().replace(/,/g, ' ');
                game[variables].newWord.innerHTML = this.generateBlanks().toString().replace(/,/g, ' ');
                game[variables].nbrOfGuessesLeft.innerHTML = 7;
                game[variables].newButton.parentNode.removeChild(game[variables].newButton);
                for (let i = 0; i < game[variables].newDiv.length; i++) {
                    game[variables].accessLeftContent.removeChild(game[variables].newDiv[i]);
                }
            }
            else {
                alert('No more words');
            }
    },
        generateBlanks() {
            game[variables].blank = [];
            for (let i = 0; i < game[words].term[wordIndex].length; i++) {
                    game[variables].blank.push('_');
            }
            return game[variables].blank;
        },
        createButton() {
            game[variables].guesses.innerHTML = game[variables].usedLetters.toString().replace(/,/g, ' ');
            game[variables].newGame.appendChild(game[variables].newButton);
            game[variables].newButton.setAttribute('onclick', 'game[methods].startNewGame()');
            game[variables].newButton.setAttribute('class', 'buttonAesthetics');
            game[variables].newGame.setAttribute('style', 'display: flex; justify-content: center;');
            game[variables].newButton.innerHTML = 'New Word!';
        },
        gameOver() {
            alert('Game over!')
            alert(`The last word was ${game[words].term[wordIndex].toString().replace(/,/g, '')}`);
            this.createButton();
        },
        youWin() {
            alert('Winner!')
            wins++;
            this.createButton();
            if (wins > 1) {
                game[variables].accessRightContent.removeChild(game[variables].newH4);
            }
            game[variables].accessRightContent.appendChild(game[variables].newH4).innerHTML = `Number of wins: <br> ${wins}`;
        },
        generateBodyPart() {
            switch (game[variables].usedLetters.length) {
                case 1:
                    game[variables].accessLeftContent.appendChild(game[variables].newDiv[game[variables].usedLetters.length - 1]);
                    game[variables].newDiv[game[variables].usedLetters.length - 1].setAttribute('id', 'head');
                    break;
                case 2:
                    game[variables].accessLeftContent.appendChild(game[variables].newDiv[game[variables].usedLetters.length - 1]);
                    game[variables].newDiv[game[variables].usedLetters.length - 1].setAttribute('id', 'body');
                    break;
                case 3:
                    game[variables].accessLeftContent.appendChild(game[variables].newDiv[game[variables].usedLetters.length - 1]);
                    game[variables].newDiv[game[variables].usedLetters.length - 1].setAttribute('id', 'leftArm');
                    break;
                case 4:
                    game[variables].accessLeftContent.appendChild(game[variables].newDiv[game[variables].usedLetters.length - 1]);
                    game[variables].newDiv[game[variables].usedLetters.length - 1].setAttribute('id', 'rightArm');
                    break;
                case 5:
                    game[variables].accessLeftContent.appendChild(game[variables].newDiv[game[variables].usedLetters.length - 1]);
                    game[variables].newDiv[game[variables].usedLetters.length - 1].setAttribute('id', 'leftLeg');
                    break;
                case 6:
                    game[variables].accessLeftContent.appendChild(game[variables].newDiv[game[variables].usedLetters.length - 1]);
                    game[variables].newDiv[game[variables].usedLetters.length - 1].setAttribute('id', 'rightLeg');
                    break;
                default:
                    break;
            }
        }
    }
];


game[variables].newWord.innerHTML = game[methods].generateBlanks().toString().replace(/,/g, ' ');
game[variables].nbrOfGuessesLeft.innerHTML = 6;

document.onkeyup = function(event) {
    if(event.keyCode >= 65 && event.keyCode <= 90 && (game[variables].blank.toString().replace(/,/g, ' ') !== game[words].term[wordIndex].toString().replace(/,/g, ' ')) && game[variables].usedLetters.length < 6) {         
            if (game[variables].usedLetters.indexOf(event.key.toLowerCase()) !== -1) {
                alert(`${event.key} already guessed.`);
            }
            else if (game[words].term[wordIndex].indexOf(event.key.toLowerCase()) !== -1) {
                game[variables].blank[game[words].term[wordIndex].indexOf(event.key.toLowerCase())] = event.key.toLowerCase();
                game[variables].newWord.innerHTML = game[variables].blank.toString().replace(/,/g, ' ');
                for (let i = 1; i < game[words].term.length + 1; i++) { //allows for multiple of the same letters
                    game[variables].blank[game[words].term[wordIndex].indexOf(event.key.toLowerCase(), (game[words].term[wordIndex].indexOf(event.key.toLowerCase())) + i)] = event.key.toLowerCase();
                    game[variables].newWord.innerHTML = game[variables].blank.toString().replace(/,/g, ' ');
                }
                if (game[variables].blank.toString().replace(/,/g, ' ') === game[words].term[wordIndex].toString().replace(/,/g, ' ')) {
                    game[methods].youWin();
                }
            }
            else {
                game[variables].usedLetters.push(event.key.toLowerCase());
                game[variables].guesses.innerHTML = game[variables].usedLetters.toString().replace(/,/g, ' ');
                game[variables].nbrOfGuessesLeft.innerHTML = 6 - game[variables].usedLetters.length;
                game[methods].generateBodyPart();
                if (game[variables].usedLetters.length >= 6) {
                    game[methods].gameOver();
                }
            }
    }
}
