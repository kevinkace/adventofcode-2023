import { getEol } from "../consts";

export class BinaryTree {
    constructor(map) {
        this.eol = getEol(map);
        this.nodes = map.split(this.eol).reduce((acc, line, idx) => {
            const [ _, value, L, R ] = line.match(/(\w{3}) = \((\w{3}), (\w{3})\)/);

            acc[value] = { L, R};

            return acc;
        }, {});
    }

    toString() {
        return Object.entries(this.nodes).reduce((acc, [ value, { L, R } ]) => {
            return acc + `${value} = (${L}, ${R})${this.eol}`;
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
        this. eol = getEol(str);
        this.str = str;
        const [ instructions, map ] = str.split(`${this.eol}${this.eol}`);

        this.instructions = instructions.split("");
        this.binTree = new BinaryTree(map);
    }

    parse() {
        return this.lines.map(line => line.split(" "));
    }

    toString() {
        return [ this.instructions.join(""), this.binTree.toString() ].join(`${this.eol}${this.eol}`);
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

        this.aNodes = Object.keys(this.binTree.nodes).filter(node => node.endsWith("A"));

        this.instrIdx = 0;
    }

    getNextInstr() {
        const instruction = this.instructions[this.instrIdx];

        this.instrIdx++;

        if (this.instrIdx >= this.instructions.length) {
            this.instrIdx = 0;
        }

        return instruction;
    }

    multiWalkTree(nodes, cb) {
        let currNodes = [ ...nodes ];

        let iterations = 0;
        const MAX_ITERATIONS = 20000000;

        while (iterations < MAX_ITERATIONS && cb(currNodes, iterations)) {
            // console.log("iteration");

            iterations++;

            const instruction = this.getNextInstr();
            currNodes = currNodes.map(node => this.binTree.getChild(node, instruction));
        }

        return iterations < MAX_ITERATIONS;
    }

    getAllEndInZ() {
        let iterations;
        // console.log({aNodes : this.aNodes});

        const aNodes = this.aNodes.slice(0, 3);
        // console.log({aNodes});
        const success = this.multiWalkTree(aNodes, (nodes, _iterations) => {
            // console.log({nodes});

            const allZzz =  nodes.every(node => {
                // console.log({node});
                return node.endsWith("Z");
            });

            // console.log({allZzz});

            if (allZzz) {
                iterations = _iterations;
            }

            return !allZzz;
        });

        return success && iterations;
    }

    getFirstEndZ() {
        const iterationsToZ = {};

        const success = this.multiWalkTree(this.aNodes, (nodes, iterations) => {
            // console.log({nodes});

            nodes.forEach((node, idx) => {
                if (node.endsWith("Z")) {
                    // console.log({iterationsToZ});
                    iterationsToZ[idx] = iterations;
                }
            });

            // console.log(Object.keys(iterationsToZ).length !== nodes.length);

            return Object.keys(iterationsToZ).length !== nodes.length;
        });

        return success && iterationsToZ;
    }

    /**
     * Walk with ["AAA"] and to all "ZZZ", aka answer to p1
     * @returns {}
     */
    getAtoZ() {
        let iterations;

        const success = this.multiWalkTree(["AAA"], (nodes, _iterations) => {
            iterations = _iterations;

            // console.log({nodes, iterations})

            const allZzz =  nodes.every(node => {
                // console.log({node});
                return node === "ZZZ";
            });

            // console.log({allZzz});

            return !allZzz;
        });

        return success && iterations;
    }

    getFirstZProduct() {
        const firstZ = this.getFirstEndZ();

        if (!firstZ) {
            return null;
        }

        return Object.values(firstZ).reduce((acc, val) => acc * val, 1);
    }
}

export function gcd(a, b) {
    if (b === 0) {
        return a;
    }

    return gcd(b, a % b);
}

export function lcmTwo(a, b) {
    // Helper function to calculate the LCM of two numbers
    return Math.abs(a * b) / gcd(a, b);
}

export function lcm(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return null; // Invalid input
    }

    // Start with the LCM of the first two numbers
    let result = numbers[0];

    // Iterate through the remaining numbers and update the LCM
    for (let i = 1; i < numbers.length; i++) {
        result = lcmTwo(result, numbers[i]);
    }

    return result;
}
