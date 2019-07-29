// 先创建一个服务器
const http = require('http');
const fs = require('fs');
const server = http.createServer();
const template = require('art-template')

const queryString = require('querystring');
server.listen(8080, () => {
  console.log('服务器已经打开，点击http://127.0.0.1:8080打开');
})
server.on('request', (req, res) => {
  // 先加载静态资源
  if (req.url.startsWith('/assets')) {
    // 处理css抬头
    if (req.url.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
    // 映入相关的静态文件
    fs.readFile('.' + req.url, (err, data) => {
      if (err) console.log(err);
      res.end(data)
    })
  } else
    // 加载页面资源

    // 处理添加英雄页面
    if (req.url == '/views/add.html') {
      fs.readFile('./views/add.html', (err, data) => {
        if (err) console.log(err);
        res.end(data);
      })
    }

    // 处理英雄列表页面的渲染
    else if (req.url =='/views/index.html') {
      // 读取数据库
      fs.readFile('./data/heros.json', (err, data) => {
        if (err) console.log(err);
        let arr = JSON.parse(data)
        let html = template(__dirname + '/views/index.html', { arrm: arr })
        res.end(html)
      })
    }

  // 处理请求

  // 处理页面发过来的请求
  if (req.url == '/views/add.html/addyingxiong' && req.method == 'POST') {
    let data = '';
    // post要用接收事件来接收数据，数据会一块一块的发过来
    req.on('data', (shuju) => {
      // 把接收到的一块一块的数据加起来
      data += shuju
    });
    req.on('end', () => {

      // 接收完毕后，吧就收得到的数据转换成对象
      data = queryString.parse(data)
      console.log(data);
      fs.readFile('./data/heros.json', (err, odata) => {
        if (err) console.log(err);
        let olddata = JSON.parse(odata);
        let id = 0;
        // 遍历id
        olddata.forEach(e => {
          if (e.id > id) {
            id = e.id
          }
        });
        // 最大的id加一就是新数据的id
        data.id = id + 1;
        console.log(data);
        olddata.push(data);
        // 旧数据换成json格式好存储
        let jsondata = JSON.stringify(olddata)
        fs.writeFile('./data/heros.json', jsondata, 'utf-8', (err) => {
          if (err) console.log(err);
          else {
            let result = JSON.stringify({ code: 200, msg: '新增成功' });
            res.end(result);
          }
        })

      })
    })
  }










})

