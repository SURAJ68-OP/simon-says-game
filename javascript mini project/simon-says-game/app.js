let gameSq = []; // game Sequence
let userSq = []; // user Sequence

let btns = ["red", "yellow", "purple", "green"];

let h2 = document.querySelector('h2');
let body = document.querySelector('body');
let instructions = document.querySelector("#instructions-overlay");
let startBtn = document.querySelector("#start-btn");

let started = false;
let level = 0;
let highestScore = 0; 

// Start game with button click
startBtn.addEventListener("click", () => {
    if (!started) {
        console.log("Game started");
        started = true;
        // Hide the instructions when the game starts
        instructions.classList.add("hidden");
        setTimeout(levelUp, 2000);
    }
});

// flash buttons:
function gameBtnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userBtnFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(() => {
        btn.classList.remove("user-flash");
    }, 250);
}

function wrongBtnFlash() {
    body.classList.add("wrong-flash");
    setTimeout(() => {
        body.classList.remove("wrong-flash");
    }, 1000);
}

// core game logic:

// level Up game button flash:
function levelUp() {
    userSq = []; // Reset user sequence at the start of each level
    level++;
    h2.textContent = `Level ${level}`;
    console.log("leveled up");
    // random button to be flashed:
    let randIdx = Math.floor(Math.random() * 4); // Corrected from 3 to 4
    let randColor = btns[randIdx];
    let btn = document.querySelector(`.${randColor}`);
    gameSq.push(randColor);
    gameBtnFlash(btn);
}

// after every button pressed user sequence so far clicked is checked with game sequence:
function checkUserSq(idx) {
    console.log("Check Sq");
    if (userSq[idx] === gameSq[idx]) {
        if (userSq.length == gameSq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        levelReset();
    }
}

// user button press:
function userBtnPress() {
    if (!started) return; // Prevents clicking before game starts
    let btn = this;
    userBtnFlash(btn);
    // Get the color from the second class name
    let userColor = btn.classList[1];
    userSq.push(userColor);
    console.log("Button pressed");
    checkUserSq(userSq.length - 1);
}

// add event listener to all buttons:
const allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", userBtnPress);
}

// game reset:
function levelReset() {
    wrongBtnFlash();

    // NEW: Update highest score
    if (level > highestScore) {
        highestScore = level -1;
    }

    h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b>. <br> Highest Score: ${highestScore}`;
    let count = 5; // Countdown from 5
    h2.innerHTML = `Starting again in <b>${count}</b>...`;

    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            h2.innerHTML = `Starting again in <b>${count}</b>...`;
        } else {
            clearInterval(countdownInterval); // Stop the countdown
            h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b>. <br> Highest Score: ${highestScore}`;
            instructions.classList.remove("hidden"); // Show instructions
        }
    }, 1000);

    // Reset game state
    started = false;
    level = 0;
    gameSq = [];
    userSq = [];
}