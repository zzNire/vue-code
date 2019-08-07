## 原型链
### 对象
* 属性
    * 数值属性
        * value
    * 访问器属性 （没有数值 在调用时用来改变数值属性的值）
        * set get 读取和写入数据时调用的函数
    * definePropety(对象名，属性名，{描述符：值})
    * definePropeties(对象名，{ { }})
    * getOwnPropertyDescriptor(对象，属性名)
* hasOwnProperty
* for-in 无论是原型还是实例中的属性都可以遍历到


### 创建对象
[例子Person](./people.js)
* 工厂模式

* 构造函数模式
    * 创建一个新对象
    * 构造函数的作用域（this）指向了新对象
    * 对象的construcor指向Person（构造函数）
    * 对象的_proto_ 指向Person.prototype
    * 执行构造函数
    * 返回新对象

* 原型模式
    * 可以让所有对象共享方法和属性

* 组合使用构造函数和原型模式
    * 构造函数 创建 实例属性
    * 原型模式 创建 共享属性  

* Object.create(原型对象，添加的属性（属性描述对象）);
    * 添加的属性,如果不显式声明，默认是不可遍历的
    * 传入的原型对象，作为新生成对象的原型
    * 通过一个已存在的对象创建另一个相似对象，不用写构造函数
    * Object.create()
    * 引用属性会被共享

```js
const obj = Object.create({}, {
    p:{
        value: 42,
        enumerable: true
    }
});
Object.values(obj)
```

### 原型 构造函数 实例 

* 原型对象(prototype)
    * 一个简单的对象，可以理解为类。用于实现对象的 属性继承。可以简单的理解成对象的爹。在 Firefox 和 Chrome 中，每个JavaScript对象中都包含一个__proto__ (非标准)的属性指向它爹(该对象的原型)，可obj.__proto__进行访问。
    * 一个函数的prototype = 函数.prototype
    * 对象.prototype.isPrototyprOf(实例) 来判断是否是实例的原型 即 实例._proto_ = 对象.protptype
    * Oblect.getPrototypeOf(实例)
* 构造函数: 可以通过new来 新建一个对象 的函数。
* 实例: 通过构造函数和new创建出来的对象，便是实例。 实例通过__proto__指向原型，通过constructor指向构造函数。



* 实例.__proto__ === 原型

* 原型.constructor === 构造函数

* 构造函数.prototype === 原型

### [继承](https://github.com/mqyqingfeng/Blog/issues/16)

#### 原型链  不用
a的实例原型都指向同一个b实例，
* 如果a的实例中没有的属性会在b的实例中寻找
* a的实例通过新建属性来覆盖b的实例中的同名属性
* 操作a实例中不存在的引用类型时会指向同一个b实例中的该引用类型

存在问题
* 原型中的引用类型会被共享
* 不能再创建子类时给父类传参

对象a.prototype = new 对象b   a继承b

A instanceof B  a是b的实例吗

A.prototype.isPrototypeOf(B)  a是b的原型吗


#### 借用构造函数 不用
* 每个对象都有自己的属性 不共享 
* 并没有改变原型链，只是调用了超类中的语句


问题
* 重复生成方法和属性 
* 因为没有改变原型链，所以也无法访问父类原型上的方法

#### 组合继承  **最常用**
    * 原型链 继承 原型属性和方法
    * 使用构造函数继承 实例属性

#### Object.create()
* 第一个参数是实例,**不能包含Symbol属性**
* 第二个参数是属性描述,与defineProperties的第二个参数相同
* 生成的实例 `__proto__` 指向第一个参数指定的对象
```js
{
    sex:{
        value:'boy'
    }
}
```

#### 原型式继承  ES5 Object.create 
通过一个已存在的实例，来快速生成差不多的实例,

共享引用类型

将传入的对象作为创建的对象的原型。
```js
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
```
#### 寄生式继承 Object.create()
通过一个已存在的实例，来快速生成差不多的实例，并添加方法和属性
```js
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
```
跟借用构造函数模式一样，每次创建对象都会创建一遍方法。


#### 组合寄生继承  这是最成熟的方法，也是现在库实现的方法
不使用 Child.prototype = new Parent() ，而是间接的让 Child.prototype 访问到 Parent.prototype 

