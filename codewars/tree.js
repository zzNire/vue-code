var tree = {
    root:1,
    left:{},
    right:{},
}

function getTree(first_nums,middle_nums){
    var node = {};
    if(first_nums.length === 1){
        return {root:first_nums[0]};
    }
    var root = first_nums.shift();
    var root_index = middle_nums.indexOf(root);

    var first_left = first_nums.slice(0,root_index);
    var first_right = first_nums.slice(root_index);
    var middle_left = middle_nums.slice(0,root_index);
    var middle_right = middle_nums.slice(root_index+1);
    node.root = root;
    if(first_left.length && middle_left.length){
        node.left = getTree(first_left,middle_left);
    }
    if(first_right.length && middle_right.length){
        node.right = getTree(first_right,middle_right);
    }
    

    return node;
}

var first = [1,2,4,7,3,5,6,8];
var middle = [4,7,2,1,5,3,8,6]

getTree(first,middle);


// arr 里的数字的全排列
function comSort(arr,index,result){
    index = index || 0;
    if(index === arr.length){
        console.log(result.join('').replace(/^0*([\d]+)/,'$1'));
        return;
    }
    var next = index+1;
    result = result || Array(arr.length);
    arr.forEach(v => {
        result[index] = v;
        comSort(arr,next,result)
    });
    
}

function allSet(arr,length,index,result) {
    result = result || new Array(length);
    index = index || 0;
    if(index === length){
        console.log(result.join(''));
        return;
    }
    index++;
    arr.forEach(v=>{
        result[index-1] = v;
        allSet(arr.filter(a=>a!=v),length,index,result);
    })
}

function allSetT(arr,length,result=[]){
    arr.forEach((v,index)=>{ 
        if(index===0){
            result.push(v);
            if(length === 1) console.log(result);
            allSetT(arr.slice(1),length-1,result);
            result.pop();
        }else{
            if(!(length === arr.length)){
                allSetT(arr.filter(a=>a!=v),length,result);
            }  
        }
    })
}

function reorderArr(arr,rules){
    var start = 0;
    var end = arr.length - 1;
    while(start<end){
        if(rules(arr[start],arr[end])){
            [arr[end],arr[start]] = [arr[start],arr[end]];
            start++;
            end--;
        }
        start++;
    }
    return arr;
}

function rule1(v1,v2){
    if(v2%2 && !(v1%2)){
        return true;
    }
    return false;
}

var mytree = {
    root:8,
    left:{
        root:6,
        left:{
            root:5
        },
        right:{
            root:7
        }
    },
    right:{
        root:10,
        left:{
            root:9
        },
        right:{
            root:11
        }
    }
}


function exchangeTree(tree){
    if(!tree.left && !tree.right){
        return tree;
    }
    //var left = JSON.parse(JSON.stringify(tree.left));
    //var right =JSON.parse(JSON.stringify(tree.right));
    var left = tree.left;
    var right =tree.right;
    if(left){
        tree.left = exchangeTree(right);
    }
    if(right){
        tree.right = exchangeTree(left);
    }
    return tree;
}

exchangeTree(mytree);


function printMatrix(arr){
    if( !arr.length){
        return;
    }
    if(arr.length && (!arr[0].length)){


        arr.forEach(v=>{console.log(v)});
        return;
    }
    var line = arr.length;
    var row = arr[0].length;

    var i=0;
    while(line > i*2 && row > i*2){
        var j;
        debugger;
        var startX = i,endX = line - i -1;
        var startY = i,endY = row - i - 1;


        for(j=startY;j<=endY;j++){
            console.log(arr[startX][j]);
        }
        
        if(startX < endX){
            for(j=startX+1;j<=endX;j++){
                console.log(arr[j][endY]);
            }
        }
        
        if(startY < endY && startX < endX){
            for(j=endY-1;j>=startY+1;j--){
                console.log(arr[endX][j]);
            }
        }
        
        if(startX < endX-1 && startY < endY){
            for(j=endX-1;j>=startX;j--){
                console.log(arr[j][startY]);
            }
        }
        i++;
    }
}

