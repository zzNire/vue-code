function sort(arr){
    if(arr.length === 1){
        return arr;
    }
    var middle = Math.floor(arr.length/2);
    var left = arr.slice(0,middle);
    var right = arr.slice(middle);
    return rollup(sort(left),sort(right));
}

function rollup(left,right){
    var result = [];
    while(left.length && right.length){
        if(left[0] <= right[0]){
            result.push(left.shift());
        }else{
            result.push(right.shift())
        }
    }
    if(left.length){
        result = result.concat(left);
    }else{
        result = result.concat(right);
    }
    return result;
}