import { Pellet } from "./Pellet";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Target } from "./Target";
import { Point } from "./Point";

export class World {
  private pellets: Pellet[];
  private players: Player[];
  private enemies: Enemy[];
  private pelletsCount: number = 0;
  private nearestBigPellets: Target[] = [];
  private nearestSmallPellets: Target[] = [];

  constructor() {}

  clear() {
    this.pellets = [];
    this.players = [];
    this.enemies = [];
    this.pelletsCount = 0;
    this.nearestBigPellets = [];
    this.nearestSmallPellets = [];
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
    console.error("small pellets count", [...this.pellets].filter(pellet => pellet.value != 10).length);
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
}