function flatten(arr){
    var result = [];
    if(!Array.isArray(arr)){
        return arr;
    }
    arr.forEach(v=>{
            if(Array.isArray(v)){
                result = result.concat(flatten(v));
            }else{
                result.push(v);
            }
    })
    return result;
}   

function dFlatten(arr){
    while(arr.some(v=>Array.isArray(arr))){
        arr = [].concat(...arr);
    }
}


function IsPopOrder(push_order,pop_order){
    if(!push_order.length || !pop_order.length){
        return false;
    }
    var stack = [];
    for(var v of pop_order){
        var index = push_order.indexOf(v);
        if(index+1){
            index++;
            while(index){
                stack.push(push_order.shift());
                index--;
            }
        }
        console.log(stack);
        if(stack.pop() !== v){
            return false
        }
        
    }
    return true;
}

function widthPrintTree(tree){
    if(!tree) return ;
    var quere = [tree];
    var result = [];
    while(quere.length){
            var node = quere.shift();
            result.push(node.root);
            node.left && quere.push(node.left);
            node.right && quere.push(node.right);
    }
    console.log(result);
}

function verifySquence(arr){
    if(!arr.length){
        return false;
    }
    if(arr.length === 1){
        return true;
    }
    var root = arr.pop();
    var left = [],right = [];
    for(var i=0;i<arr.length;i++){
        if(arr[i]>root){
            break;
        }
    }
    left = arr.slice(0,i);
    right = arr.slice(i);
    if(right.some(v=>v<root)){
        return false;
    }
    var left_tag=true,right_tag=true;
    if(left.length){
        left_tag = verifySquence(left);
    }
    if(right.length){
        right_tag = verifySquence(right);
    }
    return left_tag && right_tag;
}

var find_tree = {
    root:10,
    left:{
        root:5,
        left:{
            root:4
        },
        right:{
            root:7
        }
    },
    right:{
        root:12,
    }
}
function FindPath(tree,num,path=[],sum=0){
    if(!tree) return;+
    sum+=tree.root;
    path.push(tree.root);
    if(sum >= num){
        if(sum === num && !(tree.left||tree.right)){
            console.log(path);
        }
        path.pop();
        return ;
    }
    if(tree.left){ 
        FindPath(tree.left,num,path,sum);
    }
    if(tree.right){
        FindPath(tree.right,num,path,sum);
    }
    path.pop();
}

function DeepCopy(obj,caches=[]) {
    if(!obj) return false;
    
    var cache = caches.filter(v=>v.origin === obj)
    if(cache.length){
        return cache[0].copy;
    }
    var copy = Array.isArray(obj)?[]:{};
    caches.push({
        origin:obj,
        copy,
    })
    var keys = Object.keys(obj);
    for(var key of keys){
        copy[key] = typeof obj[key] === 'object' ? DeepCopy(obj[key],caches):obj[key];
    }
    return copy;
}


var mytree = {
    root:8,
    left:{
        root:6,
        left:{
            root:5
        },
        right:{
            root:7
        }
    },
    right:{
        root:10,
        left:{
            root:9
        },
        right:{
            root:11
        }
    }
}
function ConvertNode(tree,last=[]){
    if(!tree){
        return;
    }
    if(tree.left){
        ConvertNode(tree.left,last)
    }

    tree.left = last[0];
    if(last.length){
        last[0].right = tree;
        
    }
    last[0] = tree;
    if(tree.right){
        ConvertNode(tree.right,last);
    }
}

function getSortList(tree) {
    debugger;
    ConvertNode(tree);
    var left = tree.left;
    while(left.left){
        left = left.left;
    }
    return left;
}

function permutation(arr,result=[]) {
    //result = result || new Array(arr.length);
    arr.forEach(v=>{
        result.push(v);
        console.log(result.join(''));
        var last = arr.filter(a=>a!==v);
        if(last.length){
            permutation(last,result);
        }
       // console.log(result.join(''));
        
        result.pop();
    })
}


