const fs = require('fs');
let model = {
    
    /* 如果在里面的形参放一个函数，就形成了自调用函数:fn=f1();
    fn()=f1()()=(f1()) () 这样，如果放一个形参，在(f1(arr))(arr)
    参数arr就参进回调函数了*/
    getdatafile: function (hh) {
        fs.readFile('./data/heros.json', (err, data) => {
            if (err) console.log(err);
            let arr = JSON.parse(data);
            hh(arr);
        })
    },
    // 最大id
    maxdataid: function (maxid) {
        this.getdatafile((arr)=>{
            let id = 0;
        // 遍历id
        arr.forEach(e => {
            if (e.id > id) {
                id = e.id
            }
        });
        maxid(id)
        })
    },
    // 吧数据进去数据库
    writedata: function (data) {
        fs.writeFile('./data/heros.json', data, 'utf-8', (err) => {
            if (err) console.log(err);
        })
    }

}
module.exports=model;
