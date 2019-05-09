

let RomanNumerals = {
    numerals: [
        ['I', 'V'],
        ['X', 'L'],
        ['C', 'D'],
        ['M'],
    ],
    toRoman(num) {
        var nums = [...num.toString()];
        nums = nums.map((value, index) => {
            value = parseInt(value);
            var num_10 = nums.length - index - 1;
            var roman_num;
            if (1 <= value && value <= 3) {
                roman_num = value;
                return this.numerals[num_10][0].repeat(roman_num);
            } else if (value === 0) {
                return '';
            } else if (value === 9) {
                return this.numerals[num_10][0] + this.numerals[num_10 + 1][0];
            } else {
                var flag = Math.floor(value / 5);
                roman_num = flag === 1 ? value % 5 : 5 - value % 5;
                if (num_10 === 3) return 'M'.repeat(roman_num);
                return flag === 1 ? this.numerals[num_10][1] + this.numerals[num_10][0].repeat(roman_num) :
                    this.numerals[num_10][0].repeat(roman_num) + this.numerals[num_10][1]
            }
        })
        return nums.join('');
    },
    fromnumberals: {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000,
    },
    fromRoman(arr){
        return arr.split('').reduce((sum,val,index)=>
        this.fromnumberals[val]<this.fromnumberals[arr[index+1]] ? sum-this.fromnumberals[val]:sum+this.fromnumberals[val]
        ,0)
    }
}


