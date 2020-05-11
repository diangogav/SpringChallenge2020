import { Player } from "./Player";
import { Target } from "./Target";
import { Movements } from "./Movements";
import { Cell } from "./Cell";
import { FIGHTER_TYPES } from "./FIGHTER";

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
    const movements = this.player.calculateMovements();

    const enemiesMovements = movements.filter(move => move.cell.haveEnemy());

    if (this.player.id == 1) {
      // movements.forEach(move => console.error(move.cell));
    }
    const toWin = enemiesMovements.find(
      movement => movement.cell.haveEnemy().getType() == this.player.toPlayerMode().toWin
    );
    const toDraft = enemiesMovements.find(
      movement => movement.cell.haveEnemy().getType() == this.player.toPlayerMode().toDraft
    );

    if (toDraft) {
      this.player.setState(new SWITCH(this.player, this.player.toPlayerMode().toWin));
      return;
    }

    // if (this.player.collided()) {
    // //   console.error("Pac", this.player.id, "is frozen at", this.player.getPos());
    //   const movements = this.player.calculateMovements();
    // //   console.error(movements);
    // }

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

    this.player.setState(new Traveling(this.player));
  }
}

export class Traveling extends PlayerState {
  public readonly TAG = "Traveling";

  constructor(player: Player) {
    super(player);
  }

  execute() {
    const onlyDistances = {};

    const cleanedCells = this.player
      .getWorld()
      .getCells()
      .filter(cell => !cell.itsClean() && cell.isFree == true);

    cleanedCells.forEach((cell, index) => {
      onlyDistances[index] = this.player.getPos().distanceTo(cell.pos);
    });

    const distances: number[] = Object.values(onlyDistances);
    const minDistance = Math.min(...distances);

    const cell = cleanedCells.find(cell => this.player.getPos().distanceTo(cell.pos) == minDistance);

    return `MOVE ${this.player.id} ${cell.pos.x} ${cell.pos.y}`;
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
    // console.error("hability", this.player.canExecuteHability());
    if (this.player.canExecuteHability()) {
      return `SPEED ${this.player.id}`;
    }
    if (!this.target) {
      this.player.setState(new Traveling(this.player));
    } else {
      return `MOVE ${this.player.id} ${this.target.pos.x} ${this.target.pos.y}`;
    }
  }
}

export class Collided extends PlayerState {
  public TAG: string = "Collided";
  public movements: Movements;

  constructor(player: Player, movements: Movements) {
    super(player);
    this.movements = movements;
  }
  execute() {
    const forwardCell: Cell = this.movements[this.player.getDirection()];
    const isEnemy = forwardCell.haveEnemy();
    // console.error("isEnemy", isEnemy);
    // console.error("forwardCell", forwardCell);

    return `MOVE ${this.player.id} ${this.player.getPos().x} ${this.player.getPos().y}`;
  }
}

export class SWITCH extends PlayerState {
  public readonly TAG: string = "SWITCH";
  public type: FIGHTER_TYPES;

  constructor(player: Player, type: FIGHTER_TYPES) {
    super(player);
    this.type = type;
  }

  execute() {
    return `SWITCH ${this.player.id} ${this.type}`;
  }
}
