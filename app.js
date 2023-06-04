// Assign to DOM
const cells = Array.from(document.querySelectorAll('.cell'));
const gameStatus = document.querySelector('.gameStatus');
const gameRestart = document.querySelector('.gameRestart');

let isActive = true
let currentPlayer = 'X';
let gameState = ['','','','','','','','',''];
let gameConditions = [ 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6] 
];





// Add Event Listener
cells.forEach(cell => {
    cell.addEventListener('click', cellHandler)
});
gameRestart.addEventListener('click',gameRestartHandler);





// Functions
function cellHandler() {
    const cellIndex = parseInt(this.dataset.id);

    if(!gameState[cellIndex] && isActive){
        gameState[cellIndex] = currentPlayer;
        this.innerText = currentPlayer;
        this.classList.add('selected')
        gameResult()
    }
}


function changePlayer() {
    currentPlayer = currentPlayer === 'X'?  'O' : 'X';
    gameStatus.innerText = `It's ${currentPlayer}'s Turn`;
}


function gameRestartHandler() {
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('selected')
    });

    currentPlayer = 'X';
    gameStatus.innerText = `It's ${currentPlayer}'s Turn`;
    gameStatus.style.color = 'black';
    gameStatus.style.fontSize = '1.9rem';
    isActive = true
    gameState = ['','','','','','','','',''];
}


function gameResult() {
    let isWin = false

    for (const gameCondition of gameConditions) {
        let state0 = gameState[gameCondition[0]];
        let state1 = gameState[gameCondition[1]];
        let state2 = gameState[gameCondition[2]];

        if(!state0 || !state1 || !state2) continue

        if(state0 === state1 && state1 === state2){
            isWin = true
            break
        }
    }


    if(isWin) {
        gameStatus.innerText = `Player ${currentPlayer} Has Won!`
        gameStatus.style.color = 'rgb(0, 64, 0)';
        gameStatus.style.fontSize = '2.1rem';
        isActive = false
        return
    }

    if(!gameState.includes('')){
        gameStatus.innerText = `Game ended in draw!`
        gameStatus.style.fontSize = '2.1rem';
        isActive = false
        return
    }

    changePlayer()
}