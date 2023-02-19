const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 45;
const LINES_PER_LEVEL = 10;

var COLORS = ['none', '#88C0D0', '#EBCB8B', '#A3BE8C', '#BF616A', '#B48EAD', '#D08770', '#5E81AC']


const KEY = {
    SPACE: 32,
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
    DOWN: "ArrowDown",
    UP: "ArrowUp",
    P: 80,
    Q: 81
}

Object.freeze(KEY);

const LEVEL = {
    0: 800,
    1: 720,
    2: 630,
    3: 550,
    4: 470,
    5: 380,
    6: 300,
    7: 220,
    8: 130,
    9: 100,
    10: 80,
    11: 80,
    12: 80,
    13: 70,
    14: 70,
    15: 70,
    16: 50,
    17: 50,
    18: 50,
    19: 30,
    20: 30,
    21: 30,
    22: 30,
    23: 30,
    24: 30,
    25: 30,
    26: 30,
    27: 30,
    28: 30,
    29: 20,
    30: 20,
    // 29+ is 20ms
};



const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,
    HARD_DROP: 2,
}

const ROTATION = {
    LEFT: 'left',
    RIGHT: 'right'
};

Object.freeze(POINTS);
