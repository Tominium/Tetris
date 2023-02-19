class Board {

    constructor(ctx, ctxNext) {
        this.ctx = ctx;
        this.ctxNext = ctxNext;
        this.ctx.canvas.width = COLS * BLOCK_SIZE;
        this.ctx.canvas.height = ROWS * BLOCK_SIZE;
        this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
        this.ghostPiece = new Piece(this.ctx);
        this.ghostPiece.color = 'rgba(150, 150, 150, 0.5)';

        this.holdPiece = null;
        this.holdCtx = document.getElementById('hold').getContext('2d');
        this.holdCtx.canvas.width = 6 * 30;
        this.holdCtx.canvas.height = 5 * 30;
        this.holdCtx.scale(30, 30);
    }



    reset() {
        this.grid = this.getEmptyBoard();
        this.piece = new Piece(this.ctx);
        this.piece.setStartingPosition();
        this.holdPiece = null;
        const { width, height } = this.holdCtx.canvas;
        this.holdCtx.clearRect(0, 0, width, height);
        this.getNewPiece();
    }

    getEmptyBoard() {
        return Array.from(
            { length: 20 },
            () => Array(10).fill(0)
        );
    }

    valid(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return (
                    this.isEmpty(value) ||
                    (this.insideWalls(x) && this.aboveFloor(y) && this.notOccupied(x, y))
                );
            });
        });
    }

    rotate(piece, direction) {
        // Clone with JSON for immutability.
        let p = JSON.parse(JSON.stringify(piece));
        if (!piece.hardDropped) {
            // Transpose matrix
            for (let y = 0; y < p.shape.length; ++y) {
                for (let x = 0; x < y; ++x) {
                    [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
                }
            }
            // Reverse the order of the columns.
            if (direction === ROTATION.RIGHT) {
                p.shape.forEach((row) => row.reverse());
            } else if (direction === ROTATION.LEFT) {
                p.shape.reverse();
            }
        }

        return p;
    }

    isEmpty(value) {
        return value === 0;
    }

    insideWalls(x) {
        return x >= 0 && x < 10;
    }

    aboveFloor(y) {
        return y <= 20;
    }

    notOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }

    draw() {
        this.piece.draw();
        this.drawBoard();
    }

    freeze() {
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value;
                }
            });
        });

    }

    drawBoard() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    context.fillStyle = COLORS[value];
                    context.fillRect(x, y, 1, 1);
                }
            });
        });
    }

    drop() {
        let p = moves[KEY.DOWN](this.piece);
        if (this.valid(p)) {
            this.piece.move(p);
        } else {
            this.freeze();
            updateValues();
            this.clearLines();
            if (this.piece.y === 0) {
                // Game over
                gameOver = true;
                let over = document.getElementById("game-over");
                over.style.display = "flex";
                console.log("Game Over");
                return false;
            }
            this.piece = this.nextPiece;
            this.piece.ctx = this.ctx;
            this.piece.setStartingPosition();
            this.getNewPiece();
        }


        return true;
    }

    clearLines() {
        let lines = 0;

        this.grid.forEach((row, y) => {
            if (row.every((value) => value > 0)) {
                lines++;
                this.grid.splice(y, 1);
                this.grid.unshift(Array(COLS).fill(0));
            }
        });

        if (lines > 0) {
            gameValues.lines += lines;
            gameValues.level = this.getLevel();
            time.interval = LEVEL[gameValues.level]
            updateValues();
        }
    }

    getLevel() {
        document.getElementById("level").innerHTML = Math.floor(gameValues.lines / LINES_PER_LEVEL);
        return (Math.floor(gameValues.lines / LINES_PER_LEVEL)) + gameValues.difficulty;
    }

    getNewPiece() {
        const { width, height } = this.ctxNext.canvas;
        this.ctxNext.clearRect(0, 0, width, height);
        this.nextPiece = new Piece(this.ctxNext);
        this.nextPiece.draw2();
        // Write "Next" text on canvas in the top middle
        this.ctxNext.fillStyle = "white";
        this.ctxNext.font = "1px Arial";
        this.ctxNext.fillText("Next Piece:", .5, 1);

    }

    drawGhost() {
        this.ghostPiece.x = board.piece.x;
        this.ghostPiece.y = board.piece.y;
        this.ghostPiece.shape = board.piece.shape;
        while (board.valid(this.ghostPiece)) {
            this.ghostPiece.y++;
        }
        this.ghostPiece.y--;
        this.ghostPiece.draw();
    }

    savePiece(){
        if(this.holdPiece == null){
            const { width, height } = this.holdCtx.canvas;
            this.holdCtx.clearRect(0, 0, width, height);
            this.holdPiece = new Piece(this.holdCtx);
            if(this.piece.index!=null){this.holdPiece.index = this.piece.index;}
            this.holdPiece.shape = pieces[this.piece.index];
            this.holdPiece.shape2 = screenpieces[this.piece.index];
            this.holdPiece.color = this.piece.color;
            this.holdPiece.draw2();

            this.piece = this.nextPiece;
            this.piece.ctx = this.ctx;
            this.piece.setStartingPosition();
            this.getNewPiece();
        } else {
            const { width, height } = this.holdCtx.canvas;
            this.holdCtx.clearRect(0, 0, width, height);
            let temp = new Piece(this.holdCtx);
            temp.index = this.piece.index;
            temp.shape = pieces[this.piece.index];
            temp.shape2 = screenpieces[this.piece.index];
            temp.color = this.piece.color;
            temp.draw2();

            this.piece = this.holdPiece;
            this.piece.ctx = this.ctx;
            this.piece.setStartingPosition();
            this.holdPiece = temp;
        }
        // Write "Hold" text on canvas in the top middle
        this.holdCtx.fillStyle = "white";
        this.holdCtx.font = "1px Arial";
        this.holdCtx.fillText("Saved Piece:", .1, 1);
    }
}