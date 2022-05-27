class Bush {
    constructor(x, bushParameter) {
        this.x = x;
        this.y = canvas.height - 190;
        this.parameter = [];
        for (let i = 0; i < bushParameter.length; i++) {
            let m = [];
            for (let j = 0; j < bushParameter[i].length; j++) {
                let n = [];
                for (let k = 0; k < bushParameter[i][j].length; k++) {
                    n.push(bushParameter[i][j][k]);
                }
                m.push(n);
            }
            this.parameter.push(m);
        }
    }
    getParameter() {
        return this.parameter;
    }

    drawBush(x, context, color) {
        for (let i = 0; i < this.parameter.length; i++) {
            for (let j = 0; j < this.parameter[i].length; j++) {
                if (i == 0) {
                    context.fillStyle = color[4];
                    context.fillRect(
                        this.parameter[i][j][0] + this.x + x, //x
                        this.parameter[i][j][1] + this.y, //y
                        this.parameter[i][j][2], //width
                        this.parameter[i][j][3]  //height
                    )
                } else if (i == 1) {
                    context.fillStyle = color[2];
                    context.fillRect(
                        this.parameter[i][j][0] + this.x + x,
                        this.parameter[i][j][1] + this.y,
                        this.parameter[i][j][2],
                        this.parameter[i][j][3]
                    )
                }
            }
        }
    }
}