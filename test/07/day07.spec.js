import { readFile }      from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path              from "node:path";

import { expect, test, describe } from "vitest";

import { Games } from "../../days/day07.js";

import typedefs from "../../typedefs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const sample = await readFile(path.join(__dirname, "sample.txt"), "utf8");
const input  = await readFile(path.join(__dirname, "input.txt"), "utf8");


describe("day 07", () => {
    test("can parse input", () => {
        const sampleGame = new Games(sample);
        // const inputGame = new Games(input);

        console.log(JSON.stringify(sampleGame, null, 2));
        // expect(sample).toString()).toBe(sample);
        // expect(input).toString()).toBe(input);
    });

    test("can group cards", () => {
        const sampleGames = new Games(sample);

        // expect(sampleGames.getGroupCards()).toMatchSnapshot();

        // console.log(sampleGames.rounds);
    });
});
