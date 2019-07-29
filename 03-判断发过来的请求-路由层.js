const fs = require('fs');
const controller = require('./04-处理相关的请求-业务逻辑层')
let router = function (req, res) {
  if (req.url.startsWith('/assets')) {
    // 加载静态文件
    controller.loadstaticfile(req, res)
  }
  // 加载页面资源

  // 加载添加英雄页面
  else if (req.url == '/views/add.html') {
    // 加载添加英雄页面
    fs.readFile('./views/add.html',(err,data)=>{
      if (err)console.log(err);
      res.end(data)
    })
  }
  // 处理英雄列表页面的渲染
  else if (req.url == '/views/index.html') {
    controller.loadheroindex(req,res);

  }
  // 处理请求

  // 处理页面发过来的请求
  if (req.url == '/views/add.html/addyingxiong' && req.method == 'POST') {
    controller.addhero(req,res)
  }
}
module.exports = router;







