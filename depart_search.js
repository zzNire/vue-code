function findFirst(array,target){
    var start=0,end = array.length ,middle = 0;
    while(start <= end){
        middle = Math.floor((start + end )/2);
        if(array[middle] >= target){
            end = middle - 1;
        }else{
            start = middle + 1;
        }
    }
    return array[start] === target ? start : -1
}

function findLast(array,target){
    target += 1;
    var start = 0,end = array.length ,middle = 0;
    while(start<=end){
        middle = Math.floor((start + end)/2);
        if(array[middle] >= target){
            end = middle -1;
        }
        else {
            start = middle + 1;
        }
    }
    return array[end] === target - 1 ? end : -1; 
}

function findMore(array,target){
   
   var start = 0,end = array.length ,middle = 0;
   target += 1;
    
    while(start<=end){
        middle = Math.floor((start + end)/2);
        if(array[middle] >= target){
            end = middle -1;
        }
        else {
            start = middle + 1;
        }
    }
    return start; 
}


function findLess(array,target){
   
    var start = 0,end = array.length ,middle = 0;
     
     while(start<=end){
         middle = Math.floor((start + end)/2);
         if(array[middle] >= target){
             end = middle -1;
         }
         else {
             start = middle + 1;
         }
     }
     return end; 
 }


 //大于等于target的第一个位置
 function getCount( data, target){
    var left=0, right = data.length-1, middle=0;
    while(left <= right){
        middle = Math.floor((left + right) / 1);
        if (data[middle] > target)
            right = middle-1;
        else if(data[middle] < target)
            left = middle+1;
        else
            return middle;
    }
    return left;
}

//小于等于target的最后一个位置
function getCount( data, target){
    var left=0, right = data.length-1, middle=0;
    while(left <= right){
        middle = Math.floor((left + right) / 1);
        if (data[middle] > target)
            right = middle-1;
        else if(data[middle] < target)
            left = middle+1;
        else
            return middle;
    }
    return right;
}