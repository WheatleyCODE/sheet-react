import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICol, IRow } from 'shared/types/table';
export interface IList {
  name: string;
  id: string;
  cols: ICol[];
  rows: IRow[];
}

export interface ISheetsState {
  id: string;
  name: string;
  lists: IList[];
  currentListId: string;
  settings: any;
  createDate: number;
  changeDate: number;
  openDate: number;
  isLoading: boolean;
}

export const initialState: ISheetsState = {
  createDate: 0,
  changeDate: 0,
  openDate: 0,
  id: '',
  name: '',
  currentListId: '',
  lists: [],
  settings: {},
  isLoading: true,
};

export const sheetsSlice = createSlice({
  name: 'sheets',
  initialState,
  reducers: {
    changeName: (state, { payload }: PayloadAction<string>) => {
      state.name = payload;
    },

    initSheets: (state, { payload }: PayloadAction<ISheetsState>) => {
      const { id, name, lists, settings, currentListId, openDate, changeDate, createDate } = payload;

      console.log(lists);

      state.currentListId = currentListId;
      state.id = id;
      state.name = name;
      state.lists = lists;
      state.settings = settings;
      state.createDate = createDate;
      state.changeDate = changeDate;
      state.openDate = openDate;
    },

    addList: (state, { payload }: PayloadAction<IList>) => {
      state.lists.push(payload);
      state.currentListId = payload.id;
    },

    removeList: (state, { payload }: PayloadAction<string>) => {
      state.lists = [...state.lists].filter((list) => list.id !== payload);
    },

    changeCurrentListId: (state, { payload }: PayloadAction<string>) => {
      state.currentListId = payload;
    },

    changeIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
});

export const sheetsActions = sheetsSlice.actions;
