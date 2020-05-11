import { Pac } from "./Pac";
import { Point } from "./Point";
import { World } from "./World";
import { SearchingBigPellet, PlayerState } from "./State";
import { COMMAND } from "./COMMAND";

export class Player extends Pac {
  private state: PlayerState = new SearchingBigPellet(this, null);

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

  getState() {
    return this.state;
  }

  setState(state: PlayerState) {
    this.state = state;
  }
}
