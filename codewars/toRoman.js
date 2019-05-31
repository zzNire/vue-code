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
    fromRoman(arr) {
        return arr.split('').reduce((sum, val, index) =>
            this.fromnumberals[val] < this.fromnumberals[arr[index + 1]] ? sum - this.fromnumberals[val] : sum + this.fromnumberals[val], 0)
    }
}

function getInput() {
    var data = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [, 0, , ]
    ];
    var input_data = {};
    data.forEach((v, x) => {
        v.forEach((u, y) => {
            input_data[u] = [];
            input_data[u].push(u);
            if (data[x + 1] && data[x + 1][y] !== undefined) input_data[u].push(data[x + 1][y]);
            if (data[x - 1] && data[x - 1][y] !== undefined) input_data[u].push(data[x - 1][y]);
            if (data[x] && data[x][y + 1] !== undefined) input_data[u].push(data[x][y + 1]);
            if (data[x] && data[x][y - 1] !== undefined) input_data[u].push(data[x][y - 1]);

        })
    })
    return input_data;
}

function getInput() {
    var data = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        [, '0', , ]
    ];
    var input_data = {};
    data.forEach((v, x) => {
        v.forEach((u, y) => {
            input_data[u] = [];
            input_data[u].push(u);
            if (data[x + 1] && data[x + 1][y] !== undefined) input_data[u].push(data[x + 1][y]);
            if (data[x - 1] && data[x - 1][y] !== undefined) input_data[u].push(data[x - 1][y]);
            if (data[x] && data[x][y + 1] !== undefined) input_data[u].push(data[x][y + 1]);
            if (data[x] && data[x][y - 1] !== undefined) input_data[u].push(data[x][y - 1]);

        })
    })
    return input_data;
}

function getPINs(observed) {
    var data = getInput();
    var input = observed.split('').map(v => data[v]);
    return input.reduce((pre, next) => [].concat.apply([], pre.map(m => next.map(n => m + n))))
}


function getWinning(max) {
    // Create possible user numbers array 
    var possUserNumbs = [];
    for (var i = 1; i < (max + 1); i++) {
        possUserNumbs.push(i);
    }
    // Quick pick winning user numbers array 
    var userWinningNumbs = [];
    for (var j = 0; j < 5; j++) {
        userWinningNumbs.push(getRandomWinningNumbers());
    }
    // Gets random numbers and removes them after use
    function getRandomWinningNumbers() {
        var randomIndex = Math.floor(Math.random() * possUserNumbs.length);
        return possUserNumbs.splice(randomIndex, 1)[0];
    }
    // Reorder from smallest to largest
    userWinningNumbs.sort(function (a, b) {
        return a - b;
    });
    return userWinningNumbs;
}

function getMega(megaMax) {
    // Create possible user mega numbers array
    var possMegaUserNumbs = [];
    for (var i = 1; i < (megaMax + 1); i++) {
        possMegaUserNumbs.push(i);
    }

    var randomIndex = Math.floor(Math.random() * possMegaUserNumbs.length);
    return possMegaUserNumbs.splice(randomIndex, 1)[0];
}
// view-source:http://graphics.latimes.com/powerball-simulator/