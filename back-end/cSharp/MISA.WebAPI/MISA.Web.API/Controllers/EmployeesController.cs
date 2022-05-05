using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.Web.API.Model;
using MySqlConnector;
using Dapper;
using System.Data;
using MISA.Web.API.Resources;

namespace MISA.Web.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {

        private string connectionString = "Host=13.229.200.157;Port=3306;Database = MISA.WEB01.CUONGND;User Id = dev;Password = 12345678";
        /// <summary>
        /// Lấy ra danh sách toàn bộ nhân viên
        ///  /// created by cuongnd1
        /// created date 7/3/2022
        /// </summary>
        /// 200-Danh sách khách hàng
        /// 204-Không có dữ liệu
        /// <returns></returns>
        /// CreatedBy:cuongnd1(4/3/2022)
        [HttpGet]
        public IActionResult Get()
        {
           
            try
            {
                ///Khởi tạo kết nối với database
                
                //1.1 Khởi tạo kết nối với MariaDB
                var sqlConnection = new MySqlConnection(connectionString);
                //2.Lấy dữ liệu:
                //2.1 Câu lệnh truy vấn lấy dữ liệu:
                var sqlCommand = "Select * FROM Employee order by CreatedDate DESC";
                var employees = sqlConnection.Query<Employee>(sql: sqlCommand);
                //2.2 Thực hiện lấy dữ liệu
                return Ok(employees);
            }catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
        /// <summary>
        /// Lấy ra nhân viên theo Id
        ///  /// created by cuongnd1
        /// created date 7/3/2022
        /// </summary>
        /// 200-Danh sách khách hàng
        /// 204-Không có dữ liệu
        /// <returns></returns>
        /// CreatedBy:cuongnd1(4/3/2022)
        [HttpGet("{EmployeeId}")]
        public IActionResult GetById(string EmployeeId)
        {
            try
            {
                ///Khởi tạo kết nối với database
               
                //1.1 Khởi tạo kết nối với MariaDB
                var sqlConnection = new MySqlConnection(connectionString);
                //2.Lấy dữ liệu:
                //2.1 Câu lệnh truy vấn lấy dữ liệu:
                //Lưu ý nếu có tham số truyền cho lệnh truy vấn sql thì phải sử dụng DynamicParameter

                var sqlCommand = $"Select * FROM Employee WHERE EmployeeId = @EmployeeId";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeId", EmployeeId);
                var employee = sqlConnection.QueryFirstOrDefault<Employee>(sql: sqlCommand, param: parameters);
                //2.2 Thực hiện lấy dữ liệu
                return Ok(employee);
            }catch(Exception ex)
            {
                return HandleException(ex);
            }
        }
        /// <summary>
        /// Seach by Id
        /// </summary>
        /// <param name="seachString"></param>
        /// <returns></returns>
        [HttpGet("filter")]
        public IActionResult Seach([FromQuery]string seachString)
        {
            try
            {
                //Tạo connection string
                var connection = new MySqlConnection(connectionString);
                //Lệnh truy vấn sql
                var sqlCommand = "SELECT * FROM Employee WHERE EmployeeCode LIKE @seachString";
                //Tạo Parameter
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@seachString","%"+seachString+"%");
                var employees = connection.Query<Employee>(sql: sqlCommand,param:parameters);
                return Ok(employees);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
        public IActionResult Pagination([FromQuery] int? Page_Size ,[FromQuery] int? Page_Number)
        {
            try
            {
                if(Page_Size == null)
                {
                    Page_Size = 10;
                }
                if(Page_Number == null)
                {
                    Page_Number = 1;
                }
                //Tạo connection string
                var connection = new MySqlConnection(connectionString);
                //Lệnh truy vấn sql
                var sqlCommandPagging = "Proc_Pagination";
                var sqlCommandGetAll = "Select * from Employee";
                //Tạo Parameter
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Page_Size", Page_Size);
                parameters.Add("Page_Number", Page_Number);
                var employeesPagging = connection.Execute(sql: sqlCommandPagging, param: parameters , commandType: System.Data.CommandType.StoredProcedure);
                var TotalRecord = connection.Query<Employee>(sql: sqlCommandGetAll);
               
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        /// <summary>
        /// Thêm mới đối tượng employee
        ///  /// created by cuongnd1
        /// created date 7/3/2022
        /// </summary>
        /// <param name="employee"></param>
        /// <returns>post thành công</returns>
        [HttpPost]
        public IActionResult PostEmployee(Employee employee)
        {
            try
            {
                employee.EmployeeId = Guid.NewGuid();
                employee.DepartmentName = GetDepartmentName(employee.DepartmentId);
                var error = new ErrorService();
                var errorData = new Dictionary<string, string>();
                var errorMsgs = new List<string>();
                //validate dữ liệu:
                //Thông tin mã nhân viên bắt buộc phải nhập
                if (string.IsNullOrEmpty(employee.EmployeeCode))
                {
                    errorData.Add("EmployeeCode", ResourceVN.Error_EmployeeCode);
                    errorMsgs.Add(Resources.ResourceVN.Error_EmployeeCode);
                }
                //EmployeeCode không được trùng
                if (CheckEmployeeCode(employee.EmployeeCode))
                {
                    errorData.Add("EmployeeCode", ResourceVN.Error_Duplicate_EmployeeCode);
                    errorMsgs.Add(Resources.ResourceVN.Error_Duplicate_EmployeeCode);
                }
                //Họ tên không được để trống
                if (string.IsNullOrEmpty(employee.EmployeeCode))
                {
                    errorData.Add("EmployeeName", ResourceVN.Error_EmployeeName);
                    errorMsgs.Add(Resources.ResourceVN.Error_EmployeeName);
                }
                //Email phải đúng định dạng
                if (!IsValidEmail(email: employee.Email))
                {
                    errorData.Add("Email", ResourceVN.Error_Email);
                    errorMsgs.Add(Resources.ResourceVN.Error_Email);
                }
                //if (!string.IsNullOrEmpty(employee.PhoneNumber))
                //{
                //    errorData.Add("PhoneNumber",ResourceVN.Error_PhoneNumber);
                //    errorMsgs.Add(Resources.ResourceVN.Error_PhoneNumber);
                //}

                if (errorData.Count > 0)
                {
                    error.UserMsg = ResourceVN.Error_Code_400;
                    error.Data = errorMsgs;
                    return BadRequest(error);
                }

                ///Khởi tạo kết nối với database
                //1.1 Khởi tạo kết nối với MariaDB
                var mysqlConnection = new MySqlConnection(connectionString);

               
                var sqlCommandText = "Proc_InsertEmployee";
                //Mở kết nối đên database
                mysqlConnection.Open();
                var sqlCommand = mysqlConnection.CreateCommand();
                sqlCommand.CommandText = sqlCommandText;
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                MySqlCommandBuilder.DeriveParameters(sqlCommand);

                var parameters = new DynamicParameters();

                foreach (MySqlParameter parameter in sqlCommand.Parameters)
                {
                    var paramName = parameter.ParameterName;
                    var propName = paramName.Replace("@m_", "");
                    var entityProperty = employee.GetType().GetProperty(propName);
                    if(entityProperty != null)
                    {
                        var propValue = employee.GetType().GetProperty(propName).GetValue(employee);
                        parameters.Add(paramName, propValue);
                    }else
                    {
                        parameters.Add(paramName, null);
                    }
                   
                    
                }
                var res = mysqlConnection.Execute(sql: sqlCommandText, param: parameters, commandType:System.Data.CommandType.StoredProcedure);
               
                    var success = new ErrorService();
                    success.DevMsg = ResourceVN.Success_Add;
                    success.UserMsg = ResourceVN.Success_Add_Employee;
                    success.Data = employee;
                    return StatusCode(201, success);
            }
            catch (Exception ex)
            {
               return HandleException(ex);
            }
        }
        /// <summary>
        /// Check mã nhân viên đã tồn tại hay chưa
        ///  /// created by cuongnd1
        /// created date 7/3/2022
        /// </summary>
        /// <param name="employeeCode"></param>
        /// <returns></returns>
        private bool CheckEmployeeCode(string employeeCode)
        {
            ///Khởi tạo kết nối với database
           
            //1.1 Khởi tạo kết nối với MariaDB
            var sqlConnection = new MySqlConnection(connectionString);
            var sqlCheck = "Select EmployeeCode From Employee where EmployeeCode = @EmployeeCode";
            var param = new DynamicParameters();
            param.Add("@EmployeeCode", employeeCode);
            var res = sqlConnection.QueryFirstOrDefault(sqlCheck, param);
            if(res!= null)
            {
                return true;
            }
            return false;
        }
        private bool CheckEmployeeCodeUpdate(Guid employeeId,string employeeCode)
        {
            var sqlConnection = new MySqlConnection(connectionString);
            var sqlCommand = "Select EmployeeCode from Employee where employeeCode = @EmployeeCode and EmployeeId not in (@EmployeeId)";
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@EmployeeCode", employeeCode);
            parameters.Add("@EmployeeId", employeeId);
            var res  = sqlConnection.QueryFirstOrDefault(sqlCommand, parameters);
            if (res != null) return true;
            return false;
        }
        /// <summary>
        /// Lấy ra danh sách toàn bộ nhân viên
        /// </summary>
        /// 200-Danh sách khách hàng
        /// 204-Không có dữ liệu
        /// <returns></returns>
        /// CreatedBy:cuongnd1(4/3/2022)
        [HttpDelete("Id")]
        public IActionResult Delete(Guid Id)
        {
            try
            {
                ///Khởi tạo kết nối với database
               
                //1.1 Khởi tạo kết nối với MariaDB
                var sqlConnection = new MySqlConnection(connectionString);
                //2.Lấy dữ liệu:
                //2.1 Câu lệnh truy vấn lấy dữ liệu:
                var sqlCommand = "Delete FROM Employee where EmployeeId = @EmployeeId";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeId", Id);
                var employees = sqlConnection.Query<Employee>(sql: sqlCommand, param: parameters);

                //2.2 Thực hiện lấy dữ liệu
                return Ok("Deleted");
            }catch(Exception ex)
            {
                return HandleException(ex);
            }
        }
        

        /// <summary>
        /// Put một employee
        /// </summary>
        /// <param name="employee"></param>
        /// <returns>post thành công</returns>
        [HttpPut("Id")]
        public IActionResult PutEmployee(Guid Id, Employee employee)
        {
            try {
                employee.EmployeeId = Id;
                //validate
                employee.DepartmentName = GetDepartmentName(employee.DepartmentId);
                var error = new ErrorService();
                var errorData = new Dictionary<string, string>();
                var errorMsgs = new List<string>();
                //validate dữ liệu:
                //Thông tin mã nhân viên bắt buộc phải nhập
                if (string.IsNullOrEmpty(employee.EmployeeCode))
                {
                    errorData.Add("EmployeeCode", ResourceVN.Error_EmployeeCode);
                    errorMsgs.Add(Resources.ResourceVN.Error_EmployeeCode);
                }
                //EmployeeCode không được trùng
                if (CheckEmployeeCodeUpdate(employee.EmployeeId,employee.EmployeeCode))
                {
                    errorData.Add("EmployeeCode", ResourceVN.Error_Duplicate_EmployeeCode);
                    errorMsgs.Add(Resources.ResourceVN.Error_Duplicate_EmployeeCode);
                }
                //Họ tên không được để trống
                if (string.IsNullOrEmpty(employee.EmployeeCode))
                {
                    errorData.Add("EmployeeName", ResourceVN.Error_EmployeeName);
                    errorMsgs.Add(Resources.ResourceVN.Error_EmployeeName);
                }
                //Email phải đúng định dạng
                if (!IsValidEmail(email: employee.Email))
                {
                    errorData.Add("Email", ResourceVN.Error_Email);
                    errorMsgs.Add(Resources.ResourceVN.Error_Email);
                }
                //if (!string.IsNullOrEmpty(employee.PhoneNumber))
                //{
                //    errorData.Add("PhoneNumber",ResourceVN.Error_PhoneNumber);
                //    errorMsgs.Add(Resources.ResourceVN.Error_PhoneNumber);
                //}

                if (errorData.Count > 0)
                {
                    error.UserMsg = "Dữ liệu nhập vào không hợp lệ";
                    error.Data = errorMsgs;
                    return BadRequest(error);
                }
                //1.1 Khởi tạo kết nối với MariaDB
                var mysqlConnection = new MySqlConnection(connectionString);
                //lưu lệnh gọi store
                var sqlCommandText = "Proc_UpdateEmployee";
                mysqlConnection.Open();
                var sqlCommand = mysqlConnection.CreateCommand();
                sqlCommand.CommandText = sqlCommandText;
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                MySqlCommandBuilder.DeriveParameters(sqlCommand);

                var parameters = new DynamicParameters();

                foreach (MySqlParameter parameter in sqlCommand.Parameters)
                {
                    var paramName = parameter.ParameterName;
                    var propName = paramName.Replace("@m_", "");
                    var entityProperty = employee.GetType().GetProperty(propName);
                    if (entityProperty != null)
                    {
                        var propValue = employee.GetType().GetProperty(propName).GetValue(employee);
                        parameters.Add(paramName, propValue);
                    }
                    else
                    {
                        parameters.Add(paramName, null);
                    }


                }
                var res = mysqlConnection.Execute(sql: sqlCommandText, param: parameters, commandType: System.Data.CommandType.StoredProcedure);

                var success = new ErrorService();
                success.DevMsg = ResourceVN.Success_Update;
                success.UserMsg = ResourceVN.Success_Update_Employee;
                success.Data = employee;
                return StatusCode(201, success);
            }
            catch(Exception ex)
            {
                return HandleException(ex);
            }
        }
        /// <summary>
        /// /Xử lý catch lỗi
        ///  /// created by cuongnd1
        /// created date 7/3/2022
        /// </summary>
        /// <param name="ex"></param>
        /// <returns></returns>
        private IActionResult HandleException(Exception ex)
        {
            var error = new ErrorService();
            error.DevMsg = ex.Message;
            error.UserMsg = Resources.ResourceVN.Error_Exeption;
            error.Data = ex.Data;
            return StatusCode(500, error);
        }
        /// <summary>
        /// Kiểm tra định dạng email
        /// created by cuongnd1
        /// created date 7/3/2022
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        bool IsValidEmail(string email)
        {
            var trimmedEmail = email.Trim();

            if (trimmedEmail.EndsWith("."))
            {
                return false;
            }
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == trimmedEmail;
            }
            catch
            {
                return false;
            }
        }
        /// <summary>
        /// Lấy ra department name theo department id
        /// return null nếu không có giá trị 
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        private string GetDepartmentName(Guid? Id)
        {
            var sqlConnection = new MySqlConnection(connectionString);
            var sqlCommand = "Select DepartmentName from Department where DepartmentId = @DepartmentId";
            DynamicParameters param = new DynamicParameters();
            param.Add("@DepartmentId", Id);
            var res = sqlConnection.QueryFirstOrDefault<string>(sqlCommand, param);
            if (res == null) return "";
            return res;
        }
    }
}
