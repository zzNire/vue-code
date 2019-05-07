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