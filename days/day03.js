export class Regions {
    constructor(str) {
        this.str    = str;
        this.parsed = str.split(/\r\n|\n/);

        this.regions  = [];
        this.specials = [];

        this.getRegions();
    }

    getRegions() {
        this.parsed.forEach((line, y) => {
            for (let x = 0; x < line.length; x++) {
                const currChar = line[x];

                if (/\d/.test(currChar)) {
                    this.addToRegion(currChar, x, y);

                    continue
                }

                this.closeRegion();

                if (currChar === ".") {
                    continue;
                }

                this.specials.push({ char : currChar, x, y });
            }

            this.closeRegion();
        });
    }

    addToRegion(number, x, y) {
        if (!this.currRegion) {
            this.currRegion = { number, x1 : x, y };

            return;
        }

        this.currRegion = {
            number : `${this.currRegion.number}${number}`,
            x1     : this.currRegion.x1,
            x2     : x,
            y      : y || this.currRegion.y
        }
    }

    closeRegion() {
        if (!this.currRegion) {
            return;
        }

        if (!this.currRegion.x2) {
            this.currRegion.x2 = this.currRegion.x1;
        }

        this.currRegion.number = parseInt(this.currRegion.number, 10);

        this.regions.push(this.currRegion);

        delete this.currRegion;
    }

    getCollisions() {
        return this.regions.filter((region, i) => {
            return this.specials.some((special, j) => {
                return specialCollision(region, special);
            });
        });
    }

    sumCollisions() {
        return this.getCollisions().reduce((acc, curr) => acc + curr.number, 0);
    }

}

export function specialCollision(region, special) {
    const x1 = region.x1 - 1;
    const x2 = region.x2 + 1;
    const y1 = region.y - 1;
    const y2 = region.y + 1;

    const collision = special.x >= x1 && special.x <= x2 && special.y >= y1 && special.y <= y2;

    if (!collision) {
        return false;
    }

    return true;
}

export function testCollision(box1, box2) {
    return box1.x1 < box2.x2 && box1.x2 > box2.x1 && box1.y1 < box2.y2 && box1.y2 > box2.y1;
}
