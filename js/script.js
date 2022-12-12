let opponent;
let playerOne;
let playerTwo;

const gameMode = (() => {
    const smartAI = () => {
        return opponent = "Smart AI";
    }
    const randomAI = () => {
        return opponent = "Random AI";
    }
    const human = () => {
        return opponent = "human";
    }
    return {smartAI, randomAI, human, opponent}
})();

const playerCreator = (name) => {
    const winCongratulations = () => {
        let congratulationDiv = document.createElement("div");
        document.getElementById("interfaceMiddleBottom").appendChild(congratulationDiv);
        setTimeout( () => congratulationDiv.textContent = `Congratulations ${name}, you have won the game! The next round will start in 3, 2, 1`, 750);
        setTimeout( () => congratulationDiv.remove(), 3000);
    }
    const lossCondolences = () => {
        let condolencesDiv = document.createElement("div");
        document.getElementById("interfaceMiddleBottom").appendChild(condolencesDiv);
        setTimeout( () => condolencesDiv.textContent = `The AI beat you! Better luck next time, ${name}! The next round will start in 3, 2, 1`, 750);
        setTimeout( () => condolencesDiv.remove(), 3750);
    }

    const tieMessage = () => {
        let tieMessageDiv = document.createElement("div");
        document.getElementById("interfaceMiddleBottom").appendChild(tieMessageDiv);
        setTimeout( () => tieMessageDiv.textContent = "The game ended in a tie! Try again! The next round will start in 3, 2, 1", 750)
        setTimeout( () => tieMessageDiv.remove(), 3750);
    }

    const changeName = () => {
        playerOne.name = prompt("Player 1, enter your name");
        if (opponent == "Smart AI" || opponent == "Random AI") {
            playerTwo.name = "AI";
        } else {
            playerTwo.name = prompt("Player 2, enter your name");
        }
    }
    return {name, winCongratulations, lossCondolences, tieMessage, changeName};
};


const getNames = () => {
    playerOne = playerCreator(prompt("Player 1, enter your name"));
    if (opponent == "Smart AI" || opponent == "Random AI") {
        playerTwo = playerCreator(opponent);
    } else {
        playerTwo = playerCreator(prompt("Player 2, enter your name"));
    }
    return {playerOne, playerTwo}
}




const artificialIntelligence = (() => {
    const randomizer = () => {
    let randomIndex = Math.floor(Math.random() * 3);
    let randomIndexTwo = Math.floor(Math.random() * 3)
    if (board[randomIndex][randomIndexTwo] == "_") {
        board[randomIndex][randomIndexTwo] = "o";
        document.getElementById(`${randomIndex}${randomIndexTwo}`).textContent = "o";
        victoryCheck();
    } else {
      randomizer();
     }
    }
    return {randomizer}
})();


const computerMove = () => {
    if (board[0].includes('_') || board[1].includes('_') || board[2].includes('_')) {
        let bestMove = findBestMove(board);
        board[bestMove.row][bestMove.col] = "o";
        document.getElementById(`${bestMove.row}${bestMove.col}`).textContent = "o";
        victoryCheck();
    }
}



