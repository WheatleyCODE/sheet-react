import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IList {
  name: string;
  id: string;
  createDate: number;
  changeDate: number;
  openDate: number;
}

export interface ISheetsState {
  id: string;
  name: string;
  lists: IList[];
  currentList: string;
  settings: any;
}

export const initialState: ISheetsState = {
  id: '',
  name: 'de',
  currentList: '',
  lists: [],
  settings: {},
};

export const sheetsSlice = createSlice({
  name: 'sheets',
  initialState,
  reducers: {
    changeName: (state, { payload }: PayloadAction<string>) => {
      state.name = payload;
    },

    initSheets: (state, { payload }: PayloadAction<ISheetsState>) => {
      const { id, name, lists, settings, currentList } = payload;

      state.currentList = currentList;
      state.id = id;
      state.name = name;
      state.lists = lists;
      state.settings = settings;
    },
  },
});

export const sheetsActions = sheetsSlice.actions;
