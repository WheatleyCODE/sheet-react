import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IList } from 'widgets/sheets/store/sheetsSlice';

export interface ISheets {
  id: string;
  name: string;
  lists: IList[];
}
export interface ICreateSheetsState {
  sheets: ISheets[];
}

export const initialState: ICreateSheetsState = {
  sheets: [],
};

export const createSheetsSlice = createSlice({
  name: 'createSheets',
  initialState,
  reducers: {
    changeSheets: (state, { payload }: PayloadAction<ISheets[]>) => {
      state.sheets = payload;
    },
  },
});

export const createSheetsActions = createSheetsSlice.actions;
