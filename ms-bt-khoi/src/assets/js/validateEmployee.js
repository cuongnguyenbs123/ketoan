//   Hàm kiểm tra định dạng email
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
  }
  //   Hàm định dạng lại ngày tháng
  /**
         * Hàm xử lý khi blur input
         *  check input nếu là bắt buộc nhập nhưng để trống thì báo lỗi
         */
   function handleBlur() {
    var value = event.currentTarget.value;
    if (!value) {
        event.currentTarget.classList.add("invalid");
        event.currentTarget.setAttribute(
            "title",
            "Hãy nhập thông tin này"
        );
    }
}
/**
 * Hàm khi focus vào input thì ẩn thông báo lỗi
 *
 */
 function focus() {
    event.currentTarget.classList.remove("invalid");
}
/*Kiểm tra ngày nhập nếu có phải trước ngày hiện tại* */
function checkdate() {
     var val = event.currentTarget.value;
    val = new Date(val);
    if (val && val > new Date()) {
        event.currentTarget.classList.add("invalid");
         event.currentTarget.setAttribute(
            "title",
            "Hãy nhập ngày sinh trước ngày hiện tại"
        );
    }else 
     event.currentTarget.classList.remove("invalid");
}
/** Kiểm tra email nếu có phải đúng định dạng */
function checkEmail(){
      var val = event.currentTarget.value;
      var validRegex = '[a-z0-9]+@[a-z]+.[a-z]{2,3}';
      console.log(validRegex)
      if(val && val.match(validRegex)){
         event.currentTarget.classList.add("invalid");
         event.currentTarget.setAttribute(
            "title",
            "Hãy nhập email với định dạng @gmail.com"
        )
      }
      else 
       event.currentTarget.classList.remove("invalid");
}