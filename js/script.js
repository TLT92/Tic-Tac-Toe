const gameBoard = {
    gameFields: ["X", "O", "X", "O", "X", "O", "X", "O", "X"],
}

function displayBoard() {
    function removeFields(className){
        var fields = document.getElementsByClassName(className);
        while(fields.length > 0){
            fields[0].parentNode.removeChild(fields[0]);
        }
    }
    removeFields("field");

    gameBoard.gameFields.forEach((element, index) => {
        let field = document.createElement("div");
        field.classList.add("field");
        field.addEventListener ("click", function(){
            gameBoard.gameFields[index] = "X"; // abhängig vom Spieler, der dran ist, machen?!
            displayBoard();
        });
        field.style.display = "flex";
        field.style.justifyContent = "center";
        field.style.alignItems = "center";
        field.style.fontSize = "40px";
        let sign = document.createTextNode(gameBoard.gameFields[index])
        field.appendChild(sign);
        document.getElementById("gameGrid").appendChild(field)
    })
};

function addSign(index, sign) {
    gameBoard.gameFields[index] =  sign; //X oder O - DOM Element bzw. Button mit Array-Position assoziieren
    displayBoard();
}

/*         let addXButton = document.createElement("button");
        addXButton.setAttribute("id", `X${index}`);
        addXButton.textContent = "Add X";
        addXButton.addEventListener ("click", function(){
            gameBoard.gameFields[index] = "X";
            displayBoard();
        });
        field.appendChild(addXButton);
        let addOButton = document.createElement("button");
        addOButton.textContent = "Add O";
        addOButton.setAttribute("id", `O${index}`);
        addOButton.addEventListener ("click", function(){
            gameBoard.gameFields[index] = "O";
            displayBoard();
        });
        field.appendChild(addOButton); */


/* function displayBoard() {
    for (let x = 0; x < gameBoard.gameFields.length; x++) {
        let field = document.createElement("div");
        field.style.display = "flex";
        field.style.justifyContent = "center";
        field.style.alignItems = "center";
        let sign = document.createTextNode(gameBoard.gameFields[x])
        field.appendChild(sign);
        document.getElementById("gameGrid").appendChild(field)
    }
} */