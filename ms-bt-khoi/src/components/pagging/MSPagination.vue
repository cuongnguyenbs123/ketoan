<template>
    <div class="m-footer">
        <div class="m-footer-left">Tổng số: <i>{{TotalRecord}}</i>  bản ghi</div>
        <div class="m-footer-right">
            <div class="m-select-box">
                <div id="selected" class="m-select-box-content selected">
                    10 bản ghi trên  trang
                </div>
                <div class="m-options" v-show="PaggingShow">
                    <div
                        v-for="(item, index) in selectboxData"
                        :key="index"
                        :data-value="item.value"
                        class="m-option"
                        @click="SelectedPaginationSize(item.value)"
                    >
                        {{ item.content }}
                    </div>
                </div>
                <button
                    class="m-select-box-button"
                    @click="PaggingShow = !PaggingShow"
                ></button>
            </div>
            <div class="m-footer-pagination">
                <button class="m-btn-pagging"
                  @click="prePage"
                  id="prePage"
                  disabled
                >Trước</button>
                <button v-for="(btn,index) in TotalPage"
                :key="index"
                @click="pageDirect(index+1)"
                class="m-btn-pagging"
                >{{index + 1}}</button>
                <button class="m-btn-pagging"
                @click="nextPage"
                id="nextPage"
                >Sau</button>
            </div>
            <div class="toast-message">
            </div>
        </div>
        
    </div>
    
</template>



<script>

