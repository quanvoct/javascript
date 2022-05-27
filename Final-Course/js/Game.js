class Game {
    constructor(audio, score, img, treeCount, bushCount) {
        this.x = 0;
        this.location = Math.random();
        this.status = false;
        this.bushParameter = [ //thông số của các tàng cây
            [ //màu xanh tối
                [0, 49.046, 2, 12.259],
                [2, 44.957, 2, 20.437],
                [4, 40.871, 2, 24.523],
                [4, 69.481, 2, 12.261],
                [6, 40.871, 2, 44.955],
                [8, 36.786, 2, 49.042],
                [10, 44.957, 2, 44.96],
                [12, 49.045, 2, 40.871],
                [14, 49.045, 2, 40.871],
                [16, 49.045, 2, 40.871],
                [18, 53.131, 2, 36.785],
                [20, 53.131, 2, 36.785],
                [22, 53.131, 2, 36.785],
                [24, 65.464, 2, 24.453],
                [26, 65.464, 2, 24.453],
                [28, 69.478, 2, 20.439],
                [30, 69.478, 2, 20.439],
                [32, 73.568, 2, 16.348],
                [34, 73.568, 2, 16.348],
                [36, 73.568, 2, 16.348],
                [38, 73.568, 2, 16.348],
                [40, 73.568, 2, 16.348],
                [42, 73.568, 2, 16.348],
                [44, 73.568, 2, 16.348],
                [46, 73.568, 2, 16.348],
                [48, 73.568, 2, 16.348],
                [50, 73.568, 2, 16.348],
                [52, 77.652, 2, 12.265],
                [54, 81.743, 2, 8.174],
                [56, 81.743, 2, 8.174],
                [58, 85.826, 2, 4.091],
                [60, 85.826, 2, 4.091],
                [62, 85.826, 2, 4.091],
                [64, 85.826, 2, 4.091],
                [66, 85.826, 2, 4.091],
                [68, 85.826, 2, 4.091],
                [70, 85.826, 2, 4.091],
                [72, 85.826, 2, 4.091],
                [74, 81.743, 2, 8.174],
                [76, 81.743, 2, 8.174],
                [78, 73.566, 2, 16.351],
                [80, 73.566, 2, 16.351],
                [82, 81.743, 2, 8.174],
                [84, 81.743, 2, 8.174],
                [86, 85.826, 2, 4.091],
                [88, 85.826, 2, 4.091],
                [90, 85.826, 2, 4.091],
                [92, 85.826, 2, 4.091],
                [94, 85.826, 2, 4.091],
                [96, 85.826, 2, 4.091],
                [98, 85.826, 2, 4.091],
                [100, 85.826, 2, 4.091],
                [102, 85.826, 2, 4.091],
                [104, 85.826, 2, 4.091],
                [106, 85.826, 2, 4.091],
                [108, 81.739, 2, 4.091],
                [110, 81.739, 2, 4.091],
                [112, 81.739, 2, 4.091]
            ], [ //màu xanh sáng
                [10, 28.61, 2, 16.347],
                [12, 24.524, 2, 24.523],
                [14, 20.436, 2, 28.61],
                [16, 20.436, 2, 28.61],
                [18, 16.348, 2, 36.785],
                [20, 16.348, 2, 36.785],
                [22, 16.348, 2, 36.785],
                [24, 12.262, 2, 53.202],
                [26, 12.262, 2, 53.202],
                [28, 12.262, 2, 57.219],
                [30, 12.262, 2, 57.219],
                [32, 12.262, 2, 61.306],
                [34, 12.262, 2, 61.306],
                [36, 8.173, 2, 65.396],
                [38, 4.088, 2, 69.48],
                [40, 4.088, 2, 69.48],
                [42, 4.088, 2, 69.48],
                [44, 4.088, 2, 69.48],
                [46, 4.088, 2, 69.48],
                [48, 0, 2, 73.568],
                [50, 0, 2, 73.568],
                [52, 0, 2, 77.652],
                [54, 0, 2, 81.743],
                [56, 0, 2, 81.743],
                [58, 0, 2, 85.83],
                [60, 0, 2, 85.83],
                [62, 0, 2, 85.83],
                [64, 0, 2, 85.83],
                [66, 0, 2, 85.83],
                [68, 0, 2, 85.83],
                [70, 0, 2, 85.83],
                [72, 0, 2, 85.83],
                [74, 0, 2, 81.743],
                [76, 0, 2, 81.743],
                [78, 4.088, 2, 69.48],
                [80, 4.088, 2, 69.48],
                [82, 4.088, 2, 77.654],
                [84, 8.173, 2, 73.57],
                [86, 12.262, 2, 73.57],
                [88, 12.262, 2, 73.57],
                [90, 12.262, 2, 73.57],
                [92, 12.262, 2, 73.57],
                [94, 12.262, 2, 73.57],
                [96, 12.262, 2, 73.57],
                [98, 12.262, 2, 73.57],
                [100, 16.348, 2, 69.483],
                [102, 16.348, 2, 69.483],
                [104, 16.348, 2, 69.483],
                [106, 20.436, 2, 65.395],
                [108, 36.784, 2, 44.955],
                [110, 36.784, 2, 44.955],
                [112, 36.784, 2, 44.955],
                [114, 40.871, 2, 20.434],
                [116, 44.958, 2, 16.347]
            ]
        ];
        this.rootParameter = [
            [ //màu cây tối
                [90, 85, 21, 7],
                [104, 43, 7, 7],
                [111, 50, 7, 7],
                [111, 92, 7, 7],
                [118, 57, 7, 7],
                [125, 71, 7, 70],
                [132, 64, 7, 7],
                [132, 141, 7, 7],
                [139, 148, 7, 7],
                [139, 57, 21, 7],
                [160, 50, 7, 7]
            ], [ //màu cây sáng
                [104, 148, 7, 7],
                [111, 43, 7, 7],
                [111, 85, 7, 7],
                [111, 141, 7, 14],
                [118, 50, 7, 7],
                [118, 64, 7, 84],
                [125, 64, 7, 7],
                [125, 141, 7, 7],
                [132, 57, 7, 7],
                [132, 148, 7, 7],
                [153, 50, 7, 7]
            ]
        ];
        this.color = [
            '#2bbcee', //Xanh da trời
            '#8ad1f0', //xanh lơ
            '#a3c254', // xanh lá mạ
            '#8ba748', // xanh cỏ
            '#5c944a', // xanh lá cây
            '#7f4d2e', // nâu đậm
            '#945835', // nâu nhạt
        ];
        this.randoma = Math.floor(Math.random() * 200 - 100);
        this.randomb = Math.floor(Math.random() * 400 - 100);
        this.bushArray = [];
        for (let i = 2; i < bushCount; i++) {
            let a = 400 * i - this.randoma;
            this.bushArray.push(a);
        }
        this.treeArray = [];
        for (let i = 2; i < treeCount; i++) {
            let a = 600 * i + this.randomb;
            this.treeArray.push(a);
        }
        this.score = score;
        this.img = img;
        this.audio = audio;
    }
    setScore(score) {
        this.score = score;
    }
    getScore(score) {
        return this.score;
    }
    getBushArray() {
        return this.bushArray;
    }
    getTreeArray() {
        return this.treeArray;
    }
    getBushParameter() {
        return this.bushParameter;
    }
    getRootParameter() {
        return this.rootParameter;
    }
    getColor() {
        return this.color;
    }
    setCoordinates(x) {
        this.x = x;
    }
    getStatus() {
        return this.status;
    }
    playGame() {
        this.status = true;
        this.audio.play();
    }
    stopGame() {
        this.status = false;
    }
    drawBackground(context) {
        let h1 = 0, h2 = 0, h3 = 0, detail = 2, x = this.x;
        for (let i = 0; i < canvas.width; i++) {
            h1 = (i % 2 == 0) ? 1 : (i % 3 == 0) ? 2 : (i % 4 == 0) ? 0 : 1.5;
            h2 = (i % 2 == 0) ? 2 : (i % 3 == 0) ? 1 : (i % 4 == 0) ? 3 : 3.5;
            h3 = (i % 2 == 0) ? 3 : (i % 3 == 0) ? 2 : (i % 4 == 0) ? 1 : 2.5;
            //Top sky
            context.beginPath();
            context.fillStyle = this.color[0];
            context.fillRect(i * detail * 10, 0, detail * 10, canvas.height);
            // Middle sky
            let gradient = context.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, `rgba(255,255,255,0.3)`);
            gradient.addColorStop(1, `rgba(255,255,255,0)`);
            context.beginPath();
            context.fillStyle = gradient;
            context.fillRect(i * detail * 10 + x, canvas.height - 400 + 10 * h1, detail * 10, 400 + 10 * h1);
            //Bottom sky
            context.beginPath();
            context.fillStyle = this.color[1];
            context.fillRect(i * detail * 10 + x, canvas.height - 300 + 10 * h2, detail * 10, 300 + 10 * h2);
            //Horizontal
            context.beginPath();
            context.fillStyle = this.color[2];
            context.fillRect(i * detail * 10 + x, canvas.height - 120, detail * 10, 120);
            //Ground
            context.beginPath();
            context.fillStyle = this.color[3];
            context.fillRect(i * detail * 10 + x, canvas.height - 110 + 10 * h3, detail * 10, 110 + 10 * h3);
            //Top underground
            context.beginPath();
            context.fillStyle = this.color[5];
            let w = (i % 3 == 0) ? h1 : 1;
            context.fillRect(i * detail * 10 + x, canvas.height - 80 + 10 * w, detail * 10, 80 + 10 * w);
            //Middle underground
            context.beginPath();
            context.fillStyle = this.color[6];
            context.fillRect(i * detail * 10 + x, canvas.height - 70 + 10 * h2, detail * 10, 20 + 10 * h2);

            //Score
            context.textAlign = "left";
            context.fillStyle = '#fff';
            context.font = "20px 'Press Start 2P'";
            context.fillText("Score", canvas.width - 200, 45);
            context.fillText(this.score, canvas.width - 90, 45);
            if (i % 400 == 0) {
                let x = i;
                let y = this.location * (canvas.height / 10);
                // context.drawImage(this.img, x, y, 130, 65);
            }
        }
    }
    drawWin(score) {
        //Win
        context.fillStyle = '#fff';
        context.textAlign = "center";
        context.font = "20px 'Press Start 2P'";
        context.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2 - 100);
        context.fillText("Your flight is long:", canvas.width / 2, canvas.height / 2 - 50);
        context.font = "30px 'Press Start 2P'";
        context.fillStyle = '#ffff00';
        context.fillText(score + " miles", canvas.width / 2, canvas.height / 2);
    }
    drawLose(score) {
        //Lose
        context.fillStyle = this.color[5];
        context.textAlign = "center";
        context.font = "20px 'Press Start 2P'";
        context.fillText("YOU LOSE!", canvas.width / 2, canvas.height / 2 - 150);
        context.fillText("You have an accident at:", canvas.width / 2, canvas.height / 2 - 100);
        context.font = "30px 'Press Start 2P'";
        context.fillStyle = '#ffff00';
        context.fillText(score + " miles", canvas.width / 2, canvas.height / 2-50);
        context.font = "15px 'Press Start 2P'";
        context.fillText("Press ENTER to retry", canvas.width / 2, canvas.height / 2);
    }
}