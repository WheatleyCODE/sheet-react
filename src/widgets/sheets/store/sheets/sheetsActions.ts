import { createAsyncThunk } from '@reduxjs/toolkit';
import { sheetsActions } from './sheetsSlice';
import { SheetsReqServiceFactory, tableActions, TableReqServiceFactory } from 'widgets/sheets';
import { createSheetsActions } from 'widgets/create-sheets';
import { createTableState } from 'widgets/sheets/utils/createTableState';
import { checkAndGetFirstList, createNewListName } from 'widgets/sheets/utils/listsUtils';
import { createListState } from 'widgets/sheets/utils/createListState';
import {
  ISheetsChangeNameFields,
  ISheetsCurrentListFields,
  ISheetsFields,
  ISheetsListIdFields,
  ISheetsRenameList,
  ISheetsState,
} from './interface';
import { modalsActions } from 'widgets/modal-controller';

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
      if (!sheets) throw new Error('Таблица не найдена');

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
    if (!sheets) throw new Error('Таблица не найдена');

    const { id: listId, cols, rows } = checkAndGetFirstList(sheets.lists);
    const cells = await tableReqService.get(listId);

    thunkAPI.dispatch(sheetsActions.initSheets(sheets));
    thunkAPI.dispatch(tableActions.initTable(createTableState(listId, rows, cols, cells)));
    thunkAPI.dispatch(modalsActions.changeLoader({ isShow: false }));

    return sheets;
  } catch (e) {
    thunkAPI.dispatch(modalsActions.changeLoader({ isShow: false }));
    console.log(e);
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
      if (!sheets) throw new Error('Таблица не найдена');
      const { id: sheetsId } = sheets;

      const table = await tableReqService.create();
      const { id: tableId, cols, rows } = table;

      const list = createListState(createNewListName(sheets.lists), tableId, cols, rows);
      await sheetsReqService.addList(sheetsId, tableId, list);

      thunkAPI.dispatch(sheetsActions.addList(list));
      thunkAPI.dispatch(tableActions.initTable(table));
      thunkAPI.dispatch(modalsActions.changeLoader({ isShow: false }));

      return sheets;
    } catch (e) {
      thunkAPI.dispatch(modalsActions.changeLoader({ isShow: false }));
      console.log(e);
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
      if (!sheets) throw new Error('Таблица не найдена');

      const list = sheets.lists.find((list) => list.id === listId);
      if (!list) throw new Error('Лист не найден');
      const { cols, rows } = list;

      const { cells, id: newListId } = await tableReqService.copy(listId);
      const newList = createListState(createNewListName(sheets.lists, 'скопированный'), newListId, cols, rows);

      await sheetsReqService.addList(sheets.id, newListId, newList);

      thunkAPI.dispatch(sheetsActions.addList(newList));
      thunkAPI.dispatch(tableActions.initTable(createTableState(newListId, rows, cols, cells)));
      thunkAPI.dispatch(modalsActions.changeLoader({ isShow: false }));

      return sheets;
    } catch (e) {
      thunkAPI.dispatch(modalsActions.changeLoader({ isShow: false }));
      console.log(e);
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

      const sheets = await sheetsReqService.get(id);
      if (!sheets) throw new Error('Таблица не найдена');

      tableReqService.deleteTable(listId);
      await sheetsReqService.removeList(id, listId);

      const { id: extListId, cols, rows } = checkAndGetFirstList(sheets.lists);
      const cells = await tableReqService.get(extListId);

      thunkAPI.dispatch(sheetsActions.removeList(listId));
      thunkAPI.dispatch(tableActions.initTable(createTableState(extListId, rows, cols, cells)));
      thunkAPI.dispatch(sheetsActions.changeCurrentListId(extListId));

      return sheets;
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
      if (!sheets) throw new Error('Таблица не найдена');

      const list = sheets.lists.find((list) => list.id === newCurrentId);
      if (!list) throw new Error('Лист не найден');
      const { id: listId, cols, rows } = list;

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
