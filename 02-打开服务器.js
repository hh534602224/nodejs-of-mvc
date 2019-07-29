// 先创建一个服务器
const http = require('http');
const server = http.createServer();
server.listen(8080, () => {
    console.log('服务器已经打开，点击http://127.0.0.1:8080打开');
  })
// 引入路由层资源
  const router=require('./03-判断发过来的请求-路由层')
  server.on('request', (req, res) => {
    // 加载路由层的资源，判断发过来的请求
  router(req,res)
  })



