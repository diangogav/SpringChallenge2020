import { Point } from "./Point";

export class Pellet {
  public readonly pos: Point;
  public readonly value: number;

  constructor(pos: Point, value: number) {
    this.pos = pos;
    this.value = value;
  }
}
