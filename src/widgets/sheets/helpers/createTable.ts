import { ICell, ICol, IRow } from 'entities/share/types/table';
import { toCharCode } from '../utils/toCharCode';
import { createCellData, createColData, createRowData } from './createCells';
import { v4 } from 'uuid';

export interface ITable {
  cols: ICol[];
  rows: IRow[];
  cells: ICell[][];
  id: string;
}

export const createCols = (colsCount: number): ICol[] => {
  const toChar = toCharCode();
  return new Array(colsCount).fill('').map((_, i) => createColData(toChar(), i + 1));
};

export const createRows = (rowsCount: number): IRow[] => {
  return new Array(rowsCount).fill('').map((_, i) => createRowData(i + 1));
};

export const createCells = (rows: IRow[], colsCount: number): ICell[][] => {
  const cells: ICell[][] = [];

  for (let i = 0; i < rows.length; i++) {
    cells[i] = [];

    for (let j = 0; j < colsCount; j++) {
      cells[i].push(createCellData(`${i}:${j}`));
    }
  }

  return cells;
};

export const createTable = (colsCount = 30, rowsCount = 50): ITable => {
  const cols = createCols(colsCount);
  const rows = createRows(rowsCount);
  const cells = createCells(rows, colsCount);

  return {
    cols,
    rows,
    cells,
    id: v4(),
  };
};
