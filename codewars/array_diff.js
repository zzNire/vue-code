function array_diff(a, b) {
    var b_num = {};
    b.forEach(x => {
        if (!b_num[x]) {
            b_num[x] = 1;
        }
    });
    return a.filter((x) => !b_num[x])
}

function array_diff(a, b) {

    return a.filter((x) => b.indexOf(x) === -1)
}


var text = "The sunset sets at twelve o' clock."

function alphabetPosition(text) {
    var filter = text.toLowerCase().replace(/[^a-z]/g, '')
    filter = filter.replace(/[a-z]/g, (e, index) => filter.charCodeAt(index) - 96 + ' ');
    return filter.slice(0, filter.length - 1);
}

function alphabetPosition(text) {
    var filter = text.toLowerCase().match(/[a-z]/g).map((e) => e.charCodeAt(0) - 96).join(' ');
}

var array = ['O', 'Q', 'R', 'S'];

function findMissingLetter(array) {
    var result;
    array.map((e) => e.charCodeAt(0)).reduce((sum, x) => {
        if (x - sum !== 1) {
            result = String.fromCharCode(sum + 1);
        }
        return x;
    })
    return result;
}

var moveZeros = function (arr) {
    // TODO: Program me
    return arr.filter(e => e !== 0).concat(arr.filter(e => e === 0));

    // var length = arr.match(/0/g).length
}

var fibonacci = function (n) {

    var x = [0, 1];
    var i = 1;
    while (i < n) {
        var y = x[0] + x[1];
        x[0] = x[1];
        x[1] = y;
        i++;
    }
    return x[1];
}



function addStr(a, b) {
    var flag = 0;
    a = a.map((value, index) => {
        console.log(value);
        console.log(b[index]);
        var x = (value ? value : 0) + (b[index] ? b[index] : 0) + flag;
        if (x >= 10) {
            flag = 1;
            x -= 10;
        } else {
            flag = 0;
        }
        console.log(x);
        return x;
    })
    if (flag === 1) {
        a.push(1);
    }
    return a;

}

function add(a, b) {
    a = a.split('').reverse().map(x => x - 0);
    b = b.split('').reverse().map(x => x - 0);
    if (a.length > b.length) {
        return addStr(a, b).reverse().join('');
    } else {
        return addStr(b, a).reverse().join('');
    }
}

function add(a, b) {
    a = a.split('');
    b = b.split('');
    var res = '';
    var flag = 0;
    while (a.length || b.length || flag) {
        var sum = ~~a.pop() + ~~b.pop() + flag;
        if (sum >= 10) {
            sum -= 10;
            flag = 1
        } else flag = 0;
        res = sum + res;
    }
    return res;
}

function isPrimeNumber(num) {
    var i = 2;
    while (i <= Math.floor(num / 2)) {
        if (num % i === 0) {
            return false;
        }
        i++;
    }
    return true;
}

function sumOfDivided(lst) {
    var i = 2;
    var result = [];
    while (lst.length) {

        if (i > (lst[0] < 0 ? -lst[0] : lst[0]) && lst.length > 1) {
            i = lst.shift();
            i = i < 0 ? -i : i + 1;
        }
        if (!isPrimeNumber(i)) {
            i++;
            continue;
        }
        var filter = lst.filter(value => !(value % i));
        if (filter.length) {
            result.push([i, filter.reduce((sum, value) => sum + value)]);
        }
        i++;
    }
    return result;
}


function restNum(a, b) {
    var length = b.length;
    var rest = 0;
    for (let i = 0; i < length; i++) {
        rest = (rest * 10 + parseInt(b.charAt(i))) % a;
    }
    return rest;
}
var lastDigit = function (str1, str2) {
    if (parseInt(str1) === 0) return 1;
    if (parseInt(str2) === 0) return 1;
    var result = str1.charAt(str1.length - 1);
    str1 = result;
    var repeat = [];
    repeat.push(str1);
    var repeatNum;
    for (let i = 1; i < str2; i++) {
        result = (result * str1).toString();
        result = result.charAt(result.length - 1);
        if (~~repeat.indexOf(result)) {
            repeat.push(result);
        } else {
            repeatNum = repeat.length;
            var index = restNum(repeatNum, str2);
            return parseInt(repeat[index === 0 ? repeatNum - 1 : index - 1]);
        }
    }
    return parseInt(result); // fix me
}

