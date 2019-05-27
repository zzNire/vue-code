## express
Express框架建立在node.js内置的http模块上。

Express框架的核心是对http模块的再包装。

Express框架等于在http模块之上，加了一个中间层。

### 中间件
中间件（middleware）就是处理HTTP请求的函数。它最大的特点就是，一个中间件处理完，再传递给下一个中间件。App实例在运行过程中，会调用一系列的中间件。

#### use
use是express注册中间件的方法，它返回一个函数。
```js
var express = require("express");
var http = require("http");

var app = express();

app.use("/home", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Welcome to the homepage!\n");
});

app.use("/about", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Welcome to the about page!\n");
});

app.use(function(request, response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("404 error!\n");
});

http.createServer(app).listen(1337);
//等同于 app.listen(1337);
```

### all方法和HTTP动词方法

```js
app.all("*", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  next();
});

app.get("/", function(request, response) {
  response.end("Welcome to the homepage!");
});
```
除了get方法以外，Express还提供post、put、delete方法，即HTTP动词都是Express的方法。

### 配置路由


### 指定静态文件目录
```js
app.use(express.static('public'));
```

### Express.Router
express.Router是一个构造函数，调用后返回一个路由器实例。然后，使用该实例的HTTP动词方法，为不同的访问路径，指定回调函数；最后，挂载到某个路径。
```js
var router = express.Router();

router.get('/', function(req, res) {
  res.send('首页');
});

router.get('/about', function(req, res) {
  res.send('关于');
});

app.use('/', router);

var router = express.Router();

// Router.route(api)
router.route('/api')
	.post(function(req, res) {
		// ...
	})
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err) res.send(err);
			res.json(bears);
		});
	});

app.use('/', router);
```
[参考](http://javascript.ruanyifeng.com/nodejs/express.html)
[api](https://expressjs.com/zh-cn/guide/routing.html)


## WebSocket Socket.IO
### WebSocket
即时通讯，推送的实现发展
* 短轮询，client 每隔一段时间都会向 server 发送 http 请求，服务器收到请求后，将最新的数据发回给 client。
* 长轮询，client 向 server 发出请求，server 接收到请求后，server 并不一定立即发送回应给 client，而是看数据是否更新，如果数据已经更新了的话，那就立即将数据返回给 client；但如果数据没有更新，那就把这个请求保持住，等待有新的数据到来时，才将数据返回给 client。
* 流技术，一直保持连接，不需要 client 请求，当数据发生改变时，server 自动的将数据发送给 client，这种方式有一个明显的不足之处，网页会一直显示未加载完成的状态。

#### WebSocket
W3C 在 HTML5 中提供了一种 client 与 server 间进行**全双工通讯**的网络技术 WebSocket。WebSocket 是一个全新的、独立的**协议**，基于 TCP 协议，与 HTTP 协议兼容却不会融入 HTTP 协议，仅仅作为 HTML5 的一部分。

WebSocket 是一种双向通信协议，在建立连接之后，WebSocket 的 **server 与 client 都能主动向对方发送或接收数据**。同时，WebSocket 在建立连接时需要借助 HTTP 协议，连接建立好了之后 client 与 server 之间的双向通信就与 HTTP 无关了。

### node.js Socket WebSocket
Socket本身并不是协议，是对TCP/IP协议的封装，是一个调用接口。

Node.js中提供了net模块，该模块提供了对TCP、Socket的封装与支持，它包含了创建TCP服务器/客户端的方法。

在Node.js中可以使用http模块轻松创建HTTP服务器或HTTP客户端，https模块是其安全版本。http模块在net模块之上构建，所以net模块中的大部分功能都可以在http模块中使用。

WebSocekt 是 HTML5 规范中的一部分，其借鉴了 socket 的思想，为 client 和 server 之间提供了类似的双向通信机制。同时，WebSocket 又是一种新的应用层协议，包含一套标准的 API；而 socket 并不是一个协议，而是一组接口，其主要方便大家直接使用更底层的协议（比如 TCP 或 UDP）

### Socket.IO
Socket.IO 是一个封装了 Websocket、基于 Node 的 JavaScript 框架，包含 client 的 JavaScript 和 server 的 Node。其屏蔽了所有底层细节，让顶层调用非常简单。

#### Server
```js
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
```

* io.on
* io.emit
* socket.emit
* socket.on
* socket.broadcast.emit ...
[server-api](https://socket.io/docs/server-api/)

#### client
```js
var socket = io();
socket.emit('chat message', $('#m').val());
socket.on('msg',data=>{
    console.log(data);
})
```
[client-api](https://socket.io/docs/client-api/)
