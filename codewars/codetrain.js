import { domainToASCII } from "url";

function A(params) {
    this.name = 'nire';
}

function B(params) {
    this.age = 1;
}

B.prototype = new A();
//

b.__proto__ = a;
a.__proto__ = A.prototype

function B(params) {
    A.apply(this);
}

//
function A(params) {
    
}

function inherit(A,B){
    var proto = Object.create(A.prototype);
    proto.constructor = A;
    B.prototype = proto;
}

b.__proto__ = B.prototype 
B.prototype.__proto__ = A.prototype;


class A extends B{
    constructor(){
        super();
    }
}


Function.prototype.call = function (obj,...args) {
    obj.fn = this;
    var result = obj.fn(...args);
    delete obj.fn;
    return result;
}

Function.prototype.apply = function (obj,args) {
    obj.fn = this;
    var result = obj.fn(...args);
    delete obj.fn;
    return result;
}

Function.prototype.bind = function (obj,...args) {
    var that = this;
    return function (...param) {
        this.apply(obj,args.concat(param))
    }
}

// 拍平
function flat(arr){
    return arr.toString().split(',').map(x=>x-0);
}

function flat(arr){
    while (arr.filter(v=>Array.isArray(v)).length) {
        arr = [].concat(...arr);
    }
    return arr;
}

function instanceOf(son,father) {
    while(son.__proto__){
        if(son.__proto__ === father){
            return true
        }else{
            son = son.__proto__;
        }
    }
    return false;
}

function create(father,properties){
    var result = new Object();//{}
    result.__proto__ = son;
    if(properties){
        Object.defineProperties(result,properties)
    }
    return result;
}

function newF(fn,...args){
    var result = Object();// = {};
    fn.apply(result,args);
    result.__proto__ = fn.prototype;
    return result;
}

// 浅拷贝 除基本类型外拷贝的都是引用
// 拷贝 自身的 可枚举的 属性
Object.assign(copy,resource); //多一个 Symbol
Object.create(resource);
var copy = {...resource}

function thinCopy(resource){
    copy = {};
    for(key in resource){
        copy[key] = resource[key]; //会拷贝原型上的属性
    }
}

//深拷贝
var copy = JSON.parse(JSON.stringify(resource));

function deepCopy(resource,caches){
    var keys = Object.keys(resource);
    caches = caches || [];
    //Object.getOwnPropertyNames(resource);
    var copy = Array.isArray(resource) ? [] : {};
    copy.__proto__ = resource.__proto__;
    var cache = caches.filter(c=>c.origin === resource);
    if(cache.length){
        return cache[0].copy;
    }
    caches.push({
        copy,
        origin:resource
    })
    for(key of keys){
        copy[key] = typeof resource[key] === 'object' 
        ? deepCopy(resource[key],caches) 
        : resource[key];
    }
    return copy;
}

function mySetInyeral(fn,timeout){
    var timer = [];
    function interval(){
        //debugger;
        timer[0] = setTimeout(() => {
            fn();
            //console.log(timer)
            clearTimeout(timer[0]);
            interval();
        }, timeout);
    }
    interval();
    return timer;
}

// for 循环解决
function myfor(){
    for (var i = 0; i< 10; i++){
        setTimeout(function() {
            //console.log(this)
            console.log(i); //闭包
        }, 1000)
    }
}

//let 每一次循环生成一个作用域
function myfor(){
    for (let i = 0; i< 10; i++){  
        setTimeout(function() {
            //console.log(this)
            console.log(i); //闭包
        }, 1000)
    }
}

function myfor(){
    for (let i = 0; i< 10; i++){
        (function(){
            var that = i;
            setTimeout(function() {
            //console.log(this)
                console.log(that); //闭包
            }, 1000)
        })()
        
    }
}

// setTimeout 传参 值传递
function myfor(){
    for (var i = 0; i< 10; i++){  
        setTimeout(function(i) {
            //console.log(this)
            console.log(i); //闭包
        }, 1000,i)
    }
}

//函数传参
function myfor(){
    for (var i = 0; i< 10; i++){ 
        (function(i){
            setTimeout(function() {
                //console.log(this)
                console.log(i); //闭包
            }, 1000)
        })(i)   
    }
}

// 

function onscroll(){
    var dom_top = dom.getBindingClientRect().top;
    var window_width = window.innerHeight;  
    if(top>=0 && top<=window_width) {
        var src = image.getAttribute('data_src');
        var image = new Image();
        image.src = src;
    }
}

var touch = {};
function ontouchstart(e){
    var start = e.touches[0].pageY;
    touch.start = start;
    getIndex();
}

function ontouchmove(e){
    var move = e.touches[0].pageY;
}

function ontouchend(e){
    var end = e.touches[0].pageY;
    var diff = touch.start - end;
}

function onscroll(e){
    // scroll 组件
    var heightlist = [];
    heightlist.push(dom.clientHeight);
    var scroll_height = e.y;
    var diff = scroll_height + heightlist[currentIndex];

}


// jieliu
function jieliu(fn,timeout){
    var timer;
    return function(...args){
        var that = this;
        if(!timer){
            timer = setTimeout(()=>{
                fn.apply(that,args);
                clearTimeout(timer);
                timer = null;
            }, timeout);
        }  
    }
}

function fangdou(fn,timeout){
    var timer;
    return function(...args){
        var that = this;
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(that,args);
            timer = null;
        }, timeout);
    }
}

dom.addEventListener('input',fangdou(fn,1000))

function horizonPrint(tree){
    var result = {};
    var list = [{origin:tree,copy:result}];
    var caches = [];
    while(list.length){
        var {right_tree,copy} = list.shift();
        cache = caches.filter(v=>v.origin === right_tree);
        if(cache.length){
            copy = cache[0].copy;
        }
        caches.push({
            origin:right_tree,
            copy,
        })
        //console.log(right_tree.id);
        var children = Object.keys(right_tree);
        if(children.length){
            for(child of children){
                 if(typeof right_tree[child] === 'object'){
                    var child_copy = Array.isArray(right_tree[child])?[]:{};
                    copy[child] = child_copy;
                    list.push({origin:right_tree[child],copy:child_copy});
                 }else{
                    copy[child] = right_tree[child];
                 }
                
            }
        }
    }
    return result;
}

function deepPrint(tree){
    console.log(tree.id);
    var children = tree.children;
    if(children.length){
        for(child of children){
            deepPrint(child)
        }
       
    }
}

function flat(arr){
    var result = [];
    for(value of arr){
        if(Array.isArray(value)){
            result = result.concat(flat(value));
        }else{
            result.push(value);
        }
    }
    return result;
}

Promise.prototype.final = function(fn){
    return this.then(res=>{
        Promise.resolve(fn()).then(()=>res);
    },
    err=>{
        Promise.resolve(fn()).then(()=>{throw err})
    })
}

function handleNum(num){
    num = num.toString();
    num.replace(/(?<=\d)(\d{3})/,',$1')
}