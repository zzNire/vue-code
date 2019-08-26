/*
单体模式如果有实例化的话，那么只实例化一次，要实现一个单体模式的话，
我们无非就是使用一个变量来标识该类是否被实例化，如果未被实例化的话，
那么我们可以实例化一次，否则的话，直接返回已经被实例化的对象。

典型的例子： 通知窗口
*/

singleMode = function(fn){
    
    return (function(){
        var result;
        return function(){
           result = result ? result: fn.apply(this);
        return result; 
        }
        
    })()
}

function createAlert(){
    var div = document.createElement('div');
    div.innerHTML = 'text';
    document.body.appendChild(div);
    return div;
}

var singleCreate = singleMode(createAlert);
var alert = singleCreate();


function createObject(){
    var single;
    return function(){
        if(!single){
            single = new Object();
        }
        return single;
    }
}

var createSingleObject = createObject();
var single = createSingleObject();

var Universe = (function (){
    var instance;
    return function(name){
        this.name = name
        if(!instance){
            instance = this;
        }
        return instance;
    }
})()

var o1 = new Universe('heel');
var o2 = new Universe('xxx');

function Universe(name){
    this.name = name;
    var instance = this;
    Universe = function(){
        return instance;
    }
}