<template>
    <table id="emp-table">
        <!-- table header -->
        <thead>
            <tr>
                <th class="table-header-border-left"></th>
                <th class="table-header-col-1">#</th>
                <th
                    v-for="(item, index) of tableHeader"
                    :key="index"
                    :style="item.css"
                >
                    {{ item.content }}
                </th>
                <th class="table-header-function">Chức năng</th>
                <th class="table-header-border-right"></th>
            </tr>
        </thead>
        <tbody>
            <tr 
            v-for="(employee,index) of tableData" :key="index">
                <td class="m-table-border-left"></td>
                <td class="text-center sticky-left-col-1 static-col">
                    <label class="m-checkbox-container">
                        <input type="checkbox" />
                        <span class="checkmark"></span>
                    </label>
                </td>
                <td
                class="static-col"
                @click="hidetblFunction"
                 v-for="(item,index) in tableHeader" :key="index">
                    {{dataBinding(employee[item.key],index)}}
                </td>
                <td class="emp-table-function norightborder static-col">
                    <div class="m-select-box tbl-func">
                        <div
                            @click="putEmp(employee)"
                            class="m-select-box-content"
                        >
                            Sửa
                        </div>  <a href=""></a>
                        <button
                            @click="showtblFunction(employee)"
                            class="m-select-box-button-table-function"
                        ></button>
                    </div>
                </td>
                <td class="m-table-border-right"></td>
            </tr>
        </tbody>
    </table>
     <div id="m-dlg-function">
        <button class="m-btn-tbl-function">Nhân bản</button>
        <button
        class="m-btn-tbl-function"
        @click="deleteEmpcall()"
        >
        Xóa
        </button>
        <button class="m-btn-tbl-function">
        Ngừng sử dụng
       </button>
       </div>
</template>

<script>
// import $ from 'jquery';
export default {
    props: {
        tableData:Array,
        tableHeader:Object,
    },
    methods: {
        dataBinding(data,index){
            if(index == 3)
            {
                return this.formatDate(data)
            }
            else
            return data;
        },

        /* * created by cuongnd
         * Gọi sang hàm editcall của component cha
         */
        putEmp(employee) {
            this.$emit("editCall", employee, 0);
        },
        /** created by cuongnd
         * Xóa nhân viên theo dòng
         */
        deleteEmpcall() {

            this.$emit("alertShow", this.deleteEmployee, "delete");
            this.hidetblFunction();
        },
        /** created by cuongnd
         * Hàm format ngày tháng
         *  @param(date)
         */
        formatDate(date) {
            if (date) {
                date = new Date(date);
                var day = date.getDate();
                day = day < 10 ? "0" + day : day;
                var month = date.getMonth() + 1;
                month = month < 10 ? "0" + month : month;
                var year = date.getFullYear();
                return day + "/" + month + "/" + year;
            } else return;
        },
        /** created by cuongnd
         * Hàm format lương
         *  @param(Salary)
         */
        formatMoney(Salary) {
            if (!Salary) {
                return "";
            } else {
                Salary = new Intl.NumberFormat("vi-VI", {
                    style: "currency",
                    currency: "VND",
                }).format(Salary);
                return Salary;
            }
        },
        /** created by cuongnd
         * Hàm hiển thị các nút chức năng của table
         * 
         */
        showtblFunction(employee) {
            this.hidetblFunction();
            var y = event.clientY;
            var x = event.clientX;
            if(y>550){
                 document.getElementById("m-dlg-function").style.top = `${y-120}px`;
                 document.getElementById("m-dlg-function").style.left = `${x-90}px`;
            }
            else{
                 document.getElementById("m-dlg-function").style.top = `${y+20}px`;
                 document.getElementById("m-dlg-function").style.left = `${x-90}px`;
            }
            this.deleteEmployee = employee;
            document.getElementById("m-dlg-function").style.display = "block";
        },
        /** created by cuongnd
         * Hàm tắt dialog chức năng
         *
         */
        hidetblFunction() {
            document.getElementById("m-dlg-function").style.display="none";
        },
    },
 
    data() {
        return {
            deleteEmployee:{},
            employee: {},
            tableBorder:{
                
            }
        };
    },
};
</script>

<style scoped>
 @import url('../../assets/css/component/checkbox.css');
 @import url('../../assets/css/component/table.css');
</style>
