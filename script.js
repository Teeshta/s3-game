document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    const difficultySelect = document.getElementById('difficulty');
    const movesDisplay = document.getElementById('moves');
    const matchesDisplay = document.getElementById('matches');

    let moves = 0;
    let matches = 0;
    let cardsChosen = [];
    let cardsChosenId = [];
    let isProcessing = false;
    let cardArray = [];

    const easyCards = [
        { name: 'card1', img: './images/pic1.png' }, { name: 'card1', img: './images/pic1.png' },
        { name: 'card2', img: './images/pic2.png' }, { name: 'card2', img: './images/pic2.png' },
        { name: 'card3', img: './images/pic3.png' }, { name: 'card3', img: './images/pic3.png' },
        { name: 'card4', img: './images/pic4.png' }, { name: 'card4', img: './images/pic4.png' },
        { name: 'card5', img: './images/pic5.png' }, { name: 'card5', img: './images/pic5.png' },

    ];

    const mediumCards = [
        ...easyCards,
        { name: 'card6', img: 'images/pic6.png' }, { name: 'card6', img: 'images/pic6.png' },
        { name: 'card7', img: 'images/pic7.png' }, { name: 'card7', img: 'images/pic7.png' },
        { name: 'card8', img: 'images/pic8.png' }, { name: 'card8', img: 'images/pic8.png' },
        { name: 'card9', img: './images/pic9.png' }, { name: 'card9', img: './images/pic9.png' },
        { name: 'card10', img: './images/pic10.png' }, { name: 'card10', img: './images/pic10.png' },
    ];

    const hardCards = [
        ...mediumCards,
        { name: 'card11', img: 'images/pic11.png' }, { name: 'card11', img: 'images/pic11.png' },
        { name: 'card12', img: 'images/pic12.png' }, { name: 'card12', img: 'images/pic12.png' },
        { name: 'card13', img: 'images/pic13.png' }, { name: 'card13', img: 'images/pic13.png' },
        { name: 'card14', img: './images/pic14.png' }, { name: 'card14', img: './images/pic14.png' },
        { name: 'card15', img: './images/pic15.png' }, { name: 'card15', img: './images/pic15.png' }
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function setDifficulty() {
        switch (difficultySelect.value) {
            case 'easy':
                cardArray = [...easyCards];
                break;
            case 'medium':
                cardArray = [...mediumCards];
                break;
            case 'hard':
                cardArray = [...hardCards];
                break;
        }
    }

    function updateStats() {
        movesDisplay.textContent = `Moves: ${moves}`;
        matchesDisplay.textContent = `Matches: ${matches}`;
    }

    function createBoard() {
        grid.innerHTML = '';
        setDifficulty();
        shuffle(cardArray);
        moves = 0;
        matches = 0;
        updateStats();

        grid.className = 'game-board';
        grid.classList.add(difficultySelect.value);

        cardArray.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card');

            const cardImage = document.createElement('img');
            cardImage.setAttribute('src', 'images/blank.png');
            cardImage.setAttribute('data-id', index);

            card.appendChild(cardImage);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        });
    }


    function flipCard() {
        if (isProcessing) return;

        const cardImg = this.querySelector('img');
        const cardId = cardImg.getAttribute('data-id');

        if (!cardsChosenId.includes(cardId) && cardsChosen.length < 2) {
            cardImg.setAttribute('src', cardArray[cardId].img);
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);

            if (cardsChosen.length === 2) {
                moves++;
                updateStats();
                isProcessing = true;
                setTimeout(checkForMatch, 800);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].classList.add('matched');
            cards[secondCardId].classList.add('matched');
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            matches++;
            updateStats();

            if (matches === cardArray.length / 2) {
                setTimeout(() => {
                    alert(`Congratulations! You won in ${moves} moves!`);
                }, 500);
            }
        } else {
            const firstImg = cards[firstCardId].querySelector('img');
            const secondImg = cards[secondCardId].querySelector('img');
            firstImg.setAttribute('src', 'images/blank.png');
            secondImg.setAttribute('src', 'images/blank.png');
        }

        cardsChosen = [];
        cardsChosenId = [];
        isProcessing = false;
    }

    startButton.addEventListener('click', createBoard);
    difficultySelect.addEventListener('change', createBoard);
    createBoard();
});
