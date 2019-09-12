function getMaxString(str){
    var start = 0, end = 0;
    str = str.replace(/[a-z]+/g,'-');
    var max = '';
    while(start <= str.length){
        if(str.charCodeAt(end+1) - str.charCodeAt(end) === 1){
            end++;
        }else{
            max = max.length < (end - start) ? str.slice(start,end) : max;
            start++;
            end = start;
            
        }
    }
    return max;
}

var str = 'sasfd1234fsfd12356ggml12345678'
getMaxString(str);


function getSonStr(str){
    str = str.split('');
    var result = [str.shift()];
    while(str.length !== 0){
        var right_str = str.shift();
        result =result.concat(result.map(v=>v+right_str));
        result.unshift(right_str);   
    }
    return result;
}

function getContinueSonStr(str){
    str = str.split('');
     var result = [str.shift()];
     var cache = 0;
     while(str.length){
         var right_str = str.shift();
         var copy = result.slice(cache);
         var add = copy.ma
         p(v=>v+right_str);
         add.push(right_str);
         cache = result.length;
         result = result.concat(add);
     }
     return result;
}
function getSameString(str1,str2){
    if(str1.length < str2.length){
        [str2,str1] = [str1,str2];
    }
    var search_list = getContinueSonStr(str2);
    //search_list.sort((a,b)=>b.length-a.length);
    var result = search_list.filter(search_str=>str1.indexOf(search_str)+1);
    return result.sort((a,b)=>b.length-a.length)[0].length;
}

function getMaxAlbum(str){
    var cache = {};
    var max = {count:0,album:''};
    str.split('').forEach(v => {
        cache[v] = cache[v] || 0;
        cache[v]++;
        if(cache[v]>max.count){
            max.count = cache[v];
            max.album = v;
        }
    });
    return max.album;
}

function getThNum(arr,num){
    var middle = arr.shift();
    var left = [],right = [];
    arr.forEach(v=>{
        if(v<middle){
             right.push(v);
        }else{
           left.push(v)
        }
    })
    if(left.length < num-1){
        return getThNum(right,num-left.length-1)
    }else if(left.length === num-1){
        return middle;
    }else{
        return getThNum(left,num)
    }
}

getThNum([4,3,6,1,2,8],3)

function nthUglyNumber(n){
    var result = [1];
    var count = 1;
    var plus_2 = plus_3 = plus_5 = 0;
    if(n === 1) {
        return 1;
    }
    while(count < n){
        var num_2 = result[plus_2] * 2;
        var num_3 = result[plus_3] * 3;
        var num_5 = result[plus_5] * 5;
        var num = Math.min(num_2,num_3,num_5);

        result.push(num);

        if(num === num_2){
            plus_2 ++;
        }
        if(num === num_3){
            plus_3 ++;
        }
        if(num === num_5){
            plus_5 ++;
        }
        count++;
    }
    return result[n-1];
}

function getNumN(n,k){
    var arr = Array.from({length:n}).map((v,index)=>index);
    arr.push(n);
    var reg = new RegExp(`${k}`,'g');
    return arr.toString().match(reg).length;

}

function getNoRepeatLength(str){
    var start = 0,end = 0;
    var max_length = 0;
    while(end < str.length){
        debugger;
        var right_str = str.slice(start,end);
        if(right_str.indexOf(str[end])+1){
            max_length = max_length < (end-start) ? (end-start) : max_length;
            start++;
            end = start;
            
        }else{
            end++;
        }

    }
    return max_length
}

function getAllDate(start,end){
    var month_nums = {
        1:31,
        2:28,
        3:31,
        4:30,
        5:31,
        6:30,
        7:31,
        8:31,
        9:30,
        10:31,
        11:30,
        12:31
    }
    start = start.split('-');
    end = end.split('-');
    var year,month,day;
    year = start[0];
    month = start[1];
    day = start[2]
    var result = [];
    var start_year = start[0];
    while(year<=end[0]){
        if(year%4==0 && year%100!=0 || year%400==0){
            month_nums[2] = 29;
        }else{
            month_nums[2] = 28;
        }
        while(month <= (year==end[0]?end[1]:12)){
            while(day <= ((month==end[1])?end[2]:month_nums[month])){
                result.push(year+'-'+month+'-'+day);
                day++;
            }
            day=1;
            month++;
        }
        month=1;
        year++;
    }
    return result;
}

