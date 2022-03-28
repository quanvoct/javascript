
function hinhtron() {
    const pi = Math.PI;
    let r = parseFloat(prompt('Nhập bán kính hình tròn cần tính diện tích'));
    document.getElementById("circle").innerHTML = 'Diện tích hình tròn là  ' +pi * r * r+ ' đơn vị diện tích <br/>';
    document.getElementById("circle").innerHTML += 'Chu vi hình tròn là  ' +pi * r * 2+ ' đơn vị chu vi <br/>';
}