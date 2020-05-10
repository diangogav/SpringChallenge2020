import { DIRECTION } from "./DIRECTION";

export class Point {
  public readonly x: number;
  public readonly y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distanceTo(target: Point) {
    return Math.abs(this.x - target.x) + Math.abs(this.y - target.y);
  }

  equalTo(point: Point) {
    return this.x == point.x && this.y == point.y;
  }

  directionTo(from: Point) {
    if (this.x == from.x && this.y < from.y) {
      return DIRECTION.UP;
    } else if (this.x == from.x && this.y > from.y) {
      return DIRECTION.DOWN;
    } else if (this.x < from.x && this.y == from.y) {
      return DIRECTION.LEFT;
    } else if (this.x > from.x && this.y == from.y) {
      return DIRECTION.RIGHT;
    } else {
      return null;
    }
  }
}
