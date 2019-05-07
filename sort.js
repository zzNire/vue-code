
// 参考 https://www.cnblogs.com/onepixel/articles/7674659.html
/* 冒泡排序
 1.相邻元素比较，从左往右，最大的到末尾
 2.时间复杂度 n^2 空间复杂度 1
 稳定
*/
function maopaoSort(arr){
    for(let i = arr.length-1;i>0;i--){
        for (let j = 0;j<i;j++){
            if(arr[j]>arr[j+1]){
               [arr[j],arr[j+1]]  = [arr[j+1],arr[j]];
            }
        }
    }
    return arr;
}

function maopaoSort2(arr){
    for(let i = 0;i<arr.length;i++){
        for (let j = arr.length;j>i;j--){
            if(arr[j]<arr[j-1]){
               [arr[j],arr[j-1]]  = [arr[j-1],arr[j]];
            }
        }
    }
    return arr;
}
/* 选择排序
 1.每次循环都找出最小的到前端
 2.时间复杂度 n^2 空间复杂度 1
 不稳定
*/
function chooseSort(arr){
    for (let i=0;i<arr.length;i++){
        for(let j=i;j<arr.length;j++){
            if(arr[i] > arr[j])
            {
                 [arr[j],arr[i]] = [arr[i],arr[j]];
            }
        }
    }
    return arr;
}


/* 插入排序
将第一位当作新数组，不断地往里面插入新数字
时间复杂度 n^2 空间复杂度 1
稳定

*/
function insertSort(arr){
    for(let i=1;i<arr.length;i++){
        for(let j=i;j>=0;j--){
            if(arr[j] < arr[j-1]){
                [arr[j],arr[j-1]] = [arr[j-1],arr[j]];
            }else{
                break;
            }
        }
    }
    return arr;
}


function quickSort(arr){
    var left = [];
    var right = [];
    if(arr.length === 1) return arr;
    for(let i=1;i<arr.length;i++){
       arr[i]<arr[0]?left.push(arr[i]):right.push(arr[i]);
    }
    var left = left.length?quickSort(left):[];
    var right = right.length?quickSort(right):[];
    return left.concat(arr[0],right);

}
/* 快速排序 ***
1. 大的放右边，小的放左边 
2.时间复杂度 nlogn 空间复杂度 logn
不稳定
*/ 
function f(a){
    return a.length <= 1 ? a: f(a.filter(x=>x<a[0])).concat(a.filter(x=>x==a[0])).concat(f(a.filter(x=>x>a[0])));
}

//

function quickSort(arr){
    if(arr.length <= 1){
        return arr;
    }
    var left = [];
    var right = [];
    var flag = arr.splice(0,1);
    for(let i=0;i<arr.length;i++){
        arr[i]<flag ?  left.push(arr[i]) : right.push(arr[i]);
    }
    if(left.length > 1){
        left = quickSort(left);
    }
    if(right.length > 1){
        right = quickSort(right);
    }
    
    return left.concat(flag,right);
}


//从大到小
function departion(arr,start,end){
    if(start > end){
        return ;
    }
    var i = start;
    var j = end;
    var part = arr[start];
    while(i!=j){
        while(arr[j]<=part && i<j){
            j--;
        }
        while(arr[i]>=part && i<j){
            i++
        }
        [arr[i],arr[j]] = [arr[j],arr[i]];
    }
    arr[start] = arr[i];
    arr[i] = part;
    return i;
}

function quickSort(arr,start=0,end){
    end = end || arr.length-1;
    if(start<end){
        let part = departion(arr,start,end);
        if(!part) return;
        quickSort(arr,start,part-1);
        quickSort(arr,part+1,end);
    }
    return arr;
    
}

function findMax(arr,rank){
    let start = 0,end=arr.length-1;
    rank--;
    while(start <= end){
        let part = departion(arr,start,end);
        if(part === rank)
            return arr[part];
        if(part>rank){
            end = part -1;  
        }
        if(part<rank){
            start = part + 1;
        }
    }
    
}
/* 希尔排序
设置不同的步长进行分组，组内进行插入排序
时间复杂度 nlogn 空间复杂度 1
*/
function xierSort(arr){
    for(let i = Math.floor(arr.length/2);i>=1;i=Math.floor(i/2)){
        for(let j = i;j<arr.length;j++){
                let gen = j;
                while(gen-i>=0 && arr[gen-i]>arr[gen]){
                    [arr[gen-i],arr[gen]] = [arr[gen],arr[gen-i]];
                    gen-=i;
                }
        }
    }
    return arr;
}

/* 归并排序
分为左右两个数组，在合并时排序
时间复杂度 nlogn 空间复杂度 n
*/

function mergeSort(arr){
    if(arr.length <=1){
        return arr;
    }
    let middle = Math.floor(arr.length/2);
    let left = arr.slice(0,middle);
    let right = arr.slice(middle);

    let result = merge(mergeSort(left),mergeSort(right));
    return result;
}

function merge(left,right){
    let result = [];
    
    while(left.length > 0 && right.length > 0){
        if(left[0] < right[0]){
            result.push(left.shift())
        }
        else{
            result.push(right.shift());
        }
    }
    if(left.length){
        result = result.concat(left);
    }
    if(right.length){
        result = result.concat(right);
    }
    return result;
}

/* 堆排序
通过完全二叉树父节点大于子节点，根节点肯定是最大的，
把根节点和最后的节点调换，去除根节点，再重新调整树，
时间复杂度 nlogn 空间复杂度 1
*/
function buildHeap(arr){
    let i = arr.length%2 === 0 ? arr.length/2 -1 : Math.floor(arr.length/2) ;
    for(i;i>=0;i--)
    {
        heapify(i,arr);
    }
    return arr;
     
}

function heapify(i,arr){
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    largest = i;
    let copy_largest = i;
    if(arr[left] > arr[largest]){
        largest = left;
    }
    if(arr[right] > arr[largest]){
        largest = right;
    }
    [arr[largest],arr[copy_largest]] = [arr[copy_largest],arr[largest]];
}

function heapSort(arr){
    arr = buildHeap(arr);
    let result = [];
    while(arr.length){
        console.log(arr);
        [arr[0],arr[arr.length-1]] = [arr[arr.length-1],arr[0]];
        result.push(arr.pop());
        
        arr = buildHeap(arr);
    }
    return result.reverse();
}