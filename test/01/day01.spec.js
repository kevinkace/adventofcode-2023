import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath }       from "node:url";
import path                    from "node:path";

import { expect, test, describe } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const input    = await readFile(path.join(__dirname, "input.txt"), "utf8");
const output   = await readFile(path.join(__dirname, "output.txt"), "utf8");
const sample01 = await readFile(path.join(__dirname, "sample01.txt"), "utf8");
const sample02 = await readFile(path.join(__dirname, "sample02.txt"), "utf8");

import { getNum, swapAndSum, getMatches, swapLowestMatch, swapAllMatches, sumRows, swapAllMatches2 } from "../../days/day01.js";

describe("day 01", () => {
    test("gets nums from row", () => {
        expect(getNum("abc123")).toEqual([ "1", "3" ]);
        expect(getNum("abc1")).toEqual([ "1", "1" ]);
    });

    test("can num swap", () => {
        expect(swapAndSum("one")).toBe("1");
        expect(swapAndSum("oneone")).toBe("11");
        expect(swapAndSum("one1one\ntwo")).toBe("111\n2");
        // expect(numSwap("eightwothree")).toBe("8wo3");
    });

    test.skip("can get matches", () => {
        expect(getMatches("one")).toMatchObject({ 0 : "one" });
        expect(getMatches("oneone")).toMatchObject({ 0 : "one" });
        expect(getMatches("nine1one")).toMatchObject({ 0 : "nine", 5 : "one" });
        expect(getMatches("oneeight")).toMatchObject({ 0 : "one", 3 : "eight" });
        expect(getMatches("oneight")).toMatchObject({ 0 : "one", 2 : "eight" });
        expect(getMatches("asdf")).toBe(false);
        expect(getMatches("eightwothree")).toMatchObject({ 0 : "eight", 4 : "two", 7 : "three" });
    });

    test.skip("swap lowest", () => {
        expect(swapLowestMatch("one", { 0 : "one" })).toBe("1");
        expect(swapLowestMatch("oneone", { 0 : "one" })).toBe("1one");
        expect(swapLowestMatch("nine1one", { 0 : "nine", 5 : "one" })).toBe("91one");
        expect(swapLowestMatch("oneeight", { 0 : "one", 3 : "eight" })).toBe("1eight");
        expect(swapLowestMatch("oneight", { 0 : "one", 2 : "eight" })).toBe("1ight");
        expect(swapLowestMatch("eightwothree", { 0 : "eight", 4 : "two", 7 : "three" })).toBe("8wothree");
    });

    test("can swap all", () => {
        Object.entries({
            "threeight" : "t3e8t",
            "fiveight"  : "f5e8t",
            "sevenine"  : "s7n9e",

            // base compounds
            "oneight"   : "1ight",
            "threeight" : "3ight",
            "fiveight"  : "5ight",
            "sevenine"  : "7ine",
            "eightwo"   : "8wo",
            "eighthree" : "8hree",
            "nineight"  : "9ight"
        }).forEach(([ input, expected ]) => {
            expect(swapAllMatches(input)).toBe(expected);
        });
    });

    test("non-swapping", () => {
        [{
            input,
        }, {
            input : output
        }, {
            input    : sample01,
            expected : 142
        }].forEach(({ input : _input, expected }) => {
            const result = sumRows(_input);

            console.log({ result });

            expect(typeof result).toBe("number");

            if (expected) {
                expect(result).toBe(expected);
            }
        });
    });

    test.only("swapping", async () => {
        let result = swapAndSum(input);

        console.log({ result });

        expect(typeof result).toBe("number");
        expect(result).toBeGreaterThan(54095);


        result = swapAndSum(sample02);

        console.log({ result });

        expect(typeof result).toBe("number");
        expect(result).toBe(281);
    });
});
