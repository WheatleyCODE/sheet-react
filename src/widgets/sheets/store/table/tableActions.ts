import { createAsyncThunk } from '@reduxjs/toolkit';
import { sheetsActions, SheetsReqServiceFactory, tableActions, TableReqServiceFactory } from 'widgets/sheets';
import { ITable } from 'widgets/sheets/helpers/createTable';
import { createListState } from 'widgets/sheets/utils/createListState';
import { ITableChangeCellValue, ITableFields } from './interface';
import { modalsActions } from 'widgets/modal-controller';

export const createTable = createAsyncThunk<ITable, ITableFields>(
  'table/createTable',
  async ({ tableId }, thunkAPI) => {
    try {
      const sheetsReqService = SheetsReqServiceFactory();
      const tableReqService = TableReqServiceFactory();

      thunkAPI.dispatch(modalsActions.changeLoader({ isShow: true }));

      const table = await tableReqService.create();
      const { id, rows, cols } = table;

      const list = createListState('Лист 1', id, cols, rows);

      await sheetsReqService.addList(tableId, id, list);

      thunkAPI.dispatch(sheetsActions.addList(list));
      thunkAPI.dispatch(tableActions.initTable(table));
      thunkAPI.dispatch(modalsActions.changeLoader({ isShow: false }));

      return table;
    } catch (e) {
      thunkAPI.dispatch(modalsActions.changeLoader({ isShow: false }));
      console.log(e);
      throw e;
    }
  }
);

export const changeCellValue = createAsyncThunk<void, ITableChangeCellValue>(
  'table/changeCellValue',
  async ({ tableId, id, value }, thunkAPI) => {
    try {
      const tableReqService = TableReqServiceFactory();
      const cell = await tableReqService.changeCellValue(tableId, id, value);

      thunkAPI.dispatch(tableActions.changeCellValue({ id, value: cell.value }));
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const addColWidth = createAsyncThunk<void, { sheetsId: string; listId: string; colId: number; width: number }>(
  'table/addCellWidth',
  async ({ sheetsId, listId, colId, width }, thunkAPI) => {
    try {
      const sheetsReqService = SheetsReqServiceFactory();
      const { lists } = await sheetsReqService.addColWidth(sheetsId, listId, colId, width);

      thunkAPI.dispatch(tableActions.addColWidth({ colId, width }));
      thunkAPI.dispatch(sheetsActions.changeLists(lists));
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const addRowHeight = createAsyncThunk<void, { sheetsId: string; listId: string; rowId: number; height: number }>(
  'table/addCellWidth',
  async ({ sheetsId, listId, rowId, height }, thunkAPI) => {
    try {
      const sheetsReqService = SheetsReqServiceFactory();
      const { lists } = await sheetsReqService.addRowHeight(sheetsId, listId, rowId, height);

      thunkAPI.dispatch(tableActions.addRowHeight({ rowId, height }));
      thunkAPI.dispatch(sheetsActions.changeLists(lists));
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);
