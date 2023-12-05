export class Almanac {
    constructor(str) {
        this.str = str;
        this.maps = [];

        this.parse();
    }

    parse() {
        this.str.split(/(?:\r?\n){2}/).forEach((section, idx) => {
            if (idx === 0) {
                this.seeds = section.split(" ").filter((_, idx) => idx).map(Number);

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

    toString() {
        const seedsStr = `seeds: ${this.seeds.join(" ")}`;
        const maps = this.maps.map((map) => {
            const rows = map.rows.map((row) => row.join(" ")).join("\r\n");

            return `${map.name}\r\n${rows}`;
        });

        return [seedsStr, ...maps].join("\r\n\r\n");
    }
}
