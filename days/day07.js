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


export class Games3 {
    constructor(str) {
        this.str = str;

        this.cardValuesDescending = [ "A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J" ];
        this.faceCardValues = {
            A: 13,
            K: 12,
            Q: 11,
            J: 1,
            T: 10
        };

        this.rounds = this.str.split(eol).map(line => {
            const [ cards, bet ] = line.split(" ");
            const cardsArray = cards.split("");

            const groupedByCard = this.getGroupedByCard(cardsArray);

            const sortedByCount = this.getSortedByCount(groupedByCard);

            const highCard = this.cardValuesDescending.find(card => groupedByCard[card]);

            const groupedByCardJSwapped = this.jSwapCards(groupedByCard, highCard, sortedByCount);

            const sortedByCountJSwapped = this.getSortedByCount(groupedByCardJSwapped);

            const hand = Object.entries(groupedByCardJSwapped)
                .sort(([card1, count1], [card2, count2]) => count2 - count1)
                .reduce((acc, [card, count]) => {
                    return `${acc}${count}`;
                }, "");

            return {
                cards,
                bet : Number(bet),
                highCard,
                groupedByCard,
                groupedByCardJSwapped,
                sortedByCount,
                sortedByCountJSwapped,
                hand,
                cardsArray
            }
        });
    }

    getSortedByCount(groupedByCard) {
        return Object.entries(groupedByCard)
            .sort(([card1, count1], [card2, count2]) => count2 - count1)
            .map(([card, count]) => card);
    }

    getGroupedByCard(cardsArray) {
        return cardsArray
            .reduce((acc, card) => {
                acc[card] = acc[card] ? acc[card] + 1 : 1;

                return acc;
            }, {});
    }

    groupedByCardString(groupedByCard) {
        return Object.entries(groupedByCard)
            .map(([card, count]) =>`${card}:${count}`)
            .join("|")
            .padEnd(19, " ");
    }

    jSwapCards(groupedByCard, highCard, sortedByCount) {
        const { J } = groupedByCard;

        if (!J || J === 5) {
            return groupedByCard;
        }

        const newGroupedByCard = { ...groupedByCard };

        delete newGroupedByCard.J;

        const newGroupedByCardEntries = Object.keys(newGroupedByCard);

        // no pairs,
        if (newGroupedByCardEntries.length === 4) {
            // why swap high card?
            // newGroupedByCard[highCard] = newGroupedByCard[highCard] + 1;

            const firstCard = newGroupedByCardEntries[0];

            newGroupedByCard[firstCard] = newGroupedByCard[firstCard] + 1;

            return newGroupedByCard
        }

        const toAddWildCard = sortedByCount.find(card => card !== "J");

        newGroupedByCard[toAddWildCard] = newGroupedByCard[toAddWildCard] + J;

        // console.log({ newGroupedByCard, highCard, highestCount });

        return newGroupedByCard;
    }

    getSorted() {
        return this.rounds.sort((hand1, hand2) => {
            if (handValues.indexOf(hand1.hand) > handValues.indexOf(hand2.hand)) {
                return 1;
            } if (handValues.indexOf(hand1.hand) < handValues.indexOf(hand2.hand)) {
                return -1;
            }

            for (let idx = 0; idx < hand1.cardsArray.length; idx++) {
                const hand1Card = hand1.cardsArray[idx];
                const hand2Card = hand2.cardsArray[idx];

                if (hand1Card === hand2Card) {
                    continue;
                }

                const card1Value = this.cardValuesDescending.indexOf(hand1Card);
                const card2Value = this.cardValuesDescending.indexOf(hand2Card);

                // console.log({ card1Value, card2Value })

                return card1Value > card2Value ? -1 : 1;
            }
        });
    }

    getTotalWinnings() {
        return this.getSorted()
            .map(({ bet }) => bet)
            .reduce((acc, bet, idx) => {
                return acc + (bet * (idx + 1));
            }, 0);
    }

    log() {
        console.table(this.rounds.map(round => {
            const groupedByCard = this.groupedByCardString(round.groupedByCard);
            const groupedByCardJSwapped = this.groupedByCardString(round.groupedByCardJSwapped);
            const sortedByCount = round.sortedByCount.join("");
            const sortedByCountJSwapped = round.sortedByCountJSwapped.join("");
            const cardsArray = round.cardsArray.join(",");

            return {
                ...round,
                groupedByCard,
                groupedByCardJSwapped,
                sortedByCount,
                sortedByCountJSwapped,
                cardsArray
            }
        }));

        // console.log(JSON.stringify(this.rounds, null, 2));
    }
}