import { readFile }      from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path              from "node:path";

import { expect, test, describe } from "vitest";

import { Network, BinaryTree, Network2 } from "../../days/day08.js";

import typedefs from "../../typedefs.js";

import { sample, sample2, sample3, sample4 } from "./samples.js";

import { input } from "./input.js";


describe("day 08", () => {
    test("can binary tree", () => {
        const network = new Network(sample);
        // console.log(network.binTree.nodes);
        // network.log();
        // console.log(bt.toString());

        expect(network.toString()).toEqual(sample);
    });

    test("can walk tree", () => {
        const network = new Network(sample);
        const iterations = network.walkTree();

        expect(iterations).toEqual(2);
    });

    test("can walk loopy tree", () => {
        const network = new Network(sample2);
        const iterations = network.walkTree();

        expect(iterations).toEqual(6);
    });

    test("answer p1", () => {
        const network = new Network(input);
        const iterations = network.walkTree();

        expect(iterations).toEqual(22411);
    });

    // test("can walk tree 2", () => {
    //     const network = new Network2(sample3);
    //     const allIterations = network.getAllIterations();

    //     // console.log((allIterations));

    //     console.log(network.getLowestCommonPath());
    // });

    // test("answer p2 sample", () => {

    //     const network = new Network2(sample3);
    //     const lowestCommonPath = network.getLowestCommonPath();

    //     expect(lowestCommonPath).toEqual(6);
    // });
});
