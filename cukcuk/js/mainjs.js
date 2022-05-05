$(document).ready(function() {
    var employee = new Employee();
})
/*
Tạo class employee 
*/
class Employee {
//   Hàm tạo 
constructor() {
        this.emp_edit_code ='';
        this.ToastFlag = 0;
        this.FormMode ='';
        this.loaddata();
        this.initEvents();
    }
    // Các event xảy ra khi thao tác với selector
initEvents() {
        $('.btn-add').click({ param: 0 ,pointer:this}, this.showForm)
        $('#btn-cancel').click(this.closeForm.bind(this))
        $('#btn-save').click(this.submit.bind(this));
        $('.required,date-of-birth').click(removeAllDangerAlert);
        $('input').keypress(removeAllDangerAlert);
        // $(document).on('click', '.danger-input',function(){this.remove('.danger-input')});
        $('input[name="employee-code"]').blur({ param1: ".employee-code", param2: "Hãy nhập mã nhân viên" }, checkrequire);
        $('input[name="name"]').blur({ param1: ".name", param2: "Hãy nhập tên nhân viên" }, checkrequire);
        $('input[name="id"]').blur({ param1: ".id", param2: "Hãy nhập số chứng minh nhân dân" }, checkrequire);
        $('input[name="email"]').blur({ param1: ".email", param2: "Hãy nhập email" }, checkrequire);
        $('input[name="phonenum"]').blur({ param1: ".phonenum", param2: "Hãy nhập số điện thoại" }, checkrequire);
        $('input[name="date_of_birth"]').blur(checkdateofbirth);
        $('input[name="date_of_birth"]').click(removeAllDangerAlert);
        $('.table-nv-body').on('dblclick', 'tr', { param: 1 ,pointer: this }, this.showForm);
        $('.table-nv-body').on('click','tr',{pointer:this},this.selectedRow);
        $('#btn-delete').click(this.delete.bind(this));
        // $('#btn-refresh').click(dlgShow);
    }
    //   Hàm load dữ liệu ra bảng  từ link API
loaddata() {
    $('.loading').show();
    $('.table-nv-body').empty();
    $.ajax({
        url: "http://amis.manhnv.net/api/v1/Employees/filter",
        method: "GET",
        contentType: "application/json",
        dataType: "json"
    }).done(function(res) {
        var data = res.Data;
        $.each(data, function(index, employee) {
            var date_of_birth = employee.DateOfBirth;
            date_of_birth = formatDate(employee.DateOfBirth);
            var Salary = Math.random(1, 9) * 1000000;
            Salary = formatMoney(Salary);
            var renderHTML = $(`<tr>
              <td style="text-align:left;">` + employee.EmployeeCode + `</td>
              <td style="text-align:left;width:400px;">` + employee.EmployeeName + `</td>
              <td style="text-align:center;width:200px;">` + employee.GenderName + `</td>
              <td style="text-align:center;">` + date_of_birth + `</td>
              <td style="text-align:left;">` + employee.PhoneNumber + `</td>
              <td style="text-align:left;">` + employee.Email + `</td>
              <td style="text-align:left;width:400px;">` + employee.PositionName + `</td>
              <td style="text-align:left;">` + employee.DepartmentName + `</td>
              <td style="text-align:right;width:400px;">${Salary}</td>
              <td style="text-align:left;width:500px;">` + employee.WorkStatus + `</td>
          </tr>`)
            $('.table-nv-body').append(renderHTML);
            renderHTML.data('entity',employee);
        }) 
        $('.loading').hide();
    })
}
//Hàm hiển thị dòng được chọn
 selectedRow(param){
    let pointer =param.data.pointer;
    $('tbody tr').removeClass('selected-row');
    $(this).addClass('selected-row');
    let code  =$(this).data('entity');
    pointer.emp_edit_code =code.EmployeeId;
    console.log(pointer.emp_edit_code);
}

// Hàm mở form employee
showForm(status) {
        if (status.data.param == 0) {
            status.data.pointer.FormMode ='Add';
            $('.employee-form').show();
            $('.dialog-modal').show();
            $('input[name="employee-code"]').focus();
        } else if (status.data.param == 1) {
            status.data.pointer.FormMode = 'Edit';
            $('.employee-form').show();
            $('.dialog-modal').show();
            let emp =$(this).data('entity');
            $('input[name="employee-code"]').val(emp.EmployeeCode);
            $('input[name="name"]').val(emp.EmployeeName);
            $('input[name="id"]').val(emp.IdentityNumber);
            $('input[name="email"]').val(emp.Email);
            $('input[name="phonenum"]').val(emp.PhoneNumber);
            $('select[name="sex"]').val(emp.GenderName);
            $('input[name="place"]').val();
            $('input[name="date_of_birth"]').val(emp.DateOfBirth);
            $('input[name="valid-date"]').val();
            $('select[name="position"]').val();
            $('select[value="deptno"]').val(emp.DepartmentID);
            $('input[name="tax"]').val();
            $('input[name="hire-rate"]').val();
            $('input[name="join-date"]').val();
            $('select[name="status"]').val();
            status.data.pointer.emp_edit_code = emp.EmployeeId;
        }

    }
    //   Hàm đóng form employee
closeForm() {
    $('.dialog-modal').hide();
    $('.employee-form').hide();
    $('div').remove('.danger-input');
    $('input').val("");
    if (this.ToastFlag == 0) {
        Toast('item-cancel', 'fa-exclamation-circle', 'Hủy thao tác thành công');
    } else if (this.ToastFlag == 1) {
        Toast('item-success', 'fa-check', 'Thao tác thành công');
    }
}
//Xóa nhân viên
delete(){
    var pointer =this;
    if(this.emp_edit_code){
        var url ='http://amis.manhnv.net/api/v1/Employees/'+this.emp_edit_code;
        $.ajax({
            type: "DELETE",
            url: url,
            success: function (response) {
                pointer.loaddata()
            },
            error:function(response){

            }
        });
    }
    else{
        alert('Hãy chọn 1 dòng trước');
    }
}
//   Kiểm tra lại dữ liệu đã nhập từ form và load dữ liệu lên link API
submit() {
    var emp_code = $('input[name="employee-code"]').val();
    var name = $('input[name="name"]').val();
    var id = $('input[name="id"]').val();
    var email = $('input[name="email"]').val();
    var phonenum = $('input[name="phonenum"]').val();
    var gender = $('select[name="sex"]').val();
    var valid_place = $('input[name="place"]').val();
    var date_of_birth = $('input[name="date_of_birth"]').val();
    var valid_date = $('input[name="valid-date"]').val();
    var position = $('select[name="position"]').val();
    var deptno = $('select[name="deptno"]').val();
    var tax = $('input[name="tax"]').val();
    var salary = $('input[name="hire-rate"]').val();
    var join_date = $('input[name="join-date"]').val();
    var status = $('select[name="status"]').val();
    if (!emp_code) {
        ShowDangerInput('.employee-code', 'Hãy nhập mã nhân viên')
        $('.employee-code input').focus();
    } else if (!name) {
        ShowDangerInput('.name', 'Hãy nhập tên nhân viên');
        $('.name input').focus();
    } else if (!id) {
        ShowDangerInput('.id', 'Hãy nhập số cmnd');
        $('.id input').focus();
    } else if (!email) {
        ShowDangerInput('.email', 'Hãy nhập email người dùng');
        $('.email input').focus();
    } else if (!validateEmail(email)) {
        ShowDangerInput('.email', 'Hãy nhập email đúng định dạng');
    } else if (!phonenum) {
        ShowDangerInput('.phonenum', 'Hãy nhập số điện thoại');
    } else {
        var pointer = this;
        var emp = {};
        emp.employeeCode = emp_code;
        emp.employeeName = name;
        emp.gender = gender;
        emp.DateOfBirth = new Date(date_of_birth);
        emp.phoneNumber = phonenum;
        emp.email = email;
        emp.positionName = position;
        emp.departmentID = deptno;
        emp.salary = parseFloat(salary);
        emp.identityPlace = valid_place;
        emp.WorkStatus = status;
        if(this.FormMode == "Add")
        {
            $.ajax({
                url: "http://amis.manhnv.net/api/v1/Employees",
                method: "POST",
                data: JSON.stringify(emp),
                contentType: "application/json", //Tham số truyền qua body request
                dataType: "json"
            }).done(function(response) {
                pointer.loaddata();
                pointer.ToastFlag = 1;
                pointer.closeForm();
                pointer.ToastFlag = 0;
            }).fail(function(response) {
                // if(response.responseJSON.userMsg == 'Mã khách hàng đã tồn tại trong hệ thống')
                // {
                //   debugger
                //   ShowDangerInput('.employee-code','Mã nhân viên này đã tồn tại')
                //   $('.employee-code input').focus();
                // }
                alert('Đã có lỗi xảy ra trong quá trình lấy thông tin');
            })
    
        }else if(this.FormMode == 'Edit'){
            let url = "http://amis.manhnv.net/api/v1/Employees/" + this.emp_edit_code;
            console.log(url);
             $.ajax({
                 method: "PUT",
                 url: url,
                 data: JSON.stringify(emp),
                 contentType: "application/json",
                 dataType:'json',
                 success: function (response) {
                    pointer.loaddata();
                    pointer.ToastFlag = 1;
                    pointer.closeForm();
                    pointer.ToastFlag = 0;
                 },
                 error:function(response){
                   console.log(response.responseJSON.userMsg);
                 }
             });
        }
    }
}
}