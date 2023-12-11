import { getEol } from "../consts";

export class Day09 {
    constructor(str) {
        this.str = str;
        this.eol = getEol(str);
        this.lines = str.split(this.eol);

        this.parsed = this.parse();
    }

    parse() {
        return this.lines.map(line => line.split(" "));
    }

    toString() {
        return this.parsed.reduce((acc, line) => acc + line.join(" ") + this.eol, "").trim();
    }
}
