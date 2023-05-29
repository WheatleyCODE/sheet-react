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
  isLoading: boolean;
}

export const initialState: ICreateSheetsState = {
  sheets: [],
  currentSorter: ListSorters.OPEN_DATE,
  isLoading: false,
};

export const createSheetsSlice = createSlice({
  name: 'createSheets',
  initialState,
  reducers: {
    changeSheets: (state, { payload }: PayloadAction<ISheetsData[]>) => {
      state.sheets = payload;
    },

    changeCurrentSorter: (state, { payload }: PayloadAction<ListSorters>) => {
      state.currentSorter = payload;
    },

    changeIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    removeSheets: (state, { payload }: PayloadAction<string>) => {
      state.sheets = [...state.sheets].filter((sheets) => sheets.id !== payload);
    },
  },
});

export const createSheetsActions = createSheetsSlice.actions;
