<template>
    <div>
        <div class="m-main-body">
            <!-- <div class="m-body-box-layout"> -->
            <div class="m-main-body-line-1">
                <h2>Nhân viên</h2>
                <ms-button
                    :buttonData="buttonData[0]"
                    @click="showCall(employee, 1)"
                    v-bind:Mode="EmpDetailMode"
                />
            </div>
            <div class="m-main-body-border-box">
                <div class="m-main-body-box">
                    <div class="m-main-body-box-line-1">
                        <div class="form-group-input">
                           <input
                            type="text"
                            class="m-input-default m-seach-input"
                            placeholder="Tìm theo mã, tên nhân viên"
                            v-model="seachString"
                           />
                        <button class="m-btn-seach m-seach-icon"></button>
                        </div>
                        <button @click="refresh" class="m-btn-refresh"></button>
                    </div>
                    <div class="employee-table">
                        <ms-table
                            @editCall="showCall"
                            @alertShow="showAlert"
                            :employeeprop="employee.EmployeeCode"
                            :tableData="resultQuery"
                            :tableHeader="tableHeader"
                        />
                           <ms-pagination
                    :Toast="ToastStatus"
                    :changeToastStatus="ToastStatus = null "
                    />
                    </div>
                    <!-- page-footer -->
                 
                </div>
                <!-- </div> -->
            </div>
            <ms-employeedetail
                v-show="EmpDetailMode"
                v-on:hideEmpDetail="CloseForm"
                v-bind:employee_props="employee"
                @ToastCall = "ToastCall"
                @showAlert="showAlert"
                :focus="focus"
                @removeFocus="focus=false"
            />
            <ms-alert
                v-show="alertMode"
                v-bind:employee="employee"
                v-bind:alertStatus="alertStatus"
                @ToastCall = "ToastCall"
                @removeAlertCall="hideAlert"
            />
            
        </div>
    </div>
</template>

