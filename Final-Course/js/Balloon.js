class Balloon {
    constructor(y, img, audio) {
        this.x = 150;
        this.y = canvas.height - 265 + y;
        this.width = 100;
        this.height = 150;
        this.img = img;
        this.energy = 0;
        this.status = false;
        this.audio = audio;
    }

    setCoordinates(y) {
        this.y = canvas.height - 265 - y;
    }
    getCoordinates() {
        return a = [
            [this.x + 50, this.y + 130, 20],
            [this.x + 50, this.y + 45, 45]
        ]
    }

    setEnergy(energy) {
        this.energy = energy;
    }

    getEnergyInfo() {
        return this.energy;
    }

    fire() {
        return this.status;
    }

    turnOn() {
        this.status = true;
        this.audio.play();
        this.audio.volume = 0.5;
    }

    turnOff() {
        this.status = false;
        this.audio.pause();
    }

    drawBalloon(context) {
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
        context.arc(this.x + 50, this.y + 130, 20, 0, 2 * Math.PI);
        context.arc(this.x + 50, this.y + 45, 45, 0, 2 * Math.PI);
    }

    drawEnergyBar(context) {
        //Score
        context.textAlign = "left";
        context.fillStyle = '#fff';
        context.font = "20px 'Press Start 2P'";
        context.fillText("Gas", 30, 45);

        //frame
        let energyLength = (this.energy >= 0) ? this.energy / 10 : 0;
        context.beginPath();
        context.fillStyle = '#fff';
        context.fillRect(103, 23, 200, 3);
        context.fillRect(100, 26, 3, 20);
        context.fillRect(303, 26, 3, 20);
        context.fillRect(103, 46, 200, 3);
        //bar

        context.fillStyle = (200 / energyLength > 4) ? '#fc9292' : '#c8e867';
        context.fillRect(103, 26, energyLength, 5);
        context.fillStyle = (200 / energyLength > 4) ? '#ef5a5a' : '#a3c254';
        context.fillRect(103, 31, energyLength, 5);
        context.fillStyle = (200 / energyLength > 4) ? '#eb2927' : '#8ba748';
        context.fillRect(103, 36, energyLength, 10);
    }
}