var tree = {
    root:1,
    left:{},
    right:{},
}

function getTree(first_nums,middle_nums){
    var node = {};
    if(first_nums.length === 1){
        return {root:first_nums[0]};
    }
    var root = first_nums.shift();
    var root_index = middle_nums.indexOf(root);

    var first_left = first_nums.slice(0,root_index);
    var first_right = first_nums.slice(root_index);
    var middle_left = middle_nums.slice(0,root_index);
    var middle_right = middle_nums.slice(root_index+1);
    node.root = root;
    if(first_left.length && middle_left.length){
        node.left = getTree(first_left,middle_left);
    }
    if(first_right.length && middle_right.length){
        node.right = getTree(first_right,middle_right);
    }
    

    return node;
}

var first = [1,2,4,7,3,5,6,8];
var middle = [4,7,2,1,5,3,8,6]

getTree(first,middle);


// arr 里的数字的全排列
function comSort(arr,index,result){
    index = index || 0;
    if(index === arr.length){
        console.log(result.join('').replace(/^0*([\d]+)/,'$1'));
        return;
    }
    var next = index+1;
    result = result || Array(arr.length);
    arr.forEach(v => {
        result[index] = v;
        comSort(arr,next,result)
    });
    
}


function reorderArr(arr,rules){
    var start = 0;
    var end = arr.length - 1;
    while(start<end){
        if(rules(arr[start],arr[end])){
            [arr[end],arr[start]] = [arr[start],arr[end]];
            start++;
            end--;
        }
        start++;
    }
    return arr;
}

function rule1(v1,v2){
    if(v2%2 && !(v1%2)){
        return true;
    }
    return false;
}

var mytree = {
    root:8,
    left:{
        root:6,
        left:{
            root:5
        },
        right:{
            root:7
        }
    },
    right:{
        root:10,
        left:{
            root:9
        },
        right:{
            root:11
        }
    }
}


function exchangeTree(tree){
    if(!tree.left && !tree.right){
        return tree;
    }
    //var left = JSON.parse(JSON.stringify(tree.left));
    //var right =JSON.parse(JSON.stringify(tree.right));
    var left = tree.left;
    var right =tree.right;
    if(left){
        tree.left = exchangeTree(right);
    }
    if(right){
        tree.right = exchangeTree(left);
    }
    return tree;
}

exchangeTree(mytree);


function printMatrix(arr){
    if( !arr.length){
        return;
    }
    if(arr.length && (!arr[0].length)){
        arr.forEach(v=>{console.log(v)});
        return;
    }
    var line = arr.length;
    var row = arr[0].length;

    var i=0;
    while(){
        var j;
        debugger;
        var startX = i,endX = line - i -1;
        var startY = i,endY = row - i - 1;


        for(j=startY;j<=endY;j++){
            console.log(arr[startX][j]);
        }
        
        if(startX < endX){
            for(j=startX+1;j<=endX;j++){
                console.log(arr[j][endY]);
            }
        }
        
        if(startY < endY && startX < endX){
            for(j=endY-1;j>=startY+1;j--){
                console.log(arr[endX][j]);
            }
        }
        
        if(startX < endX-1 && startY < endY){
            for(j=endX-1;j>=startX;j--){
                console.log(arr[j][startY]);
            }
        }
        i++;
    }
}