<script>
import MsEmployeedetail from "./MSEmployeeDetail.vue";
import MsButton from "../components/button/MSButton.vue";
import MsAlert from "../components/alert/MSAlert.vue";
import MsTable from "../components/table/MSTable.vue";
import MsPagination from "../components/pagging/MSPagination.vue"
export default {
    name: "table",
    components: {
        MsEmployeedetail,
        MsButton,
        MsTable,
        MsAlert,
        MsPagination,
    },

    methods: {
        /**
         * Gọi toast hiển thị trạng thái hoạt động
         * created by cuongnd1
         * created date : 3/3/2022
         * 
         */
        ToastCall(status,data){
          if(data){
              this.employee = data;
          }
          this.ToastStatus = status; 
          this.refresh();
        },
        /**
         *Nút refresh gọi vào store lấy action getEmpList để f5 dữ liệu empList trong state
         * created by cuongnd1
         * created date 1/3/2022
         * */
        refresh() {
            this.$store.dispatch("pagination",{ pageSize:10,pageNumber:1})
        },
        /**
         * Hàm đóng form chi tiết nhân viên
         *  created by cuongnd
         * created date 21/2/2022
         */
        CloseForm() {
            this.EmpDetailMode = false;
        },
        /**
         * Show alert
         * created by cuongnd1
         * created date 27/2/2022
         */
        showAlert(data, status) {
            if(data){
                this.employee = data;
            }
            this.alertMode = true;
            this.alertStatus = status;
        },
        /**
         * hide alert
         * created by cuongnd1
         * created date 27/2/2022
         */
        hideAlert() {
            this.alertMode = false;
            this.focus = true;
        },
        /**
         * show form employee detail
         * đọc status của form là form thêm hay sửa
         * created by cuongnd1
         * created date: 27/2/2022
         */
        showCall(employee, status) {
            debugger
            this.employee = employee;
            this.$store.state.Formmode = status;
            this.EmpDetailMode = true;
            this.focus = true;
        },
    },
    created() {
        /**
         * Hàm truy cập vào store của vuex và lấy ra hàm getEmpList từ actions
         * created by cuongnd
         * created date: 22/2/2022
         */
        this.$store.dispatch("getEmpList");
    },
       computed: {
        /**
         * Hàm xử lý tìm kiếm khi nhập một chuỗi
         *created by cuongnd1
         * created date 3/1/2022
         */
        resultQuery() {
            var tempList = this.$store.state.empList;
            if (this.seachString) {
                return tempList.filter((item) => {
                    return this.seachString.toLowerCase().split(' ').every(v => item.EmployeeName.toLowerCase().includes(v))
                });
            } else {
                return this.$store.state.paggingList;
            }
        },
    },

    data() {
        return {
            focus:false,
            ToastStatus:null,
            seachString: null,
            tblFuntionFlag: 0,
            EmpDetailMode: false,
            employee: {},
            alertStatus: null,
            alertMode: false,
            selectboxData: [
                {
                    content: "10 Bản ghi trên 1 trang",
                    TypeOfButton: "m-select-box-button",
                    value: 10,
                },
                {
                    content: "20 Bản ghi trên 1 trang",
                    TypeOfButton: "m-select-box-button",
                    value: 20,
                },
                {
                    content: "30 Bản ghi trên 1 trang",
                    TypeOfButton: "m-select-box-button",
                    value: 30,
                },
                {
                    content: "50 Bản ghi trên 1 trang",
                    TypeOfButton: "m-select-box-button",
                    value: 50,
                },
                {
                    content: "100 Bản ghi trên 1 trang",
                    TypeOfButton: "m-select-box-button",
                    value: 100,
                },
            ],
            buttonData: [
                {
                    index: 1,
                    content: "Thêm mới nhân viên",
                    TypeOfButton_ID: "",
                    TypeOfButton_Class: "m-btn-add-agree",
                },
            ],


              tableHeader: [
                {
                    content: "Mã nhân viên",
                    css: {
                        width: "200px",
                        height: null,
                        "text-align": "center",
                        position:"sticky",
                        left:"61px",
                        "background-color":"#f4f5f8",
                        "border-right": "1px solid #c7c7c7",
                        "border-left": "1px solid #c7c7c7",
                        outline:"none"
                    },
                    key:"EmployeeCode"
                },
                {
                    content: "Tên nhân viên",
                    css: {
                        width: "250px",
                        height: null,
                        "text-align": "center",
                    },
                    key:"EmployeeName"
                },
                {
                    content: "Giới tính",
                    css: {
                        width: "100px",
                        height: null,
                        "text-align": "center",
                    },
                    key:"GenderName"
                },
                {
                    content: "Ngày sinh",
                    css: {
                        width: "120px",
                        height: null,
                        "text-align": "center",
                    },
                    key:"DateOfBirth"
                },
                {
                    content: "Số CMND",
                    css: {
                        width: "120px",
                        height: null,
                        "text-align": "center",
                    },
                    key:"IdentityCode"
                },
                {
                    content: "Chức danh",
                    css: {
                        width: "200px",
                        height: null,
                        "text-align": "center",
                    },
                    key:"PositionName"
                },
                {
                    content: "Tên đơn vị",
                    css: {
                        width: "300px",
                        height: null,
                        "text-align": "center",
                    },
                    key:"DepartmentName"
                },
                {
                    content: "Số tài khoản",
                    css: {
                        width: "150px",
                        height: null,
                        "text-align": "center",
                    },
                    key:"BankAccountNumber"
                },
                {
                    content: "Tên ngân hàng",
                    css: {
                        width: "200px",
                        height: null,
                        "text-align": "center",
                    },
                    key:"BankName"
                },
                {
                    content: "Chi nhánh tài khoản ngân hàng",
                    css: {
                        width: "350px",
                        height: null,
                        "text-align": "center",
                         "border-right": "none",
                    },
                    key:"BankBranchName"
                },
            ],
        };
    },
};
</script>

<style>
/* @import url("../assets/css/main.css"); */
@import url("../assets/css/component/mainbody.css");
@import url("../assets/css/component/button.css");
@import url("../assets/css/component/selectbox.css");
@import url("../assets/css/component/footer.css");
@import url("../assets/css/component/input.css");
.emp-table-function {
    text-align: right;
}
</style>
