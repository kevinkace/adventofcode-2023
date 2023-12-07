export function parse(str) {
    return str.split(/\r?\n/);
}

export class Games {
    constructor(str) {
        this.races = [];
        this.parseRaces(str);
    }

    parseRaces(str) {
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

        // console.log(numberWinningHoldTimes);

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

export class Games2 extends Games {
    parseRaces(str) {
        const [time, distance] = str
            .split(/\r?\n/)
            .map(line => {
                return  line.split(":")[1].replaceAll(" ", "");
            });


        this.races.push({ time, distance });
    }
}
