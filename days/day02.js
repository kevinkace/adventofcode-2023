
export function parseGames(games) {
    return games.split("\n").map((line) => {
        let [
            game,     // "Game 1"
            allRounds // "1 red, 1 green, 1 blue; 1 red, 1 blue; 1 blue"
        ] = line.split(": ");

        return {
            game   : parseInt(game.replace("Game ", ""), 10),

            rounds : allRounds.split("; ").map((round) => {
                return round.split(", ").reduce((moves, /** "1 green" */ move) => {
                    const [ count, color ] = move.split(" ");

                    moves[color.trim()] = parseInt(count, 10);

                    return moves;
                }, {});
            })
        };
    });
}

export function validateGame(game, availCubes) {
    return game.rounds.every((round) => {
        return Object.keys(round).every((color) => {
            return round[color] <= availCubes[color];
        });
    });
}

export function sumValidateGames(games, availCubes) {
    return games.reduce((sum, game, idx) => {
        return sum + (validateGame(game, availCubes) ? (idx + 1) : 0);
    }, 0);
}
