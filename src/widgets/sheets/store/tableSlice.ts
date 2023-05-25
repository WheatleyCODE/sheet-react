import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICell, ICol, IRow } from 'entities';

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
    initTable: (state, { payload }: PayloadAction<{ cols: ICol[]; rows: IRow[]; cells: ICell[][]; id: string }>) => {
      const { id, cols, rows, cells } = payload;

      state.id = id;
      state.cols = cols;
      state.rows = rows;
      state.cells = cells;
    },

    setSelectCells: (state, { payload }: PayloadAction<ICell[]>) => {
      state.selectCells = payload;
    },
  },
});

export const tableActions = tableSlice.actions;
