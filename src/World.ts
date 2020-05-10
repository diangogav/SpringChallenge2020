import { Pellet } from "./Pellet";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Target } from "./Target";
import { Point } from "./Point";
import { Cell } from "./Cell";
import { Movements } from "./Movements";

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

  getCoordinatesCells(origen: Point): Movements {
    const { up, down, left, right } = origen.coordinates();
    const uppCell = this.cells.find(cell => cell.pos.equalTo(up));
    const downCell = this.cells.find(cell => cell.pos.equalTo(down));
    const rightCell = this.cells.find(cell => cell.pos.equalTo(right));
    const leftCell = this.cells.find(cell => cell.pos.equalTo(left));

    console.error(uppCell);
    console.error(downCell);
    console.error(rightCell);
    console.error(leftCell);
    return {
      up: uppCell,
      down: downCell,
      left: leftCell,
      rigth: rightCell
    };
  }
}
