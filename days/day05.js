export class Almanac {
    constructor(str) {
        this.str = str;
        this.maps = [];

        this.parse();
    }

    parse() {
        this.str.split(/(?:\r?\n){2}/).forEach((section, idx) => {
            if (idx === 0) {
                this.seeds = this.parseSeeds(section);

                return;
            }

            const map = {
                name : "",
                rows : []
            };

            section.split(/\r?\n/).forEach((row, idx) => {
                if (idx === 0) {
                    map.name = row;

                    return;
                }

                map.rows.push(row.split(" ").map(Number));
            });

            this.maps.push(map);
        });
    }

    toString() {
        const seedsStr = this.seedsToString();
        const maps = Almanac.mapsToString(this.maps);

        return [seedsStr, ...maps].join("\r\n\r\n");
    }

    parseSeeds(section) {
        return section.split(" ").filter((_, idx) => idx).map(Number);
    }

    seedsToString() {
        return `seeds: ${this.seeds.join(" ")}`;
    }

    static mapsToString(maps) {
        return maps.map((map) => {
            const rows = map.rows.map((row) => row.join(" ")).join("\r\n");

            return `${map.name}\r\n${rows}`;
        });
    }

    _findMap(from, map) {
        return Almanac._findMap(from, map);
    }

    _getDestFromMap(from, map) {
        return Almanac._getDestFromMap(from, map);
    }

    _getDest(from, map) {
        return Almanac._getDest(from, map);
    }

    _getFinalDestFromMaps(from, maps) {
        return Almanac._getFinalDestFromMaps(from, maps);
    }

    static _findMap(from, maps) {
        return maps.find((row, idx) => {
            const [ dest, src, range ] = row;

            return src <= from && from <= src + range;
        });
    }

    static _getDestFromMap(from, map) {
        return map[0] + (from - map[1]);
    }

    static _getDest(from, map) {
        const foundMap = this._findMap(from, map);

        return foundMap ? this._getDestFromMap(from, foundMap) : from;
    }

    static _getFinalDestFromMaps(from, maps) {
        return maps.reduce((acc, map) => {
            const dest = this._getDest(acc, map);

            // console.log({ acc, map, dest });

            return dest;
        }, from);
    }

    getFinalDestForAllSeeds() {
        return this.seeds.map((seed) => this._getFinalDestFromMaps(seed, this.maps.map((map) => map.rows)));
    }

    getMinFinalDestForAllSeeds() {
        return Math.min(...this.getFinalDestForAllSeeds());
    }
}


export class Almanac2 extends Almanac {
    constructor(str) {
        super(str);
    }

    parseSeeds(sections) {
        return sections
            .split(" ")
            .filter((_, idx) => idx) // remove first el `"seeds:"`
            .map(Number)
            // group in touples
            .reduce((acc, seed, idx) => {
                const pos = Math.floor(idx / 2);

                if (!acc[pos]) {
                    acc[pos] = [];
                }

                acc[pos].push(seed);

                return acc;
            }, []);
    }

    seedsToString() {
        return `seeds: ${this.seeds.flat().join(" ")}`;
    }

    static _getRangesFromRange(inputRange, ranges) {
        let [ start, length ] = inputRange;
        const end = start + length;

        const outputRanges = this._filterRangesBetween(start, end, ranges);

        if (!outputRanges.length) {
            return [[ start, start, length ]];
        }

        const firstRange = outputRanges.at(0);
        const lastRange = outputRanges.at(-1);
        const lastRangeEnd = lastRange[1] + lastRange[2];

        if (firstRange[1] > start) {
            outputRanges.unshift([ start, start, firstRange[1] - start ]);
        }

        if (lastRangeEnd < end) {
            outputRanges.push([ lastRangeEnd, lastRangeEnd, end - lastRangeEnd ]);
        }

        return outputRanges;
    }

    static _getDestRangesFromOutRanges(inputRange, ranges) {
        const [ start, length ] = inputRange;
        const end = start + length;

        const outRanges = this._getRangesFromRange(inputRange, ranges);

        return outRanges.map(([ dest, src, mapRange ]) => {
            const outRangeDestStart  = dest + (start - src);
            const outRangeDestRange = mapRange - (start - src) - (src + mapRange - end);

            return [ outRangeDestStart, outRangeDestRange ];
        });
    }

    static _filterRangesBetween(start, end, ranges) {
        return Almanac2._sortMapsBySrc(ranges)
        .filter(([ dest, src, mapRange ], idx) => {

            const srcEnd = src + mapRange;

            if (start >= src && start <= srcEnd) {
                return true;
            }

            if (end >= src && end <= srcEnd) {
                return true;
            }

            return false;
        });
    }

    static _sortMapsBySrc(maps) {
        return maps.sort((a, b) => a[1] - b[1]);
    }

}