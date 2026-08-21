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
        this.generateValidLayout();
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

// 2. Random position, check not block + overlap
    randomPosition() {
        let row = Math.floor(Math.random() * this.height);
        let col = Math.floor(Math.random() * this.width);
        return { row, col };
    }
    isSamePosition(a, b) {
    return a.row === b.row && a.col === b.col;
    }

    generateValidLayout() {
        let isReachable = false;

        while (!isReachable) {
        this.board = this.setupBoard();

        this.playerPos = this.randomPosition();

        do {
            this.hatPos = this.randomPosition();
        } while (this.isSamePosition(this.hatPos, this.playerPos));

        this.holePositions = [];
        while (this.holePositions.length < this.holeCount) {
            let pos = this.randomPosition();
            let overlap =
            this.isSamePosition(pos, this.playerPos) ||
            this.isSamePosition(pos, this.hatPos) ||
            this.holePositions.some((h) => this.isSamePosition(h, pos));

            if (!overlap) {
            this.holePositions.push(pos);
            }
        }

        isReachable = this.canReachHat();
        }

        this.board[this.hatPos.row][this.hatPos.col] = hat;
        this.holePositions.forEach((h) => {
        this.board[h.row][h.col] = hole;
        });
        this.board[this.playerPos.row][this.playerPos.col] = pathCharacter;
    }

    canReachHat() {
        let visited = [];
        for (let r = 0; r < this.height; r++) {
        visited.push(new Array(this.width).fill(false));
        }

        let queue = [this.playerPos];
        visited[this.playerPos.row][this.playerPos.col] = true;

        const directions = [
        { row: -1, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 },
        ];

        while (queue.length > 0) {
        let current = queue.shift();

        if (this.isSamePosition(current, this.hatPos)) {
            return true;
        }

        for (let dir of directions) {
            let nextRow = current.row + dir.row;
            let nextCol = current.col + dir.col;

            let outOfBounds =
            nextRow < 0 || nextRow >= this.height ||
            nextCol < 0 || nextCol >= this.width;

            if (outOfBounds) continue;
            if (visited[nextRow][nextCol]) continue;

            let isHole = this.holePositions.some(
            (h) => h.row === nextRow && h.col === nextCol
            );
            if (isHole) continue;

            visited[nextRow][nextCol] = true;
            queue.push({ row: nextRow, col: nextCol });
        }
        }

        return false;
    }

    isOutOfBounds(row, col) {
        return row < 0 || row >= this.height || col < 0 || col >= this.width;
    }

    isHole(row, col) {
        return this.holePositions.some((h) => h.row === row && h.col === col);
    }

    isHat(row, col) {
        return this.isSamePosition({ row, col }, this.hatPos);
    }

    // ผลลัพธ์ที่ method นี้ return: 'ok' | 'out' | 'hole' | 'win'
    tryMove(rowDelta, colDelta) {
        let nextRow = this.playerPos.row + rowDelta;
        let nextCol = this.playerPos.col + colDelta;

        if (this.isOutOfBounds(nextRow, nextCol)) {
        return 'out';
        }

        if (this.isHole(nextRow, nextCol)) {
        return 'hole';
        }

        if (this.isHat(nextRow, nextCol)) {
        return 'win';
        }

        // เดินได้ปกติ -> อัปเดต map
        this.board[this.playerPos.row][this.playerPos.col] = pathCharacter;
        this.playerPos = { row: nextRow, col: nextCol };
        this.board[nextRow][nextCol] = pathCharacter;
        // จำตำแหน่งผู้เล่นด้วยสัญลักษณ์ path เดียวกัน (ไม่มีสัญลักษณ์ actor แยก)
        return 'ok';
    }

    moveUp() {
        return this.tryMove(-1, 0);
    }

    moveDown() {
        return this.tryMove(1, 0);
    }

    moveLeft() {
        return this.tryMove(0, -1);
    }

    moveRight() {
        return this.tryMove(0, 1);
    }
    
}

let field = new Field(WIDTH, HEIGHT, HOLE_COUNT);
field.print();