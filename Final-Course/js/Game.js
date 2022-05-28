class Game {
    constructor(audio, score, img) {
        this.x = 0;
        this.status = false;
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
        this.audio.pause();
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
                let y = canvas.height / 10;
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