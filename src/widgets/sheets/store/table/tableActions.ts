import { createAsyncThunk } from '@reduxjs/toolkit';
import { sheetsActions, sheetsController, tableActions, tableController } from 'widgets/sheets';
import { ITable } from 'widgets/sheets/helpers/createTable';
import { createListState } from 'widgets/sheets/utils/createListState';
import { ITableChangeCellValue, ITableFields } from './interface';

export const createTable = createAsyncThunk<ITable, ITableFields>(
  'table/createTable',
  async ({ tableId }, thunkAPI) => {
    try {
      const table = await tableController.create();
      const { id, rows, cols } = table;

      const list = createListState('Лист 1', id, cols, rows);

      await sheetsController.addList(tableId, id, list);

      thunkAPI.dispatch(sheetsActions.addList(list));
      thunkAPI.dispatch(tableActions.initTable(table));

      return table;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const changeCellValue = createAsyncThunk<void, ITableChangeCellValue>(
  'table/changeCellValue',
  async ({ tableId, id, value }, thunkAPI) => {
    try {
      tableController.changeCellValue(tableId, id, value);
      thunkAPI.dispatch(tableActions.changeCellValue({ id, value }));
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);
