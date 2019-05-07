function brainLuck(code, input) {
    console.log(code);
    console.log(input);
    var data = [];
    var pointer = 0;
    var code_pointer = 0;
    var square_stack = [];
    var result = [];
    var all_match = {};
    var output = [];
    if (input) {
        for (let i = 0; i < input.length; i++) {
            data.push(input.charCodeAt(i));
        }
    } else {
        result[0] = 0;
    }

    var code = code.split('');
    code.forEach((value, index) => {
        if (value === '[') {
            square_stack.push(index);
        }
        if (value === ']') {
            var left = square_stack.pop();
            all_match[left] = index;
            all_match[index] = left;
        }
    });
    while (code_pointer < code.length) {
        switch (code[code_pointer]) {
            case '>':
                pointer++;
                result[pointer] = result[pointer] || 0;
                break;
            case '<':
                pointer--;
                break;
            case '+':
                result[pointer] = (result[pointer] + 1) & 0xff;
                break;
            case '-':
                result[pointer] = (result[pointer] - 1) & 0xff;
                break;
            case '.':
                output.push(String.fromCharCode(result[pointer]));
                break;
            case ',':
                result[pointer] = data.shift();
                break;
            case '[':
                if (result[pointer] === 0) {
                    code_pointer = all_match[code_pointer];
                }
                break;
            case ']':
                if (result[pointer] !== 0) {
                    code_pointer = all_match[code_pointer];
                }
                break;
        }
        // console.log(result[pointer]);
        code_pointer++;
    }
    output = output.join('');
    return output;
}






function persistence(num) {
    var count = 0;
    while (num / 10 >= 1) {
        num = num.toString().split('').reduce((multiply, value) => {
            return parseInt(multiply) * parseInt(value);
        })
        count++;
    }
    return count;
}

function encrypt(text, n) {
    //console.log(text);
   // console.log(n);
    if(text === null)
    return null;
    while (n > 0) {
        var matches = text.match(/(..)/g)
        var left = [];
        var right = [];
        text.length % 2 === 0 ? '' : matches.push(text[text.length - 1]);
        matches.map((value) => {
            left.push(value[1]);
            if (value[0]) {
                right.push(value[0]);
            }
        })
        text = left.concat(right).join('');
        n--;
    }
    return text;
}

function decrypt(encryptedText, n) {
    console.log(encryptedText);
    console.log(n);
    if(encryptedText === null)
    return null;
    while(n>0){
        var left = encryptedText.slice(0,Math.floor(encryptedText.length/2)).split('');
        var right = encryptedText.slice(Math.floor(encryptedText.length/2)).split('');
        var result = [];
        while(left.length>0 && right.length>0){
            result.push(right.shift());
            result.push(left.shift());
        }
        result = result.concat(left,right);
        encryptedText = result.join('');
        n--;
    }
    return encryptedText;
}

function encryptReg(text, n) {
    for(let i=0;i<n;i++){
        text = text.replace(/.(.|$)/g,'$1').concat(text.replace(/(.)./g,'$1'));
    }
  
    return text;
}

function decryptReg(encryptedText, n) {
    var middle = Math.floor(encryptedText.length/2);
    for(let i=0;i<n;i++){
        encryptedText = encryptedText.slice(middle).replace(/./g,(value,index)=>{
            return index<middle ? value + encryptedText[index] : value;
        })
    }
    return encryptedText
}

window.find();

function getQueryStringArgs(){
    var args = {};
    var qs = location.search.length>0? location.search :'';
    qs = qs.slice(1);
    var qs_arr = qs.split('&');
    qs_arr.forEach((value)=>{
        var key_value = value.split('=')
        args[key_value[0]] = key_value[1];
    })
    return args;
}


function Father(){
    this.fortune = 1000;
    this.name = 'xx';
}

Father.prototype.lastname = 'huang';

function Son(){
    this.score = 100;
    this.name = 'yy';
}
Son.prototype.mother = 'liu';

Son.prototype = new Father();
var nire = new Son();
var jack = new Son();
