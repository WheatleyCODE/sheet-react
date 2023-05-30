import { createAsyncThunk } from '@reduxjs/toolkit';
import { sheetsController } from 'widgets/sheets';
import { createSheetsActions } from '..';

import { ISheetsData } from './createSheetsSlice';

export const getAllSheetsData = createAsyncThunk<ISheetsData[]>('sheets/createSheets', async (_, thunkAPI) => {
  try {
    const sheets = sheetsController.getAllData();

    thunkAPI.dispatch(createSheetsActions.changeSheets(sheets));

    return sheets;
  } catch (e) {
    console.log(e);
    throw e;
  }
});
