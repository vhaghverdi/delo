import { Game, Outcome } from "./Game.ts";
import { Player } from "./Player.ts";

export class Period {
  private playerMap: Map<string, Player> = new Map();
  private numberOfGames = 0;

  constructor(private k = 24) {
    if (k <= 0) {
      throw new Error("K-factor must be a positive number.");
    }
  }

  get length() {
    return this.numberOfGames;
  }

  private addPlayer(player: Player) {
    this.playerMap.has(player.id)
      ? null
      : this.playerMap.set(player.id, player);
  }

  addGame(player1: Player, player2: Player, score: Outcome) {
    if (![0, 0.5, 1].includes(score)) {
      throw new Error("Score must be 0, 0.5, or 1.");
    }

    this.addPlayer(player1);
    this.addPlayer(player2);
    const game = new Game(player1, player2, score);
    player1.addGame(game);
    player2.addGame(game);
    ++this.numberOfGames;
  }

  reset() {
    for (const player of this.playerMap.values()) {
      player.reset();
    }
  }

  calculate() {
    for (const player of this.playerMap.values()) {
      player.updateRating(this.k);
    }
  }
}
