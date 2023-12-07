export function parse(str) {
    return str.split(/\r?\n/);
}

export class Day06 {
    constructor(str) {
        // this.str = str;
        this.races = [];

        const [times, distances] = str.split(/\r?\n/).map(line => line.split(/\s+/).filter((_, i) => i));

        for (let raceIdx = 0; raceIdx < times.length; raceIdx++) {
            const time = times[raceIdx];
            const distance = distances[raceIdx];

            this.races.push({ time, distance });
        }
    }

    getNumberWinning() {
        const numberWinningHoldTimes = [];
        for (const race of this.races) {
            let winningHoldTimes = 0;

            for (let holdTime = 1; holdTime < race.time; holdTime++) {
                const speed = holdTime;
                const dist = speed * (race.time - holdTime);

                if (dist > race.distance) {
                    winningHoldTimes++;
                }
            }

            numberWinningHoldTimes.push(winningHoldTimes);
        }

        return numberWinningHoldTimes;
    }

    getProductOfWinning() {

        return this.getNumberWinning().reduce((acc, cur) => acc * cur, 1);
    }

    toString() {
        return this.races.map((race, idx) => {
            return [ idx, race.time, race.distance  ].join(" ");
        }).join("\n");
    }
}
