
import { readFile }      from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path              from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const input = await readFile(path.join(__dirname, "input.txt"), 'utf8');
const test = await readFile(path.join(__dirname, "test.txt"), 'utf8');

const numMap = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}


export function getNums(row) {
    const nums = row.match(/\d/g);

    return [ nums[0], nums.at(-1) ];
}

export function parseNums([ n0, n1 ]) {
    return parseInt(`${n0}${n1}`);
}

export function day01(_input) {
    let sum = 0;

    _input.split("\n").forEach((line) => {
        const num =  parseNums(getNums(line));

        sum += num;
    });

    return sum;
}

export function getMatches(str) {
    const matches = {
        // idx : word eg
        // 0: "one",
        // 4: "three"
    };

    let found = false;

    Object.entries(numMap).forEach(([ word, num ]) => {
        const match = str.indexOf(word);

        if (match > -1) {
            matches[match] = word;
            found = true;
        }
    });

    return found && matches;
}

export function swapLowestMatch(str, matches) {
    const lowestMatch = Math.min(...Object.keys(matches));

    const word = matches[lowestMatch];

    return str.replace(word, numMap[word]);
}

export function swapAllMatches(str) {
    const matches = getMatches(str);

    if (!matches) {
        return str;
    }

    const swapped = swapLowestMatch(str, matches);

    return swapAllMatches(swapped);
}

export function numSwap(str) {
    let newInput = str;

    Object.entries(numMap).forEach(([ word, num ]) => {
        newInput = swapAllMatches(newInput);
    });

    return newInput;
}

export function p1() {
    return day01(input);
}

export function p2() {
    let newInput = numSwap(input);

    console.log(newInput);



    return day01(newInput);
}
