# Delo

Delo is a TypeScript implementation of the [Elo rating system](https://en.wikipedia.org/wiki/Elo_rating_system) for the [Deno](https://deno.land/) runtime.

## Usage

```ts
import {
  Period,
  Player,
  Outcome,
} from "https://deno.land/x/delo@v0.1.0/mod.ts";

const players: { [key: string]: Player } = {
  Alice: new Player(1915),
  Bob: new Player(1453),
  Charlie: new Player(1375),
  Doug: new Player(1991),
  Earl: new Player(),
};

const period = new Period();

period.addGame(players.Alice, players.Bob, Outcome.LOSS);
period.addGame(players.Doug, players.Charlie, Outcome.DRAW);
period.addGame(players.Earl, players.Bob, Outcome.WIN);
period.addGame(players.Charlie, players.Alice, Outcome.WIN);
period.addGame(players.Doug, players.Earl, Outcome.LOSS);

period.calculate();

for (const name in players) {
  console.log(`${name}: ${players[name].rating.toFixed(0)}`);
}
```

### Expected Output

```
Alice: 1870
Bob: 1465
Charlie: 1409
Doug: 1957
Earl: 1533
```

## API

### Outcome

`Outcome` provides three constants to represent possible game results.

- `WIN` - 1
- `DRAW` - 0.5
- `LOSS` - 0

### Player

#### Properties

- `id: string`
  - A unique identifier for the Player object (UUID v4 by default).
- `rating: number`
  - The Player's Elo rating.

#### Instantiation

A new Player has a default rating of 1500.

```js
new Player();
```

Pass a positive number for a different initial rating.

```js
new Player(1800);
```

Additionally pass a string to uniquely identify the player. By default, a v4 UUID is generated internally to keep track of players. You may want to pass an ID if, for example, you already maintain a database of players keyed by unique IDs.

```js
new Player(1924, "jimmy23");
```

### Period

#### Properties

- `length: number`
  - The number of games played during the period.

#### Methods

- `addGame(player1: Player, player2: Player, score: Outcome)`
  - Adds a game between `player1` and `player2`, with `score` representing whether `player1` won, drew, or lost against `player2`.
- `reset()`
  - Clears all games from the period. Does not affect player ratings.
- `calculate()`
  - Updates the rating of all players who played games during this period.

#### Instantiation

New periods have a default K-factor of 24. The K-factor represents the maximum possible rating adjustment per game.

```js
new Period();
```

Pass a positive number to adjust the K-factor.

```js
new Period(40);
```
