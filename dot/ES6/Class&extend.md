#### 使用
子类必须在constructor方法中调用super方法

这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。

* ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
* ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

**只有调用super之后，才可以使用this关键字**




### super

super作为函数调用时，代表父类的构造函数

super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

在子类普通方法中通过super调用父类的方法时，方法内部的this指向**当前的子类实例**



```js
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2
```

```js
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A
new B() // B
```
super内部的this指的是B的实例，因此super()在这里相当于A.prototype.constructor.call(this)。

#### 箭头函数无 super
```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
  }
}
```

#### 原型链
同时存在两条继承链。

1. 子类的__proto__属性，表示构造函数的继承，总是指向父类。

2. 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。


```js
class A {
}

class B {
}
class B extends A
B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true


// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);

// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);

const b = new B();
```

```js
class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true

function x(){}
x.__proto__ === Function.prototype //true
```
A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Function.prototype

A调用后返回一个空对象（即Object实例），所以A.prototype.__proto__指向构造函数（Object）的prototype属性。

#### 原生构造函数的继承
ES5 是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。

ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。

## Mixin模式
多个对象合成一个新的对象，新对象具有各个组成成员的接口
```js
function mix(...mixins){
  class Mix{
    constructor(){
      for(let mix of mixins){
        copyProperties(this,new mix()); //拷贝实例属性
      }
    }
  }
  for(let mix of mixins){
    copyProperties(Mix,mix); // 拷贝静态属性
    copyProperties(Mix.prototype,mix.prototype); //拷贝原型属性
  }
  return Mix;
}

function copyProperties(target,source){
  for(let key of Reflect.ownKeys(source)){
    if(key!=='constructor' 
    && key!=='name'
    && key!=='prototype'){
      let desc = Object.getOwnPropertyDescriptor(source,key);
      Object.defineProperty(target,key,desc);
    }
  }
}
```

## 原理
#### class
```js
class a{
      constructor(y,z){
        this.y =y;
        this.z =z;
      }
      render(){
        console.log(1)
      }
    }
    
function () {
  function a(y, z) {
    _classCallCheck(this, a);//判断是否是通过new来调用a函数的

    this.y = y;
    this.z = z;
  }

  _createClass(a, [{
    key: "render",
    value: function render() {
      console.log(1);
    }
  }]);

  return a;
}();

function _createClass(Constructor, protoProps, staticProps) {
if (protoProps) _defineProperties(Constructor.prototype, protoProps); 
if (staticProps) 
_defineProperties(Constructor, staticProps); 
return Constructor; 
}
```
1. 实现构造函数 functiona(){}
    1. 判断a是否作为构造函数被调用
    2. this上生成实例属性
    3. return this
2. 在a的原型上部署方法，a上部署静态方法


#### extends 
```js
class a{
	b = 1;
}
    class b extends a{
      constructor(m,n){
        super();
        this.m=m;
        this.n=n;
      }
      
      render(){
        console.log(2);
      }
    }
var y = new b(2,3);
//b {b: 1, m: 2, n: 3}
//父类的属性也生成在了子类实例上，而不是子类实例的原型上
    
var b =
/*#__PURE__*/
function (_a) {
  _inherits(b, _a);

  function b(m, n) {
    var _this;

    _classCallCheck(this, b); 

    _this = _possibleConstructorReturn(this, _getPrototypeOf(b).call(this)); //用来执行父类构造函数，并返回父类实例对象
    _this.m = m;
    _this.n = n;
    return _this;
  }

  _createClass(b, [{
    key: "render",
    value: function render() {
      console.log(2);
    }
  }]);

  return b;
}(a);


```

1. 通过原型链来实现a,b之间的继承关系

```js
    b.prototype = Object.create(a.prototype,{constructor:{
        value: b,
        writable: true, 
        configurable: true
    }})
    
    b.__proto__ = a
    
//实现了
b.prototype.__proto__ === a.prototype;
b.__proto__ === a;
```
2.  在b的原型上部署方法，b上部署静态方法
3.  执行构造函数 function b(){}

判断b是否作为构造函数被调用

传入b的实例到a的构造函数(如果父类的构造函数返回对象或方法，则返回父类构造函数返回的对象或方法，不然就返回子类实例)
* _this 上生成实例属性
* return _this

```js
  function b(m, n) {
    var _this;

    _classCallCheck(this, b);

    _this = 
    _possibleConstructorReturn(this, _getPrototypeOf(b).call(this));
    _this.m = m;
    _this.n = n;
    return _this;
  }
```

所以说如果不先调用父类的super，那么就不会返回父类实例，来让子类实例进行加工，也不会返回子类实例，


