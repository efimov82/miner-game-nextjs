import { DifficultyLevel, GameSettings } from "../types/game.types";
import { Cell, CellTypeEnum } from "./cell";

export function generateEmptyGameField(
  rowsCount: number,
  cellsCount: number
): Cell[][] {
  return Array.from(Array(rowsCount).keys(), (x) => []).map((_, rowIndex) => {
    const cells = Array.from(
      Array(cellsCount).keys(),
      (x, cellIndex) =>
        new Cell(createCellIndex(rowIndex, cellIndex), CellTypeEnum.empty)
    );
    return [...cells];
  });
}

export function getCountMinesForLevel(settings: GameSettings): number {
  const cellsCount = settings.cells * settings.rows;
  let coefficient: number;
  switch (settings.difficultyLevel) {
    case DifficultyLevel.low:
      coefficient = 15;
      break;
    case DifficultyLevel.medium:
      coefficient = 10;
      break;
    case DifficultyLevel.high:
      coefficient = 5;
      break;
    case DifficultyLevel.hardcore:
      coefficient = 4;
      break;
    default:
      throw new Error('Wrong DifficultyLevel value');
    }

    return Math.round(cellsCount / coefficient);
}

export function generateMines(
  field: Cell[][],
  countMines: number
): Set<string> {
  const mines = new Set<string>();

  while (countMines > 0) {
    const xPos = Math.floor(Math.random() * field.length);
    const yPos = Math.floor(Math.random() * field[0].length);

    if (field[xPos][yPos].type === CellTypeEnum.empty) {
      field[xPos][yPos].setType(CellTypeEnum.mine);

      mines.add(createCellIndex(xPos, yPos));
      countMines--;
    }
  }

  return mines;
}

export function calculateNumbers(field: Cell[][]): void {
  for (let rowIndex = 0; rowIndex < field.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < field[rowIndex].length; cellIndex++) {
      if (field[rowIndex][cellIndex].type === CellTypeEnum.mine) {
        continue;
      }

      const startRowIndex = rowIndex - 1 >= 0 ? rowIndex - 1 : 0;
      const startCellIndex = cellIndex - 1 >= 0 ? cellIndex - 1 : 0;
      const endRowIndex =
        rowIndex + 1 < field.length ? rowIndex + 1 : field.length - 1;
      const endCellIndex =
        cellIndex + 1 < field[rowIndex].length
          ? cellIndex + 1
          : field[rowIndex].length - 1;

      let minesAround = 0;
      for (let y = startRowIndex; y <= endRowIndex; y += 1) {
        for (let x = startCellIndex; x <= endCellIndex; x += 1) {
          if (field[y][x].type === CellTypeEnum.mine) {
            minesAround += 1;
          }
        }
      }

      field[rowIndex][cellIndex].minesAround = minesAround;
    }
  }
}

export function openEmptyCells(
  fields: Cell[][],
  rowIndex: number,
  cellIndex: number
) {
  fields[rowIndex][cellIndex].open();

  const cellsAround = collectCellsAround(fields, rowIndex, cellIndex);
  cellsAround.forEach((cell) => {
    if (fields[cell.x][cell.y].minesAround === 0) {
      openEmptyCells(fields, cell.x, cell.y);
    }

    fields[cell.x][cell.y].open();
  });
}

export function collectCellsAround(
  fields: Cell[][],
  rowIndex: number,
  cellIndex: number
): Set<{ x: number; y: number }> {
  let result = new Set<{ x: number; y: number }>();

  const rowLength = fields.length;
  const cellLegth = fields[0].length;

  const startRowIndex = rowIndex - 1 > 0 ? rowIndex - 1 : 0;
  const endRowIndex =
    rowIndex + 1 < rowLength - 1 ? rowIndex + 1 : rowLength - 1;

  const startCellIndex = cellIndex - 1 > 0 ? cellIndex - 1 : 0;
  const endCellIndex =
    cellIndex + 1 < cellLegth - 1 ? cellIndex + 1 : cellLegth - 1;

  for (let rIndex = startRowIndex; rIndex <= endRowIndex; rIndex++) {
    for (let cIndex = startCellIndex; cIndex <= endCellIndex; cIndex++) {
      fields[rIndex][cIndex].debugInfo = "checked";
      if (!fields[rIndex][cIndex].isOpen && !fields[rIndex][cIndex].isMarked) {
        result.add({ x: rIndex, y: cIndex });
      }
    }
  }

  return result;
}

export function getIndexesById(id: string): {
  rowIndex: number;
  cellIndex: number;
} {
  const split = id.split("_");
  if (split.length !== 2) {
    const err = new Error(`Can't get indexes of ${id}`);
    throw err;
  }

  return {
    rowIndex: Number(split[0]),
    cellIndex: Number(split[1]),
  };
}

export function createCellIndex(rowIndex: number, cellIndex: number): string {
  return `${rowIndex}_${cellIndex}`;
}
