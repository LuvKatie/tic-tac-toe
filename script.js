// Rule of thumb: if you only ever need ONE of something 
// (gameBoard, displayController), use a module. 
// If you need multiples of something (players!), create them with factories.

// Module to encapsulate just the gameboard code itself
let round = 0;

const gboard = document.getElementById('gameboard');

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
        if(this.innerHTML == '' && round % 2 != 0) {
            this.innerHTML = player1.mark;
            round++;
        } else if(this.innerHTML == '' && round % 2 == 0) {
            this.innerHTML = player2.mark;
            round++;
        } else {
            return;
        }
        
        if(round => 5) {
            checkWinner.condition();
        }
    }
    
    createBoard()
    const squares = document.querySelectorAll('.square');
    
    return {
        squares,
    };
})();

const checkWinner = (() => {

    function condition() {
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
                console.log('it works');
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
        condition,
    }

})();