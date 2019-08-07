## Set（集合）
类似于数组，里面没有重复的值。
> 用 `===`来判断，NaN 在Set中作为相同值

#### 初始化
`new Set(data)`

接受一个数组，类数组（任何具有Iterator接口的数据结构）

#### 属性和方法
实例属性
* size()
* construcor

实例方法
* add() 添加某个值，返回Set
* has() 返回Boolean
* delete() 返回Boolean
* clear() 没有返回值

#### 遍历操作 
* keys()
* values()
* entries()
* forEach()
* for...of


返回的都是遍历器对象,由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致

entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等。
```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
```
#### foeEach
Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。
```js
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
```

#### 扩展运算符
```js
let set = new Set(['red', 'green', 'blue']);
let arr = [...set];
// ['red', 'green', 'blue']
```

实现并集、交集和差集
```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

#### 同步改变原来的Set ????
如果想在遍历操作中，同步改变原来的 Set 结构
```js
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6
```
## WeakSet
WeakSet 的**成员只能是对象**，而不能是其他类型的值

WeakSet 中的对象都是**弱引用**，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

* add
* delete
* has

没有size属性，不能进行遍历操作

## Map
存储键值对，键可以为任何数据类型

#### 初始化
`new Map(data)` 同Set一样接受数组，类数组，一切有Iterator接口的数据结构。
```js
//要有key value对
let map = new Map([[0,1],[1,1]]);

```
>只有对同一个对象的引用，Map 结构才将其视为同一个键 (+0 === -0 NaN === NaN)

#### 属性和方法
* size

方法
* set(key,value) 返回 map对象
* get(key) 返回value || undefined
* has(key) 返回Boolean
* delete(key) 返回Boolean
* clear() 没有返回值

#### 遍历方法
* keys()
* values()
* entries() 
* forEach()   `(value,key)=>{...}`
* for ... of  `[key,value]`

返回的都是遍历器

```js
for (let [key, value] of map) {
  console.log(key, value);
}
```

#### 与其他数据结构的互相转换
1. Map转数组

```js
var arr = [...Map];
//结果
[[key,value],[key,value]]
```

2. 数组转Map
```js
var map = new Map(arr);
```

3. Map 转为对象
 
>如果所有 Map 的键都是字符串，它可以无损地转为对象。
如果有非字符串的键名，那么这个键名会被转成字符串，为对象的键名。(Object => [object object])

```js
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```

4. 对象转为 Map
```js
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}
```
5. Map 转为 JSON
>Map 的键名都是字符串，这时可以选择转为对象 JSON。
```js
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
```

>Map 的键名有非字符串，这时可以选择转为数组 JSON。
```js
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
```

6. JSON 转为 Map 
```js
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
```

## WeakMap
WeakMap只接受**对象作为键名**（null除外），不接受其他类型的值作为键名。

它的键名所引用的对象都是**弱引用**，即**垃圾回收机制**不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的**键名对象和所对应的键值对会自动消失**，不用手动删除引用。

* set()
* get()
* has()
* delete()

#### 应用
DOM 节点作为键名
```js
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, {timesClicked: 0});

myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
}, false);
```

部署私有属性

```js
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
```