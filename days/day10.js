import { getEol } from "../consts";

const nodeTypes = {
    "|" : {
        up   : { dx: 0, dy: -1, from : "down", to : "up" },
        down : { dx: 0, dy:  1, from :   "up", to : "down" },
    },
    "-" : {
        left  : { dx: -1, dy: 0, from : "right", to : "left" },
        right : { dx:  1, dy: 0, from : "left", to : "right" },
    },
    "L" : {
        down : { dx: 1, dy:  0, from : "up", to : "right" },
        left : { dx: 0, dy: -1, from : "right", to : "up" },
    },
    "J" : {
        down  : { dx: -1, dy:  0, from :  "up", to : "left" },
        right : { dx:  0, dy: -1, from : "left", to : "up" },
    },
    "F" : {
        up   : { dx: 1, dy: 0, from :   "down", to : "right" },
        left : { dx: 0, dy: 1, from : "right", to : "down" },
    },
    "7" : {
        up    : { dx: -1, dy: 0, from :    "down", to : "left" },
        right : { dx:  0, dy: 1, from : "left", to : "down" },
    },
}

export class Day10 {
    constructor(str) {
        this.str = str;
        this.eol = getEol(str);

        this.parsed = str
            .split(this.eol);

        this.parsed
            .some((line, y) => {
                if (line.includes("S")) {
                    this.sPosition = { x: line.indexOf("S"), y };

                    return true;
                }

                return false;
            });

        this.xLength = this.parsed[0].length;
        this.yLength = this.parsed.length;
    }

    getNextPath(pos, delta) {
        const nextPos = {
            x: pos.x + delta.x,
            y: pos.y + delta.y,
        };

        return this.parsed[nextPos.y]?.[nextPos.x];
    }

    findStartPos() {
        const charAbove = this.parsed[this.sPosition.y - 1]?.[this.sPosition.x];
        const charBelow = this.parsed[this.sPosition.y + 1]?.[this.sPosition.x];
        const charLeft  = this.parsed[this.sPosition.y    ]?.[this.sPosition.x - 1];
        const charRight = this.parsed[this.sPosition.y    ]?.[this.sPosition.x + 1];

        let node;

        if ([ "|", "F", "7" ].includes(charAbove)) {
            node = nodeTypes[charAbove].up;
        } else if ([ "-", "7", "J" ].includes(charRight)) {
            node = nodeTypes[charRight].right;
        } else if ([ "|", "J", "L" ].includes(charBelow)) {
            node = nodeTypes[charBelow].below;
        } else if ([ "-", "L", "F" ].includes(charLeft)) {
            node = nodeTypes[charLeft].left;
        }

        return {
            x: this.sPosition.x + node.dx,
            y: this.sPosition.y + node.dy,
            from: node.from,
            to: node.to,
        };
    }

    /**
     *
     * @param {object} pos
     * @param {number} pos.x
     * @param {number} pos.y
     * @param {string} pos.from
     * @param {string} pos.to
     *
     * @returns {}
     */
    getNextCoord(pos) {
        const char = this.parsed[pos.y]?.[pos.x];
        const node = nodeTypes[char][pos.to];

        // console.log({ char, pos, node });

        return {
            x: pos.x + node.dx,
            y: pos.y + node.dy,
            from: node.from,
            to: node.to,
        };
    }

    static samePoint(a, b) {
        return a.x === b.x && a.y === b.y;
    }

    charAt({ x, y }) {
        return this.parsed[y]?.[x];
    }

    walkPath() {
        const path = [ this.sPosition ];
        let currPos = this.findStartPos();

        let iteration = 1; // starting with startPosition which is 1 away from S
        const MAX_ITERATIONS = 1000;

        while (!Day10.samePoint(currPos, this.sPosition) && iteration < MAX_ITERATIONS) {
            path.push(currPos);
            currPos = this.getNextCoord(currPos);
            iteration++;
        }

        return path;
    }

    walkAll(cb) {
        this.parsed.forEach((line, y) => {
            for (let x = 0; x < line.length; x++) {
                // const currChar = line[x];

                // const countToEdge = this.getCountToEdge(x, y);
                cb({ x, y });
            }
        });
    }

    getEdgeDir({x, y}) {
        const dir = [
            { // toTop
                d : this.yLength - y,
                dx : 0,
                dy : 1
            },
            { // toBottom
                d : y,
                dx : 0,
                dy : -1
            },
            { // toLeft
                d : x,
                dx : -1,
                dy : 0
            },
            { // toRight
                d : this.xLength - x,
                dx : 1,
                dy : 0
            }
        ].sort((a, b) => a.d - b.d)[0];

        return { dx : dir.dx, dy : dir.dy };
    }

    walkToEdge(node, delta, cb) {
        // const path = [];
        let iteration = 0;
        const MAX_ITERATIONS = 1000;

        let currPos = node;
        let currChar = this.charAt(currPos);

        while (currChar !== undefined && iteration < MAX_ITERATIONS) {
            cb(currPos, iteration);

            iteration++;
            currPos = {
                x: currPos.x + delta.dx,
                y: currPos.y + delta.dy,
            };


            // path.push(currPos);
        }

        // return path;
    }

    getPointsWithin() {
        const path = this.walkPath();
        let insideCount = 0;

        const log = [];

        // console.log(path);

        this.walkAll((node, idx) => {
            const onTopLeftEdge  = node.x === 0 || node.y === 0;
            const onBotRightEdge = node.x === this.xLength - 1 || node.y === this.yLength - 1;
            const onEdge         = onTopLeftEdge || onBotRightEdge;
            const currChar       = this.charAt(node);
            const currPathPoint  = path.find(pathPoint => Day10.samePoint(pathPoint, node));

            log.push({
                node,
                // onTopLeftEdge,
                // onBotRightEdge,
                onEdge,
                currChar,
                currPathPoint,
            });

            if (onEdge || currChar === "S" || currPathPoint) {
                return;
            }

            const edgeDir = this.getEdgeDir(node);
            let hops = 0;

            // console.log({ ...node, ...edgeDir});

            this.walkToEdge(node, edgeDir, (edgeNode, idx) => {
                const pathPoint = path.find(pathPoint => Day10.samePoint(pathPoint, edgeNode));

                if (idx === 0 || !pathPoint) {
                    return;
                }

                const pathChar = this.charAt(pathPoint);
                // console.log({pathChar, pathPoint})

                if (edgeDir.dx) {
                    if (pathChar !== "-") {
                        hops++;
                    }

                    return;
                }

                if (pathChar !== "|") {
                    hops++;
                }
            });

            if (hops % 2 === 1) {
                insideCount++;
            }
        });

        // console.table(log);

        return insideCount;
    }

    toString() {
        return this.parsed.reduce((acc, line) => acc + line + this.eol, "").trim();
    }
}
