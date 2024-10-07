function createDice(num) {
    const dotPositions = {
        /* Gives us all dice dots positions */
        /* Used as matrices */
        1: [
            [50,50]
        ],
        2: [
            [20,20],
            [80,80]
        ],
        3: [
            [20,20],
            [50,50],
            [80,80]
        ],
        4: [
            [20,20],
            [20,80],
            [80,20],
            [80,80]
        ],
        5: [
            [20,20],
            [20,80],
            [50,50],
            [80,20],
            [80,80],
        ],
        6: [
            [20,20],
            [20,80],
            [50,20],
            [50,80],
            [80,20],
            [80,80]
        ]
    };
    const dice = document.createElement("div");
    dice.classList.add("dice");

    /* Places dice dots in the correct spots */
    for (const dotPosition of dotPositions[num]) {
        const dot = document.createElement("div");

        dot.classList.add("dice-dots");
        dot.style.setProperty("--top", dotPosition[0] + "%");
        dot.style.setProperty("--left", dotPosition[1] + "%");
        dice.appendChild(dot);
    }

    return dice;

}

/* Randomizes the dice numbers */
function randomDice(diceContainer, numberOfDice) {
    diceContainer.innerHTML = "";

    for (let i =0; i < numberOfDice; i++) {
        const random = Math.floor((Math.random() * 6) + 1);
        const dice = createDice(random);

        diceContainer.appendChild(dice);
    }
}
/* Necessary variables */
const numOfDice = 5;
const diceContainer = document.querySelector(".dice-container");
const btnRollDice = document.querySelector(".btn-roll-dice");
/* When the user clicks the button */
btnRollDice.addEventListener("click", () => {
    randomDice(diceContainer, numOfDice);
});
document.addEventListener("keydown", (event) => { /* Enter key rolls dice */
    if (event.key === "Enter") {
        randomDice(diceContainer, numOfDice);
    }
});

/* Auto roll dice when webpage is loaded */
window.onload = function() {
    randomDice(diceContainer,numOfDice);
};


const express = require('express');
const path = require('path'); // Require path for directory access
const app = express();
const cors = require("cors");

// Enable CORS if needed
const allowed = ['https://mango-mud-0f2f49210.5.azurestaticapps.net'];
app.use(cors({
	origin: allowed,
	methods: ['GET', 'POST'],
	credentials: true
}));

// Serve static files (HTML, CSS, JS) from the original folder (replace 'your-folder' with actual folder name)
app.use(express.static(__dirname));

// Roll Dice logic
function rollDice(numberOfDice) {
    const diceRolls = [];
    for (let i = 0; i < numberOfDice; i++) {
        const random = Math.floor((Math.random() * 6) + 1);
        diceRolls.push(random);
    }
    return diceRolls;
}

app.get('/roll', (req, res) => {
    const numberOfDice = parseInt(req.query.numberOfDice) || 1;
    const results = rollDice(numberOfDice);
    res.status(200).json({ results });
});

// Set the port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
