import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum ListSorters {
  NAME = 'NAME',
  CREATE_DATE = 'CREATE_DATE',
  CHANGE_DATE = 'CHANGE_DATE',
  OPEN_DATE = 'OPEN_DATE',
}
export interface ISheetsData {
  id: string;
  name: string;
  listsCount: number;
  createDate: number;
  changeDate: number;
  openDate: number;
}
export interface ICreateSheetsState {
  sheets: ISheetsData[];
  currentSorter: ListSorters;
}

export const initialState: ICreateSheetsState = {
  sheets: [],
  currentSorter: ListSorters.NAME,
};

export const createSheetsSlice = createSlice({
  name: 'createSheets',
  initialState,
  reducers: {
    changeSheets: (state, { payload }: PayloadAction<ISheetsData[]>) => {
      state.sheets = payload;
    },
  },
});

export const createSheetsActions = createSheetsSlice.actions;
