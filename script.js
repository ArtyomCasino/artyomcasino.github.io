// --- CONFIGURATION ---
// Change this to make the numbers spin faster/slower (in milliseconds)
const SPIN_SPEED = 50; 
const build = "build a13R326E"
const version = "Artyom's Casino v0.4.5a - Emergency maintainance: Complete #4/5. Undergoing Emergency Maintainance #5"


// --- STATE VARIABLES ---
let isSpinning = false;
let spinTimer = null; // This holds the "interval" ID
let storeOpen = false;
let debugOpen = false;
let settingsOpen = false;
let gasinoTimes = 0;
let savedTickets = localStorage.getItem("artyomTickets");
let ticketsAmount = savedTickets !== null ? parseInt(savedTickets) : 10;
let selectedTickets = localStorage.getItem("purchaseItem");

if (selectedTickets == null) {
    selectedTickets.localStorage.setItem("purchaseItem", 0);
}

// let passwordEntered = document.getElementById("debug-password").textv
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
const passwordField = document.getElementById("debug-password");
const passwordContainer = document.getElementById("debug-password-container");
const debugInterface = document.getElementById("debug-interface");
const debugPasswordTitle = document.getElementById("debug-password-title");
const paypalCheckbox = document.getElementById("paypal-checkbox");
const creditcardCheckbox = document.getElementById("creditcard-checkbox");
const cryptocurrencyCheckbox = document.getElementById("cryptocurrency-checkbox");
const googlepayCheckbox = document.getElementById("googlepay-checkbox");
const adCheckbox = document.getElementById("ad-checkbox");
const giftcardCheckbox = document.getElementById("giftcard-checkbox");
const checkoutPrice = document.getElementById("checkout-price");
const debugTicketsInput = document.getElementById("debug-tickets-input");

// const shopItems = [
//     {name: "1 ticket", value: 1, price: 0.10, img: "ticket.png"},
//     {name: "5 tickets", value: 5, price: 0.49, img: "tickets.png"},
//     {name: "10 tickets", value: 10, price: 0.97, img: "10tickets.png"},
//     {name: "50 tickets", value: 50, price: 4.67, img: "50tickets.png"},
//     {name: "100 tickets", value: 100, price: 7, img: "100tickets.png"},
//     {name: "250 tickets", value: 250, price: 250, img: "250tickets.png"},
//     {name: "500 tickets", value: 500, price: 500, img: "500tickets.png"},
//     {name: "1000 tickets", value: 1000, price: 1000, img: "1000tickets.png"},
//     {name: "5000 tickets", value: 5000, price: 5000, img: "5000tickets.png"},
//     {name: "10000 tickets", value: 10000, price: 10000, img: "10000tickets.png"}
// ]

document.addEventListener("DOMContentLoaded", () => {
    const ticketsMultiplier = document.getElementById("tickets-multiplier");
    if (ticketsMultiplier) {
        ticketsMultiplier.textContent = "x " + ticketsAmount;
    }
});

// The question mark checks if it exists before trying to access .textContent
subtitleVersion?.setAttribute('textContent', version); // Or simply:
if (subtitleVersion) subtitleVersion.textContent = version;

if (versionText) versionText.textContent = version;
if (buildText) buildText.textContent = build;

function selectTickets(amount) {
    localStorage.setItem("purchaseItem", amount);
    selectedTickets = amount;
    alert("Item added to cart");
}

checkoutPrice?.setAttribute('textContent', "Total price: " + String(selectedTickets / 100) + " USD"); // Or simply:
if (checkoutPrice) checkoutPrice.textContent = "Total price: " + String(selectedTickets / 100) + " USD";

function saveGame() {
    localStorage.setItem("artyomTickets", ticketsAmount);
}

function deleteGame() {
    ticketsAmount = 10;
    saveGame();
    ticketsMultiplier.textContent = "x " + ticketsAmount;
}

function proceed() {
    if (checkbox.checked) {
        window.location.href = "main.html";
    }
    else {
        alert("Check the box to accept the disclaimer")
    }
} 

function tickBox(boxTag) {
    console.log(boxTag);
    let box = document.getElementById(boxTag);
    if (box.checked) {
        box.checked = false;
    }
    else {
        box.checked = true;
    }
}

function tickOneBox(boxTag, boxTag2, boxTag3, boxTag4, boxTag5, boxTag6) {
    let box = document.getElementById(boxTag);
    let box2 = document.getElementById(boxTag2);
    let box3 = document.getElementById(boxTag3);
    let box4 = document.getElementById(boxTag4);
    let box5 = document.getElementById(boxTag5);
    let box6 = document.getElementById(boxTag6);
    console.log("boxTag");
    
    if (box.checked) {
        box.checked = false;
    } else {
        box.checked = true;
    }

    if (box.checked) {
        box2.checked = false;
        box3.checked = false;
        box4.checked = false;
        box5.checked = false;
        box6.checked = false;
    }
}

function untickAll(keep) {
    if (keep != "paypal-checkbox") {
        paypalCheckbox.checked = false;
    }
    if (keep != "creditcard-checkbox") {
        creditcardCheckbox.checked = false;
    }
    if (keep != "cryptocurrency-checkbox") {
        cryptocurrencyCheckbox.checked = false;
    }
    if (keep != "googlepay-checkbox") {
        googlepayCheckbox.checked = false;
    }
    if (keep != "ad-checkbox") {
        adCheckbox.checked = false;
    }
    if (keep != "giftcard-checkbox") {
        giftcardCheckbox.checked = false;
    }
}

