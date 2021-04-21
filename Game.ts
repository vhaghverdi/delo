import { Player } from "./Player.ts";

export enum Outcome {
  LOSS = 0,
  DRAW = 0.5,
  WIN = 1,
}

export class Game {
  constructor(
    readonly player1: Player,
    readonly player2: Player,
    readonly score: Outcome
  ) {}

  opponent(player: Player): Player {
    return player === this.player1 ? this.player2 : this.player1;
  }

  result(player: Player): Outcome {
    return player === this.player1 ? this.score : 1 - this.score;
  }
}
