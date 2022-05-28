class Bush {
    constructor(x, img, count) {
        this.x = x;
        this.y = canvas.height - 150;
        this.width = 62;
        this.height = 45;
        this.count = count;
        this.img = img;
        this.bushArray = [];
        this.random = Math.floor(Math.random() * 200 + 1);
        for (let i = 2; i < this.count; i++) {
            if (i % 3 == 0) continue;
            let a = 200 * i + this.random;
            this.bushArray.push(a);
        }
    }
    setLocation(x) {
        this.x = x;
    }
    getCoordinates() {
        this.coordinates = [];
        for (let i = 0; i < this.bushArray.length; i++) {
            let a = [];
            a.push(this.x + 30 + this.bushArray[i]);
            a.push(this.y + 25);
            a.push(35);
            this.coordinates.push(a);
        }
        return this.coordinates;
    }
    drawBush(context) {
        for (let i = 0; i < this.bushArray.length; i++) {
            context.beginPath();
            context.drawImage(this.img, this.x + this.bushArray[i], this.y, this.width, this.height);
            context.arc(this.x + 30 + this.bushArray[i], this.y + 25, 25, 0, 2 * Math.PI);
            context.fillStyle = 'rgba(255,255,255,0.3)';
            context.fill();
        }
    }
}