'use strict';
Function.prototype.bind = function (obj, ...args) {
    var that = this;
    return function () {
        // this = that;
        that.call(obj, ...args);
    }
}
var x = getName.bind({
    name: 'nire'
}, 'name');

function getName(name) {
    console.log(this[name]);
    // return this.name
}


const pipeline = (...funcs) =>
    val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5);

function tco(f) {
    var value;
    var active = false;
    var accumulated = [];

    return function accumulator() {
        accumulated.push(arguments);
        if (!active) {
            active = true;
            while (accumulated.length) {
                value = f.apply(this, accumulated.shift());
            }
            active = false;
            return value;
        }
    };
}

var sum = tco(function (x, y) {
    if (y > 0) {
        return sum(x + 1, y - 1)
    } else {
        return x
    }
});

sum(1, 5)


function tco(f) {
    var right_arguments = [];
    var is_active = false;
    var value;
    return function () {
        right_arguments.push(arguments);
        if (!is_active) {
            while (right_arguments.length) {
                is_active = true;
                value = f.apply(null, right_arguments.shift());
                is_active = false;
            }
            return value;
        }
    }
}


function sum(val, num) {
    if (num <= 1) {
        return val;
    } else {
        return sum(val + 1, num - 1);
    }
}

sum = tco(sum);

sum(1, 5);


const contains = (() => {
    return Array.prototype.includes ?
        (arr, val) => arr.includes(val) :
        (arr, val) => arr.some(v => v === val)
})();

contains([1, 2, 3], 1);


function solution(input, markers) {
    return input.split('\n').map((str) => {
        return str.replace(new RegExp('[' + markers.join('') + '].*'), '').trim();
    }).join('\n');
};

var justify = function (str, len) {
    var index = 0;
    var count = 0;
    var result = '';
    if (!str) return '';
    while (index <= str.length - len) {
        count++;
        console.log(index);
        var line = str.substr(index, len);
        if (str.charAt(index + len) === ' ' || str.charAt(index + len) === '') {
            result += line + '\n';
            index += len + 1;
        } else {
            line = line.slice(0, line.lastIndexOf(' '));
            if (!line) continue;
            index += line.length + 1;
            var words = line.split(' ');
            if (!words) continue;
            var word_length = words.join('').length;
            var space_length = Math.floor((len - word_length) / (words.length - 1));
            var rest_space_length = (len - word_length) % (words.length - 1);
            for (let i = 0; i < rest_space_length; i++) {
                result += words[i];
                result += ' '.repeat(space_length + 1);
            }
            for (let i = rest_space_length; i < words.length - 1; i++) {
                result += words[i];
                result += ' '.repeat(space_length);
            }
            result += words[words.length - 1] + '\n';

        }
    }
    if (index <= str.length) {
        result += str.slice(index);
        count++;
    }
    console.log(count);
    return result;
};

var str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis dolor mauris, at elementum ligula tempor eget. In quis rhoncus nunc, at aliquet orci. Fusce at dolor sit amet felis suscipit tristique. Nam a imperdiet tellus. Nulla eu vestibulum urna. Vivamus tincidunt suscipit enim, nec ultrices nisi volutpat ac. Maecenas sit amet lacinia arcu, non dictum justo. Donec sed quam vel risus faucibus euismod. Suspendisse rhoncus rhoncus felis at fermentum. Donec lorem magna, ultricies a nunc sit amet, blandit fringilla nunc. In vestibulum velit ac felis rhoncus pellentesque. Mauris at tellus enim. Aliquam eleifend tempus dapibus. Pellentesque commodo, nisi sit amet hendrerit fringilla, ante odio porta lacus, ut elementum justo nulla et dolor.";


