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
}
