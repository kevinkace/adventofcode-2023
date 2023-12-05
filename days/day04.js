export class Game {
    constructor(str) {
        this.str = str;
        this.parsed = str.match(/Card *(\d+): *([\d ]*) \| ([\d ]*)/);

        this.game = parseInt(this.parsed[1]);

        this.winners = this.parsed[2].split(/ +/).map(n => parseInt(n, 10));
        this.players = this.parsed[3].split(/ +/).map(n => parseInt(n, 10));
    }

    getWon() {
        this.won = this.won || this.players.filter(player => this.winners.includes(player));

        return this.won;
    }

    getScore() {
        const won = this.getWon();

        return won.length ? Math.pow(2, won.length - 1) : 0;
    }

    toString() {
        const winners = this.winners.map(w => w.toString().padStart(2, " ")).join(" ");
        const players = this.players.map(p => p.toString().padStart(2, " ")).join(" ");
        return `Card ${this.game}: ${winners} | ${players}`;
    }
}

export class Games {
    constructor(str) {
        this.str = str;
        this.games = this.getGames();
    }

    getGames() {
        return this.str.split(/\r?\n/).map(game => new Game(game));
    }

    getTotalWins() {
        return this.games.map(game => game.getScore());
    }

    getTotalPoints() {
        return this.games.reduce((sum, game, idx) => {
            return sum + game.getScore();
        }, 0)
    }

    getTotalCards() {
        const copies = new Copies();

        return this.games.reduce((totalCards, game, idx) => {
            const wonCount = game.getWon().length;
            const copyCount = copies.add(wonCount);

            return totalCards + copyCount;
        }, 0);
    }

    toString() {
        return this.games.map(game=>game.toString()).join("\r\n");
    }


}

export class Copies {
    constructor() {
        this.copiesCount = [];
    }

    add(wonCount) {
        const currCopyCount = this.copiesCount.shift() || 1;

        for (let idx = 0; idx < wonCount; idx++) {
            this.copiesCount[idx] = (this.copiesCount[idx] || 1) + currCopyCount;
        }

        return currCopyCount;
    }
}