import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICell, ICol, IRow } from 'entities';

import { ITable } from 'widgets/sheets/helpers/createTable';

export interface TableState {
  id: string;
  cols: ICol[];
  rows: IRow[];
  cells: ICell[][];
  selectCells: ICell[];
}

export const initialState: TableState = {
  id: '',
  cols: [],
  rows: [],
  cells: [],
  selectCells: [],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    initTable: (state, { payload }: PayloadAction<ITable>) => {
      const { id, cols, rows, cells } = payload;

      state.id = id;
      state.cols = cols;
      state.rows = rows;
      state.cells = cells;
    },

    changeCellValue: (state, { payload }: PayloadAction<{ id: string; value: string }>) => {
      const { id, value } = payload;
      const [row, col] = id.split(':');
      state.cells[Number(row)][Number(col)].value = value;

      state.selectCells = state.selectCells.map((cell) => {
        if (cell.id) {
          return { ...cell, value };
        }

        return cell;
      });
    },

    setSelectCells: (state, { payload }: PayloadAction<ICell[]>) => {
      state.selectCells = payload;
    },

    addColWidth: (state, { payload }: PayloadAction<{ colId: number; width: number }>) => {
      const { colId, width } = payload;
      state.cols[colId - 1].width += width;
    },

    addRowHeight: (state, { payload }: PayloadAction<{ rowId: number; height: number }>) => {
      const { rowId, height } = payload;
      state.rows[rowId - 1].height += height;
    },
  },
});

export const tableActions = tableSlice.actions;
