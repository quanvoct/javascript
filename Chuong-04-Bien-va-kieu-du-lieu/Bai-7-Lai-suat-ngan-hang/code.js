
function laisuat() {
    let tienvon = parseFloat(prompt('Nhập số tiền bạn muốn gửi tiết kiệm'));
    let kyhan = parseInt(prompt('Nhập kỳ hạn bạn muốn gửi (tính bằng tháng)'));
    const laisuat = 6.9/100;
    tienlai = 0;
    text = '<table border="1" cellspacing="0" cellpadding="5"><tr><td>Kỳ thứ</td><td>Tiền vốn</td><td>Tiền lãi</td><td>Tổng</td></tr>';
    for (let i = 1; i <= kyhan; i++) {
        tienvon += tienlai;
        tienlai = tienvon * laisuat/12;
        tong = tienvon + tienlai;
        text += '<tr><td>'+i+'</td>';
        text += '<td>'+tienvon.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+'</td>';
        text += '<td>'+tienlai.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+'</td>';
        text += '<td>'+tong.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+'</td></tr>';
    }
    document.getElementById("rate").innerHTML = text;
}