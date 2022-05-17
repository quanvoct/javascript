class Circle {
    constructor(x, y, radius, color) {
        this.radius = radius;
        this.color = color;
        // Fill with gradient
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
    }
    getRadius() {
        return this.radius;
    }
    getArea() {
        return Math.pow(this.radius, 2) * Math.PI;
    }
    getPerimeter() {
        return Math.PI * this.radius * 2;
    }
}