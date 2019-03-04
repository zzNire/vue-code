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
### 模块 (闭包？)
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
* reserve() sort()
* concat() slice() splice() 
* indexOf() lasetIndexOf()
* every() some() forEach() filter() map() 
* reduce() reduceRight()

### Date
