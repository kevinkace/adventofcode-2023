import { eol } from "../consts";

const cardValuesDesc = [ "A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2" ];

const faceCardValues = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10
};

const handValues = [
    "11111",
    "2111",
    "221",
    "311",
    "32",
    "41",
    "5"
];

export class Games {
    constructor(str) {
        this.str = str;

        this.rounds = this.parse();
    }

    parse() {
        return this.str
            .split(eol)
            .map(line =>{
                const [ hand, bet ] = line.split(" ");

                const grouped = hand
                    .split("")
                    .reduce((acc, card) => {
                        acc[card] = acc[card] ? acc[card] + 1 : 1;

                        return acc;
                    }, {});

                const handValue = handValues.indexOf(Object.values(grouped).sort((a, b) => b - a).join(""));

                return { hand, grouped, bet, handValue };
            });
    }

    toString() {
        return this.rounds
            .reduce(
                (acc, line) => [ acc, line.join(" "), eol ].join(""),
                ""
            )
            .trim();
    }

    getGroupCards() {
        this.grouped = this.rounds.forEach((acc, [ hand, bet ]) => {
            acc[card] = acc[card] ? acc[card] + 1 : 1;

            return acc;
        }, {});

        return this.grouped;
    }
}
