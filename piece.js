let numbers = [0, 1, 2, 3, 4, 5, 6];
let possibleNumbers = [0, 1, 2, 3, 4, 5, 6];
let qwerty = ['l', 'o', 's', 'z', 't', 'l', 'j'];

function randomPiece() {
    if (7 in possibleNumbers && Math.random() < 0.03) {
        console.info("O");
        if (COLORS[1] == "#FFCD94") {
            return 7;
        }
        if (COLORS[1] == "#000000") {
            return 8;
        }
    }
    let random = Math.floor(Math.random() * numbers.length);
    let piece = numbers[random];
    numbers.splice(random, 1);
    if (numbers.length == 0) {
        numbers = [0, 1, 2, 3, 4, 5, 6];
    }
    return piece;
}


class Piece {
    constructor(ctx) {
        this.ctx = ctx;
        this.spawn();
    }

    spawn() {
        this.index = randomPiece();
        this.shape = pieces[this.index]
        this.shape2 = screenpieces[this.index]
        this.color = COLORS[this.index + 1]
        this.x = 0;
        this.y = 0;
        this.hardDropped = false;
    }

    move(p) {
        if (!this.hardDropped) {
            this.x = p.x;
            this.y = p.y;
        }
        this.shape = p.shape;
    }

    hardDrop() {
        this.hardDropped = true;
        updateValues();
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    draw2() {
        this.ctx.fillStyle = this.color;
        this.shape2.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    setStartingPosition() {
        this.x = 3;
        this.y = 0;
        // console.info("Piece: " + qwerty[this.index] + " (" + this.index + ")")
        if (this.index == 8) {
            console.info("Piece: " + qwerty[this.index] + " (" + this.index + ")");
            this.x = 0;
        }
    }

}

var piece1 = [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

var piece2 = [
    [2, 2],
    [2, 2]
]

var piece3 = [
    [0, 3, 3],
    [3, 3, 0],
    [0, 0, 0]
]

var piece4 = [
    [4, 4, 0],
    [0, 4, 4],
    [0, 0, 0]
]

var piece5 = [
    [0, 5, 0],
    [5, 5, 5],
    [0, 0, 0]
]

var piece6 = [
    [6, 0, 0],
    [6, 6, 6],
    [0, 0, 0]
]

var piece7 = [
    [0, 0, 7],
    [7, 7, 7],
    [0, 0, 0]
]


let screenPiece1 = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
]

let screenPiece2 = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 0, 0],
    [0, 0, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 0]
]

let screenPiece3 = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 0],
    [0, 0, 3, 3, 0, 0],
    [0, 0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 0]
]

let screenPiece4 = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 0],
    [0, 0, 4, 4, 0, 0],
    [0, 0, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
]

let screenPiece5 = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 0],
    [0, 0, 5, 5, 0, 0],
    [0, 0, 0, 5, 0, 0],
    [0, 0, 0, 0, 0, 0]
]

let screenPiece6 = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 0],
    [0, 0, 0, 6, 0, 0],
    [0, 0, 6, 6, 0, 0],
    [0, 0, 0, 0, 0, 0]
]

let screenPiece7 = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 7, 0, 0, 0],
    [0, 0, 7, 0, 0, 0],
    [0, 0, 7, 7, 0, 0],
    [0, 0, 0, 0, 0, 0]
]


let piece8 = [
    [0, 0, 8, 8, 8, 0, 0, 0],
    [0, 0, 8, 8, 8, 0, 0, 0],
    [0, 0, 8, 8, 8, 0, 0, 0],
    [0, 0, 0, 8, 0, 0, 0, 0],
    [0, 8, 8, 8, 8, 8, 0, 0],
    [0, 0, 0, 8, 0, 0, 0, 0],
    [0, 0, 8, 0, 8, 0, 0, 0],
    [0, 0, 8, 0, 8, 0, 0, 0],
]

var piece9 = [
    [0, 9, 9, 9, 9, 9, 9, 0],
    [9, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 9, 0, 0, 9, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 9, 0, 0, 9, 0, 9],
    [9, 0, 0, 9, 9, 0, 0, 9],
    [0, 9, 0, 0, 0, 0, 9, 0],
    [0, 0, 9, 9, 9, 9, 0, 0],
]



let pieces =       [piece1, piece2, piece3, piece4, piece5, piece6, piece7, piece8]
let screenpieces = [screenPiece1, screenPiece2, screenPiece3, screenPiece4, screenPiece5, screenPiece6, screenPiece7, piece8]

