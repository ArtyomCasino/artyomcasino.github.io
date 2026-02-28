// --- CONFIGURATION ---
// Change this to make the numbers spin faster/slower (in milliseconds)
const SPIN_SPEED = 50; 
const build = "build a28R226C"
const version = "Artyom's Casino v0.4.2a - Emergency maintainance: Complete #1/3. Undergoing Emergency Maintainance #2"


// --- STATE VARIABLES ---
let isSpinning = false;
let spinTimer = null; // This holds the "interval" ID
let ticketsAmount = 10;
let storeOpen = false;
// let gasinoActive = false;

// HTML Elements (Grabbed once to keep code clean)
const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");
const messageEl = document.getElementById("message");
const buttonEl = document.getElementById("actionBtn");
const ticketsMultiplier = document.getElementById("tickets-multiplier");
const pur1btn = document.getElementById("Purchase-1-ticket");
const pur5btn = document.getElementById("Purchase-5-tickets");
const pur10btn = document.getElementById("Purchase-10-tickets");
const pur50btn = document.getElementById("Purchase-50-tickets");
const pur100btn = document.getElementById("Purchase-100-tickets");
const pur250btn = document.getElementById("Purchase-250-tickets");
const pur500btn = document.getElementById("Purchase-500-tickets");
const pur1000btn = document.getElementById("Purchase-1000-tickets");
const pur5000btn = document.getElementById("Purchase-5000-tickets");
const pur10000btn = document.getElementById("Purchase-10000-tickets");
const closeButton = document.getElementById("close");
const gasinoButton = document.getElementById("Gasino");
const title = document.getElementById("machine-title");
const root = document.querySelector(':root');
const versionText = document.getElementById("version");
const buildText = document.getElementById("build");
const patchNotesBtn = document.getElementById("patch-notes");
const subtitleVersion = document.getElementById("subtitle-version");
const checkbox = document.getElementById("checkbox");
const proceedButton = document.getElementById("proceedButton");

// The question mark checks if it exists before trying to access .textContent
subtitleVersion?.setAttribute('textContent', version); // Or simply:
if (subtitleVersion) subtitleVersion.textContent = version;

if (versionText) versionText.textContent = version;
if (buildText) buildText.textContent = build;

function proceed() {
    if (checkbox.checked) {
        window.location.href = "main.html";
    }
    else {
        alert("Check the box to accept the disclaimer")
    }
}

function tickBox() {
    if (checkbox.checked) {
        checkbox.checked = false;
    }
    else {
        checkbox.checked = true;
    }
}

// --- MAIN FUNCTION ---
function toggleGame() {
    if (isSpinning) {
        stopGame();
    } else {
        root.style.backgroundColor = "#1a1a1a";
        startGame();
    }
}

function gasino() {
    console.log("Gasino button clicked!");
    messageEl.textContent = "Welcome to Artyom's Gasino!";
    title.textContent = "Gasino";

}

function purchaseTicket(amount) {
    ticketsAmount += amount;
    ticketsMultiplier.textContent = "x " + ticketsAmount;
}

function storeButton() {
    if (storeOpen == true) {
        document.querySelector(".store").style.display = "none";
        storeOpen = false;

    }
    else {
        // alert("Refresh the page to open the store");
        document.querySelector(".store").style.display = "block";
        storeOpen = true;
    }
}

function startGame() {
    if (ticketsAmount >= 1) {
        isSpinning = true;
        buttonEl.innerText = "STOP";
        buttonEl.style.backgroundColor = "#444"; // Dim the button while spinning
        messageEl.innerText = "Spinning...";
        // console.log(ticketsAmount);
        ticketsAmount -= 1;
        // console.log(ticketsAmount);
        ticketsMultiplier.textContent = "x " + ticketsAmount;

        messageEl.className = ""; // Remove any "winner" colors

        // This creates a loop that runs every 50ms
        spinTimer = setInterval(() => {
            reel1.innerText = Math.floor(Math.random() * 9) + 1;
            reel2.innerText = Math.floor(Math.random() * 9) + 1;
            reel3.innerText = Math.floor(Math.random() * 9) + 1;
        }, SPIN_SPEED);
    }
    else {
        root.style.backgroundColor = "#ed0202";
        setTimeout(() => {
            alert("Not enough tickets!");
        }, 300)
    }
}

function stopGame() {
    isSpinning = false;
    clearInterval(spinTimer); // Stops the loop
    
    buttonEl.innerText = "SPIN";
    buttonEl.style.backgroundColor = ""; // Reset button color

    checkWin();
}

function checkWin() {
    // Get the numbers currently on screen
    let r1 = parseInt(reel1.innerText);
    let r2 = parseInt(reel2.innerText);
    let r3 = parseInt(reel3.innerText);

    // 1. Check Visual Match (7-7-7)
    if (r1 === 7 && r2 === 7 && r3 === 7) {
        
        // 2. Check the Hidden RNG (1 in 1,000,000)
        let rngCheck = Math.floor(Math.random() * 1000000) + 1;

        if (rngCheck === 777) {
            messageEl.innerText = "JACKPOT!!!\nYOU DEFIED THE ODDS!\nPRIZE: 777,777,777 TICKETS";
            messageEl.className = "winner";
            alert("REAL JACKPOT!");
        } else {
            messageEl.innerText = "7-7-7!\n(But failed the 1/1,000,000 RNG check)\nComplimentary prize: 77 tickets";
        }
    } else {
        messageEl.innerText = "You lost.\nTry again!";
        root.style.backgroundColor = "#ed0202";
        setTimeout(() => {
            root.style.backgroundColor = "#1a1a1a";
        }, 1000);
    }
}