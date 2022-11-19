const gameBoard = {
    gameFields: ["", "", "", "", "", "", "", "", ""],
}

const playerCreator = (name) => {
    const winCongratulations = () => alert(`Congratulations ${name}, you have won the game!`)
    return {name, winCongratulations};
};

let playerOne;
let playerTwo;


let createPlayer = function() {
    let playerOneName = prompt("Player 1, enter your name");
    playerOne = playerCreator(playerOneName);
    let playerTwoName = prompt("Player 2, enter your name");
    playerTwo = playerCreator(playerTwoName);
    displayBoard();
    let turnPlayerSign = document.createTextNode("X, it's your turn!")
    document.getElementById("turnIndicator").appendChild(turnPlayerSign)
    return {playerOne, playerTwo}
};


const gameFlow = (() => {
    let a = 0;
    let b = 0;
    let scoreBoard = document.createTextNode(`X ${a}:${b} O`)
    document.getElementById("gameScore").appendChild(scoreBoard);
    

    let startButton = document.createElement("button");
    startButton.style.backgroundColor = "green";
    startButton.style.color = "white";
    startButton.style.height = "100px";
    startButton.style.width = "200px";
    startButton.style.fontWeight = "bold";
    startButton.textContent = "Start the game";
    startButton.addEventListener ("click", createPlayer// Wie kann ich dieses Objekt capturen? Teile in der Factory Function einbinden?
    );
    document.getElementById("interfaceLeft").appendChild(startButton);

    let restartButton = document.createElement("button");
    restartButton.style.backgroundColor = "red";
    restartButton.style.color = "white";
    restartButton.style.height = "100px";
    restartButton.style.width = "200px";
    restartButton.style.fontWeight = "bold";
    restartButton.textContent = "Restart the game";
    restartButton.addEventListener ("click", function(){
        turnArrayIndex = 0;
        document.getElementById("turnIndicator").firstChild.data = "X, it's your turn!"
        gameBoard.gameFields.forEach((element, index) => {
            gameBoard.gameFields[index] = "";
        });
        displayBoard();
        a = 0;
        b = 0;
        document.getElementById("gameScore").firstChild.data = `X ${a}:${b} O`;
    });
    document.getElementById("interfaceLeft").appendChild(restartButton);

    let playerSymbol = "X";

    const winConsequences = () => {
        if (playerSymbol == "X") {
            a++;
        } else if (playerSymbol == "O") {
            b++;
        };
        document.getElementById("gameScore").firstChild.data = `X ${a}:${b} O`;
        turnArrayIndex = 0;
        document.getElementById("turnIndicator").firstChild.data = "X, it's your turn!"
        gameBoard.gameFields.forEach((element, index) => {
            gameBoard.gameFields[index] = "";
        })
    }

    let turnArrayIndex = 0;
    turnArray = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];

  const definePlayerSymbol = () => {
            playerSymbol = turnArray[turnArrayIndex];
            turnArrayIndex++;
            return playerSymbol
    };

    return {playerSymbol, definePlayerSymbol, winConsequences}
})();

