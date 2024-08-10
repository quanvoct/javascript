class Tree {
    constructor(x, img, count) {
        this.x = x;
        this.y = canvas.height - 250;
        this.width = 145;
        this.height = 140;
        this.count = count;
        this.img = img;
        this.treeArray = [];
        this.random = Math.floor(Math.random() * 200 + 1);
        for (let i = 2; i < this.count; i++) {
            if (i % 5 == 0) continue;
            let a = 300 * i + this.random;
            this.treeArray.push(a);
        }
    }
    setLocation(x) {
        this.x = x;
    }
    getCoordinates() {
        this.coordinates = [];
        for (let i = 0; i < this.treeArray.length; i++) {
            let a = [];
            a.push(this.x + 45 + this.treeArray[i]);
            a.push(this.y + 40);
            a.push(35);
            this.coordinates.push(a);

            let b = [];
            b.push(this.x + 105 + this.treeArray[i]);
            b.push(this.y + 35);
            b.push(35);
            this.coordinates.push(b);

            let c = [];
            c.push(this.x + 15 + this.treeArray[i]);
            c.push(this.y + 85);
            c.push(15);
            this.coordinates.push(c);
        }
        return this.coordinates;
    }
    drawTree(context) {
        for (let i = 0; i < this.treeArray.length; i++) {
            context.beginPath();
            context.drawImage(this.img, this.x + this.treeArray[i], this.y, this.width, this.height);
            context.fillStyle = 'rgba(255,255,255,0.3)';
            context.arc(this.x + 45 + this.treeArray[i], this.y + 40, 35, 0, 2 * Math.PI);
            context.arc(this.x + 105 + this.treeArray[i], this.y + 35, 35, 0, 2 * Math.PI);
            context.arc(this.x + 15 + this.treeArray[i], this.y + 85, 15, 0, 2 * Math.PI);
            context.fill();
        }
    }
}