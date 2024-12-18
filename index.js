const words = [
    { word: "apple", definition: "A round fruit with red or green skin and a sweet taste." },
    { word: "book", definition: "A set of written, printed, or blank pages fastened together and bound in covers." },
    { word: "dog", definition: "A domesticated carnivorous mammal with a keen sense of smell and hearing." },
    { word: "car", definition: "A vehicle with four wheels that is powered by an engine and used for transportation." },
    { word: "elephant", definition: "A large mammal with a trunk and tusks, found in Africa and Asia." },
    { word: "friend", definition: "A person with whom one has a close personal relationship." },
    { word: "house", definition: "A building where people live, typically consisting of rooms." },
    { word: "ice", definition: "Frozen water, often used to cool drinks." },
    { word: "king", definition: "A male ruler of a country, typically one who inherits the position." },
    { word: "moon", definition: "The natural satellite of Earth, visible at night." },
    { word: "lion", definition: "A large wild cat with a mane, found in Africa and Asia." },
    { word: "tiger", definition: "A large striped wild cat native to Asia." },
    { word: "umbrella", definition: "A device used for protection against rain or sun." },
    { word: "ball", definition: "A round object used in various games." },
    { word: "candle", definition: "A wax stick with a wick, used for light." },
    { word: "guitar", definition: "A musical instrument with strings, played by strumming or plucking." },
    { word: "hat", definition: "A head covering, often worn for fashion or protection." },
    { word: "island", definition: "A piece of land surrounded by water." },
    { word: "jacket", definition: "A piece of clothing worn on the upper body, usually with sleeves." },
    { word: "kite", definition: "A lightweight object that flies in the wind, attached to a string." },
    { word: "lamp", definition: "A device that produces light, typically powered by electricity." },
    { word: "mountain", definition: "A large natural elevation of the earth’s surface, higher than a hill." },
    { word: "nest", definition: "A structure built by birds or other animals to lay eggs and live in." },
    { word: "orange", definition: "A citrus fruit with a sweet and tangy flavor, or the color of the fruit." },
    { word: "pen", definition: "A writing instrument filled with ink." },
    { word: "table", definition: "A flat surface with legs, used for eating, working, or writing." },
    { word: "whale", definition: "A large marine mammal." },
    { word: "zebra", definition: "A wild animal with black and white stripes, found in Africa." }
];

let currentWord;
let attempts = 6;
let score = 0;
let wrongLetters = [];
let wordDisplay;
let letterInput;

const startBtn = document.getElementById("startBtn");
const gameArea = document.getElementById("gameArea");
const wordDisplayEl = document.getElementById("wordDisplay");
const wrongLettersEl = document.getElementById("wrongLetters");
const attemptsEl = document.getElementById("attempts");
const letterInputEl = document.getElementById("letterInput");
const guessBtn = document.getElementById("guessBtn");
const scoreArea = document.getElementById("scoreArea");
const scoreDisplay = document.getElementById("score");
const playAgainBtn = document.getElementById("playAgainBtn");
const definitionText = document.getElementById("definitionText");

startBtn.addEventListener("click", startGame);
guessBtn.addEventListener("click", makeGuess);
playAgainBtn.addEventListener("click", startGame);

function startGame() {
    // Reset game variables
    wrongLetters = [];
    attempts = 6;
    wordDisplay = "";
    letterInputEl.value = "";

    // Hide start screen, show game area
    startBtn.style.display = "none";
    scoreArea.style.display = "none";
    gameArea.style.display = "block";

    // Choose a random word and its definition
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    definitionText.textContent = currentWord.definition;

    // Initialize the display with underscores (separated by spaces)
    wordDisplay = "_ ".repeat(currentWord.word.length).trim();
    wordDisplayEl.textContent = wordDisplay;

    wrongLettersEl.textContent = "Wrong Letters: ";
    attemptsEl.textContent = `Attempts left: ${attempts}`;
}

function makeGuess() {
    const guess = letterInputEl.value.toLowerCase();

    if (!guess || guess.length !== 1 || !/[a-z]/.test(guess)) {
        return; // Invalid guess
    }

    if (currentWord.word.includes(guess)) {
        // Correct guess
        let updatedWordDisplay = "";
        for (let i = 0; i < currentWord.word.length; i++) {
            updatedWordDisplay += currentWord.word[i] === guess ? guess + " " : wordDisplay[i * 2] + " ";
        }
        wordDisplay = updatedWordDisplay.trim();
        wordDisplayEl.textContent = wordDisplay;

        // Increment score for correct guess
        score += 10;
    } else {
        // Incorrect guess
        wrongLetters.push(guess);
        wrongLettersEl.textContent = `Wrong Letters: ${wrongLetters.join(", ")}`;
        attempts--;
        attemptsEl.textContent = `Attempts left: ${attempts}`;
    }

    // Check if game is over or won
    if (attempts === 0) {
        endGame("Game Over! The word was: " + currentWord.word);
    } else if (!wordDisplay.includes("_")) {
        endGame("Congratulations! You've guessed the word!");
    }

    letterInputEl.value = "";
}

function endGame(message) {
    
    gameArea.style.display = "none";
    scoreArea.style.display = "block";
    scoreDisplay.textContent = score;

    alert(message);
}

