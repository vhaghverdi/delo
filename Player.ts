import { Game } from "./Game.ts";
import { uuid } from "./deps.ts";

export class Player {
  private pre: number;
  private post: number;
  private games: Game[] = [];

  constructor(rating = 1500, readonly id = uuid.v4.generate()) {
    if (rating <= 0) {
      throw new Error("Player rating must be a positive number.");
    }

    this.pre = rating;
    this.post = rating;
  }

  get rating() {
    return this.post;
  }

  addGame(game: Game) {
    this.games.push(game);
  }

  reset() {
    this.games = [];
    this.pre = this.post;
  }

  updateRating(k: number) {
    this.post += k * (this.totalScore() - this.totalExpectedScore());
  }

  private expectedScore(game: Game): number {
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
