import { readFile }      from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path              from "node:path";

import { expect, test, describe } from "vitest";

import { Game, Games } from "../../days/day04.js";

import typedefs from "../../typedefs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const sample = await readFile(path.join(__dirname, "sample.txt"), "utf8");
const input  = await readFile(path.join(__dirname, "input.txt"), "utf8");

const sampleGame = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";


describe("day 04", () => {
    test("can create new Game", () => {
        expect(new Game(sampleGame)).toMatchSnapshot();
    });

    test("can get game wins", () => {
        const game = new Game(sampleGame);

        expect(game.getWon()).toMatchSnapshot();
    });

    test("can get game score", () => {
        const game = new Game(sampleGame);

        expect(game.getScore()).toEqual(8);
    });

    test("can create new Games", () => {
        expect(new Games(sample)).toMatchSnapshot();
    });

    test("can get total wins", () => {
        const games = new Games(sample);

        expect(games.getTotalWins()).toMatchSnapshot();
    });

    test("can get total points", () => {
        const games = new Games(sample);

        expect(games.getTotalPoints()).toEqual(13);
    });

    test("answer p1", () => {
        const games = new Games(input);

        const points = games.getTotalPoints();

        console.log(points);
        expect(points).toBeLessThan(26478)
    });
});
