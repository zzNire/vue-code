//判断类型
var typeclass = {};
"Array,Boolean,String,Date,Object,RegExp".split(",").forEach((e) => {
    typeclass['[object ' + e + ']'] = e.toLocaleLowerCase();
})

function getType(obj) {
    if (obj === null) return String(obj);
    if (obj instanceof Object) return typeclass[Object.prototype.toString.call(obj)];
    return typeof obj;
}


function myConstructor() {
    console.log("arguments.length: " + arguments.length);
    console.log(arguments);
    this.prop1 = "val1";
    this.prop2 = "val2";
};

var myArguments = ["hi", "how", "are", "you", "mr", null];
var myConstructorWithArguments = applyAndNew(myConstructor, myArguments);

console.log(myConstructorWithArguments);

function applyAndNew(constructor, arr) {
    var obj = new Object();
    // Object.setPrototypeOf(obj,constructor.prototype) ;
    obj.__proto__ = constructor.prototype;
    constructor.apply(obj, arr);

    return obj;

}

var man = {
    age: 12,
    name: 'nire',
    getName: function () {
        console.log(this.name);
    },
    getAge: () => {
        console.log(this.age);
    },
    setGrowing: function () {
        setInterval(() => {
            this.age++;
        }, 1000);
    },
    setAnotherGrowing: () => {
        setInterval(() => {
            this.age++;
        }, 1000);
    }

}

man.getName();
man.getAge();

function women() {
    var age = 1;
    console.log(this.age);
    setInterval(() => {
        console.log(this.age);
    }, 1000);
}

var age = 2;
women();

function foo() {
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100);
}
foo.call({
    id: 1
});

function foo() {
    var that = this;
    setTimeout(function () {
        console.log("id:", that.id);
    }, 100);

}
foo.call({
    id: 1
});


var x = 10;

function b() {
    var x = 5;
    (function () {
        console.log(x);
    })()
}
b();


var fn = null;

function foo() {
    var a = 2;

    function innnerFoo() {
        console.log(a);
    }
    fn = innnerFoo;
}

function bar() {
    fn();
}

foo();
bar();

function sumOfDivided(lst) {
    var i = 2;
    var result = [];
    while (lst){
        if(i>=Math.floor(lst[0]/2)){lst.shift();}
        var sum = lst.filter(value=>!value%i).reduce((sum,value)=>sum+value);
        result.push([i,sum]);
        i++;
    }
  }

  sumOfDivided([15,21,24,30,45])


var obj = {};
Object.defineProperty(obj,'name',{
    get:function(){},
    set:function(){}
})

function getOwnPropertyDescriptors(obj) {
    var result = {};
    for(key of Object.getOwnPropertyNames(obj)){
        result[key] = Object.getOwnPropertyDescriptor(obj,key);
    }
    return result;
}