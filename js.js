// njibou données mta3 les inputs
const addCardBtn = document.querySelector(".add-card-btn");
const cardDisplay = document.querySelector(".card-display");
const prevBtn = document.querySelector(".nav-btn.prev");
const nextBtn = document.querySelector(".nav-btn.next");

// njibou les données des cartes min stockage local 
function loadCards() {
    const cards = getCardsFromLocalStorage();
    cards.forEach((card, index) => {
        renderCard(card, index);
    });
}

// njibou les cartes mini stockage local
function getCardsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("cards")) || [];
}

// enregistrement des cartes fi stockage local 
function saveCardsToLocalStorage(cards) {
    localStorage.setItem("cards", JSON.stringify(cards));
}

// naffishiw liste des cartes
function renderCard(card, index) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <h2 class="card-question">${card.question}</h2>
            </div>
            <div class="card-back">
                <p class="card-answer">${card.answer}</p>
            </div>
        </div>
    `;
    cardDisplay.appendChild(cardElement);
}

// Fonction nzidou beha carte
function addNewCard(question, answer) {
    const cards = getCardsFromLocalStorage();
    const newCard = { question, answer };
    cards.push(newCard);
    saveCardsToLocalStorage(cards);
    renderCard(newCard, cards.length - 1);
}

// Fonction bsh nbadlou les cartes (navigation) 
function navigateCards(direction) {
    const cards = getCardsFromLocalStorage();
    const currentIndex = parseInt(cardDisplay.dataset.currentIndex || "0");

    let newIndex = currentIndex + direction;
    if (newIndex < 0) {
        newIndex = cards.length - 1;
    } else if (newIndex >= cards.length) {
        newIndex = 0;
    }

    cardDisplay.dataset.currentIndex = newIndex;
    const currentCard = cards[newIndex];
    cardDisplay.innerHTML = `
        <div class="card">
            <div class="card-inner">
                <div class="card-front">
                    <h2 class="card-question">${currentCard.question}</h2>
                </div>
                <div class="card-back">
                    <p class="card-answer">${currentCard.answer}</p>
                </div>
            </div>
        </div>
    `;
}

// gestionnaire bsh nzidou q/a 
addCardBtn.addEventListener("click", () => {
    const question = prompt("Enter the question (Recto):");
    const answer = prompt("Enter the answer (Verso):");
    
    if (question && answer) {
        addNewCard(question, answer);
        
    } else {
        alert("Both question and answer are required!");
    }
    
});

// Gestionnaires d'événements pour la navigation entre les cartes
// narej3ou lil carte  précédente
prevBtn.addEventListener("click", () => {
    navigateCards(-1); 
});

// nemshiw lil carte li ba3edha 
nextBtn.addEventListener("click", () => {
    navigateCards(1); 
});

// njibou les cartes wakett li naamlou appel lil page
document.addEventListener("DOMContentLoaded", loadCards);



// c'est hiba , allah ysemhek Mr.Nidhal rani nheb nekteb les commentaires bil ENG :'(
// Team jesser ben salah , hiba bouslahi , sarra charfi et nawress el abed