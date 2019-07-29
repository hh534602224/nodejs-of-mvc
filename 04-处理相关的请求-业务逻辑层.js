
const template = require('art-template')
const fs = require('fs');
const queryString = require('querystring');
const model=require('./05-读取相关的json文件-数据模型层')
let controller={
// 加载静态文件
loadstaticfile:function(req,res){
    // 处理css抬头
    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
      // 映入相关的静态文件
      fs.readFile('.' + req.url, (err, data) => {
        if (err) console.log(err);
        res.end(data)
      })
},

 // 处理英雄列表页面的渲染
loadheroindex:function(req,res){
    // 读取数据库
    model.getdatafile(function(arr){
      let html = template(__dirname + req.url, { arrm: arr })
        res.end(html)
    })
},
// 处理请求
// 处理页面发过来的请求
// 添加英雄
addhero:function(req,res){
    let data = '';
    // post要用接收事件来接收数据，数据会一块一块的发过来
    req.on('data', (shuju) => {
      // 把接收到的一块一块的数据加起来
      data += shuju
    });
    req.on('end', () => {

      // 接收完毕后，吧就收得到的数据转换成对象
      data = queryString.parse(data)
      // fs.readFile('./data/heros.json', (err, odata) => {
      //   if (err) console.log(err);
      //   // let olddata = JSON.parse(odata);
      // })
      model.getdatafile(function(hh){
        let olddata=hh
        
        model.maxdataid(function(hh){
          // 最大的id加一就是新数据的id
          data.id = hh + 1;
        olddata.push(data);
        // 旧数据换成json格式好存储
        let jsondata = JSON.stringify(olddata)
        console.log(jsondata);
        model.writedata(jsondata)
          let result = JSON.stringify({ code: 200, msg: '新增成功' });
          res.end(result);
        })
        })
      })
    },
}
// 把本页的函数给mvc
module.exports=controller;

