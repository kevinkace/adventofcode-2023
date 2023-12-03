
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