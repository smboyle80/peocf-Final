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

/* ================================================
   GAME 5 – SUDOKU
   ================================================ */
(function() {

    // Seed puzzles: [clues string (81 chars, 0=blank), solution string]
    const PUZZLES = {
        easy: [
            ["530070000600195000098000060800060003400803001700020006060000280000419005000080079",
             "534678912672195348198342567859761423426853791713924856961537284287419635345286179"],
            ["200070038000006070300040600008020700100000006007030400004080009060700000730060005",
             "264571938958326174317948625498625713135794286627138492541283769869417352732869541"],
        ],
        medium: [
            ["000000907000420180000705026100904000050000040000507009920108000034059000507000000",
             "621843957753426189489715326138294675956371842274587439962138574834659712517962438"],
            ["800000000003600000070090200060005030004000000030000060020080070000009004500600008",
             "812753649943682175675491283168945372294237568357168496421876937786329514539614827"],
        ],
        hard: [
            ["000000000000003085001020000000507000004000100090000000500000073002010000000040009",
             "987654321246173985351928746128537694634892157795461832519286473472319568863745219"],
            ["000600400700003600000091080000000000050180073009000400010020000003400005006800000",
             "981672435725843619364591782438957261652184973179236408817329546293468157546715823"],
        ]
    };

    let currentSolution = [];
    let currentGivens   = [];

    function loadPuzzle() {
        const diff   = document.getElementById("sudokuDiff").value;
        const set    = PUZZLES[diff];
        const picked = set[Math.floor(Math.random() * set.length)];
        const clues  = picked[0];
        const soln   = picked[1];

        currentSolution = soln.split("");
        currentGivens   = clues.split("").map(c => c !== "0");

        const grid = document.getElementById("sudokuGrid");
        grid.innerHTML = "";
        document.getElementById("sudokuMsg").innerHTML = "&nbsp;";

        for (let i = 0; i < 81; i++) {
            const inp = document.createElement("input");
            inp.type = "number";
            inp.min  = "1";
            inp.max  = "9";

            const row = Math.floor(i / 9);
            const col = i % 9;

            // Thick border classes for 3×3 box edges
            if (col === 2 || col === 5) inp.classList.add("border-right");
            if (row === 2 || row === 5) inp.classList.add("border-bottom");

            if (clues[i] !== "0") {
                inp.value = clues[i];
                inp.classList.add("given");
                inp.readOnly = true;
            } else {
                inp.placeholder = "";
                inp.addEventListener("input", function() {
                    // Allow only single digit 1-9
                    const v = this.value.replace(/[^1-9]/g, "");
                    this.value = v ? v[v.length - 1] : "";
                    this.classList.remove("error", "correct");
                    document.getElementById("sudokuMsg").innerHTML = "&nbsp;";
                });
            }
            grid.appendChild(inp);
        }
    }

    function checkSudoku() {
        const inputs = document.getElementById("sudokuGrid").querySelectorAll("input");
        let allFilled = true;
        let allCorrect = true;

        inputs.forEach(function(inp, i) {
            if (inp.classList.contains("given")) return;
            inp.classList.remove("error", "correct");
            if (!inp.value) {
                allFilled = false;
            } else if (inp.value === currentSolution[i]) {
                inp.classList.add("correct");
            } else {
                inp.classList.add("error");
                allCorrect = false;
            }
        });

        const msg = document.getElementById("sudokuMsg");
        if (!allFilled) {
            msg.textContent = "Keep going — some cells are still empty!";
            msg.style.color = "rgba(255,255,255,0.8)";
        } else if (allCorrect) {
            msg.textContent = "🎉 Congratulations — puzzle solved!";
            msg.style.color = "#90ee90";
        } else {
            msg.textContent = "Not quite — red cells need another look.";
            msg.style.color = "#ff9999";
        }
    }

    document.getElementById("sudokuCheck").addEventListener("click", checkSudoku);
    document.getElementById("sudokuNew").addEventListener("click", loadPuzzle);
    document.getElementById("sudokuDiff").addEventListener("change", loadPuzzle);

    // Load on page ready
    loadPuzzle();

})();

/* ================================================
   GAME 6 – HANGMAN
   ================================================ */
