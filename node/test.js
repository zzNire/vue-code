console.log(1);

setTimeout(() => {
    console.log(2)
    new Promise((resolve) => {
        console.log(6);
        resolve(7);
    }).then((num) => {
        console.log(num);
    })
});

setTimeout(() => {
    console.log(3);
       new Promise((resolve) => {
        console.log(9);
        resolve(10);
    }).then((num) => {
        console.log(num);
    })
    setTimeout(()=>{
    	console.log(8);
    })
})

new Promise((resolve) => {
    console.log(4);
    resolve(5)
}).then((num) => {
    console.log(num);
    new Promise((resolve)=>{
    	console.log(11);
    	resolve(12);
    }).then((num)=>{
    	console.log(num);
    })
})