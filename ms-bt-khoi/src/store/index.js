import axios from 'axios'
import { createStore } from 'vuex'
import {useLoading} from 'vue-loading-overlay'

// Create a new store instance.
export default createStore({
  state () {
    return {
      listSidebarItem: [
        {index:1, icon:'review-icon' , content:'Tổng quan' ,link:'/employee-list'},
        {index:2, icon:'moneybag-icon' , content:'Tiền mặt',link:'/'},
        {index:3, icon:'bank-icon' , content:'Tiền gửi',link:'/d'},
        {index:4, icon:'hand-bag-icon' , content:'Mua hàng',link:'1'},
        {index:5, icon:'cart-icon' , content:'Bán hàng',link:'2'},
        {index:6, icon:'bill-icon' , content:'Quản lý hóa đơn',link:'3'},
        {index:7, icon:'store-icon' , content:'Kho',link:'4'},
        {index:8, icon:'setting-icon' , content:'Công cụ',link:'5'},
        {index:9, icon:'possessions-icon' , content:'Tài sản cố định',link:'6'},
        {index:10, icon:'tax-icon' , content:'Thuế',link:'7'},
        {index:11, icon:'price-icon' , content:'Giá thành',link:'8'},
        {index:12, icon:'sumary-icon' , content:'Tổng hợp',link:'9'},
        {index:13, icon:'fund-icon' , content:'Ngân sách',link:'10'},
        {index:14, icon:'report-icon' , content:'Báo cáo',link:'11'},
        {index:15, icon:'finacial-analysis-icon' , content:'Phân tích tài chính',link:'12'},
    ],
       empList:[],
       paggingList:[],
       department:{},
       emp:{},
       Formmode:1,
       pageNumber:null,
       totalRecord:null,
       totalPage:null,
       error:null,
       success:0,
  }
  },
  actions:{
     /** created by cuongnd
         * Hàm gọi api lấy được response trả về danh sách employee
         *  @param({commit}) 
         * created date: 22/2/2022
         */
    getEmpList({commit}) {
      let loader = useLoading().show();
        axios
        .get("http://amis.manhnv.net/api/v1/Employees/filter")
        .then((response) => {
            
            commit('setEmpList',response.data.Data) 
            loader.hide();
        })
        .catch((error)=>{
          commit('errorLog',error.response.data.devMsg)
          loader.hide();
        })
        ;
  },
    /** created by cuongnd
         * Hàm gọi api thêm 1 nhân viên mới
         *  @param({commit},data) 
         * created date: 22/2/2022
         */
      postEmpList({commit},data){
        let loader = useLoading().show();
      axios
      .post('http://amis.manhnv.net/api/v1/Employees/',data)
      .then((response) =>{
           this.state.success = 1;
           console.log(response);
            commit('createEmp',data)
            loader.hide();
            
      })
      .catch((error)=>{
        loader.hide();
        commit('errorLog',error.response.data.devMsg) 
      });
    },
      /** created by cuongnd
         * Hàm gọi api lấy ra các phòng ban 
         *  @param({commit}) 
         * created date: 22/2/2022
         */
    getDepartment({commit}){
      axios
      .get('http://amis.manhnv.net/api/v1/Departments')
      .then((response) =>{
          commit('setDepartment',response.data);
         
      })
      .catch((error)=>{
        commit('errorLog',error.response.data.devMsg)
      })
      ;
    },
    /** created by cuongnd
     * Hàm gọi api delete nhân viên 
     * @param {commit} 
     * @param {id} id nhân viên cần xóa
     * created date: 22/2/2022
     */
    deleteEmp({commit},id){
      var url = 'http://amis.manhnv.net/api/v1/Employees/'+id;
      let loader = useLoading().show();
      axios
      .delete(url)
      .then((response)=>{
          console.log(response)
          commit('removeEmp',id);
          loader.hide();

      })
      .catch((error)=>{
        commit('errorLog',error.response.data.devMsg)
        loader.hide();

      })
      ;
    },
    /** created by cuongnd
     * Hàm gọi api sửa nhân viên
     * @param {commit} param0 
     * @param {emp} emp 
     * created date: 22/2/2022
     */
    putEmp({commit},emp){
      var url = 'http://amis.manhnv.net/api/v1/Employees/'+emp.EmployeeId;
      let loader = useLoading().show();
      axios
      .put(url,emp)
      .then((response)=>{
         console.log(response);
         commit('putEmp',emp);
         loader.hide();

      })
      .catch((error)=>{
        commit('errorLog',error.response.data.devMsg)
          loader.hide();

      });
    },
    /** created by cuongnd
     * Gọi api lấy nhân viên theo id
     * @param {commit}  
     * @param {id} 
     * created date: 22/2/2022
     */
     getEmpById({commit},id){
      var url = 'http://amis.manhnv.net/api/v1/Employees/'+id;
      
      axios
      .get(url)
      .then((response)=>{
          commit('setEmp',response.data);
      })
      .catch((error)=>{
        commit('errorLog',error.response.data.devMsg)
      });
     },
       /** created by cuongnd
     * Gọi api phân trang 
     * @param {commit} 
     * @param {data} 
     * created date: 2/3/2022
     */
     pagination({commit},data){
        var url =`http://amis.manhnv.net/api/v1/Employees/filter?pageSize=${data.pageSize}&pageNumber=${data.pageNumber}`;
        let loader = useLoading().show();
        axios
        .get(url)
        .then((response)=>{
            commit('pagination',response.data);
            loader.hide();
        })
        .catch((error)=>{
          commit('errorLog',error.response.data.devMsg)
          loader.hide();
        });
     }
  },
  getters:{
    
  },
  mutations: {
    // đổ dữ liệu load được từ api vào empList 
    setEmpList(state,emplst){
      state.empList = emplst
    },
    // đổ phòng ban load từ api vào ds phòng ban
    setDepartment(state,dep){ 
      state.department = dep;
      console.log(state.department);
    },
    // thêm mới 1 nhân viên vào ds empList (thêm vào đầu)
    createEmp(state,newEmp){
      state.empList.unshift(newEmp);
    },
    //Xóa nhân viên có id là id đã chọn
    removeEmp(state,id){
      state.paggingList = state.paggingList.filter(emp => emp.EmployeeId !== id)
    },
    //Sửa nhân viên trong ds Emp
    putEmp(state,empPut){
      state.empList = state.empList.filter(emp => emp.EmployeeId !== empPut.id)
    },
    //Lấy thông tin nhân viên 
    setEmp(state,data){
      state.emp = state.empList.find(emp => emp.EmployeeId == data.EmployeeId);
      console.log(state.emp)
    },
    //Xử lý phân trang
    pagination(state,data){
       state.totalRecord = data.TotalRecord;
       state.paggingList = data.Data,
       state.totalPage = data.TotalPage
    },
    //Xử lý lỗi
    errorLog(state,data){
      state.error = data;
    }
  }
})