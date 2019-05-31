function divideStrings(a, b) {
    let result = [];
    if (a.length < b.length) {
        result.push('0');
    }else if(a.length === b.length){
        if(a<b) result.push('0');
    }else{
        let num='';
        let resultd_div = [];
        debugger;
        while(a.length>0){
            let cpoy = a.substr(0,b.length-num.length);
            a = a.substr(b.length-num.length,a.length);
            num = cpoy;
            if(num<b){
                num+=a.substr(0,1);
                a = a.substr(1,a.length);
            }
            let index = 0;
            let sub_result = '1';
            let rest;
            while(sub_result!=='-1'){
                let mul_result = mul(b,index.toString());
                rest = sub(num,mul_result)
                sub_result = sub(rest,b);   
                index++; 
            }
            result_div.push(index--);
            num = rest;
        }
        result.push(result_div.join(''));
    }
    console.log(result);
  
}

function sub(a, b) {
    a = a.split('').reverse();
    b = b.split('').reverse();
    let result = a.map((x, index) => {
        if (x < b[index]) {
            if(!a[index+1]) return '-1';
            b[index + 1] = b[index + 1] ? +b[index + 1]++ : '1';
            return x - b[index] + 10;
        } else {
            return x - b[index];
        }
    }).reverse().join('');
    return result;
}

function add(a, b) {
    a = a.split('').reverse();
    b = b.split('').reverse();
    let tag = 0;
    if (a.length < b.length) {
        [a, b] = [b, a];
    }
    let result = a.map((x, index) => {
        let sum = +x + +(b[index] ? b[index] : 0) + tag;
        if (sum >= 10) {
            tag = Math.floor(sum / 10);
            return sum % 10;
        } else {
            tag = 0;
            return sum;
        }
    });
    tag = tag ? multy.push(tag) : ''
    return result.reverse().join('');
}

function mul(a, b) {
    b = b.split('').reverse();

    let result = b.map((v, index) => mulone(a, v) * Math.pow(10, index))

    return result.reduce((sum, v) => add(sum, v)).toString();

    function mulone(a, b) {
        a = a.toString().split('').reverse();
        let tag = 0;
        let multy = a.map((x, index) => {
            let result = x * b + tag;
            if (result >= 10) {
                tag = Math.floor(result / 10);
                return result % 10;
            } else {
                tag = 0;
                return result;
            }
        });
        tag = tag ? multy.push(tag) : '';
        return multy.reverse().join('');
    }
}