class Dialog(){
    constrctor(parent,yes_cb,no_cb){
        this.dialog = document.createElement('div');
        var yes_button = document.createElement('button');
        yes_button.innerText = 'yes';
        var no_button = document.createElement('button');
        no_button.innerText = 'no';
        this.dialog.appendChild(yes_button);
        this.dialog.appendChild(no_button);

        yes_button.addEventListener('click',yes_cb);
        yes_button.addEventListener('click',no_cb);

        parent.appendChild(this.dialog);

        this.dialog.addEventListener('mousedown',(e)=>{
            
            e.target.start_top = e.target.offsetTop;
            e.target.start_left = e.target.offsetLeft;
        })
        this.dialog.addEventListener('mousemove',(e)=>{
            var diff_top = e.target.start_top - e.target.offsetTop;
            var diff_left = e.target.start_left - e.target.offsetLeft;
            e.target.style.translate = `transform(${diff_top}px,${diff_left}px)`;
        })
        this.dialog.addEventListener('mouseup',(e)=>{
            
        })
    }
    
}

function maopao(arr){
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length-i-1;j++){
            if(arr[j]>arr[j+1]){
                [arr[j+1],arr[j]] = [arr[j],arr[j+1]];

            }
        }
    }
    return arr;
}

function section(arr){
    var min;
    for(let i=0;i<arr.length;i++){
        min = i;
        for(let j=i;j<arr.length;j++){
            if(arr[min]>arr[j]){
                min = j;
            }
        }
        if(min !== i){
            [arr[min],arr[i]] = [arr[i],arr[min]];
        }
        
    }
    return arr;
}

function charu(arr){
    for(let i=1;i<arr.length;i++){
        var insert_num = i;
        for(let j=i;j>=0;j--){
            if(arr[j+1] < arr[j]){
                [arr[j+1],arr[j]] = [arr[j],arr[j+1]];
            }
        }
    }
    return arr;
}

function merge(left,right){
    var result = [];
    while(left.length && right.length){
        if(left[0]<right[0]){
            result.push(left.shift());
        }else{
            result.push(right.shift());
        }
    }
    if(left.length){
        result = result.concat(left);
    }
    if(right.length){
        result = result.concat(right);
    }
    return result;
}

function guibin(arr){
    if(arr.length === 1){
        return arr;
    }
    var left = [],right = [];
    var middle = Math.floor(arr.length/2);
    left = arr.slice(0,middle);
    right = arr.slice(middle);
    return merge(guibin(left),guibin(right));
}

function quick(arr){
    if(arr.length === 1){
        return arr;
    }
    var middle = arr.shift();
    var left = [],right = [];
    arr.forEach(v=>{
        if(v>middle){
            right.push(v)
        }else{
            left.push(v);
        }
    })
    if(left.length){
        left = quick(left);
    }
    if(right.length){
        right = quick(right);
    }
    return left.concat(middle,right);

}

class a extends

function extends (father,son){
    function f() {  }
    f.prototype = new father();
    //
    var proto = Object.create(father.prototype);
    proto.constrctor = father;
    son.prototype = proto;

}

function getRightStr(str){
    var result = [];
    var index = 0;
    var square = [];
    var tag = 1;
    while(index < str.length){
        if(str[index] === '<'){
            if(tag){
                result.pop();
            }
        }else if(str[index] === '('){
            square.push('(');
            tag = 0;

        }else if(str[index] === ')'){
            square.pop();
            if(!square.length){
                 tag = 1;
            }
        }else{
            if(tag){
                result.push(str[index]);
            }
        }
        index++;
    }
    return result.join('');
}

var arr = [];
arr.push('.#...'.split(''));
arr.push('..#S.'.split(''));
arr.push('.E###'.split(''));
arr.push('.....'.split(''));
arr.push('.....'.split(''));

function toEnd(arr,start,end,n){
    var result = [];
    
    function move(start,path,tag){
        tag = tag || [];
        //debugger;
        if(arr[start[0]][start[1]] === 'E'){
            result.push(path);
            return true;
        }
        if(arr[start[0]][start[1]] === '#'){
            return ;
        }
        var next_arr = [
            [start[0]-1,start[1]],
            [start[0]+1,start[1]],
            [start[0],start[1]-1],
            [start[0],start[1]+1],
        ];
        next_arr.forEach(next=>{
            next = next.map(v=> v>=0? v%n : v+n);
            if(tag[next[0]] && tag[next[0]][next[1]]){

            }else{
                tag[next[0]] = tag[next[0]] || [];
                tag[next[0]][next[1]] = tag[next[0]][next[1]] || 1;
                path.push(next);
                var copy_tag = tag.map(v=>[...v]);
                move(next,path.slice(),copy_tag);
                path.pop();
            }
            
        })
        
    }
    move(start,[]);
    debugger;
    result.sort((a,b)=>a.length-b.length);
    return result[0].length;
}

toEnd(arr,[1,3],[2,1],5);


