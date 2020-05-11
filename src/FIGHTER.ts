export enum FIGHTER_TYPES {
  ROCK = "ROCK",
  SCISSORS = "SCISSORS",
  PAPER = "PAPER"
}

export abstract class FIGHTER {
  abstract readonly toWin: FIGHTER_TYPES;
  abstract readonly toLose: FIGHTER_TYPES;
  abstract readonly toDraft: FIGHTER_TYPES;
  protected opponent: FIGHTER_TYPES;

  setOpponentType(opponent: FIGHTER_TYPES) {
    this.opponent = opponent;
  }

  isStrong() {
    return this.opponent == this.toWin;
  }

  isEasy() {
    return this.opponent == this.toLose;
  }

  findTypeToWin() {
    if (this.opponent == FIGHTER_TYPES.PAPER) {
      return FIGHTER_TYPES.SCISSORS;
    } else if (this.opponent == FIGHTER_TYPES.ROCK) {
      return FIGHTER_TYPES.PAPER;
    } else if (FIGHTER_TYPES.SCISSORS) {
      return FIGHTER_TYPES.ROCK;
    }
  }
}
