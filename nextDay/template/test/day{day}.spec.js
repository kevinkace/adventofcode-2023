import { expect, test, describe } from "vitest";

import { Day{day} } from "../../days/day{day}.js";

import typedefs from "../../typedefs.js";

import { sample } from "./samples.js";
import { input } from "./input.js";


describe("day {day}", () => {
    test("can parse input", () => {
        expect((new Day{day}(sample)).toString()).toBe(sample);
        expect((new Day{day}(input)).toString()).toBe(input);
    });
});