function getAllPath(num){
    var result = [];
    function getOnePath(num,path){
        debugger;
        path = path || [];
        if(num === 0){
            result.push(path);
            return;
        }
        if(num === 1){
            path.push(1);
            result.push(path);
            return;
        }
        var path1 = path.slice();
        path1.push(1);
        var path2 = path.slice()
        path2.push(2);
        getOnePath(num-1,path1);
        getOnePath(num-2,path2);
    }
    getOnePath(num);
    return result;
}
getAllPath(20);

function fn(...args){

}
function curry(fn,...default){
    return function(...args){
        fn.apply(null,default.concat(args));
    }
}




function add(...mydefault){
    function curryAdd(...args){
        return add(...mydefault.concat(args))
    }
    curryAdd.valueOf = function(){
        return mydefault.reduce((sum,v)=>sum+v);
    }
    return curryAdd;
}

function cury(fn,data){
    return fn.length === data.length ? fn.apply(null,data) 
        : function(...args){
            cury(fn,data.concat(args))
        }
}


function search(arr,n){
    var start = 0,end = arr.length;
    while(start <= end){
        var middle = Math.floor((start + end)/2);
        if(arr[middle] < n){
            start = middle + 1;
        }else if(arr[middle] > n){
            end = middle-1;
        }else{
            return middle;
        }
    }
    return -1;
}


class EventEmiter{
    constructor(){
        this.subscriber = {}
        this.callbacks = {};
    }
    on(type,fn){
        var callbacks = this.callbacks[type] || [];
        callbacks.push(fn);
    }
    emit(type,...args){
        var callbacks = this.callbacks[type];
        if(callbacks.length){
            callbacks.forEach(fn=>{
                fn(...args);
            })
        }
    }
    off(type,fn){
        var callbacks = this.callbacks[type];
        if(callbacks.length){
            var index = callbacks.indexOf(fn);
            callbacks.splice(index,1);
        }
    }
    once(type,fn){
        var callbacks = this.callbacks[type] || [];
        function oncefn(...args){
            fn(...args);
            this.off(type,fn)
        }
        callbacks.push(oncefn)
    }
}

function jsonp(url,calback){
    var dom = document.createElement('script');
    
    dom.src = url + `?callback=${callback}`
    document.body.appendChild(dom);
 
}

function callbackFn(data){
    console.log(data);
}

jsonp('a.com','callbackFn');

(function(){
    var id = 0;
    function jsonp(res){
        var dom = document.createElement('script');
    
        var data = res.data;
        var callback = res.callback;
        var fnName = 'jsonp' + id++;
        var url = res.url;

        data['callback'] = fnName;

        url = url.indexOf('?') ? url + '&' : url + '?';

        var params = [];
        for(var key in data){
            params.push(key+'='+data[key]);
        }

        url += params.join('&');

        window[fnName] = function(data){
            callback && callback(data);
            delete this.window[fnName];
            this.document.body.removeChild(dom);
        }

        document.body.appendChild(dom);
    }
})() 


class Symbol{
    constructor(name,value){
        this.name = name;
        this.value = value;
    }
}


function parseTree(str){
    var equal = str.indexOf('=');
    var result = {};
    var leftname = str.slice(0,equal).match(/\d+/)[0];
    result.left = new Symbol(leftname);
    result.type = '=';
    str = str.slice(equal+1);

    var index = 0;
    var stag = 0;
    var vtag = 0;
    var sstack = [];
    var pstack = [];
    var node;
    while(index<str.length){
        node = null;
        if(str[index] === '['){
            stag = index;
        }
        if(str[index] === ']'){
            node = new Symbol(str.slice(stag+1,index));

        }
        if(str[index] === '{'){
           vtag = index
        }
        if(str[index] === '}'){
            node = new Symbol('',parseInt(str.slice(vtag+1,index)));
           
        }
        if(node){
            sstack.push(node);
            if(sstack.length >= pstack.length+1 && pstack.length){
                var last = pstack[pstack.length-1];
                if(last === '*' || last === '/'){
                    var compute = {
                        right:sstack.pop(),
                        type:pstack.pop(),
                        left:sstack.pop(),
                    }
                    sstack.push(compute);
                }
            } 
        }

        if(str[index] === '+'){
            pstack.push('+');
        }
        if(str[index] === '-'){
            pstack.push('-');
        }
        if(str[index] === '*'){
            pstack.push('*');
        }
        if(str[index] === '/'){
            pstack.push('/');
        }
        index++;
    }
    while(pstack.length){
        var compute = {
            right:sstack.pop(),
            type:pstack.pop(),
            left:sstack.pop(),
        }
        sstack.push(compute);
    }
    result.right = sstack.pop();
    return result;
}



