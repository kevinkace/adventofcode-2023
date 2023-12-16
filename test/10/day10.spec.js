import { expect, test, describe } from "vitest";

import { Day10 } from "../../days/day10.js";

import typedefs from "../../typedefs.js";

import { sample, sample3, sample4, sample5 } from "./samples.js";
import { input } from "./input.js";


describe("day 10", () => {
    test("can parse input", () => {
        const sampleInst = new Day10(sample);
        const inputInst = new Day10(input);

        // console.log(JSON.stringify(sampleInst, null, 2));

        expect(sampleInst.toString()).toBe(sample);
        expect(inputInst.toString()).toBe(input);
    });

    test("can find start path", () => {
        const sampleInst = new Day10(sample);

        expect(sampleInst.findStartPos()).toEqual({
            x : 2,
            y : 1,
            from : "left",
            to : "right",
        });
    });

    test("can walk path", () => {
        const sampleInst = new Day10(sample);

        // console.log(sampleInst.walkPath().length);
        expect(sampleInst.walkPath().length).toBe(8);
    });

    test("can walk path", () => {
        const sampleInst = new Day10(input);

        // console.log(sampleInst.walkPath().length / 2);
        expect(sampleInst.walkPath().length / 2).toBe(6786);
    });

    test("can walk path", () => {
        const sampleInst = new Day10(sample4);

        // console.log(sampleInst.walkPath().length / 2);
        console.log(sampleInst.walkPath());
    });

    test.only("get points within", () => {
        // const sample4Inst = new Day10(sample4);

        // // console.log(sampleInst.getPointsWithin());
        // expect(sample4Inst.getPointsWithin()).toBe(1);

        // const sample3Inst = new Day10(sample3);
        // expect(sample3Inst.getPointsWithin()).toBe(4);

        const sample5Inst = new Day10(sample5);
        expect(sample5Inst.getPointsWithin()).toBe(5);
    });
});
