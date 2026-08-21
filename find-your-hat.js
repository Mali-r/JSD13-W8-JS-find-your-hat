import { createInterface } from 'node:readline';

const hat = '^';
const hole = '0';
const pathCharacter = '*';
const fieldCharacter = '░';

const WIDTH = 8;
const HEIGHT = 8;
const HOLE_COUNT = 10;

class Field {
    constructor(width, height, holeCount) {
        this.width = width;
        this.height = height;
        this.holeCount = holeCount;

        this.board = this.setupBoard();
    }

// 1. Set up board [8x8]
    setupBoard(){
        let board = [];
        for (let r = 0; r < this.height; r++) {
            let row = [];
            for (let c = 0; c < this.width; c++) {
                row.push(fieldCharacter);               // add ░ in row[] till = width
            }
            board.push(row);                            // fill row of ░xwidth in board[] till = height
        }
        return board;
    }

    print(){
        for (let row of this.board) {                   // loop each row[] to column
            console.log(row.join(''));                  // turn ['░','░','░','░','░','░','░','░'] to "░░░░░░░░"
        }
    }

// 2. Random place
    randomPosition(){

    }
}

let field = new Field(WIDTH, HEIGHT, HOLE_COUNT);
field.print();