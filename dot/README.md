# vue-code

# path.resolve
```
var path = require("path")     //引入node的path模块

path.resolve('/foo/bar', './baz')   // returns '/foo/bar/baz'
path.resolve('/foo/bar', 'baz')   // returns '/foo/bar/baz'
path.resolve('/foo/bar', '/baz')   // returns '/baz'
path.resolve('/foo/bar', '../baz')   // returns '/foo/baz'
path.resolve('home','/foo/bar', '../baz')   // returns '/foo/baz'
path.resolve('home','./foo/bar', '../baz')   // returns '/home/foo/baz'
path.resolve('home','foo/bar', '../baz')   // returns '/home/foo/baz'

在scripts/config
```
在scripts/config.js中 reslove用来将两个路径连接得到绝对路径
``` 
const resolve = p => {
  const base = p.split('/')[0] // ../src/platforms/web
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
        ../src/platforms/web/entry-runtime.js
  } else {
    return path.resolve(__dirname, '../', p)
  }
}

 'web-runtime-cjs': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.js'),
    format: 'cjs',
    banner
  },


```

# require import export
## require
加载模块 CommonJs
### 模块
```
var module = (function() {
var _count = 0;
var m1 = function() {
alert(_count)
}
var m2 = function() {
alert(_count + 1)
}
 
return {
m1: m1,
m2: m2
}
})()
```
在导出的文件中定义
* module.exports
* exports.命名 = 命名

## export 
ES6
通过export输出文件内部变量、函数、类
例如：
```
//输出单个变量
var name = nirean;
export {name}

//输出一组变量
var name = nirean;
bar age = 22;
function getHabby(){

};
export {name , age, geyHabby};

//as 重命名
export {name as myname};

```
### export default
直接抛出接口，在import时再指定名字
```
// 
export default function (){

}

import geName from '...'

//import时不需要大括号了
var getName = function (){

}

export default getName;

import getName from '...';
```

### 还可以用（*）指定一个对象，所有的变量都会加载在这个对象上
```
// circle.js。输出两个函数

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

## import 
加载export对外接口
```
import {myname , getHabby} from '...';;
```
----------------------------------------------------
----------------------------------------------------

### 数据类型
* 简单类型：undefined null boolean number string 
* 复杂类型：object

### typeof
* undefined
* boolean 
* number 
* string 
* object -> 对象或null **null表示一个空指针对象**

### Number
* Infinity 
  * isInfinity(num)
* NaN 
  * **NaN不等于任何数,包括自身**
  * isNaN(num) 会进行隐式转换 ToNumber
* 数值转换 
  * Number()
  * parseInt(" ",10);
    * 如果第一个字符不是数值或是-，返回NaN
    * "" -> NaN,不同于Number()
    * 会解析开头的数字，忽略后面的其他符号，

  * parseFloat(" ") ; 只解析十进制
  * 转换规则 同 ToNumber
    * undefined ->  NaN
    * null ->       0
    * '123' ->      123
    * 'd12' ->      NaN
    * boolean ->    0|1
    * '' ->         0
* 精度 四舍五入 **返回字符串**
  * toFixed() 小数点后面的位数
  * toPrecision() 第一个不为0的开始，相当于科学记数法


### String 
* num.toString(10);
* String(num); null，undefined 没有toStirng方法
* slice(start,end) substring(start,end)  substr(start,length)  截取
* concat()  返回新字符串 不改变原字符串 
* charAt() charCodeAt()
* indexOf() lastIndexOf()
* search() 第一次出现位置 replace() match() 返回数组
* split()

### Boolean
| type | true | false |
| --- | --- | --- |
| Number | 任何大于0的数 | 0和NaN |
| String | 任何非空字符串 | "" |
| Object | 任何对象，包括{},[] | null |
| undefined | - | undefined |


### 布尔操作符

#### 且 &&
* 第一个是对象，返回第二个操作数
* 第二个是对象，
  * 当第一个为true，返回第二个
  * 否则，返回第一个操作数
* 两个都是对象，返回第二个
* 有一个是null，undefined，NaN，直接返回该值

#### 或 ||
* 第一个是对象，返回第一个
* 第一个是false，返回第二个
* 两个都是对象，返回第一个
* 都是null，undefined，NaN，直接返回该值

### 乘法
* NaN * 任意 = NaN
* Infinity * 非0 = Infinity | -Infinity
* Infinity * 0 = NaN
* Infinity * Infinity = Infinity
* 不是数值，则Number()

### 除法
* 含有NaN = NaN
* 0 / 0 = NaN
* 非0 / 0 = Infinity
* Infinity / Infinity = NaN
* Infinity / 非0 = Infinity | -Infinity
* 任意 /Infinity = 0

### 加法
* Infinity + Infinity = Infinity
* -Infinity + -Infinity = -Infinity
* Infinity + -Infinity = NaN
* +0 + +0 = +0
* -0 + -0 = -0
* +0 + -0 = +0
* 数字 + undefine = 数字
* 数字 + null = 数字
* 数字 + 其他 = 字符串

### 减法
* Infinity - Infinity = NaN
* -Infinity - -Infinity = NaN
* Infinity - -Infinity = Infinity
* -Infinity - Infinity = -Infinity
* +0 - +0 = +0
* -0 - -0 = +0
* +0 - -0 = -0
* -0 - +0 = -0

### 逗号操作符
* 声明多个变量
* 赋值
  * 返回表达式的最后一项
```js
x = (1,2,3,4,5);
x // 5
```

### delete 
删除对象的某个属性
* 如果属性不存在，返回true，但不产生任何影响
* 只能删除当前对象的属性，原型链上的不能删除
* let const 以及全局属性(var声明的) 不能删除
* 不可设置的属性不能被删除（configurable:false）
```js
Object.defineProperty(obj,'name',{
    configurable:false
})

