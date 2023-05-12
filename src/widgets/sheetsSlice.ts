import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IList {
  name: string;
}

export interface ISheetsState {
  name: string;
  lists: IList[];
  settings: any;
}

export const initialState: ISheetsState = {
  name: 'Новая таблица',
  lists: [{ name: 'Лист 1' }, { name: 'Лист 2' }, { name: 'Лист 3' }],
  settings: {},
};

export const sheetsSlice = createSlice({
  name: 'sheets',
  initialState,
  reducers: {
    changeName: (state, { payload }: PayloadAction<string>) => {
      state.name = payload;
    },
  },
});

export const sheetsActions = sheetsSlice.actions;
