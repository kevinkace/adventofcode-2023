import { readFile }      from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path              from "node:path";

import { expect, test, describe } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const input    = await readFile(path.join(__dirname, "input.txt"), "utf8");
const sample01 = await readFile(path.join(__dirname, "sample01.txt"), "utf8");
const sample02 = await readFile(path.join(__dirname, "sample02.txt"), "utf8");

import { getNum, replaceStringsWithNumbers, addRowToSum, parse, addRowToSum } from "../../days/day01.js";

describe("day 01", () => {
    test("gets nums from row", () => {
        expect(getNum("abc123")).toEqual(13);
        expect(getNum("abc1")).toEqual(11);
        expect(getNum("abc")).toEqual(0);
        expect(getNum("threeight")).toEqual(0);
    });

    test("can sum rows", () => {
        expect(addRowToSum(0, "abc123")).toEqual(13);
        expect(addRowToSum(13, "abc456")).toEqual(59);
    });

    test("answer part 1", () => {
        let result = parse(sample01)
            .reduce(addRowToSum, 0);

        expect(result).toEqual(142);

        result = parse(input)
            .reduce(addRowToSum, 0);

        expect(result).toMatchSnapshot();
    });

    test("answer part 2", async () => {
        let result = parse(sample02)
            .map(replaceStringsWithNumbers)
            .reduce(addRowToSum, 0);

        expect(result).toEqual(281);

        result = parse(input)
            .map(replaceStringsWithNumbers)
            .reduce(addRowToSum, 0);

        expect(result).toMatchSnapshot();
    });
});
