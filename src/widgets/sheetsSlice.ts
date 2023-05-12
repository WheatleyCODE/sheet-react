import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IList {
  name: string;
  id: string;
}

export interface ISheetsState {
  id: string;
  name: string;
  lists: IList[];
  settings: any;
}

export const initialState: ISheetsState = {
  id: '',
  name: 'de',
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

    initSheets: (state, { payload }: PayloadAction<{ lists: IList[]; name: string; settings: any; id: string }>) => {
      const { id, name, lists, settings } = payload;

      state.id = id;
      state.name = name;
      state.lists = lists;
      state.settings = settings;
    },
  },
});

export const sheetsActions = sheetsSlice.actions;
