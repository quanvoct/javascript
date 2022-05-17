var oligoName = document.getElementById('oligo-name'),
    oligoString = document.getElementById('oligo-string'),
    oligoStatus = document.getElementById('oligo-status'),
    oligoNormalization = document.getElementById('oligo-normalization'),
    oligoList = document.getElementById('oligo-list'),
    oligoSubmit = document.getElementById('oligo-submit'),
    oligoEdit = document.getElementById('oligo-edit'),
    oligoStatusLabel = document.getElementById('oligo-status-label'),
    validateForm = document.getElementById('validate-form'),
    stringCounter = document.getElementById('string-counter'),
    
    nameLength = document.getElementById('name-length').innerHTML.split(","),
    stringLength = document.getElementById('string-length').innerHTML.split(","),
    odList = document.getElementById('od-list').innerHTML.split(","),
    typeList = document.getElementById('type-list').innerHTML.split(","),
    estimatedList = document.getElementById('estimated-list').innerHTML.split(","),
    turnAroundTimeList = document.getElementById('turn-around-time-list').innerHTML.split(","),
    unitPriceList = document.getElementById('unit-price-list').innerHTML.split(","),
    baseList = document.getElementById('base-list').innerHTML;

oligoStatusLabel.innerText = statusLabel;
oligoName.placeholder = colName;
oligoString.placeholder = colSequence;
oligoSubmit.innerHTML = addBtnLabel;
oligoEdit.innerHTML = editBtnLabel;
var productArr = [];
oligoList.innerHTML = displayOligo(productArr);
if (productArr.length > 0) {
    window.onbeforeunload = function (e) {
        return 'Bạn có chắc chắn không?';
    };
}

oligoSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    let oName = oligoName.value.replace(/\s/g, '').toUpperCase(),
        oString = oligoString.value.replace(/\s/g, '').toUpperCase();
    if (validateOligo(oName, oString) == '') {
        let status = (oligoStatus.checked) ? 1 : 0;
        productArr.push(createRow(oligoName.value, oligoString.value, status, oligoNormalization.value));
        oligoList.innerHTML = displayOligo(productArr);
        resetForm();
    }
})

oligoName.addEventListener('change', function () {
let oName = oligoName.value.replace(/\s/g, '').toUpperCase(),
    oString = oligoString.value.replace(/\s/g, '').toUpperCase();
validateForm.innerHTML = validateOligo(oName, oString);
})

oligoString.addEventListener('change', function () {
let oName = oligoName.value.replace(/\s/g, '').toUpperCase(),
    oString = oligoString.value.replace(/\s/g, '').toUpperCase();
validateForm.innerHTML = validateOligo(oName, oString);
})

oligoString.addEventListener('keyup', function () {
if (oligoString.value.replace(/\s/g, '').toUpperCase().length > stringLength[stringLength.length - 1] - 5) {
    stringCounter.classList.remove('d-none');
    stringCounter.innerText = oligoString.value.replace(/\s/g, '').toUpperCase().length;
} else {
    stringCounter.classList.add('d-none');
}
})

oligoEdit.addEventListener('click', function (e) {
    e.preventDefault();
    for (let i = 0; i < productArr.length; i++) {
        if (productArr[i][0] == oligoName.value) {
            let status = (oligoStatus.checked) ? 1 : 0;
            if (validateInputArray(oligoString.value.replace(/\s/g, ''), baseList) == '') {
                productArr[i] = createRow(oligoName.value, oligoString.value, status, oligoNormalization.value);
                oligoList.innerHTML = displayOligo(productArr);
                resetForm();
            }
        }
    }
})

/*---------------------------------
Hàm kiểm tra từng ký tự trong chuỗi nhập vào có trong danh sách cho sẵn không
-----------------------------------*/
function validateInputArray(input, list) {
    input = input.replace(/\s/g, '').toUpperCase(); //Viết hoa chuỗi input lên
    list = list.toUpperCase(); //Viết hoa chuỗi list lên
    let inputArr = input.split("");
    let listArr = list.split(",");
    let result;
    let vitri = [];
    for (let i = 0; i < inputArr.length; i++) {
        let check = false;
        for (let j = 0; j < listArr.length; j++) {
            if (inputArr[i] == listArr[j]) {
                check = true;
            }
        }
        if (check == false) {
            vitri.push(inputArr[i]);
        }
    }
    if (vitri.length > 0) {
        let text = invalidLetter + ': ';
        text += vitri.join(', ');
        result = text + '. ';
    } else {
        result = '';
    }
    return result;
}

