import { Pac } from "./Pac";
import { Point } from "./Point";
import { World } from "./World";
export class Enemy extends Pac {
  constructor({
    id,
    pos,
    typeId,
    speedTurnsLeft,
    abilityCooldown,
    world
  }: {
    id: number;
    pos?: Point;
    typeId?: string;
    speedTurnsLeft?: number;
    abilityCooldown?: number;
    world?: World;
  }) {
    super({ id, pos, typeId, speedTurnsLeft, abilityCooldown, world });
  }
}