import $ from "jquery"
export default {
    props:{
        Toast:String,
    },
    components:{
        
    },
    watch:{

        /**
         * Quan sát biến currentPage nếu có sự thay đổi để vô hiệu hóa nút nextpage và prepage
         * created by cuongnd1
         * created date 2/3/2022
         */
        currentPage(){
            if(this.currentPage == 1){
              document.getElementById('prePage').setAttribute("disabled","")
            }else{
               document.getElementById('prePage').removeAttribute("disabled")
            }
            if(this.currentPage == this.TotalPage){
              document.getElementById('nextPage').setAttribute("disabled","")
            }else {
               document.getElementById('nextPage').removeAttribute("disabled")
            }
        },
        /**
         * Quan sát biến currentPageSize để vô hiệu hóa 2 nút next và prePage
         * created by cuongnd1
         * created date 2/3/2022
         */
         currentPageSize(){
             if(this.currentPageSize >= this.$store.state.totalRecord){
                document.getElementById('prePage').setAttribute("disabled","")
                document.getElementById('nextPage').setAttribute("disabled","")
             }
         },
           /**
         * Quan sát biến Toast để quyết định trạng thái của toast
         * created by cuongnd1
         * created date 3/3/2022
         */
         Toast(){
             if(this.Toast == 'delete'){
                  this.showToast(this.ToastList[0])
             }
              else if(this.Toast == 'post'){
                  this.showToast(this.ToastList[3])
             }
                else if(this.Toast == 'put'){
                  this.showToast(this.ToastList[4])
             }
               else if(this.Toast == 'cancel'){
                  this.showToast(this.ToastList[1])
             }
         }
          
    },
    
    methods:{
          /**
         * Append toast vào phần footer right 
         * created by cuongnd1
         * created date 3/3/2022
         */
        showToast(data){
           var html = $(`<div class="toast-items ${data.item}">
                        <div class="icon-1 "><i class="fas ${data.icon}"></i></div>
                        <div class="text">${data.content}</div>
                        <div class="icon-2"><i class="fas fa-times"></i></div>
                        </div>`)
                        $('.toast-message').append(html);
                         setTimeout(() => {
                           $('.toast-message').empty();
                           this.$emit("changeToastStatus")
                        },3000);
        },

        /**
         * Hàm nhấn nút trước sẽ quay về trang ở trước trang đó
         *created by cuongnd1
         *created date:2/3/2022
         */
        prePage(){
             this.currentPage = this.currentPage - 1;
                var data ={
                pageSize:this.currentPageSize,
                pageNumber:this.currentPage
            }
            this.$store.dispatch("pagination",data)
            this.removeSelectedPage();
            document.getElementsByClassName("m-btn-pagging")[this.currentPage].classList.add('active');
        },
          /**
         * Hàm nhấn nút tiếp sẽ quay về trang ở trước trang đó
         *created by cuongnd1
         *created date:2/3/2022
         */
        nextPage(){
            console.log(this.currentPage);
            console.log(this.totalPage)
            if(this.currentPage ==  this.TotalPage)
            this.ref ="disabled"
            else {
             this.ref="active"
             this.currentPage = this.currentPage + 1;
                var data ={
                pageSize:this.currentPageSize,
                pageNumber:this.currentPage
            }
            this.$store.dispatch("pagination",data)
            this.removeSelectedPage();
            document.getElementsByClassName("m-btn-pagging")[this.currentPage].classList.add('active');
            }
        },
          /*
         *Khi chọn số trang load số trang hiển thị lên ô selected của selectbox
         *Quy định số lượng bản ghi trong 1 trang
         *created by cuongnd1
         *created date: 1/3/2022
         **/
        SelectedPaginationSize(value) {
            document.getElementById("selected").innerHTML =
                value + " bản ghi trên  trang";
            this.currentPageSize = value;
            this.currentPage = 1;
            var data ={
                pageSize:value,
                pageNumber:1
            }
            this.removeSelectedPage()
            document.getElementsByClassName("m-btn-pagging")[1].classList.add('active');
            this.$store.dispatch("pagination",data)
            this.PaggingShow = false;
        },
         /**
        * Gọi hàm xóa các nút đang được check
        * gọi hàm phân trang trong store
        * created by cuongnd1
        * created date : 2/3/2022
        */
       pageDirect(index){
           
            this.removeSelectedPage();
            event.currentTarget.classList.add('active');
            var data ={
                pageSize:this.currentPageSize,
                pageNumber:index
            }
            this.$store.dispatch("pagination",data)
            this.currentPage = index;
       },

       /**
        * Uncheck các nút phân trang khi chọn sang trang mới
        * created by cuongnd1
        * created date : 2/3/2022
        */
       removeSelectedPage(){
            var btn = document.getElementsByClassName("m-btn-pagging");
            var i;
            for (i = 0; i < btn.length; i++) {
                btn[i].classList.remove("active");
            }
       }
         
    },
    created(){
          var data ={
                pageSize:10,
                pageNumber:1
            }
        /**
         * gọi hàm phân trang
         */
        this.$store.dispatch("pagination",data)
    },
    computed:{
        /**
         * gọi các biến từ state của store 
         */
        employeeList(){
           return this.$store.state.empList;
        },
        TotalRecord(){
           return this.$store.state.totalRecord
        },
        TotalPage(){
            return this.$store.state.totalPage;
        },
    },
    data(){
        return{
                currentPage:1,
                currentPageSize :10,
                PaggingShow: false,
                 ToastList:[
                {item:"item-success",content:"Xóa nhân viên thành công",icon:"fa-check"},
                {item:"item-cancel",content:"Hủy thao tác thành công",icon:"fa-exclamation-circle"},
                {item:"item-alert",content:"Nội dung",icon:"fa-question"},
                {item:"item-success",content:"Thêm nhân viên thành công",icon:"fa-check"},
                {item:"item-success",content:"Sửa nhân viên thành công",icon:"fa-check"},
            ],
                selectboxData: [
                {
                    content: "10 Bản ghi trên  trang",
                    TypeOfButton: "m-select-box-button",
                    value: 10,
                },
                {
                    content: "20 Bản ghi trên  trang",
                    TypeOfButton: "m-select-box-button",
                    value: 20,
                },
                {
                    content: "30 Bản ghi trên  trang",
                    TypeOfButton: "m-select-box-button",
                    value: 30,
                },
                {
                    content: "50 Bản ghi trên  trang",
                    TypeOfButton: "m-select-box-button",
                    value: 50,
                },
                {
                    content: "100 Bản ghi trên  trang",
                    TypeOfButton: "m-select-box-button",
                    value: 100,
                },
            ],
        }
    }


};
</script>

<style scoped>
 .active{
    border: 1px solid #e0e0e0;
    font-weight: 700;
}
button{
    font-family: notosans;
    font-weight: 400;
}
i{
    font-style: normal;
    font-weight: bold;
}
 @import url("../../assets/css/component/footer.css");
  @import url("../../assets/css/component/toast.css");
</style>