function getNum(str){
    str = str.split(';');
    var complex = str[0];
    var data = str[1];
    var target = str[2];
    
    complex = complex.split(',');
    var complexTree = {};
    complex.forEach(str=>{
        var tree = parseTree(str)
        complexTree[tree.left.name] = tree;
    })

    var symbol_data = {};
    data.split(',').forEach(str=>{
        var match = str.match(/\[(\d+)\]=(\d+)/)
        symbol_data[match[1]] = parseInt(match[2]);
    })

    target = target.match(/\[(\d+)\]/)[1];

    var root = complexTree[target];

    function getResult(root){
        debugger;
        if(root.type === '='){
            return getResult(root.right)
        }else if(root.type){
            var left,right;
            if(root.left.value){
                left = root.left.value;
            }else{
                left = getResult(root.left);
            }
            if(root.right.value){
                right = root.right.value;
            }else{
                right = getResult(root.right);
            }
            switch(root.type){
                case '+' : {
                    return left+right;
                }
                case '-' : {
                    return left-right;
                }
                case '*' : {
                    return left*right;
                }
                case '/' : {
                    return left/right;
                }
            }
        }else{
            return symbol_data[root.name] || getResult(complexTree[root.name])
        }
        
    }

    return getResult(root);
}

var str = `[1234]=[12]+[34]*{50},[12]=[1]+[2]/{2};[1]=10,[2]=20,[34]=50;[1234]`
getNum(str)

function counter(value){
    return {
        add:function(){
            return ++value;
        },
        sub:function(){
            return --value;
        },

    }
}

function curry(fn,...default_data){
    return function(...args){
        fn.length === default_data.length ? fn(...default_data)
            : curry(fn,...default_data.concat(args));
    }
}




function getMin(arr){
    var result = [];
    arr.forEach(line=>{
        var line_result = [];
        line.forEach((v,index)=>{
            if(v>1){
                line_result = line_result.concat(Array.from({length:v-1}).map(v=>1));
                if(index !== line.length-1){
                    line_result.push(0);
                }
                
            }else if (v===1 && index !== line.length-1){
                line_result.push(0);
            }
        })
        result.push(line_result);
    })

    var result_reserve = [];
    result.forEach(line=>{
        line.forEach((v,index)=>{
            result_reserve[index] = result_reserve[index] || [];
            result_reserve[index].push(v);
        })
    })
    return result_reserve.map(line=>line.filter(v=>v===1)).sort((a,b)=>a.length-b.length)[0].length;
}

var arr = [[1,2,2,1],
    [3,1,2],
    [1,3,2],
    [2,4],
    [3,1,2],
    [1,3,1,1]];
getMin(arr);

function upload(file){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
        if(file%2 === 0){
            console.log(file);
            res();
        }else{
            console.log('err'+file);
            rej();
        }
        
        },1000*(file%2+1))
    })
    
}

function getUpload() {
    var count = 0;
    var files = [];
    debugger;
    function uploadFile(file, reload) {
        console.log(files);
        reload = reload || 0;
        if (reload >= 3) {
            count--;
            if(files.length){ 
                file = files.shift();
                uploadFile(file);
            }
            return;
        }
        if (count < 3) {
            count++;
            var promise = new Promise((res, rej) => {
                upload(file).then(res,rej)
            }).then(data => {
                count--;
               
                if(files.length){ 
                    var next = files.shift();
                    uploadFile(next);
                }
                return true;
            }).catch(err => {
                count--;
                //files.unshift(file);
                uploadFile(file, reload + 1);                
            })
        } else {
            files.push(file);
        }
    }
    return uploadFile;
}

var uploadFile = getUpload();
var arr = [1,2,3,4,5,6,7,8,9];
arr.forEach(v=>uploadFile(v));


function curry(fn,...default_arg){
    return function(...args){
        default_arg = default_arg.concat(args);
        debugger;
        return fn.length >= default_arg.length ? fn(...default_arg)
            : curry(fn,...default_arg);
    }
}

function curry_add(...default_args){
    function add(...args){
        return curry_add(...default_args.concat(args))
    }
    add.valueOf = function(){
        return default_args.reduce((sum,v)=>sum+v);
    }
    return add;
}

curry_add(1)(2)(3).valueOf();



function jieliu(fn,timeout,...args){
    var timer;
    return function(e){
        if(!timer){
            setTimeout(() => {
                timer = fn.apply(this,args);
                timeout = null;
            }, timeout);
        }
    }
}

dom.addEventListener('input',jieliu(fn,3000,a,v,c))

function fangdou(fn,timeout,...args){
    var timer;
    return function(e){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this,args);
            timer = null;
        }, timeout);
    }
}