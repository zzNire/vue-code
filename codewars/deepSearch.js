var data = {
    x:1,
    children:
        [{
            x:2,
            children:[
                {x:4}
            ]
        },{
            x:3,
            children:[
                {x:5}
            ]
        }],
}


function deepSearch(data){
    var children = [];
    children.push(data.x);
    if(data.children){
        data.children.forEach(child => {
            children.push(deepSearch(child));
        });
    }
    return children;
    
}

let tree = deepSearch(data);