import { Point } from "./Point";
import { Enemy } from "./Enemy";

enum CELL_TYPE {
  WALL = "WALL",
  FLOOR = "FLOOR"
}
export class Cell {
  public readonly pos: Point;
  public readonly isFree: boolean;
  private cleanCell: boolean = false;
  private enemy: Enemy;
  private type: CELL_TYPE;

  constructor(pos: Point, isFree) {
    this.pos = pos;
    this.isFree = isFree;
    if (isFree) {
      this.type = CELL_TYPE.FLOOR;
    } else {
      this.type = CELL_TYPE.WALL;
    }
  }

  public setEnemy(enemy: Enemy) {
    this.enemy = enemy;
  }

  public haveEnemy(): Enemy {
    return this.enemy;
  }

  getType() {
    return this.type;
  }

  public clearEnemy() {
    this.enemy = null;
  }

  public clean() {
    this.cleanCell = true;
  }

  public itsClean() {
    return this.cleanCell;
  }
}
