import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Point } from "./Point";
import { Pellet } from "./Pellet";
import { World } from "./World";
import { Cell } from "./Cell";
import { FIGHTER_TYPES } from "./FIGHTER";
export class LoadManager {
  initPacs() {
    const players: Player[] = [
      new Player({ id: 0 }),
      new Player({ id: 1 }),
      new Player({ id: 2 }),
      new Player({ id: 3 }),
      new Player({ id: 4 })
    ];

    return {
      players
    };
  }

  loadPlayers(visiblePacCount: number, players: Player[], world: World) {
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
          player.createFighter(<FIGHTER_TYPES>typeId);
          player.setAbilityCountdown(abilityCooldown);
          player.init();
          const cellToClean = world.getCells().find(cell => x == cell.pos.x && y == cell.pos.y);

          if (cellToClean) {
            cellToClean.clean();
          }

          // console.error("ID: ", player.id, "STATE: ", player.getState().TAG);
          // // console.error("ID: ", player.id, "POS: ", player.getPos());
          // // console.error("ID: ", player.id, "DIRECTION: ", player.getDirection());
          currentPlayers.push(player);
        }
      } else {
        const enemy = new Enemy({ id: pacId, pos: new Point(x, y), typeId });
        const markCellAsEnemy = world.getCells().find(cell => x == cell.pos.x && y == cell.pos.y);

        // console.error("enemy", x, y);
        if (markCellAsEnemy) {
          markCellAsEnemy.setEnemy(enemy);
          markCellAsEnemy.clean();
        }
        // console.error("markCellAsEnemy", markCellAsEnemy);

        currentEnemies.push(enemy);
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

  paintMap(height: number): Cell[] {
    const cells: Cell[] = [];
    for (let y = 0; y < height; y++) {
      const row: string = readline(); // one line of the grid: space " " is floor, pound "#" is wall
      row.split("").forEach((element, x) => {
        const isFree = element == "#" ? false : true;
        const cell = new Cell(new Point(x, y), isFree);
        cells.push(cell);
      });
    }
    return cells;
  }
}
