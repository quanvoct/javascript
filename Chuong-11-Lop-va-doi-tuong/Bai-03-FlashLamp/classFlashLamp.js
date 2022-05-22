class FlashLamp {

    constructor() {}

    setBattery(battery) {
        this.battery = battery;
    }

    getBatteryInfo() {
        return this.battery;
    }

    light() {
        return this.status;
    }

    turnOn() {
        switcher.innerText = 'Tắt đèn';
        this.status = true;
    }

    turnOff() {
        switcher.innerText = 'Bật đèn';
        this.status = false;
    }

    drawFlashLamp(energy, status) {
        let opacity = (status) ? energy / 1000 : 0;
        // Create light gradient 
        let gradient = context.createLinearGradient(1000, 230, 400, 230);
        gradient.addColorStop(0, `rgba(254,218,0,0)`);
        gradient.addColorStop(1, `rgba(254,218,0,${opacity}`);
        // FlashLamp head
        context.beginPath();
        context.fillStyle = '#333';
        context.fillRect(50, 200, 300, 100);
        context.beginPath();
        context.moveTo(350, 200);
        context.lineTo(400, 180);
        context.lineTo(400, 320);
        context.lineTo(350, 300);
        context.fill();
        // FlashLamp body
        context.beginPath();
        context.fillStyle = '#fff';
        context.fillRect(70, 220, 260, 60);
        //Battery energy
        context.beginPath();
        context.fillStyle = '#111';
        context.fillRect(75, 225, energy / 4, 50);
        //Light
        context.beginPath();
        context.fillStyle = gradient;
        context.moveTo(400, 180);
        context.lineTo(1000, 80);
        context.lineTo(1000, 420);
        context.lineTo(400, 320);
        context.fill();
    }
};