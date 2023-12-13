import { expect, test, describe } from "vitest";

import { Day{day} } from "../../days/day{day}.js";

import typedefs from "../../typedefs.js";

import { sample } from "./samples.js";
import { input } from "./input.js";


describe("day {day}", () => {
    test("can parse input", () => {
        const sampleInst = new Day{day}(sample);
        const inputInst = new Day{day}(input);

        expect(sampleInst.toString()).toBe(sample);
        expect(inputInst.toString()).toBe(input);
    });
});