var justify = function (str, len) {
    var words = str.split(' ');
    var lines = [];
    var lastwords = words.reduce((line, word) => {
        if (line) {
            if (line.length + word.length + 1 <= len) {
                return line + ' ' + word;
            }
            lines.push(line);
        }
        return word;
    });

    lines = lines.map((line) => {
        if (line.indexOf(' ') == -1) {
            return line.padEnd(len, ' ')
        }
        while (line.length < len) {
            var line_length = line.length;
            line = line.replace(/ +/g, (str) => {
                return str + (line_length++ < len ? ' ' : '');
            })
        }

        return line;
    })

    if (lastwords) {
        lines.push(lastwords);
    }

    return lines.join('\n');
}

//遍历二叉树
function Tree(left, node, right) {
    this.left = left;
    this.node = node;
    this.right = right;
}

function make(array) {
    if (array.length === 1) return new Tree(null, array[0], null);
    return new Tree(make(array[0]), array[1], make(array[2]));
}

var tree = make([
    [
        ['a'], 'b', ['c']
    ], 'd', [
        ['e'], 'f', ['g']
    ]
]);

function* iteratorTree(tree) {
    if (tree) {
        if (tree.left) yield* iteratorTree(tree.left);
        yield tree.node;
        if (tree.right) yield* iteratorTree(tree.right);
    }

}

var result = [];
for (let node of iteratorTree(tree)) {
    result.push(node);
}

//
function makeAjax() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 20) {
                it.next(xhr.responseText);
            }
        } else {
            return -1;
        }
    }

    xhr.open('get', '/api/categories');
    xhr.send();
}

function* main() {
    var result = yield makeAjax();
    console.log(result);
}

var it = main();
it.next();

//
function success(data) {
    console.log(data)
}
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 20) {
            return success(xhr.responseText)
        }
    } else {
        return -1;
    }
}
xhr.open('get', '/api/categories');
xhr.send();

//
function* fibonacci() {
    var [a, b] = [0, 1];
    while (1) {
        yield b;
        [a, b] = [b, a + b];
    }

}

for (let n of fibonacci()) {
    if (n > 10) break;
    console.log(n);
}


function* g() {
    try {
        yield 1;
        yield 2;
    } catch (e) {
        console.log(e)
    }
    yield 3;
    yield 4;
}

var it = g();
it.next();
it.throw(new Error("throw error"));


function* iterator() {
    var keys = Reflect.ownKeys(this);
    for (var key of keys) {
        yield [key, this[key]];
    }
}

var x = {
    [Symbol.iterator]: iterator,
    x: 1,
    y: 2,
}

function* iteratorObj(obj) {
    var keys = Reflect.ownKeys(obj);
    for (var key of keys) {
        yield [key, obj[key]];
    }
}

var y = {
    x: 1,
    y: 2
}
for (var entries of iteratorObj(y)) {
    console.log(entries)
}

//

function co(gen) {
    var ctx = this;

    return new Promise(function (resolve, reject) {
        if (typeof gen === 'function') gen = gen.call(ctx);
        if (!gen || typeof gen.next !== 'function') return resolve(gen);

        onFulfilled();

        function onFulfilled(res) {
            var ret;
            try {
                ret = gen.next(res);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }
    });
}

function next(ret) {
    if (ret.done) return resolve(ret.value);
    var value = toPromise.call(ctx, ret.value);
    if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
    return onRejected(
        new TypeError(
            'You may only yield a function, promise, generator, array, or object, ' +
            'but the following object was passed: "' +
            String(ret.value) +
            '"'
        )
    );
}

// 基于Promise自动执行
function test(i){
    return i;
}
function createPromise(args){
    return new Promise((resolve,reject)=>{
        resolve(test.call(this,args));
    })
}


function* gen(){
    var x =yield createPromise(1);
    var y =yield createPromise(2);
    console.log(x,y);
}

function run(gen) {
    var g = gen();
    function next(data) {
        var result = g.next(data);
        console.log(result);
        if (!result.done) {
            result.value.then((data) => {
                next(data);
            })
        } else {
            return result.value;
        }
    }
    next();
}
run(gen);

//Trunk转换器
function Thunk(fun){
    return function(...args){
        return function(callback){
            return fun.call(this,...args,callback);
        }
    }
}

//Trunk自动执行器
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFileThunk('/etc/fstab');
  console.log(r1.toString());
  var r2 = yield readFileThunk('/etc/shells');
  console.log(r2.toString());
};

