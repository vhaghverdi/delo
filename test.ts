import { assertEquals } from "https://deno.land/std@0.93.0/testing/asserts.ts";
import Player from "./src/Player.ts";
import Period from "./src/Period.ts";
import { uuid } from "./deps.ts";
import { Outcome } from "./src/Game.ts";

Deno.test("Update player rating after a period of games", () => {
  const players: { [key: string]: Player } = {
    A: new Player(uuid.v4.generate(), 1613),
    B: new Player(uuid.v4.generate(), 1609),
    C: new Player(uuid.v4.generate(), 1477),
    D: new Player(uuid.v4.generate(), 1388),
    E: new Player(uuid.v4.generate(), 1586),
    F: new Player(uuid.v4.generate(), 1720),
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

  assertEquals(players.A.rating, "1601");
});
