import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const initialState: { isShow: boolean } = {
  isShow: false,
};

export const createSheetsSlice = createSlice({
  name: 'createSheets',
  initialState,
  reducers: {
    changeIsShow: (state, { payload }: PayloadAction<boolean>) => {
      state.isShow = payload;
    },
  },
});

export const createSheetsActions = createSheetsSlice.actions;
