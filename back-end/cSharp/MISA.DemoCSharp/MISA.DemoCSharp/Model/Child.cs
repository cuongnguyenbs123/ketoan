using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DemoCSharp.Model
{
    internal class Child:Employee
    {
        public int GetMoney()
        {
             return this.Money;
        }
    }
}
