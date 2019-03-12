//工厂模式
function createPerson(name,age){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.sayName = function(){
        return "hi "+name;
    }
    return o;
}
var jack = createPerson("jack",16);
//构造函数模式
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayName = function(){
        return "hi "+name;
    }
}
var nire = new Person("nire",22);

//原型模式
var Man = function(){};
Man.prototype.sexule = "man";
Man.prototype.getGirl = function(){
    return null;
}

var nirean = new Man();

//原型模式 通过字面量
var Women = function(){};
Women.prototype = {
    construtor:Women,
    sexule:"women",
    getMan : function(){
        return null;
    }
};

//SubType.prototype 是 SuperType 的一个实例，在上面定义的方法不影响 SuperType.prototype
function SuperType(){
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
}

function SubType (){
    this.subproperty = false;
}

SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function(){
    return this.subproperty;
};

SubType.prototype.getSuperValue = function(){
    return false;
};

var instance = new SubType();
instance.getSubValue();

//借助构造函数

function SuperType (name){
    this.name = name ;
}

function SubType(){
    SuperType.call(this,"nire");
    this.age = 11;
}

var nire = new SubType();

//组合继承


//原型式继承
var Person = {
    name :"jack",
    friends:["a","b"]
}

var anotherperson = Object.create(Person,{
    name:{
        value :"nire"
    }
})
//寄生?????
function createPerson (SuperType){
    var clone = Object.create(SuperType);
    return clone;
}

//寄生组合?????
function createPerson(SubType,SuperType){
    var prototype = Object.create(SuperType.prototype);
    prototype.construtor = SubType;
    SubType.prototype = prototype;
}


//圣杯模式
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

//闭包

function setData(){
    var data = [];
    for(var i=0;i<3;i++){
        data[i] = (function(i){
            return function(){
                 console.log(i);
            }
        })(i);             
    }
    return data;
}
var data = setData();
data[1]();

var data = [];

for (var i = 0; i < 3; i++) {
  setTimeout((msg)=>{
    data[i] = function(){
        console.log(msg);
    }
  },0,i)
       
 
}

data[0]();
data[1]();
data[2]();

function showTime(){
    var date = 12;
   
    return {
        showDay :
             function(){
                console.log(date);
            }
        ,
        showTime : (function(){
                var myday = date;
                 console.log(myday);
            }
        )(),
        setData : function(){
             date++;
            console.log(date)}
    }
}

var day = showTime();
day.showDay();
day.setData(13);
day.showTime();


function callback() {
}

// 插入script标签并监听加载
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type= 'text/javascript';
script.onload = script.onreadystatechange = function() {
  if (!this.readyState || this.readyState === "loaded" 
                                || this.readyState === "complete" ) {
    callback();
    // Handle memory leak in IE
    script.onload = script.onreadystatechange = null;
  }
};
script.src= scriptSrc;
head.appendChild(script);


let obj = {
    a: 1,
    b: {
      c: 2,
    },
  }

function copyObj(obj){
    var copy = {};
    for(key in obj){
        if(typeof obj[key] === 'object'){
           copy[key] = copyObj(obj[key]);
        }
        else{
            copy[key] = obj[key];
        }
    }
    return copy;
}

var x = copyObj(obj);