function onceQuickSort(input,start,end){
    var arr = input.slice(start,end+1);
    var middle = Math.floor(arr.length/2);
    var left = [],right = [];
    arr.forEach((v,index)=>{
        if(index!==middle){
            v<=arr[middle] ? left.push(v) : right.push(v);
        }
        
    })
    var middle_v = arr[middle];
    arr.length = 0;
    arr = arr.concat(left,middle_v,right);
    input.splice(start,end-start+1,...arr);
    return left.length+start;
}
function getLeastNumber(arr,n){ 
    debugger;
    var start=0,end=arr.length-1;
    var index = onceQuickSort(arr,start,end);
    while(index !== n-1){
        if(index < n-1){
            start = index + 1
        }else{
            end = index -1;
        }
        index = onceQuickSort(arr,start,end);
    }
    console.log(arr.slice(0,n));
}

function sleep(timeout){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

function sleep(timeout){
    function * generator(){
        yield new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve();
            }, timeout);
        });
    }
    return generator().next().value;
}

async function sleep(timeout){
    await new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

//
async function sleep(timeout,fn){
    await new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve();
        }, timeout);
    });
    fn();
}

sleep.then(res=>{
    fn();
})


var v = 'cba'(function () {
    var v = 'abc'
    function A() {
        var v = 'a';
        this.getVar = function () { //b的实例绑定了此方法
            console.log(v) // 向上查找作用域最近作用域里的v 也就是a
        }
    }

    function B() {
        var v = 'b'
        A.call(this) //B的实例
    }
    var b = new B()
    b.getVar()
}())


function popSort(arr) {
    var i,j;
    for(i=0;i<arr.length;i++){
        for(j=1;j<arr.length-i;j++){
            if(arr[j]<arr[j-1]){
                [arr[j-1],arr[j]] = [arr[j],arr[j-1]];
            }
        }
    }
    return arr;
}

function improvePopSort(arr){
    var i,j;
    var p;
    i = arr.length;
    while(i>1){
        p = i - 1;
        for(j=1;j<i;j++){
            if(arr[j-1]>arr[j]){
                p = j;
                [arr[j-1],arr[j]] = [arr[j],arr[j-1]];
            }
        }
        i = p;
    }
}


function saveNum(obj,size){
    return Array.from({length:size}).map((v,index)=>obj[index+1] || null);
}

class LazyManClass{
    constructor(name){
        this.name = name;
        this.quene = [];
        console.log('Hi I am ' + this.name)
    }
    sleep(timeout){
        var fn = ()=>{setTimeout(() => {
           console.log(`等待了${timeout}秒`);
           this.next();
        }, timeout*1000);}
        this.quene.push(fn);
        return this;
    }
    sleepFirst(timeout){
        setTimeout(() => {
            console.log(`等待了${timeout}秒`);
            this.next();
        }, timeout*1000);
         return this;
    }
    eat(type){
        this.quene.push(()=>{
            console.log('I am eating ' + type);
            this.next();
        });
        return this;
    }
    next(){
        var fn = this.quene.shift();
        fn && fn();
    }
}

function LazyMan(name) {
    return new LazyManClass(name);
}


Promise.prototype.finally = function(callback){
    var P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(()=>value),
        err => P.resolve(callback()).then(()=>{throw err})
    )
}

function generateArr(){
    var arr = Array.from({length:10}).map(v=> Math.round(Math.random()*100));
    arr = [...(new Set(arr))].sort((a,b)=>a-b);
    var result = [];
    var start = 0;
    arr.reduce((pre,cur,curindex)=>{
        if(cur-pre !== 1){
            result.push(arr.slice(start,curindex));
            start = curindex;
        }
        return cur;
    })
    return result;
}


