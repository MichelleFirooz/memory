const animals = ['🐶', '🐱', '🐰', '🐸', '🐵', '🐯', '🐼', '🐨'];
let gameCards = [...animals, ...animals];
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

const board = document.getElementById('game-board');
const resetButton = document.getElementById('reset');

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.setAttribute('data-animal', card);
    cardElement.addEventListener('click', flipCard);
    cardElement.textContent = '';
    return cardElement;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.textContent = this.getAttribute('data-animal');
    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-animal') === secondCard.getAttribute('data-animal');
    
    if (isMatch) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function startGame() {
    shuffle(gameCards);
    board.innerHTML = '';
    gameCards.forEach(animal => {
        const card = createCard(animal);
        board.appendChild(card);
    });
}

resetButton.addEventListener('click', startGame);
startGame();
