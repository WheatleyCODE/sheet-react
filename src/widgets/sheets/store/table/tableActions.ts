import { createAsyncThunk } from '@reduxjs/toolkit';
import { sheetsActions, sheetsController, tableActions, tableController } from 'widgets/sheets';
import { ITable } from 'widgets/sheets/helpers/createTable';

export const createTable = createAsyncThunk<ITable, { sheetId: string }>(
  'table/createTable',
  async (fields, thunkAPI) => {
    try {
      const table = await tableController.create();

      const list = {
        name: 'Лист 1',
        id: table.id,
        cols: table.cols,
        rows: table.rows,
      };

      await sheetsController.addList(fields.sheetId, table.id, list);

      thunkAPI.dispatch(sheetsActions.addList(list));
      thunkAPI.dispatch(tableActions.initTable(table));

      return table;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const changeCellValue = createAsyncThunk<void, { tableId: string; id: string; value: string }>(
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