const gameFlow = (() => {
    const initializeBoard = function() {
        let board = [ [ '_', '_', '_' ],
                    [ '_', '_', '_' ],
                    [ '_', '_', '_' ] ];
        let scoreBoard = document.createElement("div");;

        if (document.getElementById("gameScore").childNodes.length == 0) {
            scoreBoard.textContent = `${playerOne.name} 0:0 ${playerTwo.name}`;
            document.getElementById("gameScore").appendChild(scoreBoard);
        } else {
            document.getElementById("gameScore").firstChild.textContent = `${playerOne.name} 0:0 ${playerTwo.name}`;
        }

        return {initializeBoard, board}
    }


    const displayBoard = () => {
        let playerSymbol = ["x", "o"]
        let index = 0;
        let clickability = "unblocked";
        let clickabilityFunction = function() {
            clickability = "unblocked";
        }

        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                field = document.createElement("div");
                field.classList.add("field");
                field.setAttribute("id", `${i}${j}`)
                field.textContent = board[i][j];
                field.addEventListener ("click", function(){
                if (opponent == "Smart AI" && this.textContent !== "x" && this.textContent !== "o" && clickability == "unblocked" ||
                    opponent == "Random AI" && this.textContent !== "x" && this.textContent !== "o" && clickability == "unblocked" ||
                    opponent == "human" && this.textContent !== "x" && this.textContent !== "o") {
                        this.textContent = playerSymbol[index];
                        board[i][j] = playerSymbol[index];
                        clickability = "blocked";
                        setTimeout( () => clickabilityFunction(), 1010);
                        highlightIllegalFields();
                        victory = victoryCheck(); // durch diese Zuweisung der Funktion bzw. dem Callen "auf" eine Variable wird die Funktion erst vollständig ausgeführt, bevor der weitere Code dran ist
                        if (opponent == "Smart AI" && document.getElementById("interfaceMiddleBottom").childNodes.length == 0) {
                            setTimeout( () => computerMove(), 1000);
                            setTimeout( () => highlightIllegalFields(), 1005);
                        } else if (opponent == "Random AI" && document.getElementById("interfaceMiddleBottom").childNodes.length == 0) {
                            setTimeout( () => artificialIntelligence.randomizer(), 1000);
                            setTimeout( () => highlightIllegalFields(), 1005);
                        } else if (opponent == "human" && document.getElementById("interfaceMiddleBottom").childNodes.length == 0) {
                            index = 1 - index;
                        } else if (opponent == "human" && document.getElementById("interfaceMiddleBottom").childNodes.length !== 0) {
                            index = 0;
                        }
                    }
                })
                document.getElementById("gameGrid").appendChild(field);
            }
        }
        return index
    }

    const highlightIllegalFields = function() {
        Array.from(document.getElementsByClassName("field")).forEach((element) => {
            if (element.textContent == "x" || element.textContent == "o") {
                element.classList.add("illegalField");
            }
        });
    }

    const resetGame = function() {
        board = [ [ '_', '_', '_' ],
                  [ '_', '_', '_' ],
                  [ '_', '_', '_' ] ];

        Array.from(document.getElementsByClassName("field")).forEach((element) => {
        element.textContent = "_";
        element.classList.remove("illegalField");
        });

        index = 0;

        return resetGame
    };

    const resetCounter = function() {
        playerOneCount = 0;
        playerTwoCount = 0;
        document.getElementById("gameScore").firstChild.textContent = `${playerOne.name} ${playerOneCount}:${playerTwoCount} ${playerTwo.name}`;
        return resetCounter
    }

        let playerOneCount = 0;
        let playerTwoCount = 0;

        const increaseA = () => {
            playerOneCount++;
            setTimeout( () => document.getElementById("gameScore").firstChild.textContent = `Tim ${playerOneCount}:${playerTwoCount} ${playerTwo.name}`, 750)
        };
        const increaseB = () => {
            playerTwoCount++;
            setTimeout( () => document.getElementById("gameScore").firstChild.textContent = `Tim ${playerOneCount}:${playerTwoCount} ${playerTwo.name}`, 750)
        };
    

    document.getElementById("restartButton").addEventListener ("click", resetGame());


    return {increaseA, increaseB, resetGame, resetCounter, initializeBoard, displayBoard, highlightIllegalFields}
})();



