import { createSlice } from '@reduxjs/toolkit';

export const initialState: { b: 2 } = {
  b: 2,
};

export const toolbarSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {},
});

export const toolbarActions = toolbarSlice.actions;
