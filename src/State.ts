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

    const nearestSmallPellet: Target = this.player.nearestSmallPellet();
    nearestSmallPellet && this.player.getWorld().addNearestSmallPellet(nearestBigPellet);
  }

  public compute() {
    if (this.player.isFrozen()) {
      console.error("Pac", this.player.id, "is frozen at", this.player.getPos());
      const movements = this.player.calculateMovements();
      console.error(movements);
    }

    const nearestBigPellets = this.player.getWorld().getNearestBigPellets();
    const bigPelletToSearch = nearestBigPellets.find((pellet: Target) => pellet.playerId == this.player.id);

    if (bigPelletToSearch) {
      const minorBigPellet = nearestBigPellets
        .sort((a, b) => a.distance - b.distance)
        .find(pellet => bigPelletToSearch.pos.x == pellet.pos.x && bigPelletToSearch.pos.y == pellet.pos.y);

      if (minorBigPellet.playerId == bigPelletToSearch.playerId) {
        this.player.setState(new SearchingBigPellet(this.player, bigPelletToSearch));
        return;
      }
    }

    if (this.player.getSmallPelletTarget()) {
      this.player.setState(new CollectingSmallPellets(this.player, this.player.getSmallPelletTarget()));
      return;
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

export class Frozen extends PlayerState {
  public readonly TAG = "CollectingSmallPellets";

  constructor(player: Player) {
    super(player);
  }

  execute() {
    return `MOVE ${this.player.id} ${this.player.getPos().x} ${this.player.getPos().y}`;
  }
}
