var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var canvas2 = document.getElementById('next');
var ctxnext = canvas2.getContext('2d');

var colors;
var difficulty = 0;

let gameOver = false;
let time = { start: 0, elapsed: 0, interval: 500 };
let requestId = null;

let stopGame = false;

const moves = {
    [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 }),
    [KEY.UP]: (p) => board.rotate(p, ROTATION.RIGHT),
    [KEY.Q]: (p) => board.rotate(p, ROTATION.LEFT),
    [KEY.P]: (p) => board.rotate(p, ROTATION.RIGHT)
};

let gameValues = {
    lines: 0,
    level: 0,
    difficulty: 0
}

function updateValues() {
    document.getElementById('lines').innerText = "Lines: " + gameValues.lines;
    document.getElementById('level').innerText = "Level: " + gameValues.level;
}

let board = new Board(context, ctxnext);

initNext();

function initNext() {
    ctxnext.canvas.width = 6 * 30;
    ctxnext.canvas.height = 5 * 30;
    ctxnext.scale(30, 30);
}


function resetGame() {
    gameOver = false;
    console.log("Game Over: " + gameOver);
    board.reset();
    gameValues.lines = 0;
    gameValues.level = 0;
    // time = { start: 0, elapsed: 0, interval: 500 };
    time = { start: 0, elapsed: 0, interval: LEVEL[gameValues.level] };
}

function play() {
    resetGame();
    gameValues.difficulty = difficulty;
    gameValues.level = difficulty;
    time.interval = LEVEL[gameValues.level];
    board.reset();
    let piece = new Piece(context);
    piece.x = 3;
    if (piece.index == 8) {
        console.info("Piece: " + qwerty[this.index] + " (" + this.index + ")");
        piece.x = 0;
    }
    piece.draw();
    board.piece = piece;
    animate();
}


let btn = document.getElementById('start');
btn.addEventListener('click', (evt) => {
    if(stopGame) {
        stopGame = false;
    }
    play();
    btn.innerHTML = "<span>Restart</span>";
});

let btn2 = document.getElementById('restart');
btn2.addEventListener('click', (evt) => {
    play()
    var over = document.getElementById("game-over");
    over.style.display = "none";
});

let btn3 = document.getElementById('pause');
btn3.addEventListener('click', (evt) => {
    stopGame = true;
    pause();
});

let btn4 = document.getElementById('resume');
btn4.addEventListener('click', (evt) => {
    resume();
});

let btn5 = document.getElementById('settings');
btn5.addEventListener('click', (evt) => {
    var menu2 = document.getElementById("menu2");
    menu2.style.display = "flex";

    var menu = document.getElementById("menu");
    menu.style.display = "none";
});

let btn6 = document.getElementById('back');
btn6.addEventListener('click', (evt) => {
    var menu2 = document.getElementById("menu2");
    menu2.style.display = "none";
    
    var menu = document.getElementById("menu");
    menu.style.display = "flex";
});

let btn7 = document.getElementById('difficulty');
btn7.addEventListener('click', (evt) => {
    var menu3 = document.getElementById("menu3");
    menu3.style.display = "flex";

    var menu2 = document.getElementById("menu2");
    menu2.style.display = "none";
});

let btn8 = document.getElementById('colors');
btn8.addEventListener('click', (evt) => {
    var menu4 = document.getElementById("menu4");
    menu4.style.display = "flex";
    
    var menu2 = document.getElementById("menu2");
    menu2.style.display = "none";
});

let btn9 = document.getElementById('back2');
btn9.addEventListener('click', (evt) => {
    var menu3 = document.getElementById("menu3");
    menu3.style.display = "none";
    
    var menu2 = document.getElementById("menu2");
    menu2.style.display = "flex";
});

let btn10 = document.getElementById('back3');
btn10.addEventListener('click', (evt) => {
    var menu4 = document.getElementById("menu4");
    menu4.style.display = "none";

    var menu2 = document.getElementById("menu2");
    menu2.style.display = "flex";
});

let easyButton = document.getElementById('Easy');
easyButton.addEventListener('click', (evt) => {
    difficulty = 0;
    var menu3 = document.getElementById("menu3");
    menu3.style.display = "none";

    var menu1 = document.getElementById("menu");
    menu1.style.display = "flex";
});

let mediumButton = document.getElementById('Medium');
mediumButton.addEventListener('click', (evt) => {
    difficulty = 6;
    var menu3 = document.getElementById("menu3");
    menu3.style.display = "none";

    var menu1 = document.getElementById("menu");
    menu1.style.display = "flex";
});

let hardButton = document.getElementById('Hard');
hardButton.addEventListener('click', (evt) => {
    difficulty = 10;
    var menu3 = document.getElementById("menu3");
    menu3.style.display = "none";

    var menu1 = document.getElementById("menu");
    menu1.style.display = "flex";
});

let tetrisButton = document.getElementById('Tetris');
tetrisButton.addEventListener('click', (evt) => {
    COLORS = ['none', '#00ffff', '#ffff00', '#00ff00', '#ff0000', '#800080', '#ff7f00', '#0000ff'];
    // change background color of site
    document.body.style.backgroundColor = "#7f7f7f";
    // change color of .btn-3 class
    var btn3 = document.getElementsByClassName("btn-3");
    for (var i = 0; i < btn3.length; i++) {
        btn3[i].style.backgroundColor = "#595959";
        btn3[i].style.border = "none";
    }
    numbers = [0, 1, 2, 3, 4, 5, 6];
    possibleNumbers = [0, 1, 2, 3, 4, 5, 6];
});

