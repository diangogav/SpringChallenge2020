import { Point } from "./Point";
import { World } from "./World";
import { Target } from "./Target";
import { DIRECTION } from "./DIRECTION";
export class Pac {
  public readonly id: number;
  private world: World;
  private pos: Point;
  private typeId: string;
  private speedTurnsLeft: number;
  private abilityCooldown: number;
  private previousPosition: Point;
  private distanceToBigPellets = {};
  private distanceToSmallPellets = {};
  private smallPelletTarget: Target;
  private direction: DIRECTION;

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
    this.id = id;
    if (world) this.world = world;
    if (pos) this.pos = pos;
    if (typeId) this.typeId = typeId;
    if (speedTurnsLeft) this.speedTurnsLeft = speedTurnsLeft;
    if (abilityCooldown) this.abilityCooldown = abilityCooldown;
  }

  public getDirection() {
    return this.direction;
  }

  public init() {
    this.distanceToBigPellets = {};
    this.distanceToSmallPellets = {};
  }

  public updatePosition(pos: Point) {
    if (this.pos) {
      this.previousPosition = new Point(this.pos.x, this.pos.y);
    }
    this.pos = pos;
    this.calculateDirection();
  }

  private calculateDirection() {
    if (!this.previousPosition) return;
    const direction = this.pos.directionTo(this.previousPosition);
    if (direction) this.direction = direction;
  }

  public getPos(): Point {
    return this.pos;
  }

  public isFrozen(): boolean {
    if (!this.previousPosition) return false;
    return this.pos.equalTo(this.previousPosition);
  }

  public setWorld(world: World) {
    this.world = world;
  }

  public getWorld(): World {
    return this.world;
  }

  private calculateDistanceToBigPellets() {
    this.world.getBigPellets().forEach((bigPellet, index) => {
      this.distanceToBigPellets[index] = this.pos.distanceTo(bigPellet.pos);
    });

    return this.distanceToBigPellets;
  }

  private calculateDistanceToSmallPellets() {
    this.world.getSmallPellets().forEach((pellet, index) => {
      this.distanceToSmallPellets[index] = this.pos.distanceTo(pellet.pos);
    });

    return this.distanceToSmallPellets;
  }

  public nearestBigPellet() {
    this.calculateDistanceToBigPellets();

    const distances: number[] = Object.values(this.distanceToBigPellets);
    const minDistance = Math.min(...distances);

    const minBigPellet = this.world
      .getBigPellets()
      .find(bigPellet => this.pos.distanceTo(bigPellet.pos) == minDistance);

    if (!minBigPellet) return;

    const target: Target = {
      pos: minBigPellet.pos,
      distance: minDistance,
      playerId: this.id
    };

    return target;
  }

  public nearestSmallPellet() {
    this.calculateDistanceToSmallPellets();
    const distances: number[] = Object.values(this.distanceToSmallPellets);
    const minDistance = Math.min(...distances);

    const minSmallPellet = this.world
      .getSmallPellets()
      .find(smallPellet => this.pos.distanceTo(smallPellet.pos) == minDistance);

    // console.error("minSmallPellet", minSmallPellet);

    if (!minSmallPellet) return;

    const target: Target = {
      pos: minSmallPellet.pos,
      distance: minDistance,
      playerId: this.id
    };

    this.smallPelletTarget = target;

    return target;
  }

  getSmallPelletTarget(): Target {
    return this.smallPelletTarget;
  }
}
