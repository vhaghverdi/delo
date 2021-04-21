import { Period, Player, Outcome } from "./mod.ts";
import { uuid, asserts } from "./deps.ts";

Deno.test("Outcome must be 1, 0.5, or 0", () => {
  asserts.assertThrows(() => {
    const player1 = new Player();
    const player2 = new Player();
    const period = new Period();
    period.addGame(player1, player2, 0.3);
  });
});

Deno.test("Player rating must be positive", () => {
  asserts.assertThrows(() => new Player(-1200));
});

Deno.test("Update player ratings after a period of games", () => {
  const players: { [key: string]: Player } = {
    A: new Player(1613, uuid.v4.generate()),
    B: new Player(1609, uuid.v4.generate()),
    C: new Player(1477, uuid.v4.generate()),
    D: new Player(1388, uuid.v4.generate()),
    E: new Player(1586, uuid.v4.generate()),
    F: new Player(1720, uuid.v4.generate()),
  };

  const games: [Player, Player, Outcome][] = [
    [players.A, players.B, Outcome.LOSS],
    [players.A, players.C, Outcome.DRAW],
    [players.A, players.D, Outcome.WIN],
    [players.A, players.E, Outcome.WIN],
    [players.A, players.F, Outcome.LOSS],
  ];

  const period = new Period(32);
  games.forEach((game) => period.addGame(...game));
  period.calculate();

  asserts.assertEquals(players.A.rating.toFixed(0), "1601");
});