将组合模式的`Son.prototype = new Father();`改为
```js
var prototype = Object.create(Father.prototype);
prototype.constructor = Son;
Son.prototype = prototype;
```

例子
```js
function inheritPrototype(subType, superType){
  var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType;                    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  subType.prototype = prototype;                      // 指定对象，将新创建的对象赋值给子类的原型
}

// 父类初始化实例属性和原型属性
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age){
  SuperType.call(this, name);  // <- 继承 私有属性
  this.age = age;
}

// 将父类原型指向子类
inheritPrototype(SubType, SuperType);

// 新增子类原型属性
SubType.prototype.sayAge = function(){
  alert(this.age);
}

var instance1 = new SubType("xyc", 23);
var instance2 = new SubType("lxy", 23);

instance1.colors.push("2"); // ["red", "blue", "green", "2"]
instance1.colors.push("3"); // ["red", "blue", "green", "3"]

```
* 通过`SuperType.call(this, name);`这种方式，每个子类实例里都生成了 colors数组，所以每个子类实例操作colors数组时，指向的不是同一个变量。
* `var prototype = Object.create(superType.prototype); subType.prototype = prototype; ` 避免了在SubType.prototype 上创建不必要的、多余的属性。如果使用`subType.prototype = new superType()` 那么生成的子类实例的原型上多出 `new superType()` 时生成的属性





* 相比于组合模式，减少父类的调用次数
#### class A extends B
 
* 圣杯模式 感觉和寄生组合一个原理
通过圣杯模式可以把一个家族中的各个对象的干扰给截断，以使每个对象在对父类有继承的情况下相互独立，以免各个对象在试图修改自身(特别是自身原型)的属性时影响到其他对象。
* 访问部分父类的属性，只能是原型里的属性
* 子类修改原型，不影响父类

主要看例子里的。
```js
Father.prototype.lastname = 'C';
Father.prototype.fortune = 1000000;
function Father () {
    this.age = 48;
    this.test = true;
}
function Son () {
    this.age = 18;
    this.waste = function () {
        return this.fortune - 50000;
    }
}
var inherit = (function () { //创建圣杯inherit函数
/* 使用立即函数的原因：函数执行前会进行预编译，预编译过程都会产生AO，
如当前案例所示，案例中的立即执行函数(注：以下简称立函)执行前预编译的AO中有buffer函数，
由于当立函执行完毕时会返回一个匿名函数(注：以下简称匿函)，这个匿函调用了buffer函数，
最终匿函也被赋予到了inherit函数中，导致立函执行前预编译产生的AO在立函执行完毕后并不会销毁，
于是buffer函数成为了一个闭包并被一同赋予到了inherit函数中去了，
这样当在外部使用inherit函数时，将会一直都在使用一个buffer函数，
而不用每次使用时都再新建一个buffer函数 */
function buffer () {} //buffer函数是一个闭包，仅用做一个缓冲而不做他用
return function (targetSon, originFather) { //让目标儿子继承源头父亲
    
    buffer.prototype = originFather.prototype; 
    //targetSon.prototype = buffer.prototype; 
   /* 不能这么写，因为这样写就相当于使对象targetSon、
      fatherOrigin和buffer共享原型了 */
    targetSon.prototype = new buffer(); /* 使对象targetSon试图修改自身属性时
                                           仅仅是以buffer函数作为对象进行修改，
                                           而不会影响到其他对象 */
    targetSon.prototype.constructor = targetSon; //令目标儿子记得自己本质是谁
    targetSon.prototype.gene = originFather; //令目标儿子记得自己的生父是谁
    //gen只是用来记录父类
    }
    })()
inherit(Son, Father); //调用圣杯inherit函数
Son.prototype.lastname = 'X';
var son = new Son();
var son2 = new Son();
var father = new Father();
console.log(son.lastname); //控制台显示x，败家儿子成功认贼作父
console.log(father.lastname); /* 控制台显示c，父亲自己的姓并没有因为败家儿子
                                 通过改姓来认贼作父的惨痛事实而改变 */
console.log(son.constructor); //控制台显示儿子自己的构造函数(本质)
console.log(son.gene); //控制台显示儿子自己的生父
```