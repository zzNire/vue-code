"use strict";

var _a = require("./b.js");

console.log(_a.x);
(0, _a.count)(); // 削减绑定，将count函数内部的this绑定到window上
console.log(_a.x);

function DeepCopy(obj,cache){
        cache = cache || [];
        var same = cache.filter(v=>v.origin===obj);
        if(same.length){
            return same.copy
        }
        copy = obj instanceof Array?[]:{};
        cache.push({copy,origin:obj});
        var keys = Object.getOwnPropertyNames(obj,cache);
        for(key of keys){
            copy[key] =typeof obj[key] === 'object' ? DeepCopy(obj[key]) : obj[key];
        }
        return copy;
    }



function widthCopy(obj, cache) {

    var copy;
    if (typeof obj === 'object') {
        copy = {};
    } else {
        return obj;
    }

    var quere = [{
        copy,
        value: obj
    }];
    var cache = [{
        origin: obj,
        copy
    }];

    while (quere.length) {
        var right_obj = quere.shift();
        var copy = right_obj.copy;

        if (!~cache.indexOf(right_obj.value)) {
            var keys = Object.getOwnPropertyNames(right_obj.value);
            for (key of keys) {
                if (typeof obj[key] === 'object') {
                    var same = cache.filter(v => v.origin === obj);
                    if (same.length) {
                        copy = same.copy
                    } else {
                        copy[key] = obj[key] instanceof Array ? [] : {};
                        quere.push({
                            copy: copy[key],
                            value: obj[key]
                        });
                        cache.push({
                            origin: obj[key],
                            copy: copy[key]
                        })
                    }

                } else {
                    copy[key] = obj[key];
                }
            }
        }

    }
    return copy;
}


function inherit(father,son){
    var prototype = Object.create(father.prototype);
    prototype.constructor = son;
    son.prototype = prototype;
}


function handleMoney(num){
    num = num.toString();
    num.replace(/(?<=\d{3})/,",$1");
    return num;
}

 
// 基于 promise 的 generator 自执行

function getData(){
    return new Promise(resolve=>{
        setTimeout(() => {
            console.log('done');
            resolve();
        }, 1000);
    })
}

function print(){
    console.log('print');
}

async function downloading(){

}

function downloading(){
    function * loadingData(){
        var x1 = yield Promise.resolve(getData());
        var x2 = yield Promise.resolve(print());
        return 1;
    }
    function start(fn){
        return new Promise((resolve,reject)=>{
            var it = fn();
            function run(value){
                var result = it.next(value);
                if(result.done){
                    resolve(result.value);
                    return;
                }
                result.value.then(data=>{
                    run(data);
                })
            }
            run();
        })
        
    }
    return start(loadingData);
}

function multy(x,nums){
    var nums = nums || [];
    function fn(x){
        nums.push(x);
        return multy(x,nums)
    }
    fn.valueOf = function(){
        return nums.reduce((sum,num)=>sum*num);
    }
    return fn;
    
}

multy(1)(2)(3).valueOf();

function multy(y){
    function fn(x){
        return multy(x*y);
    }
    fn.valueOf = function(){
       return y;
    }
    return fn;
}

multy(1)(2)(3).valueOf();

//展开
Array.prototype.flat = function(){
    var arr = this.slice(0);
    while(arr.some(v=>Array.isArray(v))){
        arr = [].concat(...arr);
    }
    return arr;
}

//数组去重
function unique(arr){
    var key_value = {};
    var result = [];
    arr.forEach(v => {
        var str = typeof v + ' '+ (typeof v === 'object') ? JSON.stringify(v) : v.toString();
        if(!key_value[str]){
            key_value[str] = v;
            result.push(v);
        }
    });
    return result;
}