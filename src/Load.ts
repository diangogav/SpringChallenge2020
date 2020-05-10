import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Point } from "./Point";
import { Pellet } from "./Pellet";
import { World } from "./World";
export class LoadManager {
  initPacs() {
    const players: Player[] = [
      new Player({ id: 0 }),
      new Player({ id: 1 }),
      new Player({ id: 2 }),
      new Player({ id: 3 }),
      new Player({ id: 4 })
    ];
    const enemies: Enemy[] = [
      new Enemy({ id: 0 }),
      new Enemy({ id: 1 }),
      new Enemy({ id: 2 }),
      new Enemy({ id: 3 }),
      new Enemy({ id: 4 })
    ];

    return {
      players,
      enemies
    };
  }

  loadPlayers(visiblePacCount: number, players: Player[], enemies: Enemy[], world: World) {
    const currentPlayers: Player[] = [];
    const currentEnemies: Enemy[] = [];

    for (let i = 0; i < visiblePacCount; i++) {
      var inputs: string[] = readline().split(" ");
      const pacId: number = parseInt(inputs[0]); // pac number (unique within a team)
      const mine: boolean = inputs[1] !== "0"; // true if this pac is yours
      const x: number = parseInt(inputs[2]); // position in the grid
      const y: number = parseInt(inputs[3]); // position in the grid
      const typeId: string = inputs[4]; // unused in wood leagues
      const speedTurnsLeft: number = parseInt(inputs[5]); // unused in wood leagues
      const abilityCooldown: number = parseInt(inputs[6]); // unused in wood leagues

      if (mine) {
        const player = players.find(player => player.id == pacId);
        if (player) {
          player.updatePosition(new Point(x, y));
          player.setWorld(world);
          player.init();
          console.error("ID: ", player.id, "STATE: ", player.getState().TAG);
          console.error("ID: ", player.id, "DIRECTION: ", player.getDirection());
          currentPlayers.push(player);
        }
      }
    }

    return {
      currentPlayers,
      currentEnemies
    };
  }

  loadPellets(visiblePelletCount: number) {
    const pellets: Pellet[] = [];
    for (let i = 0; i < visiblePelletCount; i++) {
      var inputs: string[] = readline().split(" ");
      const x: number = parseInt(inputs[0]);
      const y: number = parseInt(inputs[1]);
      const value: number = parseInt(inputs[2]); // amount of points this pellet is worth
      const pellet = new Pellet(new Point(x, y), value);
      pellets.push(pellet);
    }
    return pellets;
  }
}
