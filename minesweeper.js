const DIMENSIONS = {
    W: 10,
    H: 8
};
const BOMB_AMOUNT = 10;

export default class Minesweeper {
    constructor() {
        this.data = [];
        for (let i = 1; i <= DIMENSIONS.H; i++) {
            this.data.push([]);
            for (let j = 1; j <= DIMENSIONS.W; j++)
                this.data[this.data.length-1].push(0);
        }
        for (let i = 1; i <= BOMB_AMOUNT; i++) {
            let target = {
                x: 0,
                y: 0
            };
            while(this.data[target.y][target.x]) {
                target.x = Math.floor(Math.random() * this.data[0].length);
                target.y = Math.floor(Math.random() * this.data.length);
            }
        }
        console.log(this.data);
    }

    dig(x, y) {

    }

    toString() {
        return this.data.map(row => row.join(' ')).join('\n');
    }
}