/*---------------------------------
Xác minh xem tên và chuỗi Oligo đã nhập có hợp lệ không
-----------------------------------*/
function validateOligo(name, string) {
    let array = [], text = '';
    for (let i = 0; i < productArr.length; i++) {
        array.push(productArr[i][0]);
    }
    if (name != null) {
        switch (true) {
            case name == "":
                oligoName.classList.add('border-danger');
                oligoSubmit.disabled = true;
                text += `<li>${noEmptyName}</li>`;
                break;
            case array.includes(name):
                oligoName.classList.add('border-danger');
                oligoSubmit.disabled = true;
                text += `<li>${existName}</li>`;
                break;
            case name.length < nameLength[0]:
                oligoName.classList.add('border-danger');
                oligoSubmit.disabled = true;
                text += `<li>${minNameLength}${nameLength[0]}${letter}</li>`;
            case name.length > nameLength[1]:
                oligoName.classList.add('border-danger');
                oligoSubmit.disabled = true;
                text += `<li>${maxnameLength}${nameLength[1]}${letter}</li>`;
                break;
            default:
                oligoName.classList.remove('border-danger');
                oligoSubmit.disabled = false;
        }
    }
    switch (true) {
        case string == "":
            oligoString.classList.add('border-danger');
            oligoSubmit.disabled = true;
            text += `<li>${noEmptyString}</li>`;
            break;
        case string.includes('GGGGGG'):
            oligoString.classList.add('border-danger');
            text += `<li>${difficultOligo}</li>`;
            break;
        case validateInputArray(string, baseList) != '':
            oligoString.classList.add('border-danger');
            oligoSubmit.disabled = true;
            text += `<li>${validateInputArray(string, baseList)}</li>`;
        case string.length < stringLength[0]:
            oligoString.classList.add('border-danger');
            oligoSubmit.disabled = true;
            text += `<li>${minStringLength}${stringLength[0]}${base}</li>`;
        case string.length > stringLength[stringLength.length - 1]:
            oligoString.classList.add('border-danger');
            oligoSubmit.disabled = true;
            text += `<li>${minStringLength}${stringLength[stringLength.length - 1]}${base}</li>`;
            break;
        default:
            oligoString.classList.remove('border-danger');
            oligoSubmit.disabled = false;
            break;
    }
    return text;
}

/*---------------------------------
Đưa form nhập dữ liệu trở về trạng thái ban đầu
-----------------------------------*/
function resetForm() {
    oligoName.classList.remove('border-danger');
    oligoString.classList.remove('border-danger');
    oligoEdit.classList.add('d-none');
    oligoSubmit.classList.remove('d-none');
    validateForm.innerHTML = "";
    oligoName.value = '';
    oligoName.disabled = false;
    oligoString.value = '';
    oligoStatus.checked = false;
    oligoNormalization.value = 0;
    oligoName.focus();
}

/*---------------------------------
Tạo thêm một mảng con (hàng dữ liệu)
-----------------------------------*/
function createRow(name, sequence, dry, normalization) {
    let array = [];
    let tempDry = (dry) ? 1 : 0;
    name = name.replace(/\s/g, '').toUpperCase();
    sequence = sequence.replace(/\s/g, '').toUpperCase();
    array.push(name, sequence, tempDry, normalization);
    return array;
}

/*---------------------------------
Hiển thị dữ liệu của 1 hàng (mảng con) lên form để tiến hành chỉnh sửa
-----------------------------------*/
function editRow(num) {
    oligoName.value = productArr[num][0];
    oligoName.disabled = true;
    oligoString.value = productArr[num][1];
    oligoStatus.checked = (productArr[num][2] == 1) ? true : false;
    oligoNormalization.value = productArr[num][3];
    oligoEdit.classList.remove('d-none');
    oligoSubmit.classList.add('d-none');
}

/*---------------------------------
Xóa một mảng con (hàng dữ liệu)
-----------------------------------*/
function removeRow(value) {
    if (confirm('Xác nhận trước khi xóa?')) {
        productArr.splice(value, 1);
        oligoList.innerHTML = displayOligo(productArr);
    }
}

