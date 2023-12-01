import { expect, test, describe } from 'vitest'
import { day01, getNums, parseNums } from "../01";

describe("day01", () => {
    test("is a fn", () => {
        expect(typeof day01).toBe("function");
    });

    test("returns the correct value", () => {
        const result = day01();

        console.log(result);
        expect(typeof result).toBe("number");
    });

    test("gets nums from row", () => {
        expect(getNums("abc123")).toEqual(["1", "3"]);
        expect(getNums("abc1")).toEqual(["1", "1"]);
    })

    test("parses nums", () => {
        expect(parseNums([ "1", "3" ])).toEqual(13);
    });
});
