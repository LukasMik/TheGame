// basic const 

let totalScore, currentScore, dice, activePlayer, playGame, playerName, playerIdentifier, selector

const rollDiceSound = new Audio("./assets/sounds/dice.mp3")
const keepScoreSound = new Audio("./assets/sounds/keepScore.mp3")
const winnerSound = new Audio("./assets/sounds/winner.mp3")
const newGameSound = new Audio("./assets/sounds/newGame.mp3")

const name0 = playerNameFunction("Player 1 name", "#name-0")
const name1 = playerNameFunction("Player 2 name", "#name-1")

let winnerGoal
let maximumScore
let promptWinnerGoal



insertMaximumScore()
console.log(promptWinnerGoal)



// Functions 

function playGameDelay (){
    playGameTrueDelay = setTimeout(function(){playGame = true}, 1000)
}


function playerNameFunction(playerIdentifier, selector) {

    const playerName = prompt(playerIdentifier + " - max 7 characters")
    const maxCharOfName = (playerName.length)

    if (maxCharOfName > 7 || maxCharOfName === 0) {
        alert("Maximum characters of name is 7!")
        return playerNameFunction(playerIdentifier, selector)
    }
    else {
        document.querySelector(selector).textContent = playerName
        console.log(playerName)
        return playerName;

    }
}

function insertMaximumScore(){
    
    let winnerGoal = Number.isFinite(Number(promptWinnerGoal = (prompt("Maximum score:"))))
    
    if (winnerGoal === false || promptWinnerGoal <= 0 || promptWinnerGoal === ""){
        alert("Insert a number greater than 0")
        insertMaximumScore()
    }
    else {
        
    }

    return maximumScore = Number(promptWinnerGoal)
}


function nextPlayer() {
    // activePlayer = activePlayer === 1 ? 0 : 1;
    if (activePlayer === 1) {
        activePlayer = 0
    }
    else {
        activePlayer = 1
    }

    currentScore = 0
    document.querySelector("#currentScorePlayer0").textContent = 0
    document.querySelector("#currentScorePlayer1").textContent = 0
    document.querySelector(".diceImg").style.display = "none"

    document.querySelector(".totalScore0").classList.toggle("activePlayer")
    document.querySelector(".totalScore1").classList.toggle("activePlayer")
}

function newStart() {

    document.querySelector("#totalScorePlayer0").textContent = "0 / " + promptWinnerGoal
    document.querySelector("#totalScorePlayer1").textContent = "0 / " + promptWinnerGoal
    document.querySelector("#currentScorePlayer0").textContent = 0
    document.querySelector("#currentScorePlayer1").textContent = 0
    document.querySelector(".diceImg").style.display = "none"
    document.querySelector("#name-0").textContent = name0
    document.querySelector("#name-1").textContent = name1

    totalScore = [0, 0]
    currentScore = 0
    dice = 0
    activePlayer = 0
    playGame = true

    document.querySelector(".totalScore0").classList.add("activePlayer")
    document.querySelector(".totalScore1").classList.remove("activePlayer")

}

function newStartBtn() {
    if (playGame){
        if(confirm("Are you sure?")){
    newStart()
    newGameSound.play()}
    }        
    else{
        newStart()
        newGameSound.play()
    }
}

// When the page is loaded

newStart()
console.log("Player 1: " + name0 + " | " + "Player 2: " + name1 + " | " + "Maximum score: " + promptWinnerGoal)



// Roll the dice button 

document.querySelector(".rollDice").addEventListener("click", function () {
    

    if (playGame) {
        const dice = Math.ceil(Math.random() * 6)

        const diceElement = document.querySelector(".diceImg")
        document.querySelector(".diceImg").style.display = "block"
        diceElement.src = "assets/img/" + dice + ".jpg"
        console.log(dice)
        rollDiceSound.play()


        if (dice !== 1) {
            currentScore = currentScore + dice
            document.querySelector("#currentScorePlayer" + activePlayer).textContent = currentScore
        }
        
        else {
            nextPlayer()
            console.log("NEXT PLAYER")
            keepScoreSound.play()
            playGame = false
            playGameDelay()
        }

        console.log("Active player: " + activePlayer)
    }

})


// Keep score button 

document.querySelector(".keepScore").addEventListener("click", function () {
    if (playGame) {
        console.log("Clicked on the KEEP SCORE button")
        
        totalScore[activePlayer] = totalScore[activePlayer] + currentScore
        
        document.querySelector("#totalScorePlayer" + activePlayer).textContent = totalScore[activePlayer] + " / " + promptWinnerGoal
        keepScoreSound.play()

        if (totalScore[activePlayer] >= promptWinnerGoal) {
            document.querySelector("#name-" + activePlayer).textContent = "WINNER!"
            document.querySelector(".diceImg").style.display = "none"
            playGame = false
            winnerSound.play()

        }
        else {
            nextPlayer()
        }

        console.log("Active player: " + activePlayer)
    }

})

// New game button 

document.querySelector(".newGame").addEventListener("click", newStartBtn)

function winScoreCounter(){
    
}  

