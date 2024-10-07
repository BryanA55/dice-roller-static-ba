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

async function pingServer(){
    try {
        const response = await fetch();
        const data = await response.text();
        console.log("Response:", data);
    }
    catch (e){
        console.error("Failed to ping the server", e);
    }
}

/* Auto roll dice when webpage is loaded */
window.onload = function() {
    randomDice(diceContainer,numOfDice);
    


    
};