/*---------------------------------
Nhập vào số milisecond, hàm sẽ trả về ngày tháng định dạng dd/mm/yyyy
-----------------------------------*/
function dmYFormat(value) {
    var date = new Date(value),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
}

/*---------------------------------
Hiển thị mảng lớn dữ liệu ra màn hình
-----------------------------------*/
function displayOligo(arr2ways) {
    if (arr2ways.length > 0) {
        let str = `
        <table class="table table-striped table-hover table-sm align-middle">
            <thead>
                <tr>
                    <th scope="col" class="text-center">${colName}</th>
                    <th scope="col">${colSequence}</th>
                    <th scope="col" class="text-center">${colLength}</th>
                    <th scope="col" class="text-center">${colOD}</th>
                    <th scope="col" class="text-center">${colType}</th>
                    <th scope="col" class="text-center">${colStatus}</th>
                    <th scope="col" class="text-center">${colNormalization}</th>
                    <th scope="col" class="text-end">${colUnitPrice}</th>
                    <th scope="col" class="text-end">${colFee}</th>
                    <th scope="col" class="text-end">${colTotal}</th>
                    <th scope="col" class="text-center">${colEDD}</th>
                    <th scope="col">&nbsp;</th>
                </tr>
            </thead>
            <tbody>`,
            subTotal = 0;
        for (let i = 0; i < arr2ways.length; i++) {
            let od, type, unitPrice, eDD, fee = 0;
            const d = new Date();
            let time = d.getTime();
            switch (true) {
                case (!isNaN(stringLength[1]) && arr2ways[i][1].length >= stringLength[0] && arr2ways[i][1].length <= stringLength[1]):
                    od = odList[0];
                    type = typeList[0];
                    eDD = dmYFormat(new Date(3600000 * turnAroundTimeList[0] + time));
                    unitPrice = unitPriceList[0];
                    break;
                case (!isNaN(stringLength[2]) && arr2ways[i][1].length > stringLength[1] && arr2ways[i][1].length <= stringLength[2]):
                    od = odList[1];
                    type = typeList[1];
                    eDD = dmYFormat(new Date(3600000 * turnAroundTimeList[1] + time));
                    unitPrice = unitPriceList[1];
                    break;
                case (!isNaN(stringLength[3]) && arr2ways[i][1].length > stringLength[2] && arr2ways[i][1].length <= stringLength[3]):
                    od = odList[2];
                    type = typeList[2];
                    eDD = dmYFormat(new Date(3600000 * turnAroundTimeList[2] + time));
                    unitPrice = unitPriceList[2];
                    break;
                default:
                    break;
            }
            fee += (arr2ways[i][2] == 1) ? 30000 : 0;
            dry = (arr2ways[i][2] == 1) ? 'Dry' : '';
            total = unitPrice * arr2ways[i][1].length + fee;
            subTotal += total;
            str += `<tr>
                        <td scope="col" class="text-center">${arr2ways[i][0]}</td>
                        <td scope="col">${arr2ways[i][1]}</td>
                        <td scope="col" class="text-center">${arr2ways[i][1].length}</td>
                        <td scope="col" class="text-center">${od}</td>
                        <td scope="col" class="text-center">${type}</td>
                        <td scope="col" class="text-center">${dry}</td>
                        <td scope="col" class="text-center">${arr2ways[i][3]}</td>
                        <td scope="col" class="text-end">${unitPrice.toLocaleString()}</td>
                        <td scope="col" class="text-end">${fee.toLocaleString()}</td>
                        <td scope="col" class="text-end">${total.toLocaleString()}</td>
                        <td scope="col" class="text-center">${eDD}</td>
                        <td scope="col class="text-center"">
                            <button class="btn btn-light" onclick="editRow(${i})"><i class="fa-solid fa-pencil"></i></button>
                            <button class="btn btn-light" onclick="removeRow(${i})"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>`;
        }
        str += `</tbody>
            <tfoot>
                <tr>
                    <th colspan="9" class="text-end">${subTotalLabel}</th>
                    <th class="text-end">${subTotal.toLocaleString()}</th>
                    <th colspan="3"></th>
                </tr>
            </tfoot>
        </table>`;
        return str;
    } else {
        return `<p>${guideText} <span class="badge bg-primary text-light">${addBtnLabel}</span></p>`;
    }
}