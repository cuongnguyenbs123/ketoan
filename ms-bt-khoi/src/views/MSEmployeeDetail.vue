
<template>
    <div>
        <!-- Modal làm mờ màn hình  -->
        <div class="m-modal"></div>
        <!-- Form chi tiết nhân viên -->
        <div class="m-container-employee-detail">
            <div class="m-employee-detail-header">
                <h2>Thông tin nhân viên</h2>
                <div id="isClient">
                    <input
                        type="checkbox"
                        id="m-ckb-isClient"
                        name="isClient"
                    />
                    <label for="isClient"> Là khách hàng</label>
                </div>
                <div id="isProvider">
                    <input
                        type="checkbox"
                        id="m-ckbid-isProvider"
                        name="isProvider"
                    />
                    <label for="isProvider"> Là nhà cung cấp</label>
                </div>
                <button id="m-btn-empdetail-infor"></button>
                <button
                    id="m-btn-empdetail-close"
                    v-on:click="hideEmpDetail"
                ></button>
            </div>
            <div class="m-employee-detail-body">
                <div class="m-row m-employee-detail-row">
                    <div class="m-employee-detail-row left">
                            <ms-input-required
                             :inputItem="inputList[0]"
                              @handleBlur='handleBlur'
                              @focus="focus"
                              :employeeprop="employee.EmployeeCode"
                            />

                            
                           <ms-input-required
                             :inputItem="inputList[1]"
                              @handleBlur='handleBlur'
                              @focus="focus"
                              :employeeprop="employee.EmployeeName"
                            />
                    </div>
                    <div class="m-employee-detail-row right">
                        <ms-input-date
                         :inputItem="inputList[2]"
                         @handleBlur='checkDate'
                         @focus="focus"
                         :employeeprop="employee.DateOfBirth"
                        />
                        <div class="form-group">
                            <label id="lbl-gender" for="gender"
                                >Giới tính</label
                            >
                            <div class="m-gender">
                                <div class="m-ckb-gender">
                                    <label class="ms-radio-button"
                                        >Nam
                                        <input
                                            type="radio"
                                            value="1"
                                            v-model="employee.Gender"
                                            name="radio"
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                                <div class="m-ckb-gender">
                                    <label class="ms-radio-button"
                                        >Nữ
                                        <input
                                            type="radio"
                                            value="0"
                                            v-model="employee.Gender"
                                            name="radio"
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                                <div class="m-ckb-gender">
                                    <label class="ms-radio-button"
                                        >Khác
                                        <input
                                            type="radio"
                                            value="2"
                                            v-model="employee.Gender"
                                            name="radio"
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-row m-employee-detail-row">
                    <div class="m-employee-detail-row left">
                        <div class="form-group">
                            <label for="department-name">Đơn vị <i>*</i></label>
                            <select
                                id="departmentName"
                                class="m-employee-input m-department-name"
                                v-model="employee.DepartmentId"
                                @blur="handleBlurselect"
                                @focus="focus"
                            >
                                <option
                                    v-for="(department, index) in departments"
                                    :key="index"
                                    :value="department.DepartmentId"
                                >
                                    {{ department.DepartmentName }}
                                </option>
                            </select>
                            <span class="form-messege"></span>
                        </div>
                    </div>
                    <div class="m-row m-employee-detail-row right">
                       <ms-input-required
                             :inputItem="inputList[3]"
                             :employeeprop="employee.IdentityNumber"
                            />
                         <ms-input-date
                         :inputItem="inputList[4]"
                         @handleBlur='checkDate'
                         @focus="focus"
                         :employeeprop="employee.IdentityDate"
                        />
                    </div>
                </div>
                <div class="m-row m-employee-detail-row">
                    <div class="m-employee-detail-row left">
                       <ms-input-required
                             :inputItem="inputList[5]"
                             :employeeprop="employee.PositionName"
                            />
                    </div>
                    <div class="m-row m-employee-detail-row right">
                        <ms-input-required
                             :inputItem="inputList[6]"
                             :employeeprop="employee.IdentityPlace"
                            />
                    </div>
                </div>
                <div class="m-row m-employee-detail-row">
                     <ms-input-required
                             :inputItem="inputList[7]"
                             :employeeprop="employee.Address"
                            />
                </div>
                <div class="m-row m-employee-detail-row triple-input">
                    <ms-input-required
                             :inputItem="inputList[8]"
                             :employeeprop="employee.PhoneNumber"
                            />
                    <ms-input-required
                             :inputItem="inputList[9]"
                             :employeeprop="employee.TelephoneNumber"
                            />
                    <ms-input-required
                             :inputItem="inputList[10]"
                             :employeeprop="employee.Email"
                             @handleBlur='checkEmail'
                             @focus="focus"
                            />
                </div>
                <div class="m-row m-employee-detail-row triple-input">
                     <ms-input-required
                             :inputItem="inputList[11]"
                             :employeeprop="employee.BankAccount"
                            />
                     <ms-input-required
                             :inputItem="inputList[12]"
                             :employeeprop="employee.BankName"
                            />
                    <ms-input-required
                             :inputItem="inputList[13]"
                             :employeeprop="employee.BankBranch"
                            />
                </div>
            </div>
            <div class="m-employee-detail-footer">
                <div class="m-emp-detail-footer-left">
                    <button @click="hideEmpDetail" class="m-btn-default">
                        Hủy
                    </button>
                </div>
                <div class="m-emp-detail-footer-right">
                    <button class="m-btn-default"
                    @click="tempEmp"
                    >Cất</button>
                    <button @click="btnSaveClick" class="m-btn-add-agree">
                        Cất và thêm
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import MsInputRequired from '../components/input/MSInputRequired.vue'
import MsInputDate from '../components/input/MSInputDate.vue'
export default {
    components:{
      MsInputRequired,
      MsInputDate,
    },
    props: {
        Mode: Boolean,
        employee_props: Object,
        rowClick: Boolean,
        focus:Boolean
    },
    watch: {
        /**
         * Gán dữ liệu nhân viên được chọn truyền vào nhân viên của data và hiển thị lên form
         * created by cuongnd1
         * created date 24/2/2022
         */
        employee_props() {
            this.employee = this.employee_props;
        },
        focus(){
            console.log(this.focus)
             this.$nextTick(() => {
                  $('input[name="employee-code"]').focus();
            });
            this.$emit("removeFocus")
        }
    },
    created() {
        /**
         * Hàm truy cập vào store vủa vuex và gọi ra hàm getDepartment của actions
         * created by cuongnd1
         * created date 27/2/2022
         */
        this.$store.dispatch("getDepartment");
    },
    mounted(){
    },
    computed: {
        /**
         * Hàm lấy ra mảng department từ state của vuex
         * created by cuongnd1
         * created date 27/2/2022
         */
        departments() {
            return this.$store.state.department;
        },
    },
    methods: {
        /* eslint-disable */
        /**
         * Lưu lại dữ liệu của người dùng nhập khi nhấn cất
         * Created by cuongnd1
         * created date :3/3/2022
         */
        tempEmp(){
           this.$emit("ToastCall",'cancel',this.employee)
           this.$emit("hideEmpDetail");
        },
        /** 
         * ẩn form detail
         * Xóa các invalid của input
         * crerated by cuongnd1
         * created date: 23/2/2022
         */
        hideEmpDetail(state) {
            // if(state != "upload")
            // { this.$emit("ToastCall",'cancel')}

              this.$emit("hideEmpDetail");
            var input = document.getElementsByClassName("m-employee-input")
            var i;
            for (i = 0; i < input.length; i++) {
                input[i].classList.remove("invalid");
            }
             this.employee = {}
        },
        /** 
         * nút add
         * truy cập vào store và gọi hàm postEmpLiss (param(this.employee) là thông tin nhân viên mới muốn thêm)
         * ẩn form
         * created by cuongnd1
         * created date : 27/2/2022
         */
        btnSaveClick() {
            var empCode = $('input[name="employee-code"]').val();
            var empName = $('input[name="employee-name"]').val();
            var empDepartment =$("#departmentName>option:selected").text();
            if (!empCode) {
                this.$emit("showAlert",null,"!empCode");
                $('input[name="employee-code"]').add("required");
            } else if (!empName) {
                 this.$emit("showAlert",null,"!empName");
                $('input[name="employee-name"]').add("required");
                 $('input[name="employee-name"]').focus();
            }else if(!empDepartment){
                this.$emit("showAlert",null,"!empDep");
                $('#departmentName').add("required");
                $('#departmentName').focus();
            } 
            else {
                this.employee.DepartmentName = $(
                    "#departmentName>option:selected"
                ).text();
                if (this.employee.Gender == 1) this.employee.GenderName = "Nam";
                else if (this.employee.Gender == 0)
                    this.employee.GenderName = "Nữ";
                else this.employee.GenderName = "Khác";
                if (this.$store.state.Formmode == 1) {
                    this.$store.dispatch("postEmpList", this.employee);
                    
                    if(this.$store.state.success == 1)
                    {
                      this.$emit("ToastCall",'post')
                       this.hideEmpDetail('upload');
                       this.$store.state.success = 0;
                        this.$store.dispatch("pagination",{ pageSize:10,pageNumber:1})
                    }else {
                        this.$emit("showAlert",null, "empCode");
                    }
                    
                } else {
                     this.$emit("ToastCall",'put')
                     this.$store.dispatch("putEmp", this.employee);
                     this.$store.dispatch("pagination",{ pageSize:10,pageNumber:1})
                     this.hideEmpDetail('upload');
                }
               
            }
        },
        /**
         * Hàm xử lý khi blur input
         *  check input nếu là bắt buộc nhập nhưng để trống thì báo lỗi
         * created 25/2/2022
         */
        handleBlur(propName,val) {
            if (!val) {
                event.currentTarget.classList.add("invalid");
                event.currentTarget.setAttribute(
                    "title",
                    "Hãy nhập thông tin này"
                );
            }
            else {
                this.employee[propName] = val;
                console.log(this.employee);
            }
        },
        /**
         * Xử lý khi chưa chọn phòng ban 
         *  Created by cuongnd1
         *  created date: 25/2/2022
         */
        handleBlurselect(){
            var val = event.currentTarget.value;
             if(!val){
                   event.currentTarget.classList.add("invalid");
                    event.currentTarget.setAttribute(
                    "title",
                    "Phòng ban không được để trống"
                );
             }
             
        },
        /**
         * Hàm khi focus vào input thì ẩn thông báo lỗi
         * created by cuongnd1
         * created date 24/2/2022
         */
        focus() {
            event.currentTarget.classList.remove("invalid");
        },
        /*
        *Kiểm tra ngày nhập nếu có phải trước ngày hiện tại
        *created by cuongnd1
        * created date: 
        *  */
        checkDate(propName,value) {
            var val = new Date(value)
            if (val && val > new Date()) {
                event.currentTarget.classList.add("invalid");
                event.currentTarget.setAttribute(
                    "title",
                    "Hãy nhập ngày sinh trước ngày hiện tại"
                );
            } else 
            {
                event.currentTarget.classList.remove("invalid");
                this.employee[propName] = value;
                console.log(this.employee);
                }
        },
        /**
         *  Kiểm tra email nếu có phải đúng định dạng 
         * created by cuongnd1
         * */
        checkEmail() {
            var val = event.currentTarget.value;
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if (val && !emailReg.test(val)) {
                event.currentTarget.classList.add("invalid");
                event.currentTarget.setAttribute(
                    "title",
                    "Hãy nhập email đúng định dạng"
                );
            } else event.currentTarget.classList.remove("invalid");
        },
    },
    data() {
        return {
            employee: {},
            inputList: [
                {
                    label: { show: true, title: "Mã nhân viên",required:true },
                    input: {
                        name: "employee-code",
                        type: "text",
                        class: "m-employee-input",
                        model:"EmployeeCode",
                        ref:"focusMe",
                        css: {
                            width: "150px",
                            height: "32px",
                        },
                    },
                },
                {
                    label: { show: true, title: "Tên nhân viên",required:true },
                    input: {
                        name: "employee-name",
                        type: "text",
                        class: "m-employee-input",
                        model:"EmployeeName",
                        ref:null,
                        css: {
                            width: "245px",
                            height: "32px",
                        },
                    },
                },
                {
                    label: { show: true, title: "Ngày sinh",required:false },
                    input: {
                        name: "employee-dob",
                        type: "Date",
                        class: "m-employee-input",
                        model:"DateOfBirth",
                        ref:null,
                        css: {
                            width: "160px",
                            height: "32px",
                        
                        },
                       
                    },
                },
                {
                    label: { show: true, title: "Số CMND",required:false },
                    input: {
                        name: "identity-number",
                        type: "text",
                        class: "m-employee-input",
                        css: {
                            width: "225px",
                            height: null,
                        },
                    },
                },
                {
                    label: { show: true, title: "Ngày cấp" ,required:false},
                    input: {
                        name: "varified-date",
                        type: "date",
                        class: "m-employee-input",
                        css: {
                            width: "152px",
                            height: null,
                        },
                        
                    },
                },
                {
                    label: { show: true, title: "Chức danh",required:false },
                    input: {
                        name: "position",
                        type: "text",
                        class: "m-employee-input",
                        css: {
                            width: "410px",
                            height: null,
                        },
                    },
                },
                {
                    label: { show: true, title: "Nơi cấp",required:false},
                    input: {
                        name: "verified-place",
                        type: "text",
                        class: "m-employee-input",
                        css: {
                            width: "393px",
                            height: null,
                        },
                    },
                },
                {
                    label: { show: true, title: "Địa chỉ",required:false },
                    input: {
                        name: "address",
                        type: "text",
                        class: "m-employee-input",
                        css: {
                            width: "839px",
                            height: null,
                        },
                    },
                },
                {
                    label: { show: true, title: "Điện thoại di động",required:false },
                    input: {
                        name: "phonenumber",
                        type: "text",
                        class: "m-employee-input",
                        css: {
                            width: "200px",
                            height: null,
                        },
                    },
                },
                {
                    label: { show: true, title: "Điện thoại cố định",required:false },
                    input: {
                        name: "tel",
                        type: "text",
                        class: "m-employee-input",
                        css: {
                            width: "200px",
                            height: null,
                        },
                    },
                },
                {
                    label: { show: true, title: "Email",required:false },
                    input: {
                        name: "Email",
                        type: "text",
                        class: "m-employee-input",
                        css: {
                            width: "200px",
                            height: null,
                        },
                    },
                },
                {
                    label: { show: true, title: "Tài khoản ngân hàng",required:false},
                    input: {
                        name: "bank-account",
                        type: "text",
                        class: "m-employee-input",
                        css: {
                            width: "200px",
                            height: null,
                        },
                    },
                },
                {
                    label: { show: true, title: "Tên ngân hàng",required:false },
                    input: {
                        name: "bank-name",
                        type: "text",
                        class: "m-employee-input",
                        css: {
                            width: "200px",
                            height: null,
                        },
                    },
                },
                {
                    label: { show: true, title: "Chi nhánh" ,required:false },
                    input: {
                        name: "bank-branch",
                        type: "text",
                        class: "m-employee-input",
                        css: {
                            width: "200px",
                            height: null,
                        },
                    },
                },
            ],
        };
    },
};
</script>

<style scoped>
@import url("../assets/css/main.css");
@import url("../assets/css/component/employee-detail.css");
@import url("../assets/css/component/radiobutton.css");
@import url("../assets/css/component/checkbox.css");
#departmentName:focus{
    outline: none;
   border: 1px solid #158628;
}
</style>
