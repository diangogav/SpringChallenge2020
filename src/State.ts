import { Player } from "./Player";
import { Target } from "./Target";

export abstract class PlayerState {
  public abstract readonly TAG: string;
  protected player: Player;
  constructor(player: Player) {
    this.player = player;
  }

  public abstract execute();
  public start() {
    const nearestBigPellet: Target = this.player.nearestBigPellet();
    nearestBigPellet && this.player.getWorld().addNearestBigPellet(nearestBigPellet);
  }

  public compute() {
    const nearestBigPellets = this.player.getWorld().getNearestBigPellets();
    const bigPelletToSearch = nearestBigPellets.find((pellet: Target) => pellet.playerId == this.player.id);

    if (!bigPelletToSearch) return;

    const minorBigPellet = nearestBigPellets
      .sort((a, b) => a.distance - b.distance)
      .find(pellet => bigPelletToSearch.pos.x == pellet.pos.x && bigPelletToSearch.pos.y == pellet.pos.y);

    console.error("bigPelletToSearch", bigPelletToSearch);
    console.error("nearestBigPellets", nearestBigPellets);
    if (minorBigPellet.playerId == bigPelletToSearch.playerId) {
      this.player.setState(new SearchingBigPellet(this.player, bigPelletToSearch));
    }
  }
}

export class SearchingBigPellet extends PlayerState {
  public readonly TAG = "SearchingBigPellet";
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
