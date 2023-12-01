
import { readFile }      from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path              from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const input = await readFile(path.join(__dirname, "input.txt"), 'utf8');


export function getNums(row) {
    const nums = row.match(/\d/g);

    return [ nums[0], nums.at(-1) ];
}

export function parseNums([ n0, n1 ]) {
    return parseInt(`${n0}${n1}`);
}

export function day01() {
    let sum = 0;

    input.split("\n").forEach((line) => {
        const num =  parseNums(getNums(line));

        sum += num;
    });

    return sum;
}
