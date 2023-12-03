import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath }       from "node:url";
import path                    from "node:path";

import { expect, test, describe } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const input    = await readFile(path.join(__dirname, "input.txt"), "utf8");
const sample01 = await readFile(path.join(__dirname, "sample01.txt"), "utf8");
// const sample02 = await readFile(path.join(__dirname, "sample02.txt"), "utf8");

import { parseGames } from "../../days/day02.js";

describe("day 02", () => {
    test("can parse input", () => {
        expect(parseGames(sample01)).toMatchSnapshot();
    });
});
