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


### String 
* num.toString(10);
* String(num); null，undefined 没有toStirng方法
* slice() substr() substring()  start end 截取
* concat() 
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
| undefined | | undefined |


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


### for if 语句中声明的变量会添加到当前的执行环境中 注意区分函数

### Array
* isArray() toString() valueOf() join()
* push() pop() shift() unshift()
* reverse() 转置 sort()  return<0 a在前
* 数组操作 
  * concat()  连接数字或数组 ，**返回新数组**
  * slice() 起始 和 结束位置 不包括结束位置  **返回新数组**
  * splice()  删除起始位置 长度 替换  **修改原数组，返回被删除部分的数组**
* indexOf() lasetIndexOf()
* every()  全为true 返回true some() 任一为true 返回true  forEach() filter() 所有ture 组成数组 map() 返回数组
* reduce() reduceRight()

###RegExp
/ /.exex(str) 
  * 返回第一个匹配项信息的数组
    * matches[0] 整个模式 matches[1] 捕获组匹配的信息  
  * / /g 多次执行 才会往下匹配
/ /.test(str)
  * 匹配则返回true

* RegExp.$1 根据正则表达式走后一次执行的操作而变化
### Date


### Function
* 函数内部属性
  * arguments.callee 指向拥有该arguments的函数
  * this 引用的是函数执行的环境对象
  * caller 当前函数的函数的引用
* 函数属性和方法
  * length 参数个数
  * prototype  ----------------见后续
  * apply(),call()
  * bind() 会创建函数实例