(function() {

    const WORDS = [
        { word: "SISTERHOOD",   hint: "What P.E.O. is all about" },
        { word: "FELLOWSHIP",   hint: "Friendship and community" },
        { word: "SCHOLARSHIP",  hint: "What P.E.O. helps fund" },
        { word: "PHILANTHROPY", hint: "Giving back to others" },
        { word: "EDUCATION",    hint: "A core P.E.O. value" },
        { word: "EMPOWERMENT",  hint: "Lifting women up" },
        { word: "ARIZONA",      hint: "Our home state" },
        { word: "VOLUNTEER",    hint: "Giving your time freely" },
        { word: "CELEBRATE",    hint: "Mark a happy occasion" },
        { word: "COMMUNITY",    hint: "The people around us" },
        { word: "FRIENDSHIP",   hint: "A cherished bond" },
        { word: "KINDNESS",     hint: "A small act can mean a lot" },
        { word: "BUTTERFLY",    hint: "A garden visitor" },
        { word: "LAVENDER",     hint: "A purple flowering herb" },
        { word: "TEACUP",       hint: "Perfect for afternoon tea" },
        { word: "MAGNOLIA",     hint: "A beautiful flowering tree" },
        { word: "DESSERT",      hint: "The sweet course" },
        { word: "GARDEN",       hint: "A place of flowers and peace" },
        { word: "BLOSSOM",      hint: "A flower in bloom" },
        { word: "CHAPTERS",     hint: "Local P.E.O. groups" },
    ];

    const PARTS = ["hm-head","hm-body","hm-larm","hm-rarm","hm-lleg","hm-rleg"];
    const MAX_WRONG = 6;

    let currentWord = "";
    let currentHint = "";
    let guessed = new Set();
    let wrongCount = 0;
    let gameActive = false;

    function startGame() {
        const pick = WORDS[Math.floor(Math.random() * WORDS.length)];
        currentWord  = pick.word;
        currentHint  = pick.hint;
        guessed      = new Set();
        wrongCount   = 0;
        gameActive   = true;

        // Reset drawing
        PARTS.forEach(id => document.getElementById(id).style.display = "none");

        renderWord();
        renderKeyboard();
        document.getElementById("hangmanHint").textContent = "Hint: " + currentHint;
        document.getElementById("hangmanMsg").innerHTML = "&nbsp;";
    }

    function renderWord() {
        const container = document.getElementById("hangmanWord");
        container.innerHTML = "";
        currentWord.split("").forEach(letter => {
            const span = document.createElement("span");
            span.className = "hm-letter";
            span.textContent = guessed.has(letter) ? letter : "";
            container.appendChild(span);
        });
    }

    function renderKeyboard() {
        const kb = document.getElementById("hangmanKeyboard");
        kb.innerHTML = "";
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letter => {
            const btn = document.createElement("button");
            btn.className = "hm-key";
            btn.textContent = letter;
            btn.setAttribute("aria-label", "Guess " + letter);
            if (guessed.has(letter)) {
                btn.disabled = true;
                btn.classList.add(currentWord.includes(letter) ? "hm-correct" : "hm-wrong");
            }
            btn.addEventListener("click", () => guess(letter));
            kb.appendChild(btn);
        });
    }

    function guess(letter) {
        if (!gameActive || guessed.has(letter)) return;
        guessed.add(letter);

        if (!currentWord.includes(letter)) {
            wrongCount++;
            document.getElementById(PARTS[wrongCount - 1]).style.display = "";
        }

        renderWord();
        renderKeyboard();
        checkGameOver();
    }

    function checkGameOver() {
        const msg = document.getElementById("hangmanMsg");
        const won = currentWord.split("").every(l => guessed.has(l));
        if (won) {
            gameActive = false;
            msg.textContent = "🎉 You got it! Well done, sister!";
            msg.style.color = "#90ee90";
        } else if (wrongCount >= MAX_WRONG) {
            gameActive = false;
            // Reveal the word
            document.getElementById("hangmanWord").querySelectorAll(".hm-letter")
                .forEach((span, i) => { span.textContent = currentWord[i]; span.style.color = "#ff9999"; });
            msg.textContent = "The word was: " + currentWord;
            msg.style.color = "#ff9999";
        } else {
            msg.innerHTML = "&nbsp;";
        }
    }

    document.getElementById("hangmanNew").addEventListener("click", startGame);

    startGame();

})();
