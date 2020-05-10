import { Point } from "./Point";
import { World } from "./World";
import { Target } from "./Target";
export class Pac {
  public readonly id: number;
  private world: World;
  private pos: Point;
  private typeId: string;
  private speedTurnsLeft: number;
  private abilityCooldown: number;
  private previousPosition: Point;
  private distanceToBigPellets = {};

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

  public init() {
    this.distanceToBigPellets = {};
  }

  public updatePosition(pos: Point) {
    if (this.pos) {
      this.previousPosition = new Point(this.pos.x, this.pos.y);
    }
    this.pos = pos;
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

  public nearestBigPellet() {
    this.calculateDistanceToBigPellets();

    // console.error(this.world.getBigPellets());
    // console.error("this.distanceToBigPellets", this.distanceToBigPellets  );
    // console.error("calculateDistanceToBigPellets", this.id, this.pos, this.distanceToBigPellets);
    const distances: number[] = Object.values(this.distanceToBigPellets);
    const minDistance = Math.min(...distances);

    // console.error("distances", distances);
    // console.error("minDistance", minDistance);

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
}
