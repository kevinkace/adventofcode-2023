import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath }       from "node:url";
import path                    from "node:path";

import { expect, test, describe } from "vitest";

import { parse } from "../../days/day02.js";

import typedefs from "../../typedefs.js";

import { Regions, sumIntegersAdjacentToSymbols, testCollision } from "../../days/day03.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const input    = await readFile(path.join(__dirname, "input.txt"), "utf8");
const sample01 = await readFile(path.join(__dirname, "sample01.txt"), "utf8");
const sample01Small = await readFile(path.join(__dirname, "sample01-small.txt"), "utf8");
const inputSmall = await readFile(path.join(__dirname, "input-small.txt"), "utf8");

import { samples } from "./samples.js";


describe("day 03", () => {
    // test("can parse input", () => {
    //     expect(parse(sample01)).toMatchSnapshot();
    // });

    test("can detect collisions", () => {
        expect(testCollision(
            { x1: 1, y1: 1, x2: 4, y2: 4 },
            { x1: 3, y1: 3, x2: 6, y2: 6 }
        )).toBe(true);
        expect(testCollision(
            { x1: 1, y1: 1, x2: 2, y2: 2 },
            { x1: 3, y1: 3, x2: 6, y2: 6 }
        )).toBe(false);
    });

    test("can get numbers", () => {
        const regions = new Regions(sample01);

        expect(regions).toMatchSnapshot();
    });

    test("gets collisions", () => {
        const regions = new Regions(sample01);

        expect(regions.getCollisions()).toMatchSnapshot();
    });

    test("answer pt 1", () => {
        let regions = new Regions(sample01);

        expect(regions.sumCollisions()).toEqual(4361);

        regions = new Regions(input);
        // const collisions = regions.getCollisions();
        const sum = regions.sumCollisions();
        // console.log("my sum: " + sum);
        // console.log(regions.regions.slice(80));
        expect(sum).toBeLessThan(3012388);
        expect(sum).toBeGreaterThan(43211);
        expect(sum).toBeGreaterThan(553499);
        expect(sum === 553585).toBe(false);
        expect(sum).toMatchSnapshot();
    });

    test.skip("med input", () => {
        let regions = new Regions(inputSmall);
        expect(regions.regions).toMatchSnapshot();
        expect(regions.specials).toMatchSnapshot();
        const collisions = regions.getCollisions();

        const sum = collisions.reduce((acc, curr) => {
            return acc + curr.number;
        }, 0);

        console.log(sum);
    });

    test.skip("samples", () => {
        samples.forEach(sample => {
            const regions = new Regions(sample);

            console.log(regions.sumCollisions());
        });
    });

    test("p2 sample", () => {
        const regions = new Regions(sample01);

        expect(regions.getGearRatios()).toMatchSnapshot();

        expect(regions.sumGearRatios()).toEqual(467835);
    });

    test("answer pt 2", () => {
        const regions = new Regions(input);

        expect(regions.sumGearRatios()).toMatchSnapshot();
    });
});
