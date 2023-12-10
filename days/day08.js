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
        console.log({ head : this.head });
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