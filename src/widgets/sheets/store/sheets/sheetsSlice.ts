import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IList, ISheetsState } from './interface';

export const initialState: ISheetsState = {
  createDate: 0,
  changeDate: 0,
  openDate: 0,
  id: '',
  name: '',
  currentListId: '',
  lists: [],
  settings: {},
  isLoading: false,
};

export const sheetsSlice = createSlice({
  name: 'sheets',
  initialState,
  reducers: {
    changeName: (state, { payload }: PayloadAction<string>) => {
      state.name = payload;
    },

    initSheets: (state, { payload }: PayloadAction<ISheetsState>) => {
      const { id, name, lists, settings, currentListId, openDate, changeDate, createDate, isLoading } = payload;

      state.currentListId = currentListId;
      state.id = id;
      state.name = name;
      state.lists = lists;
      state.settings = settings;
      state.createDate = createDate;
      state.changeDate = changeDate;
      state.openDate = openDate;
      state.isLoading = isLoading;
    },

    clearSheets: (state) => {
      state.currentListId = initialState.currentListId;
      state.id = initialState.id;
      state.name = initialState.name;
      state.lists = initialState.lists;
      state.settings = initialState.settings;
      state.createDate = initialState.createDate;
      state.changeDate = initialState.changeDate;
      state.openDate = initialState.openDate;
      state.isLoading = initialState.isLoading;
    },

    addList: (state, { payload }: PayloadAction<IList>) => {
      state.lists.push(payload);
      state.currentListId = payload.id;
    },

    removeList: (state, { payload }: PayloadAction<string>) => {
      state.lists = [...state.lists].filter((list) => list.id !== payload);
    },

    renameList: (state, { payload }: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = payload;

      state.lists = state.lists.map((list) => {
        if (list.id === id) {
          return { ...list, name };
        }

        return list;
      });
    },

    changeCurrentListId: (state, { payload }: PayloadAction<string>) => {
      state.currentListId = payload;
    },

    changeIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    changeLists: (state, { payload }: PayloadAction<IList[]>) => {
      state.lists = payload;
    },
  },
});

export const sheetsActions = sheetsSlice.actions;
