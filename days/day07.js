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

    faceCardValues() {
        return {
            A: 14,
            K: 13,
            Q: 12,
            J: 11,
            T: 10
        };
    }

    parse() {
        return this.str
            .split(eol)
            .map(line =>{
                const [ cards, bet ] = line.split(" ");

                const cardsInOrder = cards.split("");

                const grouped = Games.groupCards(cardsInOrder);

                const value = handValues.indexOf(this.getHandValue(grouped));

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
        return this.rounds.slice().sort(this.sortHand);
    }

    getSortedBets() {
        return this.getSortedHands().map(hand => hand.bet);
    }

    getTotalWinnings() {
        return this.getSortedHands().reduce((acc, hand, idx) => {
            return acc + (hand.bet * (idx + 1));
        }, 0);
    }

    getHandValue(grouped) {
        return Object.values(grouped).sort((a, b) => b - a).join("");
    }

    static groupCards(cardsInOrder) {
        return cardsInOrder
            .reduce((acc, card) => {
                acc[card] = acc[card] ? acc[card] + 1 : 1;

                return acc;
            }, {});
    }

    sortHand(hand1, hand2) {
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

            // console.log({ card1Value, card2Value })

            return card1Value > card2Value ? 1 : -1;
        }
    }
}

export class Games2 extends Games {
    getHandValue(grouped) {
        if (!grouped["J"] || grouped["J"] === 5) {
            console.log({ grouped, hv : super.getHandValue(grouped) });
            return super.getHandValue(grouped);
        }


        const newGrouped = { ...grouped };
        const { J } = newGrouped;

        delete newGrouped.J;

        return super.getHandValue(newGrouped).replace(/\d/, (match) => {
            return Number(match) + J;
        });
    }

    faceCardValues() {
        return {
            A: 14,
            K: 13,
            Q: 12,
            T: 10
        };
    }

}
