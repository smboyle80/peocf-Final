"use strict";

/* ================================================
   HELPER
   ================================================ */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ================================================
   GAME 1 – SNAKE EYES
   ================================================ */
document.getElementById("gamePlay").addEventListener("click", snakeEyes);

function snakeEyes() {
    const dieDisplay1 = document.getElementById("random1");
    const dieDisplay2 = document.getElementById("random2");
    const gameMessage = document.getElementById("snakeEyesMsg");

    const die1 = getRandomNumber(1, 6);
    const die2 = getRandomNumber(1, 6);

    const diceFaces = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    dieDisplay1.innerHTML = diceFaces[die1];
    dieDisplay2.innerHTML = diceFaces[die2];

    if (die1 === 1 && die2 === 1) {
        gameMessage.innerHTML = "🎉 Yes!! Snake Eyes!!";
    } else {
        gameMessage.innerHTML = "No dice. Try again!";
    }
}

/* ================================================
   GAME 2 – MAGIC 8-BALL
   ================================================ */
const eightBallAnswers = [
    // Positive
    "It is certain! ✨",
    "Without a doubt! 🌟",
    "Yes, definitely! 💫",
    "You may rely on it! 👍",
    "Most likely! 😊",
    "Signs point to yes! 🔮",
    // Neutral
    "Reply hazy, try again… 🌫️",
    "Ask again later… ⏳",
    "Better not tell you now… 🤫",
    "Cannot predict now… 🤔",
    // Negative
    "Don't count on it… 😬",
    "My sources say no… 🙅",
    "Very doubtful… 😕",
    "Outlook not so good… 🌧️"
];

document.getElementById("shakeBtn").addEventListener("click", magic8Ball);

function magic8Ball() {
    const ball = document.getElementById("eightBall");
    const answer = document.getElementById("eightBallAnswer");

    ball.classList.add("shaking");
    answer.textContent = "…";

    setTimeout(function () {
        ball.classList.remove("shaking");
        const pick = eightBallAnswers[getRandomNumber(0, eightBallAnswers.length - 1)];
        answer.textContent = pick;
        ball.textContent = "8";
    }, 700);
}

/* ================================================
   GAME 3 – NUMBER GUESSING
   ================================================ */
let secretNumber = getRandomNumber(1, 20);
let guessAttempts = 0;
let gameOver = false;

document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("resetGuess").addEventListener("click", resetGuessing);
document.getElementById("guessInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") makeGuess();
});

function makeGuess() {
    if (gameOver) return;

    const input = document.getElementById("guessInput");
    const result = document.getElementById("guessResult");
    const countDisplay = document.getElementById("guessCount");
    const guess = parseInt(input.value);

    if (isNaN(guess) || guess < 1 || guess > 20) {
        result.textContent = "Please enter a number between 1 and 20.";
        return;
    }

    guessAttempts++;
    input.value = "";

    if (guess < secretNumber) {
        result.textContent = "📉 Too low! Try higher.";
    } else if (guess > secretNumber) {
        result.textContent = "📈 Too high! Try lower.";
    } else {
        result.textContent = "🎉 Correct! The number was " + secretNumber + "!";
        countDisplay.textContent = "You got it in " + guessAttempts + " guess" + (guessAttempts === 1 ? "" : "es") + "!";
        gameOver = true;
        document.getElementById("guessBtn").disabled = true;
        return;
    }

    countDisplay.textContent = "Guesses so far: " + guessAttempts;
    input.focus();
}

function resetGuessing() {
    secretNumber = getRandomNumber(1, 20);
    guessAttempts = 0;
    gameOver = false;
    document.getElementById("guessResult").innerHTML = "&nbsp;";
    document.getElementById("guessCount").innerHTML = "&nbsp;";
    document.getElementById("guessInput").value = "";
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("guessInput").focus();
}

/* ================================================
   GAME 4 – COIN FLIP
   ================================================ */
let coinWins = 0;
let coinLosses = 0;

document.getElementById("headsBtn").addEventListener("click", function () { flipCoin("Heads"); });
document.getElementById("tailsBtn").addEventListener("click", function () { flipCoin("Tails"); });

function flipCoin(playerChoice) {
    const coin = document.getElementById("coin");
    const result = document.getElementById("coinResult");
    const score = document.getElementById("coinScore");

    coin.classList.add("flipping");
    result.textContent = "Flipping…";

    setTimeout(function () {
        coin.classList.remove("flipping");
        const flip = getRandomNumber(0, 1) === 0 ? "Heads" : "Tails";
        coin.textContent = flip === "Heads" ? "🌕" : "🌑";

        if (flip === playerChoice) {
            coinWins++;
            result.textContent = flip + "! 🎉 You win!";
        } else {
            coinLosses++;
            result.textContent = flip + "! 😬 You lose!";
        }
        score.textContent = "Wins: " + coinWins + "  |  Losses: " + coinLosses;
    }, 700);
}

/* ================================================
   CONTACT FORM — Thank-you message
   ================================================ */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        // Let the form POST normally but also show a thank-you note
        // by briefly showing the success div after a short delay
        setTimeout(function() {
            const success = document.getElementById("formSuccess");
            if (success) {
                contactForm.style.display = "none";
                success.hidden = false;
                success.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }, 300);
    });
}
