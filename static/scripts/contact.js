let currentCard = 1;

function showCard(cardNumber) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.style.display = 'none');

    const currentCardElement = document.getElementById(`card${cardNumber}`);
    currentCardElement.style.display = 'block';
}

function prevCard() {
    currentCard = (currentCard - 1 + 4) % 4 + 1;
    showCard(currentCard);
}

function nextCard() {
    currentCard = (currentCard % 4) + 1;
    showCard(currentCard);
}


showCard(currentCard);