import { createAsyncThunk } from '@reduxjs/toolkit';
import { sheetsController } from 'widgets/sheets';
import { createSheetsActions } from '..';

import { ISheetsData } from './createSheetsSlice';

export const getAllSheetsData = createAsyncThunk<ISheetsData[]>('sheets/createSheets', async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(createSheetsActions.changeIsLoading(true));

    const sheets = sheetsController.getAllData();

    thunkAPI.dispatch(createSheetsActions.changeSheets(sheets));
    thunkAPI.dispatch(createSheetsActions.changeIsLoading(false));

    return sheets;
  } catch (e) {
    thunkAPI.dispatch(createSheetsActions.changeIsLoading(false));
    console.log(e);
    throw e;
  }
});