const victoryCheck = () => {
    let b = board;
        // Checking for Rows for X or O victory.
        for(let row = 0; row < 3; row++)
        {
            if (b[row][0] == b[row][1] &&
                b[row][1] == b[row][2])
            {
                if (b[row][0] == computer) {
                    gameFlow.increaseB(),
                    document.getElementById(`${row}${0}`).classList.add("winningField")
                    document.getElementById(`${row}${1}`).classList.add("winningField")
                    document.getElementById(`${row}${2}`).classList.add("winningField")
                    setTimeout( () => gameFlow.resetGame(), 3000)
                    let winningArray = Array.from(document.getElementsByClassName("winningField"));
                    setTimeout( () => winningArray.forEach((element) => element.classList.remove("winningField")), 3000)  

                    if(opponent == "Smart AI" || opponent == "Random AI")
                         playerOne.lossCondolences();
                        
                        else if (opponent == "human")
                            playerTwo.winCongratulations();
                }
                else if (b[row][0] == human) {
                    gameFlow.increaseA(),
                    playerOne.winCongratulations(),
                    document.getElementById(`${row}${0}`).classList.add("winningField")
                    document.getElementById(`${row}${1}`).classList.add("winningField")
                    document.getElementById(`${row}${2}`).classList.add("winningField")
                    setTimeout( () => gameFlow.resetGame(), 3000)
                    let winningArray = Array.from(document.getElementsByClassName("winningField"))
                    setTimeout( () => winningArray.forEach((element) => element.classList.remove("winningField")), 3000)       
                }
            }   
        }
      
        // Checking for Columns for X or O victory.
        for(let col = 0; col < 3; col++)
        {
            if (b[0][col] == b[1][col] &&
                b[1][col] == b[2][col])
            {
                if (b[0][col] == computer) {
                    gameFlow.increaseB(),
                    document.getElementById(`${0}${col}`).classList.add("winningField"),
                    document.getElementById(`${1}${col}`).classList.add("winningField"),
                    document.getElementById(`${2}${col}`).classList.add("winningField"),
                    setTimeout( () => gameFlow.resetGame(), 3000);
                    let winningArray = Array.from(document.getElementsByClassName("winningField"));
                    setTimeout( () => winningArray.forEach((element) => element.classList.remove("winningField")), 3000)
                
                    if(opponent == "Smart AI" || opponent == "Random AI")
                        playerOne.lossCondolences();
                    
                    else if (opponent == "human")
                        playerTwo.winCongratulations();
                }
                else if (b[0][col] == human)
                    gameFlow.increaseA(),
                    document.getElementById(`${0}${col}`).classList.add("winningField"),
                    document.getElementById(`${1}${col}`).classList.add("winningField"),
                    document.getElementById(`${2}${col}`).classList.add("winningField"),
                    playerOne.winCongratulations(), 
                    setTimeout( () => gameFlow.resetGame(), 3000);
                    let winningArray = Array.from(document.getElementsByClassName("winningField"));
                    setTimeout( () => winningArray.forEach((element) => element.classList.remove("winningField")), 3000)  
               
            }
        }
      
        // Checking for Diagonals for X or O victory.
        if (b[0][0] == b[1][1] && 
            b[1][1] == b[2][2])
        {
            if (b[0][0] == computer) {
                gameFlow.increaseB(),
                document.getElementById(`${0}${0}`).classList.add("winningField"),
                document.getElementById(`${1}${1}`).classList.add("winningField"),
                document.getElementById(`${2}${2}`).classList.add("winningField"),
                setTimeout( () => gameFlow.resetGame(), 3000);
                let winningArray = Array.from(document.getElementsByClassName("winningField"));
                setTimeout( () => winningArray.forEach((element) => element.classList.remove("winningField")), 3000)

                if(opponent == "Smart AI" || opponent == "Random AI")
                    playerOne.lossCondolences();
            
                else if (opponent == "human")
                    playerTwo.winCongratulations();
            }    
            else if (b[0][0] == human)
                gameFlow.increaseA(),
                document.getElementById(`${0}${0}`).classList.add("winningField"),
                document.getElementById(`${1}${1}`).classList.add("winningField"),
                document.getElementById(`${2}${2}`).classList.add("winningField"),
                playerOne.winCongratulations(), 
                setTimeout( () => gameFlow.resetGame(), 3000);
                let winningArray = Array.from(document.getElementsByClassName("winningField"));
                setTimeout( () => winningArray.forEach((element) => element.classList.remove("winningField")), 3000)  
        }
      
        if (b[0][2] == b[1][1] &&
            b[1][1] == b[2][0])
        {
            if (b[0][2] == computer) {
                gameFlow.increaseB(),
                document.getElementById(`${0}${2}`).classList.add("winningField"),
                document.getElementById(`${1}${1}`).classList.add("winningField"),
                document.getElementById(`${2}${0}`).classList.add("winningField"),
                setTimeout( () => gameFlow.resetGame(), 3000);
                let winningArray = Array.from(document.getElementsByClassName("winningField"));
                setTimeout( () => winningArray.forEach((element) => element.classList.remove("winningField")), 3000)

                if(opponent == "Smart AI" || opponent == "Random AI")
                    playerOne.lossCondolences();
                
                else if (opponent == "human")
                    playerTwo.winCongratulations();
            }      
            else if (b[0][2] == human)
                gameFlow.increaseA(),
                document.getElementById(`${0}${2}`).classList.add("winningField"),
                document.getElementById(`${1}${1}`).classList.add("winningField"),
                document.getElementById(`${2}${0}`).classList.add("winningField"),
                playerOne.winCongratulations(), 
                setTimeout( () => gameFlow.resetGame(), 3000);
                let winningArray = Array.from(document.getElementsByClassName("winningField"));
                setTimeout( () => winningArray.forEach((element) => element.classList.remove("winningField")), 3000)
                
        } else if (!b[0].includes('_') && !b[1].includes('_') && !b[2].includes('_') && document.getElementById("interfaceMiddleBottom").childNodes.length == 0) { 
            playerOne.tieMessage();
            setTimeout( () => gameFlow.resetGame(), 3000);
        }  
}

