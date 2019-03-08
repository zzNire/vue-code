



console.log("===========================");
var myname = new String("nire");
var person = new Object();

console.log(myname instanceof String );
console.log(person instanceof Object );

var oStringObject = new String("hello world"); 
console.log(oStringObject instanceof String); 

var name = "nire";
console.log(typeof name);
console.log(typeof myname);

console.log(name);
console.log(myname);

/*==================
        作用域
=====================*/
function buildUrl(){
    var qs = "?debug=true";

    with (location){
        var url = href + qs;
    }

    return url;
}

console.log(buildUrl());

/*
        Date

*/

var begin = new Date();

setTimeout(()=>{
    var end = new Date();
    console.log(end-begin);
},1000)


/*
    Function
*/

//函数返回函数
function compareArg(arg_name)
{
    
    return function compare(obj1,obj2){
        var value1 = obj1[arg_name];
        var value2 = obj2[arg_name];
        return value1 - value2;
    }
}

var students = [
    {   name:'niren',
        age:22
    },
    {
        name:'jacky',
        age:18
    }
]
students.sort(compareArg('age'))
console.log(students);

//arguments.callee
function factorial(num){
    if(num === 1)
        return 1;
    else{
        return num * arguments.callee(num-1);
    }
    
}
console.log(factorial(5));

//apply
function sum(num1,num2){
    return num1 + num2;
}

function callSum(num1,num2){
    console.log(arguments);
    return sum.apply(this,arguments);
}

function callSum2(num1,num2){
    return sum(num1,num2);
}
console.log(callSum(1,2));
console.log(callSum2(1,2));

function sss(a)
{
    var num = {};
	a.forEach(i=>{
      if(!num.hasOwnProperty(i))
      {
          num[i] = 1;
      }
        
    })
    return Object.keys(num);
}

console.log(sss(['toString','toString','valueOf']));