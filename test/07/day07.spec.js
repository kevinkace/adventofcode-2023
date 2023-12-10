import { readFile }      from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path              from "node:path";

import { expect, test, describe } from "vitest";

import { Games, Games2 } from "../../days/day07.js";

import typedefs from "../../typedefs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const sample = await readFile(path.join(__dirname, "sample.txt"), "utf8");
const sample2 = await readFile(path.join(__dirname, "sample-2.txt"), "utf8");
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

        expect(game.getTotalWinnings()).toBe(250120186);
    });

    test("sample answer p2", () => {
        const game = new Games2(sample);

        expect(game.getTotalWinnings()).toBe(5905);
    });

    test.only("can sort bets sample 2", () => {
        const sampleGame = new Games(sample2);
        const sortedBets = sampleGame.getSortedBets();
        const sortedHands = sampleGame.getSortedHands();

        // console.log(sortedBets);
        // console.log(sampleGame);
        console.table(sortedHands);
        console.table(sortedHands.map(({ grouped }) => grouped));
        console.log(sortedHands.map(({ grouped }) => grouped));

        expect(sortedBets).toMatchSnapshot();
    });

    test("sample answer p2", () => {
        const game = new Games2(input);

        const totalWinnings = game.getTotalWinnings();

        console.log(totalWinnings);

        expect(game.getTotalWinnings()).toBeGreaterThan(250498339);
        expect(game.getTotalWinnings()).toBeLessThan(250665479);
        // expect(game.getTotalWinnings()).toBe(5905);
    });
});
