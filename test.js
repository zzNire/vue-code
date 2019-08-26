//delete this
var double = v=>v*v;
var pow = n => n*n;
var reverseInt = n => n.toString().split('').reverse().join('');

var fun = new WeakMap();
fun.set(double,double);
fun.set(pow,pow);
fun.set(reverseInt,reverseInt);

var pipe = function(value){
    var func = [];
    var x = new Proxy({},{
        get(target,key){
            console.log(key);
            if(key!=='get')
            {
                func.push(window[key]);
                return x;
            }
            return func.reduce((sum,val)=>{
                return val(sum);
            },value)
        }
    })
    return x;
}



console.log(pipe(3).double.pow.reverseInt.get);

const dom = new Proxy({},{
    get(target,key){
        return function(attrs,...args){
            var el = document.createElement(key);
            for(let attrkey of Object.getOwnPropertyNames(attrs)){
                el.setAttribute(attrkey,attrs[attrkey])}
            for(let arg of args){
                if(typeof arg === 'string'){
                    arg = document.createTextNode(arg);
                }
                el.appendChild(arg);
                
            }
            
            return el;
        }
    },
    
})

const el = dom.div({},
    'Hello, my name is ',
    dom.a({href: '//example.com'}, 'Mark'),
    '. I like:',
    dom.ul({},
      dom.li({}, 'The web'),
      dom.li({}, 'Food'),
      dom.li({}, '…actually that\'s it')
    )
  );
  
  document.body.appendChild(el);


function merge(arr_1,arr_2){
    var result = [];
	arr_2.forEach(v => {
        var a1 = arr_1.filter(a=>(a.indexOf(v)+1)).sort();
        result = result.concat(a1,v);
    });
    return result;
}

function getSons(arr,length){
    var result = [[]];
    while(arr.length){
        var right_num = arr.shift();
        result = result.concat([...result.map(v=>v.concat(right_num))]);
    }
    return result.filter(v=>v.length===length);
}

function getSum(arr,length,num){
    debugger;
    var result = getSons(arr,length);
    return result.filter(list=>list.reduce((a,b)=>a+b) === num)
}

function getRepaeatSons(arr,length){
    var result = arr.map(v=>[v]);
    var count = 1;
    while(count<length){ 
        var each_result = [];
        for(var value of arr){
        result.forEach(list=>{
            each_result.push(list.concat(value))
        })
       
        }
        result = each_result;
        count++ ;
    }
    return result;
    
}

function getPaper(arr){
    var result = [arr.pop()];
    while(arr.length){
        result.push(result.shift());
        result.push(arr.pop());
        
    }
    console.log(result);
}

function generateTree(arr) {
    var parents = arr.reduce((res, item) => {
        res[item.id] = item;
        return res;
    } , {});
    var result = [];
    arr.forEach(v => {
        if (!v.pId) {
            result.push(v);
        } else {
            if (parents[v.pId]) {
                var parent = parents[v.pId]
                parent.child = parent.child || [];
                parent.child.push(v);
            }
        }
    })
    return result;
}
var students = [];
var input = [
    'ZHANG SAN',
    'LI SI',
    'WANG WU',
    'WANG LIU',
    'WANG QI',
    'ZHANG WU',
    'LI WU',
]

input.forEach(v=>{
    var name = v.split(' ');
    students.push({
        last_name : name[0],
        first_name : name[1],
    }) 
})

var str;
var students = [];
while((str = read_line()) != null){
      var name = str.split(' ');
      students.push({
          last_name : name[0],
          first_name : name[1],
      })  
}



var count_last_name = {};
students.forEach(s=>{
    count_last_name[s.last_name] = count_last_name[s.last_name] || 0;
    count_last_name[s.last_name] ++;
})

var count_last_sort = [];
for(var key in count_last_name){
    count_last_sort.push({last_name:key,
        count:count_last_name[key],
    })
}

count_last_sort.sort((a,b)=>b.count - a.count);
console.log(count_last_sort);


var count_to_name = {};
count_last_sort.forEach(v=>{
    var last_name = v.last_name;
    var count = v.count;
    count_to_name[count] = count_to_name[count] || [];
    count_to_name[count].push(last_name);
})


console.log(count_to_name);


var print_sort = [];

for(var key in count_to_name){
    print_sort[key] = count_to_name[key];
}
print_sort.reverse();
console.log();

print_sort.forEach(v=>{
    //var last_name = v.last_name;
    //var count = v.count;
    var names = v;
    var print_stu = students.filter(stu=>names.filter( v => v === stu.last_name).length);
    print_stu.forEach(stu=>{
        console.log(stu.last_name + ' ' + stu.first_name);
    })
})



var str;
var students = [];
while((str = read_line()) != null){
      var name = str.split(' ');
      students.push({
          last_name : name[0],
          first_name : name[1],
      })  
}





var students = [];
var input = [
    'ZHANG SAN',
    'LI SI',
    'WANG WU',
    'WANG LIU',
    'WANG QI',
    'ZHANG WU',
    'LI WU',
]

input.forEach(v=>{
    var name = v.split(' ');
    students.push({
        last_name : name[0],
        first_name : name[1],
    }) 
})


var count_last_name = {};

students.forEach(s=>{
    count_last_name[s.last_name] = count_last_name[s.last_name] || 0;
    count_last_name[s.last_name] ++;
})


var count_to_num = [];

for(var last in count_last_name){
    count_to_num[10000 - count_last_name[last]] = count_to_num[10000 - count_last_name[last]] || [];
    count_to_num[10000 - count_last_name[last]].push(last);
}

count_to_num.forEach(v=>{
    //var last_name = v.last_name;
    //var count = v.count;
    var names = v;
    var print_stu = students.filter(stu=>names.filter( v => v === stu.last_name).length);
    print_stu.forEach(stu=>{
        console.log(stu.last_name + ' ' + stu.first_name);
    })
})


function getNum(str){
    var start = 0;
    var flag = 0;
    var count = 0;
    while(start < str.length){
        count++;
        if(str[start]<='Z' && str[start]>= 'A'){
            if(flag === 0){
                count++;
            }
             flag = 1;
        }else{
            flag = 0;
        }
        start++;
    }
    return count;
}