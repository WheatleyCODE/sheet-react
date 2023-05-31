import { createAsyncThunk } from '@reduxjs/toolkit';
import { sheetsActions } from './sheetsSlice';
import { SheetsReqServiceFactory, tableActions, TableReqServiceFactory } from 'widgets/sheets';
import { createSheetsActions } from 'widgets/create-sheets';
import { createTableState } from 'widgets/sheets/utils/createTableState';
import { checkAndFindList, checkAndGetFirstList, createNewListName } from 'widgets/sheets/utils/listsUtils';
import { createListState } from 'widgets/sheets/utils/createListState';
import { modalsActions } from 'widgets/modal-controller';
import {
  ISheetsChangeNameFields,
  ISheetsCurrentListFields,
  ISheetsFields,
  ISheetsListIdFields,
  ISheetsRenameList,
  ISheetsState,
} from './interface';

export const createSheets = createAsyncThunk<ISheetsState, ISheetsFields>(
  'sheets/createSheets',
  async (fields, thunkAPI) => {
    try {
      const sheetsReqService = SheetsReqServiceFactory();
      thunkAPI.dispatch(sheetsActions.clearSheets());

      const sheets = await sheetsReqService.create(fields.id);
      thunkAPI.dispatch(sheetsActions.initSheets(sheets));

      return sheets;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const removeSheets = createAsyncThunk<ISheetsState, ISheetsFields>(
  'sheets/removeSheets',
  async (fields, thunkAPI) => {
    try {
      const sheetsReqService = SheetsReqServiceFactory();
      const tableReqService = TableReqServiceFactory();

      const sheets = await sheetsReqService.remove(fields.id);

      tableReqService.deleteTables(sheets.lists.map((list) => list.id));
      thunkAPI.dispatch(createSheetsActions.removeSheets(sheets.id));

      return sheets;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const getSheets = createAsyncThunk<ISheetsState, ISheetsFields>('sheets/getSheets', async ({ id }, thunkAPI) => {
  try {
    const sheetsReqService = SheetsReqServiceFactory();
    const tableReqService = TableReqServiceFactory();

    thunkAPI.dispatch(sheetsActions.clearSheets());
    thunkAPI.dispatch(modalsActions.changeLoader({ isShow: true }));

    const sheets = await sheetsReqService.get(id);

    const { id: listId, cols, rows } = checkAndGetFirstList(sheets.lists);
    const cells = await tableReqService.get(listId);

    thunkAPI.dispatch(sheetsActions.initSheets(sheets));
    thunkAPI.dispatch(tableActions.initTable(createTableState(listId, rows, cols, cells)));
    thunkAPI.dispatch(modalsActions.changeLoader({ isShow: false }));

    return sheets;
  } catch (e) {
    thunkAPI.dispatch(modalsActions.changeLoader({ isShow: false }));
    throw e;
  }
});

export const createList = createAsyncThunk<ISheetsState, ISheetsFields>(
  'sheets/createList',
  async ({ id }, thunkAPI) => {
    try {
      const sheetsReqService = SheetsReqServiceFactory();
      const tableReqService = TableReqServiceFactory();

      thunkAPI.dispatch(modalsActions.changeLoader({ isShow: true }));

      const sheets = await sheetsReqService.get(id);

      const table = await tableReqService.create();
      const { id: tableId, cols, rows } = table;

      const list = createListState(createNewListName(sheets.lists), tableId, cols, rows);
      await sheetsReqService.addList(sheets.id, tableId, list);

      thunkAPI.dispatch(sheetsActions.addList(list));
      thunkAPI.dispatch(tableActions.initTable(table));
      thunkAPI.dispatch(modalsActions.changeLoader({ isShow: false }));

      return sheets;
    } catch (e) {
      thunkAPI.dispatch(modalsActions.changeLoader({ isShow: false }));
      throw e;
    }
  }
);

export const copyList = createAsyncThunk<ISheetsState, ISheetsListIdFields>(
  'sheets/copyList',
  async ({ id, listId }, thunkAPI) => {
    try {
      const sheetsReqService = SheetsReqServiceFactory();
      const tableReqService = TableReqServiceFactory();

      thunkAPI.dispatch(modalsActions.changeLoader({ isShow: true }));

      const sheets = await sheetsReqService.get(id);
      const { cols, rows, name } = checkAndFindList(sheets.lists, listId);

      const { cells, id: newListId } = await tableReqService.copy(listId);
      const newList = createListState(`Копия ${name}`, newListId, cols, rows);

      const resSheets = await sheetsReqService.addList(sheets.id, newListId, newList);

      thunkAPI.dispatch(sheetsActions.addList(newList));
      thunkAPI.dispatch(tableActions.initTable(createTableState(newListId, rows, cols, cells)));
      thunkAPI.dispatch(modalsActions.changeLoader({ isShow: false }));

      return resSheets;
    } catch (e) {
      thunkAPI.dispatch(modalsActions.changeLoader({ isShow: false }));
      throw e;
    }
  }
);

export const removeList = createAsyncThunk<ISheetsState, ISheetsListIdFields>(
  'sheets/removeList',
  async ({ id, listId }, thunkAPI) => {
    try {
      const sheetsReqService = SheetsReqServiceFactory();
      const tableReqService = TableReqServiceFactory();

      const sheets = await sheetsReqService.removeList(id, listId);
      tableReqService.deleteTable(listId);

      const { id: extListId, cols, rows } = checkAndGetFirstList(sheets.lists);
      const cells = await tableReqService.get(extListId);

      thunkAPI.dispatch(sheetsActions.removeList(listId));

      const resSheets = await sheetsReqService.changeCurrentListId(id, extListId);

      thunkAPI.dispatch(tableActions.initTable(createTableState(extListId, rows, cols, cells)));
      thunkAPI.dispatch(sheetsActions.changeCurrentListId(extListId));

      return resSheets;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const changeCurrentList = createAsyncThunk<ISheetsState, ISheetsCurrentListFields>(
  'sheets/changeCurrentList',
  async ({ id, newCurrentId }, thunkAPI) => {
    try {
      const sheetsReqService = SheetsReqServiceFactory();
      const tableReqService = TableReqServiceFactory();

      const sheets = await sheetsReqService.changeCurrentListId(id, newCurrentId);

      const { id: listId, cols, rows } = checkAndFindList(sheets.lists, newCurrentId);
      const cells = await tableReqService.get(listId);

      thunkAPI.dispatch(sheetsActions.changeCurrentListId(newCurrentId));
      thunkAPI.dispatch(tableActions.initTable(createTableState(listId, rows, cols, cells)));

      return sheets;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const renameList = createAsyncThunk<ISheetsState, ISheetsRenameList>(
  'sheets/changeCurrentList',
  async ({ id, listId, name }, thunkAPI) => {
    try {
      const sheetsReqService = SheetsReqServiceFactory();
      const sheets = await sheetsReqService.renameList(id, listId, name);

      thunkAPI.dispatch(sheetsActions.renameList({ id: listId, name }));

      return sheets;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const changeSheetsName = createAsyncThunk<ISheetsState, ISheetsChangeNameFields>(
  'sheets/changeName',
  async ({ id, name }, thunkAPI) => {
    try {
      const sheetsReqService = SheetsReqServiceFactory();
      const sheets = await sheetsReqService.changeName(id, name);

      thunkAPI.dispatch(sheetsActions.changeName(sheets.name));

      return sheets;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);
