import { Cell } from "../common/cell";
import { Winner } from "../models";

export enum DifficultyLevel {
  low = "low",
  medium = "medium",
  high = 'high',
  hardcore = 'hardcore'
}

export type GameSettings = {
  rows: number;
  cells: number;
  difficultyLevel: DifficultyLevel;
};

export type GameState = {
  field: { data: Cell[][] } | null;
  gameStatus: GameStatus;
  gameTimeSeconds: number;
  showModalNewGame: boolean;
  winnersList: Winner[]
};

export enum GameStatus {
  empty = "empty",
  open = "open",
  userWin = "win",
  userLose = "lose",
}
