'use strict';


let keys_pressed = [];
let WIDTH = 10;
let HEIGHT = 20;

let X = 0;
let Y = 0;

let current_domino = get_tetronimoes()["t"]


// Create colums
let gamegrid = init_gamegrid(WIDTH,HEIGHT)/*_.range(HEIGHT).map(function () {
    // Create one row
    return _.range(WIDTH).map(function () {
        return 0;
    });
});*/

function init_gamegrid(width,height){
    return _.range(height).map(()=> {
        // Create one row
        return _.range(width).map(()=> {
            return 0;
        });
    });
}

function updateKeys() {
    if (keyIsDown(RIGHT_ARROW)) {
        keys_pressed.push("RIGHT")
    }
    if (keyIsDown(LEFT_ARROW)) {
        keys_pressed.push("LEFT")
    }
    if (keyIsDown(UP_ARROW)) {
        keys_pressed.push("UP")
    }
    if (keyIsDown(DOWN_ARROW)) {
        keys_pressed.push("DOWN")
    }
    keys_pressed = _.uniq(keys_pressed)
}

function rotate_direction(dir = "") {
    current_domino = rotateMatrix(current_domino)
}

function move_down() {

    Y += 1;
    if (Y > 20 - 3) {
        Y = 0
    }
}

let current_dir;


function rotate_current() {
    if (current_dir === "UP") {
        rotate_direction()
    }
}


function process_keypress() {
    // if (keys_pressed.length >= 1) {
    //     console.log(keys_pressed)
    // }
    current_dir = keys_pressed.pop()
    keys_pressed = [];


    switch (current_dir) {
        case "RIGHT":
            if(X + 1 <= WIDTH -current_domino[0].length) {
                X += 1
            }
            break
        case "LEFT":
            if(X - 1 >= 0) {
                X -= 1
            }
            break
        case "DOWN":
            Y += 1
            break
    }
}
let pieces = [];
function randomPiece() {
    if (pieces.length === 0) {
        pieces = ['i', 'i', 'i', 'i', 'j', 'j', 'j', 'j', 'l', 'l', 'l', 'l', 'o', 'o', 'o', 'o', 's', 's', 's', 's', 't', 't', 't', 't', 'z', 'z', 'z', 'z'];
    }
    let sudo_random_piece = pieces.splice(random(0, pieces.length-1), 1)[0]; // remove a single piece
    return sudo_random_piece;
};
function display() {
    let rotated_tetronimoe = rotate_2d_grid(current_domino)
    let gamegrid_rotated = rotate_2d_grid(gamegrid)
    render_grid(gamegrid_rotated, (x, y, w, h) => {
        rect(x, y, w, h)
    })

    render_tetromino(rotated_tetronimoe, X, Y, (x, y, w, h) => {
        push()
        if (occupied(rotated_tetronimoe, gamegrid_rotated, X, Y)) {

            fill(color("green"))


            gamegrid = copy_to_screen(current_domino, gamegrid, Y, X)
            current_domino = get_tetronimoes()[randomPiece()]
            X = 0
            Y = 0
        } else {
            fill(color("red"))

        }
        // fill(color("blue"))
        rect(x, y, w, h)
        pop()
    })
}


function occupied(loc, loc2, _x, _y) {
    let loc2MaxWidth = loc2.length
    let loc2MaxHeight = loc2[0].length
    // let acc = []
    for (let i = 0, x = _x; i <= loc.length - 1; i += 1, ++x) {
        for (let j = 0, y = _y; j <= loc[i].length - 1; j += 1, ++y) {
            // console.log(i, ", ", j)
            if (loc2[x][y] === 1 && loc[i][j] === 1) {
                console.log(loc[i][j] === 1, ", ", loc2[x][y] === 1)
                // if (x + i > 10 && x + i <= 0 && y + j > 20 && y + j <= 0) {
                return true
                // }
            }
        }
    }
    // return acc.includes(true)
}

function isEndGame(grid){
    return _.first(grid).includes(1)

}

function update() {
    background(51)
    gamegrid[HEIGHT -1]= _.range(WIDTH-1).map(()=> {
        return 1;
    });
    updateKeys()
    process_keypress()


    display()
    if(isEndGame(gamegrid)){
        alert("gameOver!")
        gamegrid = init_gamegrid(WIDTH,HEIGHT)
        clearInterval(move_down_interval);
        clearInterval(rotate_current_interval);
        clearInterval(update_interval);
        background(51)
        textSize(30)
        text("Reload Page to play again",10,height/2);
    }

    popup("Left/Right arrow move\nUp/down arrows rotate",3)
}

let move_down_interval;
let rotate_current_interval;
let update_interval;

function setup() {
    createCanvas(600, 600);
    background(51)

    move_down_interval = setInterval(move_down, 800)
    rotate_current_interval =  setInterval(rotate_current, 200)
    update_interval = setInterval(update, 100)

}

function draw() {

}