function generateArr(){
    var arr = Array.from({length:10}).map(v=> Math.round(Math.random()*100));
    arr = [...(new Set(arr))].sort((a,b)=>a-b);
    var map = new Map();
    arr.forEach(v=>{
        var key = Math.floor(v/10);
        arr = map.has(key)? map.get(key):[];
        arr.push(v);
        map.set(key,arr);
    })
    return [...map.values()]
}

function exchangeStr(str){
    return str.split('').map(v=>{
        if(v.charCodeAt(0) <= 'Z'.charCodeAt(0) 
            && v.charCodeAt(0) >= 'A'.charCodeAt(0)){
                return v.toLowerCase();
            }
        return  v.toUpperCase();
    }).join('');
}

// KMP 算法
//http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html
function generateSearchTable(str){
    var table = [];
    for(var i=0;i<str.length;i++){
        var substr = str.slice(0,i+1);
        var head = substr.split('').map((v,index)=>substr.slice(0,substr.length-1-index)).filter(v=>v!='');
        var tail = substr.split('').map((v,index)=>substr.slice(index+1,substr.length)).filter(v=>v!='');;
        var same = head.filter(v=>tail.indexOf(v)+1);
        table.push( Math.max(same.map(v=>v.length)));
    }
    return table;
}


function KMP(str,find_str){
    if(str.length < find_str.length) return -1;
    var search_table = generateSearchTable(find_str);
    var str_p = find_str_p = 0;
    //var str_start = 0;
    var result = [];
    while(str_p<=str.length){
        debugger;
        if(find_str_p === find_str.length){
            result.push(str_p - find_str.length);
            find_str_p = 0;
        }
        if(str[str_p] === find_str[find_str_p]){
            find_str_p ++; 
            str_p++;
        }else{
            if(find_str_p === 0){
                str_p++;
            }else{
                 find_str_p -= find_str_p - search_table[find_str_p-1];
            }
              
        }   
    }
    return result;
}

var str = 'BBCABCDABABCDABCDABDE';
var find = 'ABCDABD';
KMP(str,find);


var data = {a:1,b:2,c:{x:1,y:2}};

function reactive(data){
    var watcher = {};
    var isMounted = true;
    var proxy_data = defineReactive(data);

    depend(proxy_data);
    isMounted = false;
    return proxy_data;

    function defineReactive(data) {
        isMounted = true;
        var keys = Object.keys(data);
        for(let key of keys){
            if(typeof data[key] === 'object'){
                data[key] = defineReactive(data[key]);
            }
        }
        var proxy_data  = new Proxy(data, {
            get(target, key,receiver) {
                console.log(key);
                watcher[key] = watcher[key] || [];
                if(isMounted){
                    watcher[key].push(callback);//依赖收集
                }
                return Reflect.get(target,key,receiver);
            },
            set(target, key, value, receiver) {
                var callback = watcher[key] || [];
                if (value === Reflect.get(target,key,receiver)) {
                    return true;
                }
                
                callback.forEach(cb => {
                    cb(key, value)
                });
                //触发更新
                return Reflect.set(target,key,value,receiver);
            }
        })
       debugger;
        
        
        return proxy_data;
    }
    
    function callback(key,value){
        console.log(`update ${key} = ${value}` )
    }

    function depend(data){
        var keys = Object.keys(data);
        for(var key of keys){
            var value = data[key];
            if(typeof value === 'object'){
                depend(value);
            }
        }
    }
}


function rollArr(arr,n) {
    n = n % arr.length;
    var insert = arr.splice(arr.length-n,n);
    arr.splice(0,0,...insert);
    return arr;
}


function all(list) {
    var result = [];
    return new Promise((resolve,reject)=>{
        for(let i=0;i<list.length;i++)
        {
            p = list[i];
            p.then(res=>{
                result.push(res);
                if(i === list.length-1){
                    resolve(result)
                }
            },err=>{
                reject(err);
            })

        };
    })
}

Promise.prototype.all = all;
var p1=Promise.resolve(1),
p2=Promise.resolve(2),
p3=Promise.resolve(3);
all([p1,p2,p3]).then(function(value){
console.log(value)
})

