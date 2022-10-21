const DIMENSIONS = {
    W: 400,
    H: 400
};
const BOMB_AMOUNT = 500;
const BOMB = 9;
const UNCHECKED = 10;
const CHECKED = 11;

const checkBombs = (neighbors, data) => neighbors.filter(el => data[el.y][el.x] == BOMB);
export default class Minesweeper {
    constructor(x, y) {
        this.data = [];
        for (let i = 1; i <= DIMENSIONS.H; i++) {
            this.data.push([]);
            for (let j = 1; j <= DIMENSIONS.W; j++)
                this.data[this.data.length-1].push(UNCHECKED);
        }
        let target = {};
        for (let i = 1; i <= BOMB_AMOUNT; i++) {
            target.x = Math.floor(Math.random() * this.data[0].length);
            target.y = Math.floor(Math.random() * this.data.length);
            while(this.data[target.y][target.x] == BOMB || (Math.sqrt(Math.pow(target.y - y, 2) + Math.pow(target.x - x, 2)) < 2)) {
                target.x = Math.floor(Math.random() * this.data[0].length);
                target.y = Math.floor(Math.random() * this.data.length);
            }
            this.data[target.y][target.x] = BOMB;
        }
        this.dig(x, y);
    }

    dig(x, y) {
        if (this.data[y][x] == BOMB)
            this.lose();
        else {
            let checks = [
                {
                    x: x,
                    y: y
                }
            ];
            while(checks.length > 0) {
                let neighbors = this.getNeighbors(checks[0]);
                let bombs = checkBombs(neighbors, this.data).length;
                this.data[checks[0].y][checks[0].x] = bombs;
                if (bombs == 0) {
                    this.data[checks[0].y][checks[0].x] = CHECKED;
                    neighbors.forEach(el => this.data[el.y][el.x] = this.data[el.y][el.x] !== CHECKED ? checkBombs(this.getNeighbors(el), this.data).length : this.data[el.y][el.x]);
                    checks = checks.concat(neighbors.filter(el => this.data[el.y][el.x] == 0));
                }
                checks.shift();
            }
            this.data = this.data.map(row => row.map(el => el == CHECKED ? 0 : el));
        }
    }

    getNeighbors(obj) {
        let neighbors = [
            { x: obj.x-1, y: obj.y-1 }, { x: obj.x, y: obj.y-1 }, { x: obj.x+1, y: obj.y-1 },
            { x: obj.x-1, y: obj.y },                             { x: obj.x+1, y: obj.y },
            { x: obj.x-1, y: obj.y+1 }, { x: obj.x, y: obj.y+1 }, { x: obj.x+1, y: obj.y+1 } 
        ];
        return neighbors.filter(obj => !(obj.x < 0 || obj.x >= this.data[0].length || obj.y < 0 || obj.y >= this.data.length));
    }

    lose() {

    }

    toString() {
        return this.data.map(row => row.map(el => el == BOMB ? 'B' : (el == UNCHECKED ? '#' : (el == CHECKED ? '+' : el))).join(' ')).join('\n');
    }
}