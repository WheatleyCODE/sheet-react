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
    },

    setSelectCells: (state, { payload }: PayloadAction<ICell[]>) => {
      state.selectCells = payload;
    },
  },
});

export const tableActions = tableSlice.actions;
