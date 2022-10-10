// Rule of thumb: if you only ever need ONE of something 
// (gameBoard, displayController), use a module. 
// If you need multiples of something (players!), create them with factories.

// Module to encapsulate just the gameboard code itself
const gboard = document.getElementById('gameboard');

const gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

    function createBoard() {
        for (i = 0; i < board.length; i++) {
            const boardSquare = document.createElement('div');
            boardSquare.classList.add('square', `${i}`);
            boardSquare.addEventListener('click', setMark);
            gboard.appendChild(boardSquare);
        }
    }

    function setMark() {
        this.innerHTML = Tony.mark;
    }

    return {
        createboard: createBoard(),
    };
})();

// Factory Function for creating players
const Player = (name, mark) => {
    const getMark = mark;
    const getName = name;

    return {
        mark: getMark,
        name: getName,
    }
}

const Tony = Player('Tony', 'X');