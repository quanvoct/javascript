
function variable() {
    let number = 10;
    let foo = 20.5;
    let boolean = true;
    let string = 'Hà Nội';

    document.getElementById("khaibaobai1").innerHTML = 'số nguyên = ' + number;
    document.getElementById("khaibaobai1").innerHTML +='<br/>';
    document.getElementById("khaibaobai1").innerHTML +='số thực = ' + foo;
    document.getElementById("khaibaobai1").innerHTML +='<br/>';
    document.getElementById("khaibaobai1").innerHTML +='logic = ' + boolean;
    document.getElementById("khaibaobai1").innerHTML +='<br/>';
    document.getElementById("khaibaobai1").innerHTML +='chuỗi = ' + string;
}