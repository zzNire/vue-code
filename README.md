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
* object -> 对象或null

### Number
* Infinity
* NaN 
  * NaN不等于任何数 包括自身
  * parseInt(" ",10);
  * parseFloat(" ") ;

### String 
* num.toString(10);
* String(num);
* slice() substr() substring()  start end 截取
* concat() 
* charAt() charCodeAt()
* indexOf() lastIndexOf()
* search() 第一次出现位置 replace() match() 返回数组
* split()

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

### 区分String对象 string基本数据类型


### for if 语句中声明的变量会添加到当前的执行环境中 注意区分函数

### Array
* isArray() toString() valueOf() join()
* push() pop() shift() unshift()
* reverse() 转置 sort()  return<0 a在前
* concat() 连接 slice() 起始 和 结束位置 不包括结束位置 splice()  删除起始位置 长度 替换  
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