<template>
  <div>
      <div class="m-modal"></div>
       <div class="m-alert">
        <div class="m-alert-main">
            <div class="m-alert-main-icon "
            :class="selectedAlert.icon"></div>
            <div class="m-alert-main-content">{{selectedAlert.content}}</div>
        </div>
        <div class="m-alert-footer">
            <div class="m-alert-footer-left">
                <button 
                @click="removeAlert"
                class="m-btn-default">Hủy</button>
            </div>
            <div class="m-alert-footer-right">
                <button
                @click="actionCall"
                 class="m-btn-add-agree">Đồng ý</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
      employee:Object,
      alertStatus:String,
  },
  data(){
      return {
          selectedAlert:{},
            alertList:[
           {icon:"delete-icon",content:"Bạn muốn xóa nhân viên"},
           {icon:"warning-icon",content:"Mã nhân viên không được để trống"},
           {icon:"warning-icon",content:"Tên nhân viên không được để trống"},
            {icon:"warning-icon",content:"Hãy chọn phòng ban"},
            {icon:"warning-icon",content:"Mã nhân viên đã tồn tại"}
        ]
      }
  },
  mounted(){

  },
  watch:{
      /**
       * Mỗi khi trạng thái thông báo thay đổi thay đổi biến selectedAlert để thay đổi giao diện
       */
      alertStatus(){
         if(this.alertStatus == "delete"){
            this.selectedAlert = this.alertList[0];
         }
         else if(this.alertStatus == "!empCode")
           this.selectedAlert = this.alertList[1];
            else if(this.alertStatus == "!empName")
           this.selectedAlert = this.alertList[2];
             else if(this.alertStatus == "!empDep")
           this.selectedAlert = this.alertList[3];
           else if(this.alertStatus == "empCode")
            this.selectedAlert = this.alertList[4];
        },
      employee(){
          console.log(this.employee)
      }
  },
  methods: {
    /**
     * created by cuongnd1
     * gọi vào store và gọi hàm từ acitons để thêm xóa hoặc sửa
     * gọi hàm đóng alert
     * 
     */
    actionCall(){
        if(this.alertStatus == "delete")
        {
        this.$store.dispatch("deleteEmp",this.employee.EmployeeId);
        this.$emit("ToastCall","delete");
        } 
        this.removeAlert();
    },
    /**
     * Hàm đóng alert
     * gọi re component cha để đóng alert
     */
    removeAlert(){
        this.$emit("removeAlertCall");

    }    
  },
 
}
</script>
 
<style scoped>
.m-modal{
  z-index: 99;
}
 @import '../../assets/css/component/alert.css';
 @import '../../assets/css/main.css';
 @import '../../assets/css/component/button.css';
</style>