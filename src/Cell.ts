import { Point } from "./Point";
export class Cell {
  public readonly pos: Point;
  public readonly isFree: boolean;
  constructor(pos: Point, isFree) {
    this.pos = pos;
    this.isFree = isFree;
  }
}
