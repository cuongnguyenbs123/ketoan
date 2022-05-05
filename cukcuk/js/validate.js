//   Hàm kiểm tra định dạng email
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
}
  //   Hàm định dạng lại ngày tháng
function formatDate(date){
    var date=new Date(date);
        day =date.getDate();
        day=day<10? '0'+day :day;
        month=date.getMonth()+1;
        month=month<10? '0'+month :month;
        year=date.getFullYear();
    return day + "/" + month +"/" + year;
}
//   Hàm định dạng lại tiền tệ
function formatMoney(Salary){
    if(!Salary){
        return "";
    }else {
      Salary =new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(Salary);
        return Salary; 
    }
}
 //kiểm tra ngày sinh 
function checkdateofbirth(){
    var val =$('input[name="date_of_birth"]').val();
    val =new Date(val);
       if(val && val > new Date()){
            ShowDangerInput('.date-of-birth','Ngày sinh phải bé hơn ngày hiện tại');
            $('.date-of-birth input').focus();
        }
        else{
            removeDangerAlert('.date-of-birth');
        }
}
 //   Hàm kiểm tra đã nhập dữ liệu trên các input bắt buộc
function checkrequire(event){
    var val = $( event.data.param1+' input').val();
    if(!val){
        ShowDangerInput(event.data.param1,event.data.param2);
    }else{
        removeDangerAlert(event.data.param1);
    }
}