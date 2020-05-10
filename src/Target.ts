import { Point } from "./Point";

export interface Target {
  playerId: number;
  distance?: number;
  pos: Point;
}
