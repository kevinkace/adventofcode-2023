import { expect, test, describe } from "vitest";

import { Stacks, Stack } from "../../days/day09.js";

import typedefs from "../../typedefs.js";

import { sample, sample2 } from "./samples.js";
import { input } from "./input.js";


describe("day 09", () => {
    test("can parse input", () => {
        // const btree = new Btrees(input);
        const sampleStack = new Stack(sample2);

        // console.log(JSON.stringify(btree, null, 4));

        // console.log(`>${sampleStack.toString()}<`);

        // expect((btree).toString()).toBe(input);
        expect(sampleStack.toString()).toBe(sample2);
    });

    test("can build stacks to 0", () => {
        const sampleStack = new Stack(sample2);

        expect(sampleStack.toString()).toBe(sample2);

        // console.log(JSON.stringify(sampleStack.buildStacksToZero().map(stack => stack.getValues()), null, 4));
    });

    test("get next", () => {
        const sampleStack = new Stack(sample2);

        expect(sampleStack.getNext()).toBe(18);
    });

    test("get next", () => {
        const sampleStack = new Stacks(sample);

        expect(sampleStack.getNexts()).toEqual([ 18, 28, 68 ]);
    });

    test("get next", () => {
        const sampleStack = new Stacks(sample);

        expect(sampleStack.getNextsSum()).toBe(114);
    });

    test("p1 answer", () => {
        const stack = new Stacks(input);

        console.log(stack.getNextsSum());
    });
});
