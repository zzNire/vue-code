//ES6实现 代理 预加载图片
class MyImage {
    constructor() {
        this.src;
        this.image = new Image();
        document.body.appendChild(this.image);
    }
    load() {
        this.image.src = this.src;

    }
}

let proxy_dsp = function (lazy_src) {
    return {
        set(target, key, value, proxy) {
            let lazy_image = new Image();
            lazy_image.src = value;
            target.image.src = lazy_src;
            lazy_image.onload = () => {
                setTimeout(() => {
                    target.image.src = value;
                }, 2000)
            }
        }
    }
}

let my_image = new MyImage();
let image_proxy = new Proxy(my_image,
    proxy_dsp("http://img.lanrentuku.com/img/allimg/1212/5-121204193Q9-50.gif"));
image_proxy.src = "https://img.alicdn.com/tps/i4/TB1b_neLXXXXXcoXFXXc8PZ9XXX-130-200.png";


// js实现
var myImage = (function () {
    var imgNode = document.createElement("img");
    document.body.appendChild(imgNode);
    return function (src) {
        imgNode.src = src;
    }
})();
// 代理模式
var ProxyImage = (function () {
    var img = new Image();
    img.onload = function () {
        myImage(this.src);
    };
    return function (src) {
        myImage("http://img.lanrentuku.com/img/allimg/1212/5-121204193Q9-50.gif");
        img.src = src;
    }
})();
// 调用方式
ProxyImage("https://img.alicdn.com/tps/i4/TB1b_neLXXXXXcoXFXXc8PZ9XXX-130-200.png");


//代理 合并http请求
/*
比如在做后端系统中，有表格数据，每一条数据前面有复选框按钮，
当点击复选框按钮时候，需要获取该id后需要传递给给服务器发送ajax请求，
服务器端需要记录这条数据，去请求，如果我们每当点击一下向服务器发送一个http请求的话，
对于服务器来说压力比较大，网络请求比较频繁，但是如果现在该系统的实时数据不是很高的话，
我们可以通过一个代理函数收集一段时间内(比如说2-3秒)的所有id，一次性发ajax请求给服务器，
相对来说网络请求降低了, 服务器压力减少了;
*/
sendMessage = function () {
    var timer;
    return function (checkboxs) {
        if (timer) return;
        let cache = [];
        for (var i = 0, ilen = checkboxs.length; i < ilen; i++) {
            if (checkboxs[i].hasAttribute("isflag")) {
                var id = checkboxs[i].getAttribute("data-id");
                cache[cache.length] = id;
            }
        }
        timer = setTimeout(() => {
            let xhr = new XMLHttpRequest();
            xhr.open('post', 'localhost:8080');
            xhr.send(cache);

        }, 2000)
    }

}

var checkboxs = document.getElementsByClassName("j-input");
checkboxs.forEach(element => {
    element.onclick = function () {
        sendMessage(); //代理
    }
});


/*
## 缓存代理
 缓存代理的含义就是对第一次运行时候进行缓存，当再一次运行相同的时候，
 直接从缓存里面取，这样做的好处是避免重复一次运算功能，
 如果运算非常复杂的话，对性能很耗费，那么使用缓存对象可以提高性能;
 我们可以先来理解一个简单的缓存列子，就是网上常见的加法和乘法的运算
*/


let getProxy = function () {
    let cache = {};
    return {
        apply(target, context, args) {
            let args_str = args.join(',');
            if (cache[args_str]) {
                console.log('cache')
                return cache[args_str];
            } else {
                return cache[args_str] = cache[args_str] = target.apply(context, args);
            }
        }
    }
}
let compute_proxy = new Proxy(function plus(...args) {
    return args.reduce((sum, a) => sum + a);
}, getProxy())