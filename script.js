// Rule of thumb: if you only ever need ONE of something 
// (gameBoard, displayController), use a module. 
// If you need multiples of something (players!), create them with factories.

// Module to encapsulate just the gameboard code itself
let round = 0;
let start = 0;
let winner = 0;

const gboard = document.getElementById('gameboard');
const startBtn = document.getElementById('start');
const restartBtn = document.getElementById('restart');
const player1Entry = document.getElementById('player1-name');
const player2Entry = document.getElementById('player2-name');
const roundText = document.getElementById('rounds');


// Factory Function for creating players
const Player = (name, mark) => {
    const getMark = mark;
    const getName = name;

    return {
        mark: getMark,
        name: getName,
    }
}

const player1 = Player('Tony', 'X');
const player2 = Player('Katie', 'O');

const gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    
    function createBoard() {
        for (i = 0; i < board.length; i++) {
            const boardSquare = document.createElement('div');
            boardSquare.classList.add('square');
            boardSquare.addEventListener('click', setMark);
            gboard.appendChild(boardSquare);
        }
    }

    function setMark() {
        if(round == 8 && !!(checkWinner.conditionCheck)) {
            this.innerHTML = player1.mark;
            roundText.innerHTML = `Rounds: ${round + 1} | It's a tie! Hit the restart button for another game`;
        } else if(this.innerHTML == '' && round % 2 != 0 && start == 1 && winner == 0) {
            this.innerHTML = player1.mark;
            round++;
            roundText.innerHTML = `Rounds: ${round} | Player 2: ${player2Entry.value}'s  turn`;
        } else if(this.innerHTML == '' && round % 2 == 0 && start == 1 && winner == 0) {
            this.innerHTML = player2.mark;
            round++;
            roundText.innerHTML = `Rounds: ${round} | Player 2: ${player1Entry.value}'s  turn`;
        } else {
            return;
        }
        
        if(round => 5) {
            checkWinner.conditionCheck();
        }
    }
    
    createBoard();
    const squares = document.querySelectorAll('.square');

    return {
        createBoard,
        squares,
    };
})();

const checkWinner = (() => {

    function conditionCheck() {
        let square = gameboard.squares;
    
        // Horizontal 3-in-a-row
        let aaa = [square[0], square[1], square[2]];
        let bbb = [square[3], square[4], square[5]];
        let ccc = [square[6], square[7], square[8]];
    
        // Vertical 3-in-a-row
        let abc1 = [square[0], square[3], square[6]];
        let abc2 = [square[1], square[4], square[7]];
        let abc3 = [square[2], square[5], square[8]];
    
        // Diaganol conditions
        let diagTopLeft = [square[0], square[4], square[8]];
        let diagBottomLeft = [square[6], square[4], square[2]];

        let allConditions = [aaa, bbb, ccc, abc1, abc2, abc3, diagTopLeft, diagBottomLeft];
    
        // Starting from the round players are able to create their first possible 3-in-a-row
        // We will start to check for win conditions
        for(i = 0; i < allConditions.length; i++) {
            if (allConditions[i].every(checkPlayerWin)) {
                if(round % 2 == 0 && round != 8) {
                    roundText.innerHTML = `Player 1: ${player1Entry.value} got 3-In-A-Row! They win.`;
                    winner++;
                    return true;
                } else if (round % 2 != 0 && round != 8) {
                    roundText.innerHTML = `Player 2: ${player2Entry.value} got 3-In-A-Row! They win.`;
                    winner++;
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    function checkPlayerWin(check) {
        if(round % 2 == 0) {
            return check.innerHTML == 'X';
        } else {
            return check.innerHTML == 'O';
        }
    }

    return {
        conditionCheck,
    }

})();

startBtn.addEventListener('click', () => {
    if(player1Entry.value.length >= 1 && player2Entry.value.length >= 1) {
        start++;
        roundText.innerHTML = `Rounds: ${round} | Player 2: ${player2Entry.value}'s  turn`;
    } else {
        alert('Please enter a name for both Player 1 and Player 2');
    }
});

restartBtn.addEventListener('click', () => {
    round = 0;
    start = 0;
    winner = 0;
    player1Entry.value = '';
    player2Entry.value = '';
    roundText.innerHTML = 'Rounds:';
    gameboard.squares.forEach(square => {
        square.innerHTML = '';
    });
})