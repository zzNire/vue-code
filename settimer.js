function add(x){
    return function(y){
        return x + y;
    }
}

var add1 = add(1);
console.log(add1(2));