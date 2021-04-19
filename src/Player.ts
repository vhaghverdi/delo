import Game, { Outcome } from "./Game.ts";
import { uuid } from "../deps.ts";

export default class Player {
  readonly id: string;
  private pre: number;
  private post: number;
  private games: Game[];

  constructor(id: string, rating: number) {
    this.id = id;
    this.pre = rating;
    this.post = rating;
    this.games = [];
  }

  static DefaultPlayer(): Player {
    return new Player(uuid.v4.generate(), 1500);
  }

  get rating() {
    return this.post.toFixed(0);
  }

  addGame(game: Game) {
    this.games.push(game);
  }

  updateRating(k: number) {
    this.post += k * (this.totalScore() - this.totalExpectedScore());
  }

  private expectedScore(game: Game): Outcome {
    return 1 / (1 + Math.pow(10, (game.opponent(this).pre - this.pre) / 400));
  }

  private totalExpectedScore(): number {
    return this.games.reduce(
      (score: number, game: Game) => score + this.expectedScore(game),
      0
    );
  }

  private totalScore(): number {
    return this.games.reduce(
      (score: number, game: Game) => score + game.result(this),
      0
    );
  }
}
