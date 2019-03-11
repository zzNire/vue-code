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
    * 通过一个已存在的对象创建另一个相似对象，不用写构造函数
    * Object.create()
    * 引用属性会被共享

* 寄生式继承

* 圣杯模式
通过圣杯模式可以把一个家族中的各个对象的干扰给截断，以使每个对象在对父类有继承的情况下相互独立，以免各个对象在试图修改自身(特别是自身原型)的属性时影响到其他对象。

主要看例子里的。