let anthropoidColoring = document.getElementById('Anthropoid Coloring');
anthropoidColoring.addEventListener('click', (evt) => {
    COLORS = ['none', '#FFCD94', '#FFE0BD', '#EAC086', '#FFE39F', '#BF9169', '#8C644D', '#593123', '#593123'];
    // change background color of site
    document.body.style.backgroundColor = "#EBD3C5";
    // change color of .btn-3 class
    var btn3 = document.getElementsByClassName("btn-3");
    for (var i = 0; i < btn3.length; i++) {
        btn3[i].style.backgroundColor = "#D7B6A5";
        btn3[i].style.border = "none";
    }
    numbers = [0, 1, 2, 3, 4, 5, 6];
    possibleNumbers = [0, 1, 2, 3, 4, 5, 6, 7];
});

let purple = document.getElementById('purple');
purple.addEventListener('click', (evt) => {
    COLORS = ['none', '#3c1361', '#52307c', '#663a82', '#7c5295', '#b491cB', '#bca0dc', '#9C3587'];
    // change background color of site
    document.body.style.backgroundColor = "#A13670";
    // change color of .btn-3 class
    var btn3 = document.getElementsByClassName("btn-3");
    for (var i = 0; i < btn3.length; i++) {
        btn3[i].style.backgroundColor = "#CD03B4";
        btn3[i].style.border = "none";
    }
    numbers = [0, 1, 2, 3, 4, 5, 6];
    possibleNumbers = [0, 1, 2, 3, 4, 5, 6];
});

let cyber = document.getElementById('cyber');
cyber.addEventListener('click', (evt) => {
    COLORS = ['none', '#00f2ff', '#ff0073', '#07edf5', '#052cf0', '#f0054f', '#f06ee3', '#640991'];
    // change background color of site
    document.body.style.backgroundColor = "#000000";
    // change color of .btn-3 class
    var btn3 = document.getElementsByClassName("btn-3");
    for (var i = 0; i < btn3.length; i++) {
        btn3[i].style.backgroundColor = "#000000";
        btn3[i].style.border = "1px solid #07edf5";
    }
    numbers = [0, 1, 2, 3, 4, 5, 6];
    possibleNumbers = [0, 1, 2, 3, 4, 5, 6];
});

let retro = document.getElementById('Retro');
retro.addEventListener('click', (evt) => {
    COLORS = ['none', '#f5af18', '#eeff00', '#ff6f00', '#00a2ff', '#3075ff', '#f05654', '#f27b79'];
    // change background color of site
    document.body.style.backgroundColor = "#f5d222";
    // change color of .btn-3 class
    var btn3 = document.getElementsByClassName("btn-3");
    for (var i = 0; i < btn3.length; i++) {
        btn3[i].style.backgroundColor = "#f5af18";
        btn3[i].style.border = "none";
    }
    numbers = [0, 1, 2, 3, 4, 5, 6];
    possibleNumbers = [0, 1, 2, 3, 4, 5, 6];
});

let chazichasm = document.getElementById('chazichasm');
chazichasm.addEventListener('click', (evt) => {
    COLORS = ['none', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
    // change background color of site
    document.body.style.backgroundColor = "#000000";
    // change color of .btn-3 class
    var btn3 = document.getElementsByClassName("btn-3");
    for (var i = 0; i < btn3.length; i++) {
        btn3[i].style.backgroundColor = "#000000";
        btn3[i].style.border = "1px solid #ffffff";
    }
    numbers = [0, 1, 2, 3, 4, 5, 6];
    possibleNumbers = [0, 1, 2, 3, 4, 5, 6, 8];
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var buton = document.getElementById("tutorial");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
buton.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




function animate(now = 0) {
    time.elapsed = now - time.start;

    if (time.elapsed > time.interval) {
        time.start = now;
        board.drop();
    }

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    board.drawGhost();
    board.draw();
    
    if(!gameOver || !stopGame){
        requestId = requestAnimationFrame(animate);
    }
    else{
        context.fillStyle = '#D8DEE9';
        context.fillRect(1, 3, 8, 1.2);
        context.font = '1px Arial';
        context.fillStyle = 'black';
        context.fillText('PAUSED', 3, 4);

        cancelAnimationFrame(requestId);
        requestId = null;
    }
}

function pause() {


    context.fillStyle = '#D8DEE9';
    context.fillRect(1, 3, 8, 1.2);
    context.font = '1px Arial';
    context.fillStyle = 'black';
    context.fillText('PAUSED', 3, 4);
}

function resume() {
    if (!requestId) {
        stopGame = false;
        animate();
        return;
    }
}





document.addEventListener('keyup', event => {
    if (stopGame || gameOver) {
        return;
    }

    if(event.key.charAt() == "c" || event.key.charAt() == "C"){
        board.savePiece();
    }if(event.key.charAt() == "z" || event.key.charAt() == "Z"){
        let p = moves[KEY.Q](board.piece);
        if (board.valid(p)) {
            board.piece.move(p);
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }
        animate();
        return;
    }if(event.key.charAt() == "x" || event.key.charAt() == "X"){
        let p = moves[KEY.P](board.piece);
        if (board.valid(p)) {
            board.piece.move(p);
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }
        animate();
        return;
    }

    if (moves[event.key] || moves[event.key.charCodeAt()]) {
        event.preventDefault();

        let p;

        if (event.key.charCodeAt() === KEY.SPACE || event.key.charCodeAt() === KEY.P || event.key.charCodeAt() === KEY.Q) {
            p = moves[event.key.charCodeAt()](board.piece);
        } else {
            p = moves[event.key](board.piece);
        }

        if (event.key.charCodeAt() === KEY.SPACE) {
            while (board.valid(p)) {
                board.piece.move(p);
                p = moves[KEY.DOWN](board.piece);
            }
            board.piece.hardDrop();
        }
        else if (board.valid(p)) {
            board.piece.move(p);
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            // board.piece.draw();
        }

        animate();
    }
});
