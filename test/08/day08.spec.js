import { readFile }      from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path              from "node:path";

import { expect, test, describe } from "vitest";

import { Network, BinaryTree } from "../../days/day08.js";

import typedefs from "../../typedefs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const sample = await readFile(path.join(__dirname, "sample.txt"), "utf8");
const sample2 = await readFile(path.join(__dirname, "sample-2.txt"), "utf8");
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

    test.only("answer p1", () => {
        const network = new Network(input);
        const iterations = network.walkTree();

        console.log(iterations);
        expect(iterations).toBeGreaterThan(101);
        // expect(iterations).toEqual(6);
    });
});
