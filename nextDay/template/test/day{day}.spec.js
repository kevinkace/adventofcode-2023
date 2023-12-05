import { readFile }      from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path              from "node:path";

import { expect, test, describe } from "vitest";

import { Day{day} } from "../../days/day{day}.js";

import typedefs from "../../typedefs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const sample = await readFile(path.join(__dirname, "sample.txt"), "utf8");
const input  = await readFile(path.join(__dirname, "input.txt"), "utf8");


describe("day {day}", () => {
    test("can parse input", () => {
        expect((new Day{day}(sample)).toString()).toBe(sample);
        expect((new Day{day}(input)).toString()).toBe(input);
    });
});
