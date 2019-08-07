var express = require('express')
var app = express();

app.use(express.static(' '))  //网页目录

app.listen(9000);

//需要
//1. 安装node.js
//2. npm install express