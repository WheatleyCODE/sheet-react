import { createSlice } from '@reduxjs/toolkit';

export const initialState: { a: 1 } = {
  a: 1,
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {},
});

export const tableActions = tableSlice.actions;
