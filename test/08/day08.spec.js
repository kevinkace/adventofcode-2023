import { readFile }      from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path              from "node:path";

import { expect, test, describe } from "vitest";

import { Network, BinaryTree, Network2, lcm } from "../../days/day08.js";

import typedefs from "../../typedefs.js";

import { sample, sample2, sample3, sample4 } from "./samples.js";

import { input } from "./input.js";


describe("day 08", () => {
    test("p1 - can binary tree", () => {
        const network = new Network(sample);
        // console.log(network.binTree.nodes);
        // network.log();
        // console.log(bt.toString());

        expect(network.toString()).toEqual(sample);
    });

    test("p1 - can walk tree", () => {
        const network = new Network(sample);
        const iterations = network.walkTree();

        expect(iterations).toEqual(2);
    });

    test("p1 - can walk loopy tree", () => {
        const network = new Network(sample2);
        const iterations = network.walkTree();

        expect(iterations).toEqual(6);
    });

    test("p1 - answer p1", () => {
        const network = new Network(input);
        const iterations = network.walkTree();

        expect(iterations).toEqual(22411);
    });

    test("p2 - can walk tree 2", () => {
        const network = new Network2(sample3);
        const getFirstEndZ = network.getFirstEndZ();

        // console.log((allIterations));

        console.log({getFirstEndZ});
    });

    test("p2 - get first z product", () => {
        const network = new Network2(sample3);
        const firstZProduct = network.getFirstZProduct();

        console.log({ firstZProduct });
    });

    test("p1 - answer p1", () => {
        const network = new Network2(input);
        const aToZ = network.getAtoZ();
        // const getFirstEndZ = network.getFirstEndZ();
        // const firstZProduct = network.getFirstZProduct();

        console.log({ aToZ });
        // console.log({ getFirstEndZ, firstZProduct });
    });

    test("p2 - all end in z", () => {
        const network = new Network2(sample3);
        const allEndInZ = network.getAllEndInZ();

        console.log(allEndInZ);

    });

    test("p2 - all end in z", () => {
        const network = new Network2(sample3);
        const allEndInZ = network.getAllEndInZ();

        console.log(allEndInZ);

    });

    test("p2 - answer", () => {
        const network = new Network2(input);
        const firstEndInZ = network.getFirstEndZ();

        // console.log({firstEndInZ});

        const theLcm = lcm(Object.values(firstEndInZ));

        // console.log(theLcm);

        expect(theLcm).toEqual(11188774513823);

    });
});
