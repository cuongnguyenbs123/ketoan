using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DemoCSharp.Model
{
    internal class Employee
    {
         /// <summary>
         /// Region của hàm khởi tạo 
         /// </summary>         
        #region Constructor
        public Employee()
        {

        }
        public Employee(string name)
        {
            this.Name = name;
        }
        #endregion
        
        /// <summary>
        /// Region của trường
        /// </summary>

        #region Field
        public string Name;
        public string DateOfBirth;
        private int _age;
        protected int Money;
        #endregion

        /// <summary>
        /// Region của thuộc tính
        /// </summary>

        #region Properties
        public int Age
        {
            get { return _age; }
            set { _age = value; }
        }

        #endregion

        #region CONST
        public const string COMPANY_NAME = "MISA";
        #endregion
    }
}
