/*
装饰者(decorator)模式能够在不改变对象自身的基础上，
在程序运行期间给对像动态的添加职责（方法或属性）。
与继承相比，装饰者是一种更轻便灵活的做法。

许多面向对象的语言都有修饰器（Decorator）函数，用来修改类的行为。
*/
// es5实现装饰者模式
class Coffee1{
    constructor(){
        this.price = 5;
    }
    getPrice(){
        return this.price;
    }
}

class Coffee2{
    constructor(){
        this.price = 10;
    }
    getPrice(){
        return this.price;
    }
}

class Milk{
    constructor(){
        this.price = 7;
    }
    getPrice(){
        return this.price;
    }
}

class Mocha{
    constructor(){
        this.price = 15;
    }
    getPrice(){
        return this.price;
    }
}


var Decorator = function(water){
    this.water = water;
}
Decorator.prototype.getPrice = function(){
    return this.water.getPrice();
}


var buyCoffee = function(coffee,water){
    water.price = coffee.price + water.price;
    Decorator.call(this,water);
}

buyCoffee.prototype = new Decorator();

var water = new Mocha();
var decorator = new Decorator(water);
var myCoffee = new buyCoffee(new Coffee1(),water);
console.log(myCoffee.getPrice());


//ES7 decorator 实现

//@fly(true)
class Man{
    constructor(def = 2,atk = 3,hp = 3){
      this.init(def,atk,hp);
    }
    //@decorateArmour
    init(def,atk,hp){
      this.def = def; // 防御值
      this.atk = atk;  // 攻击力
      this.hp = hp;  // 血量
    }
    toString(){
      return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`;
    }
  }
  
  var tony = new Man();
  
  console.log(`当前状态 ===> ${tony}`); 

  
  Object.defineProperty(Man,'init',{

  })


  function decorateArmour(target,value,descriptor){
    let func = descriptor.value;
    let aromour = 100;
    let ret;
    descriptor.value = function(...args){
            args[0] += aromour;
            ret = func.call(target,...args);
            return ret;
    }
    return descriptor;
  }
  

function fly(canFly){
    return function(target){
        if(!canFly) return target;
        target.fly = function(){
            console.log('I can fly');
        }
        return target;
    }
}

//AOP
Function.prototype.before = function(func){
    var that = this;
    console.log(this);
    return function(...args){
        console.log(this);
        func.apply(this,args);
        that.apply(this,args);
    }
}


var car = {
    drive: function() {
        console.log('乞丐版');
    }
}

var autopilotDecorator = function() {
    console.log('启动自动驾驶模式');
}

car.drive.before(autopilotDecorator)();

//ES5 实现装饰者模式
class Man{
    constructor(def = 2,atk = 3,hp = 3){
      this.init(def,atk,hp);
    }
    init(def,atk,hp){
      this.def = def; // 防御值
      this.atk = atk;  // 攻击力
      this.hp = hp;  // 血量
    }
    toString(){
      return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`;
    }
  }

let Decorator = function(man){
    this.man = man;
}
Decorator.prototype.toString = function(){
    this.man.toString.call(this);
}


let DecorateArmour = function(man){
    Decorator.call(this,man)
}
DecorateArmour.prototype = new Decorator();
DecorateArmour.prototype.toString = function(){
    let armour = 100;
    this.man.def += armour;
    this.man.toString.apply(this);
}

let tony = new DecorateArmour(new Man());
console.log(tony.toString())


function Sale(price){
    this.price = price;
}
Sale.prototype.getPrice = function(){
    return this.price;
}
Sale.prototype.decorator = function(type){
    debugger;
    var fn = Sale.decorators[type];
    
    var proto = Object.create(this);
    function f(){};
    f.prototype = proto;
    var newobj = Object.assign(new f(),this);
    newobj.uber = this;
    newobj.price = fn.apply(newobj);
    return newobj;
}

Sale.decorators = {
    fedtax(){
        var price = this.uber.getPrice();
        price+=price*5/100;
        return price;
    },
    quebec(){
        var price = this.uber.getPrice();
        price+=price*7.5/100;
        return price;
    },
}

var sale = new Sale(100);
sale = sale.decorator('fedtax');
sale = sale.decorator('quebec');
sale.getPrice();


function Sale(price){
    this.price = price;
    this.decorate_list = {};
}
Sale.prototype.getPrice = function(){
    var price = this.price;
    var list = this.decorate_list.price;
    list.forEach(operator => {
        price = Sale.decorators[operator](price);
    });
    return price;
}
Sale.prototype.decorete = function(key,type){
    var list = this.decorate_list[key] = this.decorate_list[key] || [];
    list.push(type);
}
Sale.decorators = {
    fedtax(price){
        price+=price*5/100;
        return price;
    },
    quebec(price){
        price+=price*7.5/100;
        return price;
    },
}

var sale = new Sale(100);
sale.decorete('price','fedtax');
sale.decorete('price','quebec');
sale.getPrice();

var data = {
    name:'niren'
}

function validator(data){
    var keys = Object.keys(data);
    var result_info = '';
    for(var key of keys){
        if(validator.config[key]){
            var type = validator.config[key]
            var check = validator.types[type].validate(data[key]);
            if(!check){
                result_info+=validator.types[type].instructions;
            }
        }
    }
    return result_info.length?result_info:true;
}

validator.config = {
    name:'isNotEmpty'
}

validator.types = {
    isNotEmpty:{
        validate:function(value){
            return value!='';
        },
        instructions :'name can not be empty'   
        
    }
}

validator(data);