function getNums(){
    return [...Array(10000).keys()].map(x=>(x+1).toString()).filter(num=>num.length>1 && num.split('').reverse().join('')===num);
}

function moveZero(arr){
    let start=0,end=arr.length-1;
    while(start <= end){
        while(arr[end] !== 0){
            end--;
        }
        while(arr[start] === 0){
            start++;
        }
        if(start <= end){
            [arr[start],arr[end]] = [arr[end],arr[start]];
        }
    }
    return arr;
}


function add (...nums) {
    function myadd(...arguments){
        return add.apply(this,nums.concat(arguments));
    }
    myadd.valueOf = function () {
        return nums.reduce((sum,v)=>sum+v);
    }
    return myadd;
}

function  findSum(arr,num) {
    var copy = arr.slice();
    var diff = 0;
    while(copy.length){
        diff++;
        var first = copy.shift();
        var rest = num - first;
        if(copy.indexOf(rest)+1) return [diff-1,diff+copy.indexOf(rest)];
    }
    return -1;
}

function convertDepartment(arr,deparment){
    //var deparment = arr.filter(v => v.parentId === 0)[0];
    var children = arr.filter(v => v.parentId === deparment.id);
    children.forEach(v=>{
        deparment.children = deparment.children || [];
        deparment.children.push(convertDepartment(arr,v));
    });
    return deparment;
}

function convert(arr){
    var root = arr.filter(v => v.parentId === 0);
    var result = [];
    root.forEach(deparment=>{
        result.push(convertDepartment (arr,deparment));
    })
    return result;
}

function convert(arr){
    var result = arr.filter(v=>v.parentId===0);
    var map = arr.reduce((sum,v)=>{
        sum[v.id] = v;
        return sum;
    },{})
    arr.forEach(v=>{
        if(v.parentId !== 0){
            map[v.parentId].children = map[v.parentId].children || [];
            map[v.parentId].children.push(v);
        }
    })
    return result;
}


var tree = [
    {
        id:'1',
        children:[
            { id:'11',
                children:[
                    {id:'111'},
                    {id:'112'}
                ]
            },
            {
                id:'12'
            }
        ]
    },
    {
        id:'2'
    }
]

function find(tree, value) {
    var res;
    if(findFathers(tree, value)){
        return res;
    }
    else{
        return undefined;
    }
    function findFathers(tree, value, stuck) {
        stuck = stuck || [];
        for (let child of tree) {
            stuck.push(child.id);
            if (child.id === value) {
                //console.log(stuck);
                res = stuck.slice();
                return true;
            }
            if (child.children) {
                if (findFathers(child.children, value, stuck)) {
                    return true;
                }
            }
            stuck.pop();
        }
        return false;
    }
}
find(tree,'112');

function sort(arr,start,end) {

    return 
}

function findMiddle(arr1,arr2){
    var result = [];
    while(arr1.length && arr2.length){
        if(arr1[0]<arr2[0]){
            result.push(arr1[0]);
            arr1.shift();
        }else{
            result.push(arr2[0]);
            arr2.shift();
        }
    }
    if(arr1.length){
        result = result.concat(arr1);
    }
    if(arr2.length){
        result = result.concat(arr2);
    }
    return result.length%2===0 
        ? (result[Math.floor(result.length/2)-1] + result[Math.floor(result.length/2)])/2
        : result[Math.floor(result.length/2)];

}

function deepCopy(obj,cache) {
    cache = cache || [];
    var cache_obj = cache.filter(o=>o.origin === obj);
    if(cache_obj.length){
        return cache_obj[0].copy;
    }

    var copy = Array.isArray(obj) ? []:{};
    
    cache.push({
        origin:obj,
        copy,
    })
    
    var keys = Object.keys(obj);
    keys = keys.concat(Object.getOwnPropertySymbols(obj));
    for(let key of keys){
        copy[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
    return copy;
}

function reverse(num) {
    if(num.toString().length === 1){
        return num
    }
    return reverse(num.toString().slice(1)) + num.toString()[0];
}