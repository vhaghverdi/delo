import Game, { Outcome } from "./Game.ts";
import Player from "./Player.ts";

export default class Period {
  private playerMap: Map<string, Player> = new Map();

  constructor(private k = 24) {}

  addPlayer(player: Player) {
    this.playerMap.has(player.id)
      ? null
      : this.playerMap.set(player.id, player);
  }

  addGame(player1: Player, player2: Player, score: Outcome) {
    this.addPlayer(player1);
    this.addPlayer(player2);
    const game = new Game(player1, player2, score);
    player1.addGame(game);
    player2.addGame(game);
  }

  calculate() {
    for (const player of this.playerMap.values()) {
      player.updateRating(this.k);
    }
  }
}
