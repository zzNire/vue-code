var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var websocket = require('socket.io')(http);

//监听客户端 3000端口
http.listen(3000, function () {
    console.log('listening on *:3000');
});

websocket.on('connection',socket=>{
    socket.on('message',(msg)=>{
        console.log(msg + ' from client');
        websocket.emit('message','how are you');
    })
    
})
app.use(express.static('./'))

app.get('/',(req,res)=>{
    res.json('{x:1}')
})