function checkWinCondition() {
    const isXorO = (currentValue) => currentValue != "";
    if (gameBoard.gameFields[0] == "X" && gameBoard.gameFields[1] == "X" && gameBoard.gameFields[2] == "X" 
    || gameBoard.gameFields[3] == "X" && gameBoard.gameFields[4] == "X" && gameBoard.gameFields[5] == "X"
    || gameBoard.gameFields[6] == "X" && gameBoard.gameFields[7] == "X" && gameBoard.gameFields[8] == "X"
    || gameBoard.gameFields[0] == "X" && gameBoard.gameFields[4] == "X" && gameBoard.gameFields[8] == "X"
    || gameBoard.gameFields[2] == "X" && gameBoard.gameFields[4] == "X" && gameBoard.gameFields[6] == "X"
    || gameBoard.gameFields[0] == "X" && gameBoard.gameFields[3] == "X" && gameBoard.gameFields[6] == "X"
    || gameBoard.gameFields[1] == "X" && gameBoard.gameFields[4] == "X" && gameBoard.gameFields[7] == "X"
    || gameBoard.gameFields[2] == "X" && gameBoard.gameFields[5] == "X" && gameBoard.gameFields[8] == "X") {
        setTimeout( () => playerOne.winCongratulations(), 750)
        gameFlow.winConsequences();
        
        setTimeout( () => displayBoard(), 2500)
    } else if (gameBoard.gameFields[0] == "O" && gameBoard.gameFields[1] == "O" && gameBoard.gameFields[2] == "O" 
    || gameBoard.gameFields[3] == "O" && gameBoard.gameFields[4] == "O" && gameBoard.gameFields[5] == "O"
    || gameBoard.gameFields[6] == "O" && gameBoard.gameFields[7] == "O" && gameBoard.gameFields[8] == "O"
    || gameBoard.gameFields[0] == "O" && gameBoard.gameFields[4] == "O" && gameBoard.gameFields[8] == "O"
    || gameBoard.gameFields[2] == "O" && gameBoard.gameFields[4] == "O" && gameBoard.gameFields[6] == "O"
    || gameBoard.gameFields[0] == "O" && gameBoard.gameFields[3] == "O" && gameBoard.gameFields[6] == "O"
    || gameBoard.gameFields[1] == "O" && gameBoard.gameFields[4] == "O" && gameBoard.gameFields[7] == "O"
    || gameBoard.gameFields[2] == "O" && gameBoard.gameFields[5] == "O" && gameBoard.gameFields[8] == "O") {
        setTimeout( () => playerTwo.winCongratulations(), 750)
        gameFlow.winConsequences();
        setTimeout( () => displayBoard(), 2500)
    } else if (gameBoard.gameFields.every(isXorO)) {
        setTimeout( () => alert('The game ended in a tie'), 750)
        playerSymbol = "X";
        gameBoard.gameFields.forEach((element, index) => {
            gameBoard.gameFields[index] = "";
        })
        setTimeout( () => displayBoard(), 2500);
    }
}

function displayBoard() {
    function removeFields(className){
        let fields = document.getElementsByClassName(className);
        while(fields.length > 0){
            fields[0].parentNode.removeChild(fields[0]);
        }
    }
    removeFields("field");
    gameBoard.gameFields.forEach((element, index) => {
        let field = document.createElement("div"); // alle fields nur einmal erstellen und jeweils nur für Text für das Spielfeld (und den turnIndicator?) und eventListener updaten/loopen - macht Code übersichtlicher?!
        field.classList.add("field");
        let sign = document.createTextNode(gameBoard.gameFields[index])
        field.appendChild(sign);
        if (gameBoard.gameFields[index] == "") {
        field.addEventListener ("click", function(){
            if (document.getElementById("turnIndicator").childNodes.length > 0) {
                while (document.getElementById("turnIndicator").hasChildNodes()) {
                    document.getElementById("turnIndicator").removeChild(document.getElementById("turnIndicator").firstChild);
                  }
            }
            let playerSign = gameFlow.definePlayerSymbol();
            gameBoard.gameFields[index] = playerSign;
            let turnIndicatorSign;
            if (playerSign == "X") {
                turnIndicatorSign = "O";
            } else {
                turnIndicatorSign = "X";
            }
            let turnPlayerSign = document.createTextNode(`${turnIndicatorSign}, it's your turn!`)
            document.getElementById("turnIndicator").appendChild(turnPlayerSign)
            displayBoard();
        });
        }
        document.getElementById("gameGrid").appendChild(field)
    }) 
    checkWinCondition();
};

/*
let playerSign = gameFlow.definePlayerSymbol();
gameBoard.gameFields[index] = playerSign;
debugger
if (playerSign == "X") {
let turnIndicatorSign = "O";
let turnPlayerSign = document.createTextNode(`${turnIndicatorSign}, it's your turn!`)
document.getElementById("turnIndicator").appendChild(turnPlayerSign)
} else {
    let turnIndicatorSign = "X";
    let turnPlayerSign = document.createTextNode(`${turnIndicatorSign}, it's your turn!`)
    document.getElementById("turnIndicator").appendChild(turnPlayerSign) 
} */