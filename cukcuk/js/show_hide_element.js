//   Hàm gọi thông báo khi không nhập hoặc nhập sai định dạng từ input
function ShowDangerInput(Containt,msg){
    var html =$(`<div class="danger-input">
    <p>`+msg+`</p>
    <div class="arrow"></div>
     </div>`);
    $(Containt).append(html);
    
}
//   Hàm hủy thông báo từ 1 input chỉ định
function removeDangerAlert(DivContaint){
    $(DivContaint).remove('.danger-input');
}
  //   Hàm hủy tất cả thông báo từ input
 function removeAllDangerAlert(){
    $('div').remove('.danger-input');
}
   //   Hàm gọi thông báo hủy khi thao tác trên form không thành công 
function Toast(name,icon,msg){
    var html =$(`<div class="toast-items ${name}">
    <div class="icon-1"><i class="fas ${icon}"></i></div>
    <div class="text">${msg}</div>
    <div class="icon-2"><i class="fas fa-times"></i></div>
</div>`);
    $('.toast-messege').append(html);
    setTimeout(() => {
        $('.toast-messege').empty();
    }, 2000);
}
//Hiển thị dialog thao tác
// function dlgShow(){
//     $('.dlg').show();
// }
