import { readFile, writeFile }      from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path              from "node:path";

import { Almanac3 } from '../../days/day05.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const input  = await readFile(path.join(__dirname, "input.txt"), "utf8");


const almanac = new Almanac3(input);

//    almanac.iterateAllSeedTouples();
const lowest = almanac.getLowestSeedDest();

console.log(lowest);

// const minFinalDest = almanac.getMinFinalDestForAllSeeds();

// console.log({minFinalDest});
