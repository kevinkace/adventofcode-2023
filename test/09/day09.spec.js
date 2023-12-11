import { expect, test, describe } from "vitest";

import { Day09 } from "../../days/day09.js";

import typedefs from "../../typedefs.js";

import { sample } from "./samples.js";
import { input } from "./input.js";


describe("day 09", () => {
    test("can parse input", () => {
        expect((new Day09(sample)).toString()).toBe(sample);
        expect((new Day09(input)).toString()).toBe(input);
    });
});
