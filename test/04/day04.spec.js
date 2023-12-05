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
const sampleGame2 = "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1";


describe("day 04", () => {
    test("can create new Game", () => {
        expect(new Game(sampleGame)).toMatchSnapshot();
        expect(new Game(sampleGame2)).toMatchSnapshot();
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

    test("can stringify", async () => {
        const game = new Game(sampleGame);

        expect(game.toString()).toBe(sampleGame);

        const games = new Games(sample);

        expect(games.toString()).toBe(sample);
    });

    test("answer p1", () => {
        const games = new Games(input);

        const points = games.getTotalPoints();

        expect(points).toBe(26218);
    });

    test("pt 2 sample" , () => {
        const games = new Games(sample);

        const points = games.getTotalCards();

        expect(points).toBe(30);
    });

    test("answer pt 2" , () => {
        const games = new Games(input);

        const points = games.getTotalCards();

        expect(points).toBe(9997537);
    });
});
