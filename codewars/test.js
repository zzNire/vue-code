//import { fchown } from "fs";

function partition(arr,start,end) {
  if(start > end) {
      return;
  }
  var i = start,
      j = end,
      part = arr[start];
  while(i != j) {
      while(j>i && arr[j] <= part) {
          j--;
      }
      while(i<j && arr[i] >= part) {
          i++;
      }
      if(i<j) {
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
      }
  }
  arr[start] = arr[i];
  arr[i] = part;
  return i;
    
}
function get(arr,k) {
  var i = 0,
      j = arr.length-1;
  k = k-1;
  while(i<=j) {
      let index = partition(arr,i,j);
      if(index == k) {
          return arr[index];
      }else if(index > k) {
          j = index - 1;
      }else {
          i = index + 1;
      }
  }
  return;
}



function fetchA(cb,resolve) {
    setTimeout(function() { // 模擬冗長運算
      resolve(cb(1));
    }, 3000);
  }
  
  function fetchB(cb,resolve) {
    resolve(cb(2));
  }

function add(getX,getY,cb){
    var x,y;
    var p1 = new Promise((resolve)=>{
        getX(function(xVal){
        x = xVal;
        },resolve)
    });
    var p2 = new Promise((resolve)=>{
        getY(function(yVal){
            y = yVal;
        },resolve)
    })
    var result = Promise.all([p1,p2]).then(()=>{console.log(x+y)})
}

add(fetchA,fetchB)



function getPosition(fn){
    var timer;
    return function(e){
        if(!timer){
        timer = setTimeout(() => {
            fn.apply(this,[...arguments])
            console.log(e.clientX);
            timer = null;
        }, 1000);
    }
    }  
}


function search(fn){
    var timerend;
    return function(e){
        clearTimeout(timerend);
    timerend = setTimeout  (()=>{
        fn.apply(this,[...arguments])
        console.log(e.clientX);
    },1000)
    }
    
}


class EventBus{
    constructor(){
        this.callbacks = {};
    }
    addEventListener(type,fn){
        var callback = this.callbacks[type] || (this.callbacks[type] = []);
        callback.push(fn);
    }
    removeEventListener(type,fn){
        var callback = this.callbacks[type];
        if(callback){
            var index = callback.indexOf(fn);
            if(~index){
                callback.splice(index,1);
                return true;
            }
        }
        return false
    }
    emit(type,...args){
        var callback = this.callbacks[type];
        if(callback){
            callback.forEach(fn => {
                fn.apply(this,args);
            });
        }
    }
}

var myevent = new EventBus();
function show(){
    console.log(1);
}
myevent.addEventListener('click',show);
myevent.emit('click');
myevent.removeEventListener('click',show);
myevent.emit('click');



class Dep{
    constructor(){
        this.subs = [];
    }
    depend(){
        this.subs.push(Dep.Target);
    }
    notify(){
        this.subs.forEach(watcher=>watcher.run())
    }
}

Dep.Target = null;

var data = {};
var id_count = 0;
class Watcher{
    constructor(key,callback){
        Dep.Target = this;
        this.deps = [];
        this.id = id_count++;
        this.cb = callback;
        data[key];
    }
    getter(){
        
    }
    run(...args){
        this.cb.apply(this,args);
    }
}

class Observer{
    constructor(data){
        this.dep = new Dep();
       
        Object.defineProperty(data,'__ob__',{
            value:this,
            enumerable:false,
        })
        for(let key in data){
            defineReactive(data,key,data[key]);
        }
    }
}


function observe(data){
    if(typeof data === 'object'){
        return new Observer(data);
    }
}

function defineReactive(obj,key,val){
    var dep = new Dep();
    var childob = observe(obj[key]);
    var getter = Object.getOwnPropertyDescriptor(obj,key).get;
    var setter = Object.getOwnPropertyDescriptor(obj,key).set;
    Object.defineProperty(obj,key,{
        enumerable:true,
        get(){
            dep.depend();
            childob && (childob.dep.depend());
            return getter ? getter.call(obj) : val;
        },
        set(value){
            var old_value = getter ? getter.call(obj) : val;
            if(old_value === value) return;
            if(setter){
                setter.call(obj,value);
            }else{
                val = value;
            }
            dep.notify();
        }
    })
    
}

data.x = 1;
data.y = 2;

observe(data);

var watch_x = new Watcher('x',()=>{console.log('x')});

data.x = 2;


var Axios = {
    get(url,options={}){
        var xhr =new XMLHttpRequest();
        xhr.open('get',url);
        for(let key in options){
            xhr.setRequestHeader(key,options[key]);
        }

        

        var p = new Promise((resolve,reject)=>{
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        resolve(xhr.responseText);
                    }
                    else{
                        reject(xhr.statusText);
                    }
                }
            }
        })
        xhr.send();
        return p;
    }
}

Axios.get('localhost://8080').then(data=>console.log(data));

var test = 'test'

function fibonacci(m){
    var x = [0,1];
    var n = 1;
    if(m<2){
        return x[m];
    }
    while(n<m){
        n++;
        x.push(x[x.length-1]+x[x.length-2]);
    }
    return x[x.length-1]
}

function dumpFrog(n,m){
    var nums = [1,1,2];
    var i = 3;
    if(n<3){
        return nums[n];
    }
    while(i<=n){
        debugger;
        var result = 0;
        var j = 1;
        while(j<=m){
            result += nums[i-j];
            j++;
        }
        nums.push(result);
        i++;
    }
    return nums[n];
}

dumpFrog(3,2);