function run(gen){
    var g = gen();
    function next(data){
        var result = g.next(data);
        if(result.done) return;
        result.value(next)
    }
    next();
}

//Symbol
var x = Symbol('cat');
var y = {
    x : 1,
}

let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6




var myFun = new Set(); 
function observable(obj){
    var proxy = new Proxy(obj,{
        set(target,key,value,receiver){
            Reflect.set(target,key,value,receiver)
            myFun.forEach((fun)=>{
                fun();
            })
        }
    })
    return proxy;
}

function observe(fun){
    myFun.add(fun);
}

const person = observable({
    name: '张三',
    age: 20
  });
  
  function print() {
    console.log(`${person.name}, ${person.age}`)
  }
  
  observe(print);
  person.name = '李四';
  // 输出
  // 李四, 20


  var promise = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve(1);
    }, 1000);  
    

  })

  let task = Promise.resolve();
  task.then(()=>{
    return promise  
  }).then((data)=>{
    console.log(data)
  })


  async function f() {
    // 等同于
    // return 123;
    var x= await new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve(1)},1000);
       });
console.log(x);
  }
  
  f().then(v => console.log(v))

  async function test(){
      let i=0;
      for(i=0;i<3;i++){
          try{
            await new Promise((resolve,reject)=>{reject(1)});
            break;
          }catch{

          }
      }
      console.log(i);
  }

  function chainAnimationsPromise(elem, animations) {




    // 变量ret用来保存上一个动画的返回值
    let ret = null;
  
    // 新建一个空的Promise
    let p = Promise.resolve();
  
    // 使用then方法，添加所有动画
    for(let anim of animations) {
      p = p.then(function(val) {
        ret = val;
        return anim(elem);
      });
    }
  
    // 返回一个部署了错误捕捉机制的Promise
    return p.catch(function(e) {
      /* 忽略错误，继续执行 */
    }).then(function() {
      return ret;
    });
  
  }

  function logInOrder(urls) {
    // 远程读取所有URL
    const textPromises = urls.map(url => {
      return new Promise((resolve,reject)=>{
          setTimeout(()=>{resolve(url)},1000)
      }).then(response => response);
    });

    textPromises.reduce((sum,val)=>{
        return sum.then(()=>val).then((data)=>{console.log(data)});
    },Promise.resolve())
   
}

function animation(url){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve(url)},1000)
    }).then(response => response);
}

function chainAnimationsPromise(elem, animations) {
    var result;
    var count = 0;
    var p = Promise.resolve();
    for(let ani of animations){
        p = p.then(()=>ani(elem)).then(data=>{
            console.log(count+' '+data);
            count++;
            result = data;
        });
    }

    return p.catch(err=>{console.log(err)})
    .then(data=>{console.log(data)});
    
  
  }

  function* chainAnimationsPromise(elem, animations){
    var result;
    for(let ani of animations){
        try{
            result = yield ani(elem);
            console.log(result);
        }catch(err){
            console.log(err);
        }
        
    }
    return result;
  }

function run(fun){
    var gen = fun(1,[animation,animation]);

    function next(value){
        var result = gen.next(value);
        if(result.done){
           return result.value; 
        }
        result.value.then((data)=>{next(data)});
    }

    next();
}

run(chainAnimationsPromise);


async function chainAnimationsPromise(elem,animations){
    var result;
    for(let ani of animations){
        result = await ani(elem);
        console.log(result);
    }
}



async function logInOrder(urls) {
 var promises = urls.map(async (url)=>{
    let p =  await url(1);
   // console.log(p);
    return p(1);
   
 })

 for(let p of promises){
    // console.log(p);
     await p.then((data)=>{console.log(data)});
 }

}


async function fn(args) {
    // ...
    await f1();
    await f2();
  }
  
  // 等同于
fn();

