
/*
https://juejin.im/post/59af8fbd5188252f8c2a103a#heading-7

## 简单工厂模式 ##

简单工厂模式:又称为静态工厂方法模式，它属于类创建型模式。

在简单工厂模式中，可以根据参数的不同返回不同类的实例。

由工厂对象决定创建某一种产品对象类的实例。

1. 创建相似的对象
2. 当实例类型不确定时，提供一个统一的接口供用户去创建对象

*/
class User{
    constructor(opt){
        this.name = opt.name;
        this.viewPage = opt.viewPage
    }
}

function createUser(role){
    switch(role){
        case 'superAdmin':
            return new User({ name: '超级管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理'] });
            break;
        case 'admin':
            return new User({ name: '管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据'] });
            break;
        case 'user':
            return new User({ name: '普通用户', viewPage: ['首页', '通讯录', '发现页'] });
            break;
        default:
            throw new Error('参数错误, 可选参数:superAdmin、admin、user')

    }
}

var user = createUser('user');

/*
## 工厂方法模式 ##
又称为工厂模式，也叫虚拟构造器模式或者多态工厂模式
它属于类创建型模式。
在工厂方法模式中，工厂父类负责定义创建产品对
象的公共接口，而工厂子类则负责生成具体的产品对象，
这样做的目的是将产品类的实例化操作延迟到工厂子类中完成，
即通过工厂子类来确定究竟应该实例化哪一个具体产品类
*/

// 定义工厂
class User1{
    createUser(){  //接口
        throw new Error('抽象类不能实例化!');
    }
}

//工厂子类 
class SuperAdmin extends User1{
    createUser(){ //实现接口
        return new User({name:'超级管理员',viewPage:['首页', '通讯录', '发现页', '应用数据', '权限管理']});
    }
}

class Admin extends User1{
    createUser(){
        return new User({ name: '管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据'] });
    }
}

class OrdinaryUser extends User1{
    createUser(){
        return new User({ name: '普通用户', viewPage: ['首页', '通讯录', '发现页'] });
    }
}


var user_factory = new OrdinaryUser();
var user = user_factory.createUser();

class Ball{
    constructor(name){
        this.name = name;
    }
    sayBall(){
        throw new Error('抽象类不能实例化!');
    }
}

class BasketBall extends Ball{
    constructor(name){
        super(name)
    }
    sayBall(){
        console.log('我在打'+ this.name);
    }
}

class FootBall extends Ball{
    constructor(name){
        super(name)
    }
    sayBall(){
        console.log('我在踢'+ this.name);
    }
}

var basketBall = new BasketBall('篮球');
basketBall.sayBall();


/* ## 工厂方法模式 ##

抽象工厂模式:通过对类的工厂抽象使其业务用于对产品类簇的创建,

而不是负责创建某一类产品的实例,属于对象创建型模式。

这句话比较简单的理解方式就是:如果一个工厂只需要生产一个类型的

产品比如说电视机,那么用工厂方法模式是比较合理的,

如果这个工厂又需要成产电视机,又需要生产冰箱之类的,

那么这时候用工厂抽象模式就是最合适的。

*/

// 安全模式创建工厂类
var Ball = function (type,name) {  //父类提供接口
    /**
     * 安全模式 Ball也可以运行处new Ball的效果
     */
    if(this instanceof Ball) {
        var s = new this[type](name);
        return s;
    }else {
        return new Ball(type,name);
    }
}
// 工厂原型中设置创建所有类型数据对象的基类
Ball.prototype = {
    basketBall: function(name) { //子类提供实例化
        this.play = function() {
            console.log('我在打'+name);
        }
    },
    footBall: function(name) {
        this.play = function() {
            console.log('我在踢'+name);
        }
    },
    badmintonBall: function(name) {
        this.play = function() {
            console.log('我在打'+name);
        }
    },
    // ....
}
var football = new Ball('footBall','足球');
football.play();
var basketball = new Ball('basketBall','篮球');
basketball.play();
var badmintonball = new Ball('badmintonBall','羽毛球');
badmintonball.play();

// # 工厂方法模式end

//# 抽象工厂模式

class Sport{
}

class Ball extends Sport{
    constructor(type){
        super();
        this.type = type
    }
    getBall(name){
        if(name === '篮球'){
            return new BasketBall(type,name);
        }
    }
}

class BasketBall extends Ball{
    constructor(type,name){
        super(type);
        this.name = name;
    }
    play() {
        console.log('我在打' + this.name);
    }
}

class Speed extends Sport{
    constructor(type){
        super();
        this.type = type;
    }
    play(){
        throw new Error('抽象类不能实例化!');
    }
}

class Running extends Speed{
    constructor(name){
        super();
        this.name = name;
    }
    play() {
        console.log('我在' + this.name);
    }
}

var sportFactory = function(type){
    switch(type){
        case 'Ball':
            return new Ball('Ball')
            break;
        case 'Speed':
            return new Speed('Speed');
            break;
    }
}

var ball = sportFactory('Ball');
var basketBall = ball.getBall('篮球');

// 
class Sport{
    constructor(type,name){
        this.type = type;
        this.name = name;
    }
}

class Ball extends Sport{
    constructor(name){
        super('Ball',name);
    }
    play(){
        throw new Error('抽象类不能实例化!');
    }
}

class BasketBall extends Ball{
    constructor(name){
        super(name);
    }
    play() {
        console.log('我在打' + this.name);
    }
}

class Speed extends Sport{
    constructor(name){
        super('Speed',name);
    }
    play(){
        throw new Error('抽象类不能实例化!');
    }
}

class Running extends Speed{
    constructor(name){
        super(name);
    }
    play() {
        console.log('我在' + this.name);
    }
}

var basketBall = new BasketBall('篮球');
var running = new Running('跑步');



function CarMaker(){
    
}
CarMaker.prototype.cardrive = function(){
    console.log(`Vroom,I have ${this.door_num} doors`);
}

CarMaker.factory = function(type){
    if(!CarMaker[type].prototype.drive){
        CarMaker[type].prototype = new CarMaker();
    }
    return new CarMaker[type]();
    
}

CarMaker.Compact = function(){
    this.door_num = 4;
}

var corolla = CarMaker.factory('Compact');


function generator(data){
    var length = data.length;
    var index = 0;
    return {
        next(){
            var result
            if(index < length){
                result = data[index];
            }
            else{
                result = 'done';
            }
            index++;
            return result;
        },
        rewind(){
            index = 0;
        },
        current(){
            return data[index];
        }
    }
}

var gen = generator([1,2,3,4,,5,6]);
