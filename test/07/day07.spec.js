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

        expect(sampleGame.toString()).toBe(sample);
    });

    test("can sort games", () => {
        const sampleGame = new Games(sample);

        expect(sampleGame.getSortedHands()).toMatchSnapshot();;
    });

    test("can sort bets", () => {
        const sampleGame = new Games(sample);

        expect(sampleGame.getSortedBets()).toMatchSnapshot();;
    });

    test("can get total winnings", () => {
        const sampleGame = new Games(sample);

        expect(sampleGame.getTotalWinnings()).toBe(6440);
    });

    test("answer p1", () => {
        const game = new Games(input);

        expect(game.getTotalWinnings()).toMatchSnapshot();
    });
});
