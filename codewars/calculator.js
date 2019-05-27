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