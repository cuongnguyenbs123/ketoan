//Lấy dữ liệu các phòng ban đổ về form employee
$.ajax({
  url: "http://amis.manhnv.net/api/v1/Departments",
  method:"GET",
}).done(function(response){
  var data =response;
  $.each(data,function(index,deptno){
     var renderHtml =$(`<option value="`+deptno.DepartmentId+`">`+deptno.DepartmentName+`</option>`)
     $('#deptno').append(renderHtml);
  }) 
})