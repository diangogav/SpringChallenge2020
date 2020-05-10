import { Player } from "./Player";
import { Target } from "./Target";
import { PlayerState } from "./State";
export class CollectingSmallPellets extends PlayerState {
  public readonly TAG = "CollectingSmallPellets";
  public readonly target: Target;
  constructor(player: Player, target: Target) {
    super(player);
    this.target = target;
  }
  execute() {
    if (!this.target) return "";
    return `MOVE ${this.player.id} ${this.target.pos.x} ${this.target.pos.y}`;
  }
}