function getSelectedCheckbox() {
    if (paypalCheckbox.checked) {
        // alert("PayPal");
        window.location.href = "alert.html";
    } else if (creditcardCheckbox.checked) {
        // alert("Credit Card");
        window.location.href = "alert.html";
    } else if (cryptocurrencyCheckbox.checked) {
        // alert("Cryptocurrency");
        window.location.href = "alert.html";
    } else if (googlepayCheckbox.checked) {
        // alert("Google Pay");
        window.location.href = "alert.html";
    } else if (adCheckbox.checked) {
        // console.log(ticketsAmount);
        // console.log(selectedTickets);
        purchaseTicket(parseInt(selectedTickets));
        selectedTickets = localStorage.setItem("purchaseItem", 0);
        // console.log(ticketsAmount);
        saveGame();
        alert("Thank you for your purchase!")
        window.location.href = "main.html";
    } else if (giftcardCheckbox.checked) {
        alert("Coming soon!");
    } else {
        alert("Please select a payment method.");
    }
}

function proceedCheckbox() {
    if (checkbox.checked) {
        getSelectedCheckbox();
    }
    else {
        alert("Check the box to accept the disclaimer")
    }
} 



function enterPassword() {
    if (passwordField.value == "Steak") {
        passwordContainer.style.display = "none";
        debugInterface.style.display = "block"
    }
    else {
        passwordField.value = "";
        debugPasswordTitle.style.color = "red";
        debugPasswordTitle.textContent = "Wrong password!";
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

function debugButton() {
    if (debugOpen == true) {
        document.querySelector(".debug").style.display = "none";
        debugOpen = false;

    }
    else {
        // alert("Refresh the page to open the store");
        document.querySelector(".debug").style.display = "block";
        debugOpen = true;
    }
}

function gasino() {
    if (gasinoTimes <= 15) {
        console.log("Gasino button clicked!");
        messageEl.textContent = "Welcome to Artyom's Gasino!";
        title.textContent = "Gasino";
        gasinoTimes += 1;
        console.log(String(gasinoTimes));
    }

    else {
        debugButton();
    }
}

function purchaseTicket(amount) {
    ticketsAmount += amount;
    // ticketsMultiplier.textContent = "x " + ticketsAmount;
    saveGame();
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
        settingsOpen = false;
        document.querySelector(".settings").style.display = "none";
    }
}

function settingsButton() {
    if (settingsOpen == true) {
        document.querySelector(".settings").style.display = "none";
        settingsOpen = false;
    }
    else {
        // alert("Refresh the page to open the store");
        document.querySelector(".settings").style.display = "flex";
        settingsOpen = true;
        storeOpen = false;
        document.querySelector(".store").style.display = "none";
    }
}

function debug1() {
    reel1.innertext = 7;
    reel2.innerText = 7;
    reel3.innerText = 7;
    checkWin();
}

function debug2() {
    reel1.innertext = 7;
    reel2.innerText = 7;
    reel3.innerText = 7;
    let r1 = parseInt(reel1.innerText);
    let r2 = parseInt(reel2.innerText);
    let r3 = parseInt(reel3.innerText);

    // 1. Check Visual Match (7-7-7)
    if (r1 === 7 && r2 === 7 && r3 === 7) {
        
        // 2. Check the Hidden RNG (1 in 1,000,000)
        let rngCheck = 676767;

        if (rngCheck === 777) {
            purchaseTicket(777777777);
            messageEl.innerText = "JACKPOT!!!\nYOU DEFIED THE ODDS!\nPRIZE: 777,777,777 TICKETS";
            messageEl.className = "winner";
            alert("REAL JACKPOT!");
        } else {
            purchaseTicket(77);
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

function debug3() {
    reel1.innertext = 7;
    reel2.innerText = 7;
    reel3.innerText = 7;
    let r1 = parseInt(reel1.innerText);
    let r2 = parseInt(reel2.innerText);
    let r3 = parseInt(reel3.innerText);

    // 1. Check Visual Match (7-7-7)
    if (r1 === 7 && r2 === 7 && r3 === 7) {
        
        // 2. Check the Hidden RNG (1 in 1,000,000)
        let rngCheck = 777;

        if (rngCheck === 777) {
            purchaseTicket(777777777);
            messageEl.innerText = "JACKPOT!!!\nYOU DEFIED THE ODDS!\nPRIZE: 777,777,777 TICKETS";
            messageEl.className = "winner";
            alert("REAL JACKPOT!");
        } else {
            purchaseTicket(77);
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

function debug4() {
    ticketsAmount = debugTicketsInput.value;
    saveGame();
    ticketsMultiplier.textContent = "x " + ticketsAmount;
}

function startGame() {
    if (ticketsAmount >= 1) {
        isSpinning = true;
        buttonEl.innerText = "STOP";
        buttonEl.style.backgroundColor = "#444"; // Dim the button while spinning
        messageEl.innerText = "Spinning...";
        // console.log(ticketsAmount);
        ticketsAmount -= 1;
        saveGame();
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
            purchaseTicket(777777777);
            saveGame();
            messageEl.innerText = "JACKPOT!!!\nYOU DEFIED THE ODDS!\nPRIZE: 777,777,777 TICKETS";
            messageEl.className = "winner";
            alert("REAL JACKPOT!");
        } else {
            purchaseTicket(77);
            saveGame();
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