



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

