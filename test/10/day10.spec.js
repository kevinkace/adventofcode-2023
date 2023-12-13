import { expect, test, describe } from "vitest";

import { Day10 } from "../../days/day10.js";

import typedefs from "../../typedefs.js";

import { sample } from "./samples.js";
import { input } from "./input.js";


describe("day 10", () => {
    test("can parse input", () => {
        const sampleInst = new Day10(sample);
        const inputInst = new Day10(input);

        expect(sampleInst.toString()).toBe(sample);
        expect(inputInst.toString()).toBe(input);
    });
});
