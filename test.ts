import { Period, Player, Outcome } from "./mod.ts";
import { uuid, asserts } from "./deps.ts";

Deno.test("Update player rating after a period of games", () => {
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

  asserts.assertEquals(players.A.rating, "1601");
});
