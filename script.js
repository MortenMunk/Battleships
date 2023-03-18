const boardContainer = document.querySelector('.boardContainer')
const Y_AXIS = 10;
const X_AXIS = 10;

function gameboard() {
    return {
        board: [],
        shipLocations: [],
        createBoard() {
            const cellContainer = document.createElement('div');
            cellContainer.classList.add("cellContainer");
            for(let i = 0; i < Y_AXIS; i++) {
                this.board[i] = [];
                for(let j = 0; j < X_AXIS; j++) {
                    const currentCell = document.createElement('div');
                    currentCell.classList.add("cell");
                    cellContainer.appendChild(currentCell);
                    this.board[i][j] = currentCell;
                }
            }
            boardContainer.appendChild(cellContainer);
            this.shipLocations = [];
            return this.board;
        },

        receiveAttack(i,j) {  
            //TODO  
        },

        placeShip(i, j, ship, isVertical) {
            for(let k = 0; k < ship.shipLength; k++) {
                if(isVertical && i < (Y_AXIS - (ship.shipLength-1))) {
                    if(this.shipLocations[i+k] && this.shipLocations[i+k][j]) {
                        return false;
                    } else {
                        this.board[i+k][j].classList.add("ship");
                        this.shipLocations[i+k] = this.shipLocations[i+k] || [];
                        this.shipLocations[i+k][j] = ship;
                    }
                } else if(!isVertical && j < (X_AXIS - (ship.shipLength-1))) {
                    if (this.shipLocations[i+k] && this.shipLocations[i+k][j]) {
                        return false;
                    } else {
                        this.board[i][j+k].classList.add("ship");
                        this.shipLocations[i+k] = this.shipLocations[i+k] || [];
                        this.shipLocations[i+k][j] = ship;
                    }
                }
            }
            return true;
        }
    }
}

function ship(shipLength) {
    return {
        shipLength: shipLength,
        numberOfHits: 0,
        
        hit() {
            this.numberOfHits += 1;
        },

        isSunk() {
            if(numberOfHits < shipLength) {
                return false;
            } else {
                return true;
            }
        }
    }
}

const playerBoard = gameboard();
const computerBoard = gameboard();

playerBoard.createBoard();
computerBoard.createBoard();
const playerDestroyer = ship(2);
playerBoard.placeShip(9, 9, playerDestroyer, false);
