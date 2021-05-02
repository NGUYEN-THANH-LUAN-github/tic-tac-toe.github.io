let gameBoard = document.querySelector('[board]');;
let grids;
const oButton = document.querySelector('[play-as-O]');
const xButton = document.querySelector('[play-as-X]');
const result = document.querySelector('[result]');

result.innerText = "Please choose O or X"

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const div = document.createElement('div');
        div.classList.add('grid');
        div.setAttribute('grid', i);
        gameBoard.appendChild(div);
    }
    grids = gameBoard.querySelectorAll('[grid]');
    game.clearBoard();
}



Array.prototype.sample = function() {
    const index = Math.floor(Math.random() * this.length)
    const element = this[index];
    return { index, element };
};

const game = (function() {
    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];
    clearBoard = function() {
        grids.forEach(grid => {
            grid.classList.remove('disabled');
        });
        this.board = [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ]
    };
    checkIfFinished = function(grid) {
        if (
            this.board[0] === this.board[1] && this.board[0] === this.board[2] && this.board[0] !== "" ||
            this.board[3] === this.board[4] && this.board[3] === this.board[5] && this.board[3] !== "" ||
            this.board[6] === this.board[7] && this.board[6] === this.board[8] && this.board[6] !== "" ||
            this.board[0] === this.board[3] && this.board[0] === this.board[6] && this.board[0] !== "" ||
            this.board[1] === this.board[4] && this.board[1] === this.board[7] && this.board[1] !== "" ||
            this.board[2] === this.board[5] && this.board[2] === this.board[8] && this.board[2] !== "" ||
            this.board[0] === this.board[4] && this.board[0] === this.board[8] && this.board[0] !== "" ||
            this.board[2] === this.board[4] && this.board[2] === this.board[6] && this.board[2] !== ""
        ) {
            return true
        } else {
            return false
        }
    }
    checkIfDraw = function() {
        for (let grid of this.board) {
            if (grid === "") {
                return false;
            }
        }
        return true
    }
    return {
        board,
        clearBoard,
        checkIfFinished,
        checkIfDraw
    }
})();

oButton.addEventListener('click', () => {
    result.innerText = "You are playing as O. Computer plays first.";
    gameBoard.innerHTML = "";
    createBoard();
    display();
    computerChooseX();
    display();
    playAsO(grids);
});

xButton.addEventListener('click', () => {
    result.innerText = "You are playing as X. You plays first."
    gameBoard.innerHTML = "";
    createBoard();
    display();
    display();
    playAsX(grids);
});

function computerChooseX() {
    while (!game.checkIfFinished()) {
        let sample = game.board.sample();
        if (sample.element === "") {
            game.board[sample.index] = "X";
            if (game.checkIfFinished()) {
                result.innerText = "You Lost!"
            }
            if (game.checkIfDraw()) {
                result.innerText = "Draw! Choose O or X to play again"
            }
            return;
        }
    }
}

function computerChooseO() {
    while (!game.checkIfFinished()) {
        let sample = game.board.sample();
        if (sample.element === "") {
            game.board[sample.index] = "O";
            if (game.checkIfFinished()) {
                result.innerText = "You Lost!"
            }
            return;
        }
    }
}

function display() {
    let i = 0;
    grids.forEach(grid => {
        grid.innerText = game.board[i];
        i++;
    })
}

function playAsO(grids) {
    grids.forEach(grid => {
        grid.addEventListener('click', () => {
            if (!grid.innerText && !game.checkIfFinished()) {
                grid.innerText = "O";
                game.board[grid.getAttribute('grid')] = grid.innerText;
                if (game.checkIfFinished()) {
                    result.innerText = "You Won!"
                }
                computerChooseX();
                display();
            }
            if (game.checkIfFinished() || game.checkIfDraw()) {
                grids.forEach(grid => {
                    grid.classList.add('disabled');
                })
            }
        })
    })
}

function playAsX(grids) {
    grids.forEach(grid => {
        grid.addEventListener('click', () => {
            if (!grid.innerText && !game.checkIfFinished()) {
                grid.innerText = "X";
                game.board[grid.getAttribute('grid')] = grid.innerText;
                if (game.checkIfFinished()) {
                    result.innerText = "You Won!"
                }
                if (game.checkIfDraw()) {
                    result.innerText = "Draw! Choose O or X to play again"
                }
                if (!game.checkIfDraw()) {
                    computerChooseO();
                }
                display();
            }
            if (game.checkIfFinished() || game.checkIfDraw()) {
                grids.forEach(grid => {
                    grid.classList.add('disabled');
                })
            }
        })
    })
}