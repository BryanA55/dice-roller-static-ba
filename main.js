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
async function randomDice(diceContainer, numberOfDice) {
    diceContainer.innerHTML = "";

    try {
        const response = await fetch("https://dice-roller-nodejs-ba-a5duafc6gpgve2du.centralus-01.azurewebsites.net/");

        if (!response.ok){
            throw new Error('HTTP Error.');
        }

        const data = await response.json();

        for (const random of data.results) {
            const dice = createDice(random);
            diceContainer.appendChild(dice);
        }
    } catch (error){
        console.error("Error rolling dice:", error);
    }
}



/* Necessary variables */
const numOfDice = 5;
const diceContainer = document.querySelector(".dice-container");
const btnRollDice = document.querySelector(".btn-roll-dice");
/* When the user clicks the button */
const rollDice = () => randomDice(diceContainer, numOfDice);

// Button click event
btnRollDice.addEventListener("click", rollDice);

// Enter key event
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        rollDice();
    }
});

async function pingServer(){
    try {
        const response = await fetch('https://dice-roller-nodejs-ba-a5duafc6gpgve2du.centralus-01.azurewebsites.net/');
        const data = await response.text();
        console.log("Response:", data);
    }
    catch (e){
        console.error("Failed to ping the server", e);
    }
}

async function testCors(){
    try {
        const res = await fetch('https://dice-roller-nodejs-ba-a5duafc6gpgve2du.centralus-01.azurewebsites.net/');
        const data = await resp.json();
        console.log("CORS Failue Response:", data);
    } catch (e) {
        console.error("CORS Failure", e);
    }
}

/* Auto roll dice when webpage is loaded */
window.onload = function() {
    pingServer();
    testCors();

};