delete obj.name //false
```


###关系运算
* 字符串比较看第一个字符编码值，相同再比较下一位
* 其他都转成数值或字符串进行比较

### Object
* constructor  返回构造函数 创建当前对象的函数
* hasOwnProperty() 自己是否有某个属性
* isPrototypeOf() 是否是该对象的原型
* propertyIsEnumerable() 该属性能否用for-in枚举 一定是自身属性且可枚举

### function 参数
* 实际传递参数和声明的参数数量不需要一样
* arguments 可以获得传递的参数数组
  * length 参数数量
  * arguments[0] 调用参数
  * 修改arguments 会同时修改传递的参数
  * arguments只是和数组类似，并不是真正的数组
  > 转化为数组 
  
  ```
  Array.prototype.slice.call(arguments);
  ```

### 区分String对象 string基本数据类型
* concat  返回新数组
* split
* slice(起始，结束) sunstr(起始，个数) substring(起始，结束)
* charAt charCodeAt ascll码
* indexOf lastIndexOf
* trim 去除字符串中的**首尾**空格和换行
* toUpperCase toLowerCase toLocalLowerCase toLocalUpperCase
* search(/regexp/) 返回字符串第一个匹配的索引 
* match(/regexp/) 返回数组  第一个为整个模式匹配的字符串 后面为捕获组匹配的字符串
* replace(/regexp/g(全部替换)或字符串($1),字符串或函数(匹配项，匹配的位置，原字符串，通过return来表示要替换成的字符串))
* localCompare 比较字符
* fromCharCode ascll码

### for if 语句中声明的变量会添加到当前的执行环境中 注意区分函数

### Array
* isArray() toString() valueOf() join()
* push() pop() shift() unshift() //返回字符串长度，修改原数组 参数为参数序列
  * `x.push(1,2,3,[1,2,3])  // [1,2,3,[1,2,3]]`
* reverse() 转置 sort()  return<0 a在前
* 数组操作 
  * concat()  连接数字或数组 ，**返回新数组，不修改原数组** (参数可以是参数序列，也可以是数组)
    * `a.concat(1,2,3,[1,2,3]) // [1,2,3,1,2,3]`
  * slice() 起始 和 结束位置 不包括结束位置  **返回新数组,不修改原数组**
  * splice()  删除起始位置 长度 替换的**参数列表**  **修改原数组，返回被删除部分的数组**
* indexOf() lasetIndexOf()`
* 迭代方法
  * every()  全为true 返回true 
  * some() 任一为true 返回true  
  * forEach() 没有返回值
  * filter() 所有ture 组成数组 
  * map() 返回数组  **返回新数组**
* reduce() reduceRight() （递归函数，初始值）
  * 指定了初始值，则从第一个位置开始递归
  * 没有初始值，第一个位置作为初始值，从第二个位置开始递归

###RegExp
/ /.exec(str)  同 String.match()
  * 返回第一个匹配项信息的数组
    * matches[0] 整个模式 matches[1] 捕获组匹配的信息  
  * / /g 多次执行 才会往下匹配 
    * lastindex标志下一次开始的地方
    * index 标志匹配的字符串开始的地方
/ /.test(str)
  * 匹配则返回true

* RegExp.$1 根据正则表达式走后一次执行的操作而变化


* ^ $ 开头 结尾
* \+ \* ?
* ? 如果紧跟在任何量词 *、 +、? 或 {} 的后面，将会使量词变为**非贪婪**的（匹配尽量少的字符），和缺省使用的贪婪模式（匹配尽可能多的字符）正好相反。
* [xyz] x或y或z
* [^xyz] 不是x且不是y且不是z
* {n,m} n~m
* {n} 出现n次

* g 全局匹配
* i 不区分大小写

* \s 空白字符
* \w 单词字符
* \d 数字字符
* \n \t 

### Date


### Function
* 函数内部属性
  * arguments.callee 指向拥有该arguments的函数
  * this 引用的是函数执行的环境对象
  * caller 当前函数的函数的引用
* 函数属性和方法
  * length 参数个数
  * prototype  ----------------见后续
  * apply(obj,数组/类数组),call(obj,参数列表)
  * bind(obj，参数列表) 会创建函数实例