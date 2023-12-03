import typedefs from "../typedefs";

/**
 * @param {string} input
 * @returns {typedefs.Game[]}
 */
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

/**
 * @param {typedefs.Game} game
 * @param {typedefs.Cubes} availCubes
 * @returns {boolean}
 */
export function validateGame(game, availCubes) {
    return game.rounds.every((round) => {
        return Object.keys(round).every((color) => {
            return round[color] <= availCubes[color];
        });
    });
}

/**
 * @param {typedefs.Game[]} games
 * @param {typedefs.Cubes} availCubes
 * @returns {number} sum of valid game indexes
 */
export function sumValidateGames(games, availCubes) {
    return games.reduce((sum, game, idx) => {
        return sum + (validateGame(game, availCubes) ? (idx + 1) : 0);
    }, 0);
}

/**
 * @param {typedefs.Game} game
 * @returns {import("../typedefs").AvailCubes} fewest cubes used in a game
 */
export function fewestGameCubes(game) {
    return game.rounds.reduce((fewest, round) => {
        ["red", "green", "blue"].forEach((color) => {
            if (color in round && round[color] > fewest[color]) {
                fewest[color] = round[color];
            }
        });

        return fewest
    }, { red : 0, green : 0, blue : 0 });
}

/**
 * @param {typedefs.Game} game
 * @returns {number} product of cubes
 */
export function powerCubes(game) {
    return game.red * game.blue * game.green;
}
