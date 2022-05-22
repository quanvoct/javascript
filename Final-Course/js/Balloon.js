class Balloon {
    constructor(y, img) {
        this.x = 150;
        this.y = canvas.height - 265 + y;
        this.width = 100;
        this.height = 150;
        this.img = img;
        this.energy = 0;
        this.status = false;
    }

    setCoordinates(y) {
        this.y = canvas.height - 265 - y;
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
    }

    turnOff() {
        this.status = false;
    }

    drawBalloon(context) {
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawEnergyBar(context) {
        //frame
        let energyLength = this.energy / 50;
        console.log(this.energy);
        context.beginPath();
        context.fillStyle = '#111';
        context.fillRect(23, 20, 200, 3);
        context.fillRect(20, 23, 3, 20);
        context.fillRect(223, 23, 3, 20);
        context.fillRect(23, 43, 200, 3);
        //bar
        context.fillStyle = '#fff';
        context.fillRect(23, 23, energyLength, 5);
        context.fillStyle = '#a3c254';
        context.fillRect(23, 28, energyLength, 5);
        context.fillStyle = '#8ba748';
        context.fillRect(23, 33, energyLength, 10);
    }
}