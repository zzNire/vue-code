var x = new Promise((resolve,reject)=>{

}).then(res=>{
    console.log(res)
},err=>{
    console.log(err)
})


const State = {
    pending :'pending',
    fullfilled:'fullfilled',
    rejected:'rejected'
}
class upPromise{
    constructor(fn){
        this.state = State.pending;
        this.onResolvedList = [];
        this.onRejectedList = [];
        try{
            //在调用 reslove reject 时要绑定this为当前promise
            fn(this.resolve.bind(this),this.reject.bind(this)); 
        }catch(err){
            this.reject(err);
        }
        
    }

    resolve(val){
        this.state = State.fullfilled;
        this.value = val;

        setTimeout(()=>{
            this.onResolvedList.forEach(cb=>{
                cb();
            })
        },0)
        
    }

    reject(err){
        this.state = State.rejected;
        this.errinfo = err;

        setTimeout(()=>{
            this.onRejectedList.forEach(cb=>{
                cb();
            })
        },0)
    }

    then(onFullfilled,onRejected){
        let that = this;
        if(this.state = State.pending){
            return new upPromise((resolve,reject)=>{
                that.onResolvedList.push(()=>{   //为什么没有绑定到当前的this
                    console.log(this)  
                    var result = onFullfilled(that.value);
                    if(result instanceof upPromise){
                        result.then(resolve,reject);
                    }else{
                        resolve(result);
                    }
                    
                });
                that.onRejectedList.push(()=>{
                    var result = onRejected(that.errinfo);
                    if(result instanceof upPromise){
                        result.then(resolve,reject);
                    }else{
                        reject(result);
                    }   
                })
            })
        }
        if(this.state = State.fullfilled){
            return new upPromise((resolve,reject)=>{
                var result = onFullfilled(that.value);
                    if(result instanceof upPromise){
                        result.then(resolve,reject);
                    }else{
                        resolve(result);
                    }

            })
        }
        if(this.state = State.rejected){
            return new upPromise((resolve,reject)=>{
                var result = onRejected(that.info);
                    if(result instanceof upPromise){
                        result.then(resolve,reject);
                    }else{
                        reject(result);
                    } 
            })
        }
    }
}

var p = new upPromise((resolve,reject)=>{
    setTimeout(() => {
        console.log(1);
        resolve(2);
    }, 1000);
})

var p2 = p.then(res=>{
    console.log(res);
}).then(res=>{console.log(res)})

/*var p = new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log(1);
        resolve(2);
    }, 1000);
})

var p2 = p.then(res=>{
    console.log(res);
}).then(res=>{console.log(res)})*/

//浅拷贝
target = {};
source = {x:1,y:1}
Object.assign(target,source);

target = {...source};


//深拷贝
function deepcopy(source){
    let obj = source instanceof Array?[]:Object.create(source.__proto__);
    if(typeof source === 'object'){
        var keys = Object.keys(source);
        keys.forEach(key=>{
            obj[key] = typeof source[key] !== 'object' ? source[key] : deepcopy(source[key]);
        })
    }
    return obj;
}

JSON.parse(JSON.stringify(source))

//带环的深拷贝

function deepCopyCircle(source,cache){
    cache = cache || [];
    let obj = source instanceof Array?[]:{};
    let filter = cache.filter(val=>val.origin === source);
    if(filter.length){
        return filter[0].copy;
    }

    cache.push({
        origin:source,
        copy:obj
    })
    
    var keys = Object.keys(source);
    keys.forEach(key=>{ 
         obj[key] = typeof source[key] !== 'object' ? source[key] : deepCopyCircle(source[key],cache);
    })
    
    return obj;
}

var x = {a:1};
var y = {x,b:2};
x.y = y;
z = deepCopyCircle(x);

function deepcopy(source,cache){
    var obj = source instanceof Array?[]:{};
    cache = cache || [];
    var filter = cache.filter(val=>val.origin === source);
    if(filter.length){
        return filter[0].copy
    }

    cache.push({
        origin:source,
        copy:obj,
    })

    var keys = Object.keys(source);
    keys.forEach(key=>{
        obj[key] = typeof source[key] === 'object'?deepcopy(source,cache):source[key]

    })

    return obj;
}

// 可避免setInterval因执行时间导致的间隔执行时间不一致
function mySetInterval(fn,timeout,...args){
    var timer = setTimeout(() => {
        fn.apply(this,args);
        mySetInterval(fn,timeout,...args);
    }, timeout);
}

//继承
function People(name){
    this.name = name
}
People.prototype.type ='monkey';

function Man(name){
    People.call(this,name);
    this.sex = 'man'
}

Man.prototype = new People();

//
var inherit = (function (){
    function f(){};
    return function(father,child){
        f.prototype = father.prototype;
        child.prototype = new f();
        child.prototype.constructor = father;
    }
})()