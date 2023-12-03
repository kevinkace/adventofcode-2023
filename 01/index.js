const numMap = {
    one   : 1,
    two   : 2,
    three : 3,
    four  : 4,
    five  : 5,
    six   : 6,
    seven : 7,
    eight : 8,
    nine  : 9,
};

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
export function sumRows(input, replacer) {
    let sum = 0;

    input.split("\n").forEach((line) => {
        if (replacer) {
            line = replacer(line);
        }

        const num =  getNum(line);

        sum += num;
    });

    return sum;
}

/**
 * Get all matches in string
 * @param {string} str - eg `"one2eighthree"`
 * @returns {object|false} - eg `{ 0 : "one", 4 : "eight", 9 : "three" }`
 */
export function getMatches(str) {
    const matches = {};

    let found = false;

    Object.entries(numMap).forEach(([ word, num ]) => {
        const match = str.indexOf(word);

        if (match > -1) {
            matches[match] = word;
            found          = true;
        }
    });

    return found && matches;
}

/**
 * Swap lowest match in string
 * @param {string} str - eg `"one2eighthree"`
 * @param {object} matches - eg `{ 0 : "one", 4 : "eight", 9 : "three" }`
 * @returns {string} - eg `"12eighthree"`
 */
export function swapLowestMatch(str, matches) {
    const lowestMatch = Math.min(...Object.keys(matches));

    const word = matches[lowestMatch];

    return str.replace(word, numMap[word]);
}

/**
 * Swap all matches in string
 * @param {string} str - eg `"one2eighthree"`
 * @returns {string} - eg `"128hree"`
 */
export function swapAllMatches(str) {
    const matches = getMatches(str);

    if (!matches) {
        return str;
    }

    const swapped = swapLowestMatch(str, matches);

    return swapAllMatches(swapped);
}

/**
 * Swap all matches in all rows
 * @param {string} str - eg `"one2eighthree\nfour5fivesix"`
 * @returns {string} - eg `"128hree\n4556"
 */
export function swapAndSum(str) {
    return sumRows(str, swapAllMatches);
}
