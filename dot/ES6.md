### 变量的解构赋值
#### 数组的解构赋值
```js
let [a,b] = [1,2];
//默认值 只有在值为undefined时生效
let [a=2,b=1] = [1,undefined]
```

#### 对象的解构赋值
```js
//变量名必须和属性名对应才能取到值
var {foo,boo} = {foo:1,boo:"hello"};

//如果变量名和属性名不一致
var {foo:name,boo:str} = {foo:1,boo:"hello"};
name //1
str //"hello"

//定义默认值
var {x: y = 3} = {x: 5};

//在对一个已经声明的变量进行结构时，需要用大括号包住
let x;
({x} = {x: 1});
```

#### 字符串解构赋值
```js
// 字符串被当作数值处理，一个下标存放一个字母
let [a,b,c] = 'hello';
a // 'h'
b // 'e'
c // 'l'
```

#### 数值和布尔值解构赋值
* 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
```js
var {toString} = 123;
toString === Number.prototype.toString; //true
```
* 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
```js
var {toString} = undefined;
//Uncaught TypeError: Cannot destructure property `string` of 'undefined' or 'null'.
```

#### 函数参数的解构赋值
```js
function print([x,y]){
    console.log(x+" "+y);
}
print([1,2]);

//解构使用默认值
function print([x=0,y=0]){
    console.log(x+" "+y);
}
print([undefined,2]);

//参数为对象的情况 解构使用默认值
function print({x=0,y=0} = {}){ // = {} 避免没有参数的情况 默认参数为{}
    console.log(x+" "+y);
}
print({y:1});

//在没有输入参数时，参数的默认值为{ x: 0, y: 0 }，而不是解构的默认值
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

```

#### 应用

```js
//1. 交换两个数据
let a = 1,b=2;
[b,a] = [a,b];

//2. 返回对象，数组更好取值
function getData(){
    return {
        name:'zz',
        age:12,
    }
}

{name,age} = getData();

//3. 传参 更方便的将变量名 和一组参数对应
function printData({name,age})
{
    console.log(name+" "+age);
}
printData({name:'zz',age:12});

//4. 函数默认值
function print({x=0,y=0} = {}){ // = {} 避免没有参数的情况 默认参数为{}
    console.log(x+" "+y);
}
print({y:1});

//5.Map遍历
var map = new Map();
map.set(1,"1");
map.set(2,"2");
for(let [key,value] of map){
    console.log(key+" "+value);

}

//6. 加载模块时，往往需要指定输入哪些方法
var {getData,printData} = require("");
```
