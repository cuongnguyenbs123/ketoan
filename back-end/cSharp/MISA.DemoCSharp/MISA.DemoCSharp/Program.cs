// See https://aka.ms/new-console-template for more information

using MISA.DemoCSharp.Model;

var employee = new Employee();
var employee2 = new Employee("Nam");
employee.Name = "Nguyễn Đại Cương";
employee.Age = 21;
Console.OutputEncoding =System.Text.Encoding.UTF8;

Console.WriteLine($"Tên: {employee.Name} \n Tuổi :{employee.Age} \n Công ty: {Employee.COMPANY_NAME}");
