class SnakeGame {

    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        document.addEventListener("keydown", this.onPress.bind(this));
    }

    start() {
        this.posX = 10;
        this.posY = 10;
        this.size = 3;
        this.arr = [];
        this.aimX = 0;
        this.aimY = 0;

        this.goalX = 5;
        this.goalY = 5;

        this.col = 20;
        this.row = 20;


        this.frame = setInterval(this.update.bind(this), 1000 / 10);
    }

    update() {

        this.posX += this.aimX;
        this.posY += this.aimY;

        if (this.posX < 0) {
            this.posX = this.col - 1;
        }
        if (this.posX > this.col - 1) {
            this.posX = 0;
        }
        if (this.posY < 0) {
            this.posY = this.row - 1;
        }
        if (this.posY > this.row - 1) {
            this.posY = 0;
        }

        this.arr.forEach(t => {
            if (t.posX === this.posX && t.posY === this.posY) {
                this.restart();
            }
        });

        this.arr.push({ posX: this.posX, posY: this.posY });
        while (this.arr.length > this.size) {
            this.arr.shift();
        }

        if(this.goalX===this.posX && this.goalY===this.posY) {
            this.size++;
            this.goalX=Math.floor(Math.random()*this.col);
            this.goalY=Math.floor(Math.random()*this.row);
        }

        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

        this.context.fillStyle = "yellow";
        this.context.font = "20px Arial";
        this.context.fillText(this.size - 3, 20, 40);

        this.context.fillStyle = "orange";
        this.arr.forEach(t => {
            this.context.fillRect(t.posX * this.col, t.posY * this.row, this.col - 5, this.row - 5);
        });

        this.context.fillStyle = "red";
        this.context.fillRect(this.goalX * this.col, this.goalY * this.row, this.col - 5, this.row - 5);


    }

    onPress(input) {
        if (input.keyCode === 37 && this.aimX !== 1) {
            this.aimX = -1;
            this.aimY = 0;
        }
        if (input.keyCode === 39 && this.aimX !== -1) {
            this.aimX = 1;
            this.aimY = 0;
        }
        if (input.keyCode === 38 && this.aimY !== 1) {
            this.aimX = 0;
            this.aimY = -1;
        }
        if (input.keyCode === 40 && this.aimY !== -1) {
            this.aimX = 0;
            this.aimY = 1;
        }

    }

    restart() {
        clearInterval(this.frame);
        this.start();
    }
}

const game = new SnakeGame();
window.onload = () => game.start();