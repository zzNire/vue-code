var double = n => n+2;
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