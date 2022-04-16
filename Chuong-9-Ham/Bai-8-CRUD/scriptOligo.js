
        function validateInputArray(input, list) {
            /*---------------------------------
            Hàm kiểm tra từng ký tự trong chuỗi nhập vào có trong danh sách cho sẵn không
            -----------------------------------*/
            input = input.toUpperCase(); //Viết hoa chuỗi input lên
            list = list.toUpperCase(); //Viết hoa chuỗi list lên
            let inputArr = input.split("");
            let listArr = list.split(",");
            console.log(inputArr + ' và '+ listArr);
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
                    vitri.push(i);
                }
            }
            if (vitri.length > 0) {
                let text = 'Chuỗi không hợp lệ tại vị trí: ';
                text += vitri.join(', ');
                result = text;
            } else {
                result = '';
            }
            return result;
        }