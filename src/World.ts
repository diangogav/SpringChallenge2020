import { Pellet } from "./Pellet";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Target } from "./Target";
import { Point } from "./Point";
import { Cell } from "./Cell";
import { Movements } from "./Movements";
import { DIRECTION } from "./DIRECTION";

export class World {
  private pellets: Pellet[];
  private players: Player[];
  private enemies: Enemy[];
  private pelletsCount: number = 0;
  private nearestBigPellets: Target[] = [];
  private nearestSmallPellets: Target[] = [];
  private cells: Cell[] = [];

  constructor() {}

  clear() {
    this.pellets = [];
    this.players = [];
    this.enemies = [];
    this.pelletsCount = 0;
    this.nearestBigPellets = [];
    this.nearestSmallPellets = [];
    this.cells = [];
  }

  loadCells(cells: Cell[]) {
    this.cells = cells;
  }

  getCells() {
    return this.cells;
  }

  getPelletsSmallCount() {
    return this.pellets.length;
  }
  setPellets(pellets: Pellet[]) {
    this.pellets = pellets;
    this.pelletsCount = this.pellets.length;
  }

  setPlayers(players: Player[]) {
    this.players = players;
  }

  setEnemies(enemies: Enemy[]) {
    this.enemies = enemies;
  }

  getPellets() {
    return [...this.pellets];
  }

  getBigPellets() {
    return [...this.pellets].filter(pellet => pellet.value == 10);
  }

  getSmallPellets() {
    return [...this.pellets].filter(pellet => pellet.value != 10);
  }

  getPlayers() {
    return [...this.players];
  }

  addNearestBigPellet(pellet: Target) {
    pellet && this.nearestBigPellets.push(pellet);
  }

  getNearestBigPellets(): Target[] {
    return [...this.nearestBigPellets];
  }

  addNearestSmallPellet(pellet: Target) {
    pellet && this.nearestSmallPellets.push(pellet);
  }

  getNearestSmallPellets(): Target[] {
    return [...this.nearestSmallPellets];
  }

  removeBigPelletTarget(pos: Point) {
    this.nearestBigPellets = this.nearestBigPellets.filter(pellet => pellet.pos.x !== pos.x && pellet.pos.y !== pos.y);
  }

  removeSmallPelletTarget(pos: Point) {
    this.nearestSmallPellets = this.nearestSmallPellets.filter(
      pellet => pellet.pos.x !== pos.x && pellet.pos.y !== pos.y
    );
  }

  getCoordinatesCells(origen: Point): Movements[] {
    const { up, down, left, right } = origen.coordinates();
    const uppCell = this.cells.find(cell => cell.pos.equalTo(up));
    const uppCell2 = this.cells.find(cell => cell.pos.equalTo(new Point(up.x, up.y - 1)));
    const downCell = this.cells.find(cell => cell.pos.equalTo(down));
    const downCell2 = this.cells.find(cell => cell.pos.equalTo(new Point(down.x, down.y - 1)));
    const rightCell = this.cells.find(cell => cell.pos.equalTo(right));
    const rightCell2 = this.cells.find(cell => cell.pos.equalTo(new Point(right.x + 1, right.y)));
    const leftCell = this.cells.find(cell => cell.pos.equalTo(left));
    const leftCell2 = this.cells.find(cell => cell.pos.equalTo(new Point(left.x - 1, left.y)));

    return [
      {
        cell: uppCell,
        direction: DIRECTION.UP
      },
      {
        cell: downCell,
        direction: DIRECTION.DOWN
      },
      {
        cell: leftCell,
        direction: DIRECTION.LEFT
      },
      {
        cell: rightCell,
        direction: DIRECTION.RIGHT
      },
      {
        cell: uppCell2,
        direction: DIRECTION.UP
      },
      {
        cell: downCell2,
        direction: DIRECTION.DOWN
      },
      {
        cell: leftCell2,
        direction: DIRECTION.LEFT
      },
      {
        cell: rightCell2,
        direction: DIRECTION.RIGHT
      }
    ].filter(movement => movement.cell != null && movement.cell != null);
  }

  clearCells() {
    this.cells.forEach(cell => {
      if (cell.haveEnemy()) {
        cell.clearEnemy();
      }
    });
  }
}
