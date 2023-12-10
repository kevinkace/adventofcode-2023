import { eol } from "../consts";

export class Day{day} {
    constructor(str) {
        this.str = str;
        this.lines = str.split(eol);

        this.parsed = this.parse();
    }

    parse() {
        return this.lines.map(line => line.split(" "));
    }

    toString() {
        return this.parsed.reduce((acc, line) => acc + line.join(" ") + "\n", "").trim();
    }
}
