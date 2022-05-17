
function dientichHCN() {
    let a = prompt("Nhập chiều dài");
    let b = prompt("Nhập chiều rộng");
    a = parseFloat(a);
    b = parseFloat(b);
    let s = a*b;
    document.getElementById("khaibaobai2").innerHTML = 'Diện tích hình chữ nhật là ' +s+ ' đơn vị diện tích';
}