function fn(args) {
    return spawn(function* () {
      // ...
      yield f1();
      yield f2();
    });
  }


function spawn(genF){
    return new Promise((resolve,reject)=>{
        var gen = genF();

        function run(val){
            var result = gen.next(val);
            if(result.done) return resolve(result.value);
            try{
                Promise.resolve(result.value).then((val)=>run(val)).catch((e)=>{
                throw(e);
            });
            }catch(e){
                reject(e);
            }   
        }
        run();
    }) 
}

function spawn(genF){
    return new Promise((resolve,reject)=>{
        var gen = genF();

        function run(nextFun){
            let next;
            try{
                next = nextFun();
            }catch(e){
                reject(e);
            }  
            if(next.done) return resolve(next.value);
            Promise.resolve(next.value).then((val)=>{
                return gen.next(val)
            },(e)=>{
                return gen.throw(e);
            })
        }
        run();
    }) 
}

function animation(url) {
    return function () {
        return new Promise((resolve, reject) => {
            return setTimeout(() => {
                resolve(url);
            }, 1000);
        })
    }

}

async function logInOrder(urls) {
    const promises = urls.map(async (url) => {
        const response =await new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve(animation(url));
            }, 1000);
            
        })
        return response();
    })
    console.log(promises);
    for (let pro of promises) {
        await pro.then((v)=>{console.log(v)});
    }
}

function asyncFun(i){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(i);
        },i*1000)
    })
}

async function* asyncGenerator(){
    console.log('start');
    let i=3;
    while(i>0){
        const result =await asyncFun(i);
        console.log('wait end');
        yield result;
    i--;
    }
    
}


var x = {
    name :'x',
    runFun(fun){
        console.log(this);
        fun();
    }
}

x.runFun(function(){console.log(this)});


function topThreeWords(text) {
    var text = text.toLowerCase();
    var words = {};
    var matchWords = text.match(/\w+[-']+\w+/g);
    var splitWords = matchWords?[...matchWords]:[];
   // splitWords = splitWords.filter(a=>!a.match(/[-']+/g));
    var setWord = Array.from(new Set(splitWords));
    if (!setWord.length) return [];
    for (let word of splitWords) {
        if (!(word in words)) {
            words[word] = 1;
        } else {
            words[word]++;
        }
    }

    
    var length = setWord.length > 4 ? 3 : setWord.length;
    return setWord.sort((a, b) => {
        return words[b] - words[a];
    }).slice(0, length)

}
topThreeWords("  '  ")


class myArray extends Array{
    constructor(){
        super();
        this.history = [[]];
    }
    commit(){
        this.history.push(this.slice());
    }
    revert(){
        this.splice(0,this.length,...this.history[this.history.length-1])
    }
}

    var tags = {
      one:1,
      two:2,
      three:3,
      four:4,
      five:5,
      six:6,
      seven:7,
      eight:8,
      nine:9,
      ten:10,
      eleven:11,
      twelve:12,
      thirteen:13,
      fourteen:14,
      fifteen:15,
      sixteen:16,
      seventeen:17,
      eighteen:18,
      nineteen:19,
      twenty:20,
      thirty:30,
      fourty:40,
      fifty:50,
      sixty:60,
      seventy:70,
      eighty:80,
      ninty:90,
      hundred:100,
      thousand:1000,
      million:1000000,
    }
    var addNum = ['thousand','hundred','and']
function parseInt(string) {
    // TODO: it's your task now

    
    var nums = string.split(/[ ]/);
    return getNum(nums,0);

  }

  function getNum(arr,tag){
    if(arr.length === 1) return arr.indexOf('-')?
     arr[0].split('-').reverse((a,b)=>tags[a]+tags[b]): 
     tags[arr[0]]
    var index = arr.indexOf(addNum[tag]);
    var left = arr.slice(0,index+1);
    var right = arr.slice(index+1);

    if(left.length){
        left_num = getNum(left,tag+1);
    }
    if(right.length){
        right_num = getNum(right,tag+1);
    }
    
    return left_num*tags[addNum[tag]] + right_num;
  }