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

* Object.create(对象);
    * 通过一个已存在的对象创建另一个相似对象，不用写构造函数
    * Object.create()
    * 引用属性会被共享

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

### 继承

* 原型链


对象a.prototype = new 对象b   a继承b

A instanceof B  a是b的实例吗

A.prototype.isPrototypeOf(B)  a是b的原型吗


* 借用构造函数
    并没有改变原型链，只是调用了超类中的语句

* 组合继承
    * 原型链 继承 原型属性和方法
    * 使用构造函数继承 实例属性

* 原型式继承
    

* 寄生式继承

* class A extends B
 
* 圣杯模式
通过圣杯模式可以把一个家族中的各个对象的干扰给截断，以使每个对象在对父类有继承的情况下相互独立，以免各个对象在试图修改自身(特别是自身原型)的属性时影响到其他对象。

主要看例子里的。
```js
Father.prototype.lastname = 'C';
Father.prototype.fortune = 1000000;
function Father () {
    this.age = 48;
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
var father = new Father();
console.log(son.lastname); //控制台显示x，败家儿子成功认贼作父
console.log(father.lastname); /* 控制台显示c，父亲自己的姓并没有因为败家儿子
                                 通过改姓来认贼作父的惨痛事实而改变 */
console.log(son.constructor); //控制台显示儿子自己的构造函数(本质)
console.log(son.gene); //控制台显示儿子自己的生父
```