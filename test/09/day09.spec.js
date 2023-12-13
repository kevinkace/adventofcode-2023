import { expect, test, describe } from "vitest";

import { Stacks, Stack } from "../../days/day09.js";

import typedefs from "../../typedefs.js";

import { sample, sample2, sample3 } from "./samples.js";
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

    test("get nexts", () => {
        const sampleStack = new Stacks(sample);

        expect(sampleStack.getNexts()).toEqual([ 18, 28, 68 ]);
    });

    test("get next sum", () => {
        const sampleStack = new Stacks(sample);

        expect(sampleStack.getNextsSum()).toBe(114);
    });

    test("p1 answer", () => {
        const stack = new Stacks(input);

        // console.log(stack.getNextsSum());
        expect(stack.getNextsSum()).toBe(1696140818);
    });

    test("get prev", () => {
        const sampleStack = new Stack(sample3);

        expect(sampleStack.getPrev()).toBe(5);
    });

    test("get prevs", () => {
        const sampleStack = new Stacks(sample);

        expect(sampleStack.getPrevs()).toEqual([ -3, 0, 5 ]);
    });

    test("get prev sum", () => {
        const sampleStack = new Stacks(sample);

        expect(sampleStack.getPrevsSum()).toBe(2);
        // console.log(sampleStack.getPrevsSum());
    });

    test("p2 answer", () => {
        const stack = new Stacks(input);

        // console.log(stack.getPrevsSum());
        expect(stack.getPrevsSum()).toBe(1152);
    });
});
