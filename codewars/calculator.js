const Calculator = function () {
    const opt_fun = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => x / y,
    }

    let number;
    let operator;

    function compute(reg) {
        let index = 0;
        while (index < operator.length) {
            let opt = operator[index];
            if (reg.test(opt)) {
                number.splice(index, 2, opt_fun[opt](number[index], number[index + 1]));
                operator.splice(index, 1);
                index--;
            }
            index++;
        }
    }

    this.evaluate = string => {
        number = string.split(' ').filter(str => /\d+/.test(str)).map(x => x - 0);
        operator = string.split(' ').filter(str => !(/\d+/.test(str)));
        debugger
        compute(/[\*\/]/);
        compute(/[\+\-]/);
        console.log(number[0]);
    }

};

const Calculator  = function(){
    this.opt_fun = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => x / y,
    }
    this.evaluate = string => {
        let operators = string.split(' ');
        ['*','\/','+','-'].forEach(v=>{
            let index = 0;
            while((index = operators.indexOf(v))!== -1){
                operators[index-1] = this.opt_fun[v](+operators[index-1],+operators[index+1]);
                operators.splice(index,2);
            }
        })
        return +operators;
    }

}


function getUrlParam(sUrl, sKey) {
    var keys = sUrl.match(/(?<=[\?\&])(\w+)/g);
    var result = {};
    //keys = new Set(keys);
    for(var key of keys){
        var values = sUrl.match(new RegExp(`(?<=${key}\\=)([0-9a-zA-Z%]+)`,'g')).map(x=>x-0);
        if(values) {
             if(values.length === 1) values = values[0];
             result[key] = values;
        }else{
            result[key] = '';
        }  
    }
    console.log(result);
    if(sKey){
        return result[sKey]?result[sKey]:'';
    }else{
        return result; 
    }     
}