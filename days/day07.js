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
                const [ cards, bet ] = line.split(" ");

                const cardsInOrder = cards.split("");

                const grouped = cardsInOrder
                    .reduce((acc, card) => {
                        acc[card] = acc[card] ? acc[card] + 1 : 1;

                        return acc;
                    }, {});

                const value = handValues.indexOf(Object.values(grouped).sort((a, b) => b - a).join(""));

                return { cards, grouped, bet : Number(bet), value, cardsInOrder };
            });
    }

    toString() {
        return this.rounds
            .reduce((acc, line) => {
                const row = [ line.cards, line.bet ].join(" ");

                return [ acc, row, eol ].join("");
            }, ""
            )
            .trim();
    }

    getSortedHands() {
        return this.rounds.slice().sort(Games.sortHand);
    }

    getSortedBets() {
        return this.getSortedHands().map(hand => hand.bet);
    }

    getTotalWinnings() {
        return this.getSortedHands().reduce((acc, hand, idx) => {
            return acc + (hand.bet * (idx + 1));
        }, 0);
    }

    static sortHand(hand1, hand2) {
        if (hand1.value > hand2.value) {
            return 1;
        } if (hand1.value < hand2.value) {
            return -1;
        }

        for (let idx = 0; idx < hand1.cardsInOrder.length; idx++) {
            const hand1Card = hand1.cardsInOrder[idx];
            const hand2Card = hand2.cardsInOrder[idx];

            if (hand1Card === hand2Card) {
                continue;
            }

            const card1Value = faceCardValues[hand1Card] || Number(hand1Card);
            const card2Value = faceCardValues[hand2Card] || Number(hand2Card);

            return card1Value > card2Value ? 1 : -1;
        }
    }
}
