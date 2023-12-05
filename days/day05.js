export function parse(str) {
    return str.split(/\r?\n/);
}

export class Day05 {
    constructor(str) {
        this.str = str;
        this.lines = str.split(/\r?\n/);

        this.parsed = this.parse();
    }

    parse() {
        return this.lines.map(line => line.split(" "));
    }
}
