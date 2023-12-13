import { getEol } from "../consts";

export class Node {
    constructor(value, { prev, next } = {}) {
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}

export class Stack {
    constructor(str) {
        this.head = null;
        this.tail = null;

        if (str) {
            str.split(" ").forEach(nodeValue => {
                this.addNode(Number(nodeValue));
            });
        }
    }

    addNode(value) {
        const node = new Node(value, { prev : this.tail});

        if (this.tail) {
            this.tail.next = node;
        }

        if (!this.head) {
            this.head = node;
        }

        this.tail = node;
    }

    addNodeFront(value) {
        const node = new Node(value, { next : this.head});

        if (this.head) {
            this.head.prev = node;
        }

        if (!this.tail) {
            this.tail = node;
        }

        this.head = node;
    }

    iterate(cb) {
        const MAX_ITERATIONS = 1000;
        let currNode = this.head;
        let iterations = 0;

        while (currNode && iterations < MAX_ITERATIONS) {
            cb(currNode, iterations);

            iterations++;

            currNode = currNode.next;
        }
    }

    getValues() {
        const values = [];

        this.iterate(node => {
            values.push(node.value);
        });

        return values;
    }

    allZeros() {
        return this.getValues().every(val => val === 0)
    }

    buildStacksToZero() {
        let currStack = this;
        const stacks = [];

        const MAX_ITERATIONS = 1000;
        let iterations = 0;

        while (!currStack.allZeros() && iterations < MAX_ITERATIONS) {
            iterations++;

            stacks.push(currStack);

            const nextStack = new Stack();

            let prev;

            currStack.iterate((node, idx) => {
                if (idx !== 0) {
                    nextStack.addNode(node.value - prev.value);
                }

                prev = node;
            });

            currStack = nextStack;
        }

        stacks.push(currStack);

        return stacks
    }

    getNext() {
        const stacksToZero = this.buildStacksToZero();
        let prevStack;

        [...stacksToZero].reverse().forEach((currStack, idx) => {
            const difference = idx === 0 ?
                0 :
                prevStack.tail.value + currStack.tail.value;

            currStack.addNode(difference);
            prevStack = currStack;
        });

        return stacksToZero[0].tail.value;
    }

    getPrev() {
        const stacksToZero = this.buildStacksToZero();
        let prevStack;

        [...stacksToZero].reverse().forEach((currStack, idx) => {
            const difference = idx === 0 ?
                0 :
                currStack.head.value - prevStack.head.value;

            currStack.addNodeFront(difference);
            prevStack = currStack;
        });

        return stacksToZero[0].head.value;
    }

    toString() {
        let value = "";

        this.iterate(node => {
            value += `${node.value} `;
        });

        return value.trim();
    }
}

export class Stacks {
    constructor(str) {
        this.str = str;
        this.eol = getEol(str);

        this.stacks = this.str
            .split(this.eol)
            .map(line =>  new Stack(line));
    }

    toString() {
        return this.stacks
            .reduce((acc, stack) => acc + stack.toString() + this.eol, "")
            .trim();
    }

    getNexts() {
        return this.stacks.map(stack => stack.getNext());
    }

    getNextsSum() {
        return this.getNexts().reduce((acc, val) => {
            // console.log(val);
            return acc + val;
        }, 0);
    }

    getPrevs() {
        return this.stacks.map(stack => stack.getPrev());
    }

    getPrevsSum() {
        return this.getPrevs().reduce((acc, val) => {
            // console.log(val);
            return acc + val;
        }, 0);
    }
}

function iterateAdjacentPairs(arr, callback) {
    for (let idx = 0; idx < arr.length - 1; idx++) {
        const currElement = arr[idx];
        const nextElement = arr[idx + 1];

        callback(currElement, nextElement);
    }
}
