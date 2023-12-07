import { readFile }      from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path              from "node:path";

import { expect, test, describe } from "vitest";

import { Games, Games2 } from "../../days/day06.js";

import typedefs from "../../typedefs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const sample = await readFile(path.join(__dirname, "sample.txt"), "utf8");
const input  = await readFile(path.join(__dirname, "input.txt"), "utf8");


describe("day 06", () => {
    test("can parse input", () => {
        const sampleRaces = new Games(sample);
        const races       = new Games(input);

        const sampleString = sampleRaces.toString();

        expect(sampleString).toMatchSnapshot();
        expect(races.toString()).toMatchSnapshot();
    });

    test("can get winning", () => {
        const sampleRaces = new Games(sample);

        expect(sampleRaces.getNumberWinning()).toMatchSnapshot();
    });

    test("product of number winning", () => {
        const sampleRaces = new Games(sample);

        const productOfWinning = sampleRaces.getProductOfWinning();

        expect(productOfWinning).toBe(288);
    });

    test("answer p1", () => {
        const races = new Games(input);

        const productOfWinning = races.getProductOfWinning();

        expect(productOfWinning).toBe(1195150);
    });

    test("can parse v2", () => {
        const sampleRaces = new Games2(sample);

        expect(sampleRaces.getProductOfWinning()).toBe(71503);
    });

    // this takes a long time!!!
    test("answer p2", () => {
        const races = new Games2(input);

        const productOfWinning = races.getProductOfWinning();

        expect(races.races).toMatchSnapshot();

        // console.log({productOfWinning})

        expect(productOfWinning).toBe(42550411);
    });
});
