import { getEol } from "../consts";

export class Day10 {
    constructor(str) {
        this.str = str;
        this.eol = getEol(str);

        this.parsed = str
            .split(this.eol)
            .map(line => line.split(" "));
    }

    toString() {
        return this.parsed.reduce((acc, line) => acc + line.join(" ") + this.eol, "").trim();
    }
}
