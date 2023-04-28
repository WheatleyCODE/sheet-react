import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const initialState: { isShow: boolean } = {
  isShow: false,
};

export const asideSlice = createSlice({
  name: 'aside',
  initialState,
  reducers: {
    changeIsShow: (state, { payload }: PayloadAction<boolean>) => {
      state.isShow = payload;
    },
  },
});

export const asideActions = asideSlice.actions;
