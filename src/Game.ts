import Player from "./Player.ts";

export enum Outcome {
  LOSS = 0,
  DRAW = 0.5,
  WIN = 1,
}

export default class Game {
  readonly player1: Player;
  readonly player2: Player;
  readonly score: Outcome;

  constructor(player1: Player, player2: Player, score: Outcome) {
    this.player1 = player1;
    this.player2 = player2;
    this.score = score;
  }

  opponent(player: Player): Player {
    return player === this.player1 ? this.player2 : this.player1;
  }

  result(player: Player): Outcome {
    return player === this.player1 ? this.score : 1 - this.score;
  }
}
