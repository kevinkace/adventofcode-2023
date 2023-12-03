import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath }       from "node:url";
import path                    from "node:path";

import { expect, test, describe } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const input    = await readFile(path.join(__dirname, "input.txt"), "utf8");
const output   = await readFile(path.join(__dirname, "output.txt"), "utf8");
const sample01 = await readFile(path.join(__dirname, "sample01.txt"), "utf8");
const sample02 = await readFile(path.join(__dirname, "sample02.txt"), "utf8");

import { getNum, swapAndSum, getMatches, swapLowestMatch, swapAllMatches, sumRows, swapAllMatches2 } from "../../01";

describe("day 01", () => {
    test("gets nums from row", () => {
        expect(getNum("abc123")).toEqual([ "1", "3" ]);
        expect(getNum("abc1")).toEqual([ "1", "1" ]);
    });

    test("can num swap", () => {
        expect(swapAndSum("one")).toBe("1");
        expect(swapAndSum("oneone")).toBe("11");
        expect(swapAndSum("one1one\ntwo")).toBe("111\n2");
        // expect(numSwap("eightwothree")).toBe("8wo3");
    });

    test.skip("can get matches", () => {
        expect(getMatches("one")).toMatchObject({ 0 : "one" });
        expect(getMatches("oneone")).toMatchObject({ 0 : "one" });
        expect(getMatches("nine1one")).toMatchObject({ 0 : "nine", 5 : "one" });
        expect(getMatches("oneeight")).toMatchObject({ 0 : "one", 3 : "eight" });
        expect(getMatches("oneight")).toMatchObject({ 0 : "one", 2 : "eight" });
        expect(getMatches("asdf")).toBe(false);
        expect(getMatches("eightwothree")).toMatchObject({ 0 : "eight", 4 : "two", 7 : "three" });
    });

    test.skip("swap lowest", () => {
        expect(swapLowestMatch("one", { 0 : "one" })).toBe("1");
        expect(swapLowestMatch("oneone", { 0 : "one" })).toBe("1one");
        expect(swapLowestMatch("nine1one", { 0 : "nine", 5 : "one" })).toBe("91one");
        expect(swapLowestMatch("oneeight", { 0 : "one", 3 : "eight" })).toBe("1eight");
        expect(swapLowestMatch("oneight", { 0 : "one", 2 : "eight" })).toBe("1ight");
        expect(swapLowestMatch("eightwothree", { 0 : "eight", 4 : "two", 7 : "three" })).toBe("8wothree");
    });

    test("can swap all", () => {
        Object.entries({
            "threeight" : "t3e8t",
            "fiveight" : "f5e8t",
            "sevenine" : "s7n9e",
        }).forEach(([ input, expected ]) => {
            expect(swapAllMatches2(input)).toBe(expected);
        });
    });

    test.skip("can swap all", () => {
        Object.entries({
            // base compounds
            "oneight" : "1ight",
            "threeight" : "3ight",
            "fiveight" : "5ight",
            "sevenine" : "7ine",
            "eightwo" : "8wo",
            "eighthree" : "8hree",
            "nineight" : "9ight"



            // one                : "1",
            // oneone             : "11",
            // eightwothree       : "8wo3",
            // abcone2threexyz    : "abc123xyz",
            // xtwone3four        : "x2ne34",
            // "4nineeightseven2" : "49872",
            // zoneight234        : "z1ight234",
            // "7pqrstsixteen"    : "7pqrst6teen",
            // oneoneone          : "111",

            // four82nine74                          : "482974",
            // hlpqrdh3                              : "hlpqrdh3",
            // eightsevenhrsseven988                 : "87hrs7988",
            // "324pzonenine"                        : "324pz19",
            // fglpbone79fourvrgcmgklbmthree         : "fglpb1794vrgcmgklbm3",
            // fmbbkvthdcdmcjxzclk42six4             : "fmbbkvthdcdmcjxzclk4264",
            // four22xcqsnvktnpfshtmm                : "422xcqsnvktnpfshtmm",
            // qmfsccxsixfivelnmpjqjcsc1sixpfpmeight : "qmfsccx65lnmpjqjcsc16pfpm8",
            // eight1nine5nine9six                   : "8195996",
            // s4r91seven                            : "s4r917",
            // "6pspkslrnxpplkhgqlcqfour"            : "6pspkslrnxpplkhgqlcq4",
            // sixeightnzrzgjvsrnmtqgx5              : "68nzrzgjvsrnmtqgx5",
            // sixtwo1                               : "621",
            // h6                                    : "h6",
            // five8pbcsllrbvg787                    : "58pbcsllrbvg787",
            // dpfhfeight28onefourtwo                : "dpfhf828142",
            // vxqbtkxjtwoz3seven                    : "vxqbtkxj2z37",
            // "8ksrcjrcmpbq9rtvtvrbgljzqvbnxddnzt"  : "8ksrcjrcmpbq9rtvtvrbgljzqvbnxddnzt",
            // mpftpsgp6fourvdmltwojd9               : "mpftpsgp64vdml2jd9",
            // "2fivetwosix"                         : "2526",
            // "3qqx2"                               : "3qqx2",
            // jsbdh16snnllpvvgnggfive5nhjpgdzh      : "jsbdh16snnllpvvgngg55nhjpgdzh",
            // "4fmgmmbonegtsnqfdqt1pm"              : "4fmgmmb1gtsnqfdqt1pm",
            // threeighthree                         : "3igh3",
            // four1six                              : "416",
            // sdsevenine                            : "sd7ine"
            // 2onendvlmcrvzsnpr83nine
            // 8ninelfhkhnqtdfour
            // 8reight
            // 84gnprjhr3eightsixsix
            // 1nc7two
            // 3zcgkgrnd1d4
            // nmfqfivervqkxmkdpnine51
            // 1fdtrptkb3
            // nineone7kks
            // ninelzgncpeight966427
            // eightrsniner9
            // nine7two4
        }).forEach(([ input, expected ]) => {
            expect(swapAllMatches(input)).toBe(expected);
        });
    });

    test("non-swapping", () => {
        [{
            input,
        }, {
            input : output
        }, {
            input    : sample01,
            expected : 142
        }].forEach(({ input : _input, expected }) => {
            const result = sumRows(_input);

            console.log({ result });

            expect(typeof result).toBe("number");

            if (expected) {
                expect(result).toBe(expected);
            }
        });
    });

    test.only("swapping", async () => {
        let result = swapAndSum(input);

        console.log({ result });

        expect(typeof result).toBe("number");
        expect(result).toBeGreaterThan(54095);


        result = swapAndSum(sample02);

        console.log({ result });

        expect(typeof result).toBe("number");
        expect(result).toBe(281);
    });
});
