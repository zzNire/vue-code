## 服务器部署
### 使用nginx部署服务器
打开:/etc/nginx/conf.d下的default.conf文件
```conf
upstream nirean-music { //负载均衡
        server 127.0.0.1:9000;
}

server{
        listen 80; #监听端口
        server_name  m.nirean.cn;  #申请的域名
        access_log /var/log/nginx/music.log; #记录运行日志的地方
        error_log /var/log/nginx/music_err.log; //记录错误日志

        location / {
                root /usr/music-player/dist; #网页存放目录
                index index.html index.html;  #主页面
                proxy_set_header Host $host;  # #header添加请求host信息
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # 增加代理记录
                proxy_pass http://nirean-music; #服务访问地址 后台代码
        }
}

```
### 使用PM2运行后端代码
```js
PM2 start prod.server.js
```
在127.0.0.1：900端口运行[prod.server.js](./prod.server.js)

## 数据请求

### JSONP跨域 (推荐歌单和排行榜)
首先通过NPM安装JSONP包，import引入

originJSONP(url,opts,callback)
* url 访问地址 其他参数加在地址后面 ？name="me"&age=15
* opts对象
  * param callback的别名
  * timeout
  * prefix
  * name 
* 回调函数(err,data)两个参数
```js
 originJSONP(url,option,(err,data)=>{
            if(!err){
                resolve(data);   //pomise已成功 返回数据
            }
            else{
                reject(err);       //   promise已失败
            }
        });
```
### Axios前端请求
axios通过promise实现对ajax技术的一种封装
```js
var axios = require("axios");
axios.get(url,{
  params:{ //`params` 是即将与请求一起发送的 URL 参数 get

  },
  headers:{ //`headers` 是即将被发送的自定义请求头

  },
  data:{ //`data` request body 中的数据 post

  }
}).then((response)=>{ 
    console.log(response.data); //数据
    console.log(response.status); //状态码
    console.log(response.statusText);//状态消息
    console.log(response.headers);  //服务器回应的头
    console.log(response.config); //提供axios请求的配置信息
}).catch((error)=>{
    //出错处理
})
```
例如在本项目中
```js
const url = '/api/disc';  //后台服务器的路由地址
  const data = Object.assign({}, commonParam, {  //查看api需要的参数
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    loguin:0,
    hostUin: 0,
    needNewCode: 0,
    g_tk:5381,
    format:'json'

  }) //发起get请求的参数
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data) //返回Promise对象
  })
```

### Express后端转发 
express是node.js的一个web应用程序框架
```js
var express = require("express");
var app = express();
```
#### 基本路由
app.METHOD(PATH, HANDLER)
* app是express实例
* METHOD 是HTTP请求方法 get，post，put，delete等
* PATH 是 服务器上的路径
* HANDLER 是 在路由匹配时执行的函数 (req,res) 请求 响应
  * 响应方法
    * res.download() 提示将要下载文件
    * res.end() 结束相应进程
    * res.json()  返回JSON响应
    * res.jsonp() 在 JSONP 的支持下发送 JSON 响应。
    * res.send() 发送各种类型的响应
    * res.sendFile() 发送文件
    * res.sendStatus() 状态吗
    * res.redirect()  重定向
    * res.render()  
  * req
    * quary 参数

#### 在路由中发起AXIOS请求，来获得数据
通过req.quary获得params，发起axios请求
```js
var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url, {
    headers: { //根据qq音乐的api的头部信息
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query //获得请求中的参数
  }).then((response) => {
    var ret = response.data //获得返回数据
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret) //以json写入响应中
  }).catch((e) => {
    console.log(e)
  })
```