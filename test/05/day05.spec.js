import { readFile, writeFile }      from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path              from "node:path";

import { expect, test, describe } from "vitest";

import { Almanac } from "../../days/day05.js";

import typedefs from "../../typedefs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const sample = await readFile(path.join(__dirname, "sample.txt"), "utf8");
const input  = await readFile(path.join(__dirname, "input.txt"), "utf8");

const map = [
    [ 45, 10, 7 ],
    [ 65, 45, 10 ],
    [ 8, 24, 3 ],
    [ 19, 80, 18 ],
];
const map2 = [
    [ 45, 10, 7 ],
    [ 65, 45, 10 ],
    [ 65, 24, 3 ],
    [ 65, 80, 18 ],
];


describe("day 05", () => {
    test("can parse input", async () => {

        // await writeFile(path.join(__dirname, "sample.out.txt"), almanac.toString());

        const sampleAlmanac = new Almanac(sample);

        expect(sampleAlmanac.toString()).toBe(sample);


        const almanac = new Almanac(input);

        expect(almanac.toString()).toBe(input);
    });

    test("can find map", () => {

        expect(Almanac._findMap(12, map)).toEqual(map[0]);
        expect(Almanac._findMap(45, map)).toEqual(map[1]);
        expect(Almanac._findMap(25, map)).toEqual(map[2]);
        expect(Almanac._findMap(90, map)).toEqual(map[3]);
        expect(Almanac._findMap(9, map)).toEqual();
    });

    test("can get dest from map", () => {
        expect(Almanac._getDestFromMap(12, [ 45, 10, 7 ])).toBe(47);
        expect(Almanac._getDestFromMap(12, [ 45, 12, 7 ])).toBe(45);
        expect(Almanac._getDestFromMap(12, [ 45, 10, 2 ])).toBe(47);
        expect(Almanac._getDestFromMap(12, [ 45, 10, 7 ])).toBe(47);
    });

    test("get dest", () => {
        expect(Almanac._getDest(12, map)).toBe(47);
        expect(Almanac._getDest(45, map)).toBe(65);
        expect(Almanac._getDest(25, map)).toBe(9);
        expect(Almanac._getDest(90, map)).toBe(29);
        expect(Almanac._getDest(9, map)).toBe(9);
        expect(Almanac._getDest(100, map)).toBe(100);
    });

    test("get final dest", () => {
        expect(Almanac._getFinalDestFromMaps(12, [ map, map2 ])).toBe(67);
    });

    test("get final dest for all seeds", () => {
        const almanac = new Almanac(sample);

        expect(almanac.getFinalDestForAllSeeds()).toEqual([ 82, 43, 86, 35 ]);
    });

    test("answer p1", () => {
        const almanac = new Almanac(input);

        const minFinalDest = almanac.getMinFinalDestForAllSeeds();

        expect(minFinalDest).toBe(107430936);
    });
});
