import { expect, test, describe } from 'vitest'
import { p1, getNums, parseNums, numSwap, p2, getMatches, swapLowestMatch, swapAllMatches } from "../01";

describe("day 01", () => {
    test("is a fn", () => {
        expect(typeof p1).toBe("function");
    });

    test("gets nums from row", () => {
        expect(getNums("abc123")).toEqual(["1", "3"]);
        expect(getNums("abc1")).toEqual(["1", "1"]);
    })

    test("parses nums", () => {
        expect(parseNums([ "1", "3" ])).toEqual(13);
    });

    test("returns the correct value", () => {
        const result = p1();

        console.log(result);
        expect(typeof result).toBe("number");
    });

    test("can num swap", () => {
        expect(numSwap("one")).toBe("1");
        expect(numSwap("oneone")).toBe("11");
        expect(numSwap("one1one\ntwo")).toBe("111\n2");
        // expect(numSwap("eightwothree")).toBe("8wo3");
    });

    test("can get matches", () => {
        expect(getMatches("one")).toMatchObject({ 0 : "one" });
        expect(getMatches("oneone")).toMatchObject({ 0 : "one" });
        expect(getMatches("nine1one")).toMatchObject({ 0 : "nine", 5 : "one" });
        expect(getMatches("oneeight")).toMatchObject({ 0 : "one", 3 : "eight" });
        expect(getMatches("oneight")).toMatchObject({ 0 : "one", 2 : "eight" });
        expect(getMatches("asdf")).toBe(false);
        expect(getMatches("eightwothree")).toMatchObject({ 0 : "eight", 4 : "two", 7 : "three" });
    });

    test("swap lowest", () => {
        expect(swapLowestMatch("one", { 0 : "one" })).toBe("1");
        expect(swapLowestMatch("oneone", { 0 : "one" })).toBe("1one");
        expect(swapLowestMatch("nine1one", { 0 : "nine", 5 : "one" })).toBe("91one");
        expect(swapLowestMatch("oneeight", { 0 : "one", 3 : "eight" })).toBe("1eight");
        expect(swapLowestMatch("oneight", { 0 : "one", 2 : "eight" })).toBe("1ight");
        expect(swapLowestMatch("eightwothree", { 0 : "eight", 4 : "two", 7 : "three" })).toBe("8wothree");
    });

    test("can swap all", () => {
        expect(swapAllMatches("one")).toBe("1");
        expect(swapAllMatches("oneone")).toBe("11");
        expect(swapAllMatches("one1one\ntwo")).toBe("111\n2");
        expect(swapAllMatches("eightwothree")).toBe("8wo3");
        expect(swapAllMatches("abcone2threexyz")).toBe("abc123xyz");
        expect(swapAllMatches("xtwone3four")).toBe("x2ne34");
        expect(swapAllMatches("4nineeightseven2")).toBe("49872");
        expect(swapAllMatches("zoneight234")).toBe("z1ight234");
        expect(swapAllMatches("7pqrstsixteen")).toBe("7pqrst6teen");
    });

    test("returns the correct value", () => {
        const result = p2();

        console.log(result);
        expect(typeof result).toBe("number");
    });
});
