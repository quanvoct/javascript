class Tree {
    constructor(x, bushParameter, rootParameter) {
        this.x = x;
        this.y = canvas.height - 255;
        console.log(canvas.width, canvas.height);
        this.parameter = [];
        for (let i = 0; i < 4; i++) {
            let m = [];
            for (let j = 0; j < bushParameter.length; j++) {
                let n = [];
                for (let k = 0; k < bushParameter[j].length; k++) {
                    let o = [];
                    for (let l = 0; l < bushParameter[j][k].length; l++) {
                        if (i < 3) {
                            o.push(bushParameter[j][k][l]);
                        }
                        else {
                            if (k < 11) o.push(rootParameter[j][k][l]);
                        }
                    }
                    if (i == 1) {
                        o[0] += 48;
                        o[1] -= 46;
                    } else if (i == 2) {
                        o[0] += 120;
                        o[1] -= 10;
                    }
                    n.push(o);
                }
                m.push(n);
            }
            this.parameter.push(m);
        }
    }
    getParameter() {
        return this.parameter;
    }

    drawTree(x, context, color) {
        for (let i = 0; i < this.parameter.length; i++) {
            for (let j = 0; j < this.parameter[i].length; j++) {
                for (let k = 0; k < this.parameter[i][j].length; k++) {
                    if (j == 0) {
                        context.fillStyle = (i < this.parameter.length - 1) ? color[4] : color[5];
                        context.fillRect(
                            this.parameter[i][j][k][0] + this.x + x, //x
                            this.parameter[i][j][k][1] + this.y, //y
                            this.parameter[i][j][k][2], //width
                            this.parameter[i][j][k][3]  //height
                        )
                    } else if (j == 1) {
                        context.fillStyle = (i < this.parameter.length - 1) ? color[2] : color[6];
                        context.fillRect(
                            this.parameter[i][j][k][0] + this.x + x,
                            this.parameter[i][j][k][1] + this.y,
                            this.parameter[i][j][k][2],
                            this.parameter[i][j][k][3]
                        )
                    } else break;
                }
            }
        }
    }
}