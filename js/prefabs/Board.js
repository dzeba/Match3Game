var Match3 = Match3 || {};


Match3.Board = function (state, rows, cols, blockVariations) {

    this.state = state;
    this.rows = rows;
    this.cols = cols;
    this.blockVariations = blockVariations;
    this.score = 0;
    this.gameOver = false;

    //main grid
    this.grid = [];

    let i, j;
    for (i = 0; i < rows; i++) {
        this.grid.push([]);

        for (j = 0; j < cols; j++) {
            this.grid[i].push(0);
        }
    }

    //reserve grid
    this.reserveGrid = [];

    this.RESERVE_ROW = rows;

    for (i = 0; i < this.RESERVE_ROW; i++) {
        this.reserveGrid.push([]);

        for (j = 0; j < cols; j++) {
            this.reserveGrid[i].push(0);
        }
    }

    this.populateGrid();
    this.populateReserveGrid();

};

Match3.Board.prototype.populateGrid = function () {
    let i, j, variation;
    for (i = 0; i < this.rows; i++) {
        for (j = 0; j < this.cols; j++) {
            variation = Math.floor(Math.random() * this.blockVariations) + 1;
            this.grid[i][j] = variation;
        }
    }


    let chains = this.findAllChains();
    if (chains.length > 0) {
        this.populateGrid();
    }
};

Match3.Board.prototype.populateReserveGrid = function () {
    let i, j, variation;
    for (i = 0; i < this.RESERVE_ROW; i++) {
        for (j = 0; j < this.cols; j++) {
            variation = Math.floor(Math.random() * this.blockVariations) + 1;
            this.reserveGrid[i][j] = variation;
        }
    }
};

Match3.Board.prototype.consoleLog = function () {
    let i, j;
    let prettyString = '';

    for (i = 0; i < this.RESERVE_ROW; i++) {
        prettyString += '\n';
        for (j = 0; j < this.cols; j++) {
            prettyString += ' ' + this.reserveGrid[i][j];
        }
    }

    prettyString += '\n';

    for (j = 0; j < this.cols; j++) {
        prettyString += ' -';
    }

    for (i = 0; i < this.rows; i++) {
        prettyString += '\n';
        for (j = 0; j < this.cols; j++) {
            prettyString += ' ' + this.grid[i][j];
        }
    }

    console.log(prettyString);
};

/*
swapping blocks
*/
Match3.Board.prototype.swap = function (source, target) {
    let temp = this.grid[target.row][target.col];
    this.grid[target.row][target.col] = this.grid[source.row][source.col];
    this.grid[source.row][source.col] = temp;

    let tempPos = {row: source.row, col: source.col};
    source.row = target.row;
    source.col = target.col;

    target.row = tempPos.row;
    target.col = tempPos.col;
};

/*
check if two blocks are adjacent
*/
Match3.Board.prototype.checkAdjacent = function (source, target) {
    let diffRow = Math.abs(source.row - target.row);
    let diffCol = Math.abs(source.col - target.col);

    let isAdjacent = (diffRow == 1 && diffCol === 0) || (diffRow == 0 && diffCol === 1);
    return isAdjacent;
};

/*
check block is chained or not
*/
Match3.Board.prototype.isChained = function (block) {
    let isChained = false;
    let variation = this.grid[block.row][block.col];
    let row = block.row;
    let col = block.col;

    //left
    if (variation === this.grid[row][col - 1] && variation === this.grid[row][col - 2]) {
        isChained = true;

    }

    //right
    if (variation === this.grid[row][col + 1] && variation === this.grid[row][col + 2]) {
        isChained = true;
    }

    //up
    if (this.grid[row - 2]) {
        if (variation === this.grid[row - 1][col] && variation === this.grid[row - 2][col]) {
            isChained = true;
        }
    }

    //down
    if (this.grid[row + 2]) {
        if (variation === this.grid[row + 1][col] && variation === this.grid[row + 2][col]) {
            isChained = true;
        }
    }

    //center - horizontal
    if (variation === this.grid[row][col - 1] && variation === this.grid[row][col + 1]) {
        isChained = true;
    }

    //center - vertical
    if (this.grid[row + 1] && this.grid[row - 1]) {
        if (variation === this.grid[row + 1][col] && variation === this.grid[row - 1][col]) {
            isChained = true;
        }
    }

    return isChained;
};
/*
find all the chains
*/
Match3.Board.prototype.findAllChains = function () {
    let chained = [];
    let i, j;

    for (i = 0; i < this.rows; i++) {
        for (j = 0; j < this.cols; j++) {
            if (this.isChained({row: i, col: j})) {
                chained.push({row: i, col: j});

            }

        }
    }

    return chained;
};



/*
clear all the chains*/
Match3.Board.prototype.clearChains = function () {

    let chainedBlocks = this.findAllChains();


    chainedBlocks.forEach(function (block) {

        this.state.getBlockFromColRow(block).kill({asset: 'block'+this.grid[block.row][block.col]});

        this.grid[block.row][block.col] = 0;




        this.score += 20;
        this.state.scoreText.setText('Score: ' + this.score);
        if (this.gameOver){
            this.score = 0;
        }


    }, this);
};


Match3.Board.prototype.dropBlock = function (sourceRow, targetRow, col) {
    this.grid[targetRow][col] = this.grid[sourceRow][col];
    this.grid[sourceRow][col] = 0;

    this.state.dropBlock(sourceRow, targetRow, col);
};


Match3.Board.prototype.dropReserveBlock = function (sourceRow, targetRow, col) {
    this.grid[targetRow][col] = this.reserveGrid[sourceRow][col];
    this.reserveGrid[sourceRow][col] = 0;

    this.state.dropReserveBlock(sourceRow, targetRow, col);
};

/*
move down blocks to fill in empty slots
*/
Match3.Board.prototype.updateGrid = function () {
    let i, j, k, foundBlock;


    for (i = this.rows - 1; i >= 0; i--) {
        for (j = 0; j < this.cols; j++) {

            if (this.grid[i][j] === 0) {
                foundBlock = false;


                for (k = i - 1; k >= 0; k--) {
                    if (this.grid[k][j] > 0) {
                        this.dropBlock(k, i, j);
                        foundBlock = true;
                        break;
                    }
                }

                if (!foundBlock) {
                    //climb up in the reserve grid
                    for (k = this.RESERVE_ROW - 1; k >= 0; k--) {
                        if (this.reserveGrid[k][j] > 0) {
                            this.dropReserveBlock(k, i, j);
                            break;
                        }
                    }
                }
            }
        }
    }

    //repopulate the reserve
    this.populateReserveGrid();
};
Match3.Board.prototype.gameOverFunc = function () {

}