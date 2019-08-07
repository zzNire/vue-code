function myinstanceof(left,right){
    while(left.__proto__){
        if(left.__proto__ === right.prototype){
            return true;
        }
        left = left.__proto__;
    }
    return false;
}

function people(name){
    this.name = name
}

function man(name){
    people.call(this,name);
    this.sex = 'man';
}

man.prototype = new people('nire');


var x  = new man('nire');
myinstanceof(x,people);


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

// 为了防止子对象修改原型上的属性而影响到父亲
function inherit(){
    var f(){};
    return function(father,son){
        f.prototype = father.prototype;
        son.prototype = new f();
        son.prototype.construcor = son;
        return f;

       // son.prototype = new father();
       // f.prototype = new father();

    }
}

function create(origin,descriptor){
    obj = new Object();
    Object.defineProperties(obj,descriptor);
    obj.__proto__ = origin;
    return obj;
}


function mynew (fun){
    return function(){
        var obj = new Object();
        obj.__proto__ = fun.prototype;
        var val = fun.apply(obj,[...arguments]);
        if(typeof val === 'object'){
            return val
        }
        return obj;
    }
    
}



