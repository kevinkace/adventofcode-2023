import { eol } from "../consts";

export class BinaryTree {
    constructor(map) {
        this.nodes = map.split(eol).reduce((acc, line, idx) => {
            const [ _, value, L, R ] = line.match(/(\w{3}) = \((\w{3}), (\w{3})\)/);

            acc[value] = { L, R};

            return acc;
        }, {});
    }

    toString() {
        return Object.entries(this.nodes).reduce((acc, [ value, { L, R } ]) => {
            return acc + `${value} = (${L}, ${R})${eol}`;
        }, "").trim();
    }

    log() {
        console.table(this.nodes);
    }

    getChild(node, LR) {
        // console.log(node);
        return this.nodes[node][LR];
    }
}

export class Network {
    constructor(str) {
        this.str = str;
        const [ instructions, map ] = str.split(`${eol}${eol}`);

        this.instructions = instructions.split("");
        this.binTree = new BinaryTree(map);
    }

    parse() {
        return this.lines.map(line => line.split(" "));
    }

    toString() {
        return [ this.instructions.join(""), this.binTree.toString() ].join(`${eol}${eol}`);
    }

    walkTree(head = "AAA", tail = "ZZZ") {
        let instIdx = 0;
        let currNode = head;
        let iterations = 0;

        const MAX_ITERATIONS = 100000;

        // console.log({ currNode });

        while (currNode !== tail && iterations < MAX_ITERATIONS) {
            iterations++;
            const instruction = this.instructions[instIdx];

            // console.log({currNode, instruction});
            instIdx = instIdx >= this.instructions.length - 1 ? 0 : instIdx + 1;

            currNode = this.binTree.getChild(currNode, instruction);
            // console.log({ currNode });
        }

        return iterations;
    }

    log() {
        console.log({ instructions : this.instructions.join("")});
        this.binTree.log();
    }
}

export class Network2 extends Network {
    constructor(str) {
        super(str);

        const nodeKeys = Object.keys(this.binTree.nodes);

        this.aNodes = nodeKeys.filter(node => node.includes("A"));
        this.zNodes = nodeKeys.filter(node => node.includes("Z"));
    }

    walkTree(head = "AAA", tail = "ZZZ", { log = false } = {}) {
        let instIdx = 0;
        let currNode = head;
        let iterations = 0;
        let zIterations = []

        const MAX_ITERATIONS = 1000000;

        log && console.log({ head, tail });

        while (currNode !== tail && iterations < MAX_ITERATIONS) {
            iterations++;

            const instruction = this.instructions[instIdx];

            // increment instruction idx but clamp
            instIdx = instIdx >= this.instructions.length - 1 ? 0 : instIdx + 1;

            currNode = this.binTree.getChild(currNode, instruction);
            if (currNode[2] === "Z") {
                zIterations.push(iterations);
            }

            log && console.log({ currNode });
        }

        return { iterations, zIterations};
    }

    getAllIterations(opts) {
        const allIterations = {};

        this.aNodes.forEach(aNode => {
            const {iterations, zIterations } = this.walkTree(aNode, "ZZZ", opts);

            allIterations[aNode] = {iterations, zIterations };
        });

        return allIterations;
    }

    getLowestCommonPath() {
        const allIterations = this.getAllIterations();

        console.log(allIterations);

        const allZIterations = Object.values(allIterations).map(({ zIterations }) => zIterations);

        const allZIterationsSorted = allZIterations.sort((a, b) => a.length - b.length);

        const lowestZIterations = allZIterationsSorted.shift();

        const lowest = lowestZIterations.find(zIteration => {
            return allZIterations.find(allZs => allZs.includes(zIteration));
        });

        return lowest;

        // lowestZIterations.forEach(zIteration => {
        //     const zIteration = allZIterations.find(zIterations => zIterations.includes(zIteration));
        // });
    }
}