// Javascript program to find the
// next optimal move for a player

class Move
{
    constructor()
    {
        let row,col;
    }
}
 
let computer = 'o', human = 'x';
 
// This function returns true if there are moves
// remaining on the board. It returns false if
// there are no moves left to play.
function isMovesLeft(board)
{
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if (board[i][j] == '_')
                return true;
                 
    return false;
}
 
// This is the evaluation function as discussed
// in the previous article ( http://goo.gl/sJgv68 )
function evaluate(b)
{
     
    // Checking for Rows for X or O victory.
    for(let row = 0; row < 3; row++)
    {
        if (b[row][0] == b[row][1] &&
            b[row][1] == b[row][2])
        {
            if (b[row][0] == computer)
                return +10;
                 
            else if (b[row][0] == human)
                return -10;
        }
    }
  
    // Checking for Columns for X or O victory.
    for(let col = 0; col < 3; col++)
    {
        if (b[0][col] == b[1][col] &&
            b[1][col] == b[2][col])
        {
            if (b[0][col] == computer)
                return +10;
  
            else if (b[0][col] == human)
                return -10;
        }
    }
  
    // Checking for Diagonals for X or O victory.
    if (b[0][0] == b[1][1] && b[1][1] == b[2][2])
    {
        if (b[0][0] == computer)
            return +10;
             
        else if (b[0][0] == human)
            return -10;
    }
  
    if (b[0][2] == b[1][1] &&
        b[1][1] == b[2][0])
    {
        if (b[0][2] == computer)
            return +10;
             
        else if (b[0][2] == human)
            return -10;
    }
  
    // Else if none of them have
    // won then return 0
    return 0;
}
 
// This is the minimax function. It
// considers all the possible ways
// the game can go and returns the
// value of the board



function minimax(board, depth, isMax)
{
    let score = evaluate(board);
  
    // If Maximizer has won the game
    // return his/her evaluated score
    if (score == 10)
        return score;
  
    // If Minimizer has won the game
    // return his/her evaluated score
    if (score == -10)
        return score;
  
    // If there are no more moves and
    // no winner then it is a tie
    if (isMovesLeft(board) == false)
        return 0;
  
    // If this maximizer's move
    if (isMax)
    {
        let best = -1000;
  
        // Traverse all cells
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                 
                // Check if cell is empty
                if (board[i][j]=='_')
                {
                     
                    // Make the move
                    board[i][j] = computer;
  
                    // Call minimax recursively
                    // and choose the maximum value
                    best = Math.max(best, minimax(board,
                                    depth + 1, !isMax));
  
                    // Undo the move
                    board[i][j] = '_';
                }
            }
        }
        return best;
    }
  
    // If this minimizer's move
    else
    {
        let best = 1000;
  
        // Traverse all cells
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                 
                // Check if cell is empty
                if (board[i][j] == '_')
                {
                     
                    // Make the move
                    board[i][j] = human;
  
                    // Call minimax recursively and
                    // choose the minimum value
                    best = Math.min(best, minimax(board,
                                    depth + 1, !isMax));
  
                    // Undo the move
                    board[i][j] = '_';
                }
            }
        }
        return best;
    }
}
 
