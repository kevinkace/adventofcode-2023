import { readFile }      from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path              from "node:path";

import { expect, test, describe } from "vitest";

import { Network, BinaryTree, Network2 } from "../../days/day08.js";

import typedefs from "../../typedefs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const sample = await readFile(path.join(__dirname, "sample.txt"), "utf8");
const sample2 = await readFile(path.join(__dirname, "sample-2.txt"), "utf8");
const sample3 = await readFile(path.join(__dirname, "sample-3.txt"), "utf8");
const input  = await readFile(path.join(__dirname, "input.txt"), "utf8");


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

    test("can walk tree 2", () => {
        const network = new Network2(sample3);
        const allIterations = network.getAllIterations();

        // console.log((allIterations));

        console.log(network.getLowestCommonPath());
    });

    test("answer p2 sample", () => {

        const network = new Network2(sample3);
        const lowestCommonPath = network.getLowestCommonPath();

        expect(lowestCommonPath).toEqual(6);
    });

    test.only("answer p2", () => {

        const network = new Network2(input);
        const lowestCommonPath = network.getLowestCommonPath();

        console.log({ lowestCommonPath });
    });
});
