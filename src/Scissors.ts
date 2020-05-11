import { FIGHTER, FIGHTER_TYPES } from "./FIGHTER";
export class Scissors extends FIGHTER {
  public readonly toWin: FIGHTER_TYPES = FIGHTER_TYPES.PAPER;
  public readonly toLose: FIGHTER_TYPES = FIGHTER_TYPES.ROCK;
  public readonly toDraft: FIGHTER_TYPES = FIGHTER_TYPES.SCISSORS;
}
