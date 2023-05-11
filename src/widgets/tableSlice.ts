import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICell, ICol, IRow } from 'shared/types/table';
import { createTable } from './sheets/helpers/createTable';

export interface TableState {
  cols: ICol[];
  rows: IRow[];
  cells: ICell[][];
  selectCells: ICell[];
}

const { cols, rows, cells } = createTable();

export const initialState: TableState = {
  cols,
  rows,
  cells,
  selectCells: [],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    initCols: (state, { payload }: PayloadAction<ICol[]>) => {
      state.cols = payload;
    },

    initRows: (state, { payload }: PayloadAction<IRow[]>) => {
      state.rows = payload;
    },

    initCels: (state, { payload }: PayloadAction<ICell[][]>) => {
      state.cells = payload;
    },

    setSelectCells: (state, { payload }: PayloadAction<ICell[]>) => {
      state.selectCells = payload;
    },
  },
});

export const tableActions = tableSlice.actions;
