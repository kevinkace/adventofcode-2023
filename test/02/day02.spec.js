import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath }       from "node:url";
import path                    from "node:path";

import { expect, test, describe } from "vitest";

import { parseGames, validateGame, sumValidateGames, fewestGameCubes, powerCubes } from "../../days/day02.js";

import typedefs from "../../typedefs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const input    = await readFile(path.join(__dirname, "input.txt"), "utf8");
const sample01 = await readFile(path.join(__dirname, "sample01.txt"), "utf8");


/** @type  */
const availCubes = {
    red   : 12,
    green : 13,
    blue  : 14
};

describe("day 02", () => {
    test("can parse input", () => {
        expect(parseGames(sample01)).toMatchSnapshot();
    });

    test("can validate a game", () => {
        const parsed = parseGames(sample01);
        const results = [ true, true, false, false, true ];

        parsed.forEach((game, idx) => {
            expect(validateGame(game, availCubes)).toBe(results[idx]);
        });
    });

    test("answer part 1", () => {
        let parsed = parseGames(sample01);
        let result = sumValidateGames(parsed, availCubes);

        expect(result).toBe(8);

        parsed = parseGames(input);
        result = sumValidateGames(parsed, availCubes);

        expect(result).toMatchSnapshot();
    });

    test("can get fewest cubes for 1 game", () => {
        const parsed = parseGames(sample01);
        const result = fewestGameCubes(parsed[0]);

        expect(result).toMatchSnapshot();
    });

    test("can get fewest cubes for all games", () => {
        const parsed = parseGames(sample01);
        const result = parsed.map(fewestGameCubes);

        expect(result).toMatchSnapshot();
    });

    test('can power cubes', () => {
        const parsed = parseGames(sample01);
        const result = parsed
            .map(fewestGameCubes)
            .map(powerCubes);

        expect(result).toMatchSnapshot();
    });

    test('answer part 2', () => {
        let parsed = parseGames(sample01);
        let result = parsed
            .map(fewestGameCubes)
            .map(powerCubes)
            .reduce((sum, cubes) => sum + cubes, 0);

        expect(result).toEqual(2286);

        parsed = parseGames(input);
        result = parsed
            .map(fewestGameCubes)
            .map(powerCubes)
            .reduce((sum, cubes) => sum + cubes, 0);

        expect(result).toMatchSnapshot();
    });
});
