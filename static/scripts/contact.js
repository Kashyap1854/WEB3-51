let currentCard = 1;

function showCard(cardNumber) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => (card.style.display = "none"));

  const currentCardElement = document.getElementById(`card${cardNumber}`);
  currentCardElement.style.display = "block";
}

function prevCard() {
  currentCard = ((currentCard - 1 + 4) % 4) + 1;
  showCard(currentCard);
}

function nextCard() {
  currentCard = (currentCard % 4) + 1;
  showCard(currentCard);
}

showCard(currentCard);

function logout() {
  const form = document.getElementById("logout");
  console.log(form);
  form.addEventListener("submit", (event) => {
    console.log(" Prevented default submission ");
    event.preventDefault();
  });
  if (confirm("Are you sure you want to logout !")) {
    console.log("Confirmation received !");
    form.submit();
  }
}
