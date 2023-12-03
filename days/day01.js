const numMap = {
    one   : "o1e",
    two   : "t2o",
    three : "t3e",
    four  : "f4r",
    five  : "f5e",
    six   : "s6x",
    seven : "s7n",
    eight : "e8t",
    nine  : "n9e",
};

export function parse(str) {
    return str.split("\n");
}

/**
 * Get first and last digit in string, and concat to a 2 digit number
 * @param {string} row - eg `"abc123"`
 * @returns {number} - eg `13`
 */
export function getNum(row) {
    const nums = row.match(/\d/g);

    return nums ?
        parseInt(`${nums.at(0)}${nums.at(-1)}`, 10) :
        0;
}

/**
 * Sum all numbers in input
 * @param {string} input - eg `"abc123\nabc456"`
 * @returns {number} - eg `59`, because `13 + 46 = 59`
 */
export function addRowToSum(sum, row) {
    const num =  getNum(row);

    return sum + num;
}

export function replaceStringsWithNumbers(str) {
    Object.entries(numMap).forEach(([ word, num ]) => {
        str = str.replaceAll(word, num);
    });

    return str;
}
