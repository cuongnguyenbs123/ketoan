namespace MISA.Web.API.Model
{
    public class Employee
    {
        #region Employee Properties
        public Guid EmployeeId { get; set; }
        public string EmployeeCode { get; set; }
        public String FullName { get; set; }
        public int? Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? IdentityNumber { get; set; }
        public DateTime? IdentityDate { get; set; }
        public string? IdentityPlace { get; set; }
        public string GenderName
        {
            get
            {
                switch (Gender)
                {
                    case 0:
                        return "Nữ";
                    case 1:
                        return "Nam";
                    default: return "Khác";
                }
            }
        }
        public string Email { get; set; }    
        public string PhoneNumber { get; set; }
        public Guid? DepartmentId { get; set; }
        public Guid? PositionId { get; set; }
        public string? Address { get; set; }  
        public string? BankName { get; set; }
        public string? BankAccount { get; set; }
        public string? BankBranch { get; set; }
        public string? Telephone { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? DepartmentName { get; set; }
        public string? PositionName { get; set; }
        #endregion

    }
}
