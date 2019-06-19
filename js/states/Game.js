var Match3 = Match3 || {};
let k =0;

Match3.GameState = {

    init: function () {
        this.NUM_ROWS = 8;
        this.NUM_COLS = 7;
        this.NUM_VARIATIONS = 6;
        this.BLOCK_SIZE = 75;
        this.ANIMATION_TIME = 300;
    },

    create: function () {


        this.background = this.add.sprite(0, 0, 'background');
        this.blocks = this.add.group();


        this.board = new Match3.Board(this, this.NUM_ROWS, this.NUM_COLS, this.NUM_VARIATIONS);
        this.board.consoleLog();

        this.drawBoard();

        this.startTime = new Date();
        this.totalTime = 90;
        this.timeElapsed = 0;

        this.createTimer();

        this.gameTimer = this.game.time.events.loop(100, function () {
            this.updateTimer();
        }, this);

        this.scoreText = this.add.text(16, 30, 'Score: 0', {fontSize: '50px Arial', fill: '#000'});

        this.backgroundAudio = this.add.audio('backgroundAudio', 1, true);
        this.backgroundAudio.play();
        this.vol = this.game.add.button(0, this.game.world.centerY + 300, 'volume', this.pinkStart,
            this);
        this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND*4,
            this.createPlayerBullet, this);



    },
    update: function () {
        if (this.timeElapsed >= this.totalTime) {
            this.backgroundAudio.stop();
            this.state.start('HomeState', true, false, 'Game Over');
            this.board.gameOver = true;
        }



    },
    pinkStart: function () {
        if (this.sound !== 'on') {
            this.backgroundAudio.volume = 0;
            this.vol.alpha = 0.5;
            this.sound = 'on'
        }
        else if (this.sound === 'on') {
            this.backgroundAudio.volume = 1;
            this.vol.alpha = 1;
            this.sound = undefined;
        }


    },
    createBlock: function (x, y, data) {
        let block = this.blocks.getFirstExists(false);

        if (!block) {
            block = new Match3.Block(this, x, y, data);
            this.blocks.add(block);
        }
        else {
            block.reset(x, y, data);
        }

        return block;
    },
    drawBoard: function () {
        let i, j, block, square, x, y, data;


        //semi-transparent black squares
        let squareBitmap = this.add.bitmapData(this.BLOCK_SIZE + 4, this.BLOCK_SIZE + 4);
        squareBitmap.ctx.fillStyle = '#000';
        squareBitmap.ctx.fillRect(0, 0, this.BLOCK_SIZE + 4, this.BLOCK_SIZE + 4);

        for (i = 0; i < this.NUM_ROWS; i++) {
            for (j = 0; j < this.NUM_COLS; j++) {
                let variation = this.board.grid[i][j];

                x = 36 + j * (this.BLOCK_SIZE + 6);
                y = 150 + i * (this.BLOCK_SIZE + 6);

                square = this.add.sprite(x, y, squareBitmap);
                square.anchor.setTo(0.5);
                square.alpha = 0.1;


                this.createBlock(x, y, {asset: 'block' + this.board.grid[i][j], row: i, col: j});


            }
        }

this.tutorial();


    },
    tutorial: function () {
        let i, j, x, y, isDone = false;
        k++;
        if (k >= 7) {
            isDone = true;
        }
        console.log(k);



        //semi-transparent black squares

        for (i = 0; i < this.NUM_ROWS; i++) {
            for (j = 0; j < this.NUM_COLS; j++) {
                let variation = this.board.grid[i][j];

                x = 36 + j * (this.BLOCK_SIZE + 6);
                y = 150 + i * (this.BLOCK_SIZE + 6);

                if (this.board.grid[i + 3]) {
                    if (variation === this.board.grid[i + 1][j] &&
                        variation === this.board.grid[i + 3][j] && !isDone) {
                        let hand = this.game.add.sprite(x - 20, y + 250, 'hand');

                        let anim = this.game.add.tween(hand);
                        anim.to({y: y + 150}, 1000);
                        anim.start();
                        anim.repeat(1);
                        isDone = true;
                        anim.onComplete.add(function () {
                            hand.kill();
                        })



                    }
                }
                if (this.board.grid[i - 3]) {
                    if (variation === this.board.grid[i - 1][j] &&
                        variation === this.board.grid[i - 3][j] && !isDone) {
                        let hand = this.game.add.sprite(x - 20, y - 250, 'hand');
                        let anim = this.game.add.tween(hand);
                        anim.to({y: y - 150}, 1000);
                        anim.start();
                        anim.repeat(1);
                        isDone = true;
                        anim.onComplete.add(function () {
                            hand.kill();
                        })


                    }
                }
                if (this.board.grid[i - 3]) {
                    if (variation === this.board.grid[i - 1][j] &&
                        variation === this.board.grid[i - 2][j-1]&&!isDone) {
                        let hand = this.game.add.sprite(x-110,y-170, 'hand');
                        let anim = this.game.add.tween(hand);
                        anim.to({x: x }, 1000);
                        anim.start();
                        anim.repeat(1);
                        isDone = true;
                        anim.onComplete.add(function () {
                            hand.kill();
                        })

                    }
                }
                if (this.board.grid[i - 3]) {
                    if (variation === this.board.grid[i - 1][j] &&
                        variation === this.board.grid[i - 2][j+1]&&!isDone) {
                        let hand = this.game.add.sprite(x+80,y-170, 'hand');
                        let anim = this.game.add.tween(hand);
                        anim.to({x: x-20 }, 1000);
                        anim.start();
                        anim.repeat(1);
                        isDone = true;
                        anim.onComplete.add(function () {
                            hand.kill();
                        })

                    }
                }
                if (variation === this.board.grid[i][j - 1] &&
                    variation === this.board.grid[i][j - 3] && !isDone) {
                    let hand = this.game.add.sprite(x - 300, y, 'hand');
                    let anim = this.game.add.tween(hand);
                    anim.to({x: x - 200}, 1000);
                    anim.start();
                    anim.repeat(1);
                    isDone = true;
                    anim.onComplete.add(function () {
                        hand.kill();
                    })

                }
                if (variation === this.board.grid[i][j + 1] &&
                    variation === this.board.grid[i][j + 3] && !isDone) {
                    let hand = this.game.add.sprite(x + 220, y, 'hand');
                    let anim = this.game.add.tween(hand);
                    anim.to({x: x + 120}, 1000);
                    anim.start();
                    anim.repeat(1);
                    isDone = true;
                    anim.onComplete.add(function () {
                        hand.kill();
                    })

                }
            }
        }


    },
    show:function(){

    },


    getBlockFromColRow: function (position) {
        let foundBlock;

        this.blocks.forEachAlive(function (block) {
            if (block.row === position.row && block.col === position.col) {
                foundBlock = block;
            }
        }, this);

        return foundBlock;
    },
    dropBlock: function (sourceRow, targetRow, col) {
        let block = this.getBlockFromColRow({row: sourceRow, col: col});
        let targetY = 150 + targetRow * (this.BLOCK_SIZE + 6);

        block.row = targetRow;

        let blockMovement = this.game.add.tween(block);
        blockMovement.to({y: targetY}, this.ANIMATION_TIME);
        blockMovement.start();

    },

    dropReserveBlock: function (sourceRow, targetRow, col) {
        let x = 36 + col * (this.BLOCK_SIZE + 6);
        let y = -(this.BLOCK_SIZE + 6) * this.board.RESERVE_ROW + sourceRow * (this.BLOCK_SIZE + 6);

        let block = this.createBlock(x, y, {
            asset: 'block' + this.board.grid[targetRow][col],
            row: targetRow,
            col: col
        });
        let targetY = 150 + targetRow * (this.BLOCK_SIZE + 6);

        let blockMovement = this.game.add.tween(block);
        blockMovement.to({y: targetY}, this.ANIMATION_TIME);
        blockMovement.start();
    },
    swapBlocks: function (block1, block2) {


        block1.scale.setTo(1);

        let block1Movement = this.game.add.tween(block1);
        block1Movement.to({x: block2.x, y: block2.y}, this.ANIMATION_TIME);
        block1Movement.onComplete.add(function () {
            this.board.swap(block1, block2);

            if (!this.isReversingSwap) {
                let chains = this.board.findAllChains();

                if (chains.length > 0) {
                    this.updateBoard();


                }
                else {
                    this.isReversingSwap = true;
                    this.swapBlocks(block1, block2);

                }
            }
            else {
                this.isReversingSwap = false;
                this.clearSelection();
            }

        }, this);
        block1Movement.start();

        let block2Movement = this.game.add.tween(block2);
        block2Movement.to({x: block1.x, y: block1.y}, this.ANIMATION_TIME);
        block2Movement.start();


    },
    pickBlock: function (block) {

        if (this.isBoardBlocked) {
            return;
        }


        if (!this.selectedBlock) {
            //highlight the first block
            block.scale.setTo(1);

            this.selectedBlock = block;
        }
        else {

            this.targetBlock = block;


            if (this.board.checkAdjacent(this.selectedBlock, this.targetBlock)) {

                this.isBoardBlocked = true;


                this.swapBlocks(this.selectedBlock, this.targetBlock);


            }
            else {
                this.clearSelection();
            }
        }


    },
    clearSelection: function () {
        this.isBoardBlocked = false;
        this.selectedBlock = null;
        this.blocks.setAll('scale.x', 1);
        this.blocks.setAll('scale.y', 1);

    },
    updateBoard: function () {
        this.board.clearChains();
        this.board.updateGrid();


        //after the dropping has ended
        this.game.time.events.add(this.ANIMATION_TIME, function () {
            let chains = this.board.findAllChains();

            if (chains.length > 0) {
                this.updateBoard();
            }
            else {
                this.clearSelection();
            }
        }, this);

    },
    createTimer: function () {

        this.timeLabel = this.game.add.text(this.game.world.centerX + 200, 30, "00:00", {
            font: "50px Arial",
            fill: "#000"
        });
        this.timeLabel.anchor.setTo(0.5, 0);
        this.timeLabel.align = 'center';

    },
    updateTimer: function () {
        let currentTime = new Date();
        let timeDifference = this.startTime.getTime() - currentTime.getTime();


        this.timeElapsed = Math.abs(timeDifference / 1000);


        let timeRemaining = this.totalTime - this.timeElapsed;


        let minutes = Math.floor(timeRemaining / 60);
        let seconds = Math.floor(timeRemaining) - (60 * minutes);


        let result = (minutes < 10) ? "0" + minutes : minutes;


        result += (seconds < 10) ? ":0" + seconds : ":" + seconds;

        this.timeLabel.text = result;

    },
    createPlayerBullet: function(){
        this.tutorial();


    },


};
