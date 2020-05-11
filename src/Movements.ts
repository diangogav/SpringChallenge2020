import { Cell } from "./Cell";
import { DIRECTION } from "./DIRECTION";
export interface Movements {
  [DIRECTION.UP]: Cell;
  [DIRECTION.DOWN]: Cell;
  [DIRECTION.RIGHT]: Cell;
  [DIRECTION.LEFT]: Cell;
}