// This will return the best possible
// move for the player
function findBestMove(board)
{
    let bestVal = -1000;
    let bestMove = new Move();
    bestMove.row = -1;
    bestMove.col = -1;
  
    // Traverse all cells, evaluate
    // minimax function for all empty
    // cells. And return the cell
    // with optimal value.
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
             
            // Check if cell is empty
            if (board[i][j] == '_')
            {
                 
                // Make the move
                board[i][j] = computer;
  
                // compute evaluation function
                // for this move.
                let moveVal = minimax(board, 0, false);
  
                // Undo the move
                board[i][j] = '_';
  
                // If the value of the current move
                // is more than the best value, then
                // update best
                if (moveVal > bestVal)
                {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }
    return bestMove
}


document.getElementById("playSmartAIButton").addEventListener("click", function(){ // die Buttons unklickbar machen, wenn sie opaque sind!
    if (document.getElementById("playRandomAIButton").style.opacity == "0.5") {
        document.getElementById("playRandomAIButton").style.opacity = "1";
        gameMode.smartAI();
        playerTwo = playerCreator("Smart AI");
        gameFlow.initializeBoard();
        gameFlow.resetGame();
        gameFlow.resetCounter();
        document.getElementById("playSmartAIButton").style.opacity = "0.5";
    } else if (document.getElementById("playHumanButton").style.opacity == "0.5") {
        document.getElementById("playHumanButton").style.opacity = "1";
        gameMode.smartAI();
        playerTwo = playerCreator("Smart AI");
        gameFlow.initializeBoard();
        gameFlow.resetCounter();
        gameFlow.resetGame();
        document.getElementById("playSmartAIButton").style.opacity = "0.5";
    } else if (document.getElementById("playSmartAIButton").style.opacity == "0.5") {
        gameMode.smartAI();
        gameFlow.resetGame();
        gameFlow.resetCounter();
    } else {
        gameMode.smartAI();
        getNames();
        gameFlow.initializeBoard();
        gameFlow.displayBoard();
        document.getElementById("playSmartAIButton").style.opacity = "0.5";
    }
});

document.getElementById("playRandomAIButton").addEventListener("click", function(){
    if (document.getElementById("playSmartAIButton").style.opacity == "0.5") {
        document.getElementById("playSmartAIButton").style.opacity = "1";
        gameMode.randomAI();
        playerTwo.name = "Random AI";
        gameFlow.resetGame();
        gameFlow.resetCounter();
        document.getElementById("playRandomAIButton").style.opacity = "0.5";
    } else if (document.getElementById("playHumanButton").style.opacity == "0.5") {
        document.getElementById("playHumanButton").style.opacity = "1";
        gameMode.randomAI();
        playerTwo.name = "RandomAI";
        gameFlow.resetCounter();
        gameFlow.resetGame();
        document.getElementById("playRandomAIButton").style.opacity = "0.5";
    } else if (document.getElementById("playRandomAIButton").style.opacity == "0.5") {
        gameMode.randomAI();
        gameFlow.resetGame();
        gameFlow.resetCounter();
    } else {
        gameMode.randomAI();
        getNames();
        gameFlow.initializeBoard();
        gameFlow.displayBoard();
        document.getElementById("playRandomAIButton").style.opacity = "0.5";;
    }
});

document.getElementById("playHumanButton").addEventListener("click", function(){
    if (document.getElementById("playSmartAIButton").style.opacity == "0.5") {
        document.getElementById("playSmartAIButton").style.opacity = "1";
        gameMode.human();
        playerTwo = playerCreator(prompt("Player 2, please enter your name"));
        gameFlow.resetGame();
        gameFlow.resetCounter();
        document.getElementById("playHumanButton").style.opacity = "0.5";
    } else if (document.getElementById("playRandomAIButton").style.opacity == "0.5") {
        document.getElementById("playRandomAIButton").style.opacity = "1";
        gameMode.human();
        playerTwo = playerCreator(prompt("Player 2, please enter your name"));
        gameFlow.resetGame();
        gameFlow.resetCounter();
        document.getElementById("playHumanButton").style.opacity = "0.5";
    } else if (document.getElementById("playHumanButton").style.opacity == "0.5") {
        gameMode.human();
        gameFlow.resetGame();
        gameFlow.resetCounter();
    } else {
        gameMode.human();
        getNames();
        gameFlow.initializeBoard();
        gameFlow.displayBoard();
        gameFlow.resetGame();
        gameFlow.resetCounter();
        document.getElementById("playHumanButton").style.opacity = "0.5";
    }
})