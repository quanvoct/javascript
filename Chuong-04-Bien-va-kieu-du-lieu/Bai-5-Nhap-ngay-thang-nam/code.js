
function dmY() {
    let y = parseInt(prompt('Nhập năm'));
    while (isNaN(y) || y > 9999 || y < 1000) {
        y = parseInt(prompt('Số năm chưa đúng, hãy nhập lại:'));
    }

    let m = parseInt(prompt('Nhập tháng'));
    while (isNaN(m) || m > 12 || m == 0) {
        m = parseInt(prompt('Số tháng chưa đúng, hãy nhập lại:'));
    }

    let d = prompt('Nhập ngày');
    switch (m) {
        case 4, 6, 9, 11:
            while (isNaN(d) || d > 30 || d == 0) {
                d = parseInt(prompt('Số ngày chưa đúng, hãy nhập lại:'));
            }
            break;
        case 2:
            if (y % 4 != 0) {
                while (isNaN(d) || d > 28 || d == 0) {
                    d = parseInt(prompt('Số ngày chưa đúng, hãy nhập lại:'));
                }
                break;
                
            } else {
                while (isNaN(d) || d > 29 || d == 0) {
                    d = parseInt(prompt('Số ngày chưa đúng, hãy nhập lại:'));
                }
                break;
            }
            break;
    
        default:
            while (isNaN(d) || d > 31 || d == 0) {
                d = parseInt(prompt('Số ngày chưa đúng, hãy nhập lại:'));
            }
            break;
    }
    document.getElementById("ngaythangnam").innerHTML = 'Thời gian bạn đã nhập là ' +d+ '/' +m+ '/'  +y;
}