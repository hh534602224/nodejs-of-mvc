
// ajax发送  请求
$('.btn').on('click',()=>{
    let data= $('#myform').serialize();
    $.ajax({
      type:'post',
      url:'http://127.0.0.1:8080/views/add.html/addyingxiong',
      data,
      // dataType 用于告诉ajax对象，服务器返回的格式是什么，不需要根据Content-Type自己解析了
      dataType:'json',
      success:function(hh){
        // 看看返回的数据
        console.log(hh);
        
      if (hh.code==200){
        alert(hh.msg)
      }
       


      }

    })
})