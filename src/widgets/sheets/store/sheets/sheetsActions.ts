import { createAsyncThunk } from '@reduxjs/toolkit';
import { sheetsActions } from './sheetsSlice';
import { sheetsController, tableActions, tableController } from 'widgets/sheets';
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

export const createSheets = createAsyncThunk<ISheetsState, ISheetsFields>(
  'sheets/createSheets',
  async (fields, thunkAPI) => {
    try {
      thunkAPI.dispatch(sheetsActions.clearSheets());
      thunkAPI.dispatch(sheetsActions.changeIsLoading(true));

      const sheets = await sheetsController.create(fields.id);

      thunkAPI.dispatch(sheetsActions.initSheets(sheets));
      thunkAPI.dispatch(sheetsActions.changeIsLoading(false));

      return sheets;
    } catch (e) {
      thunkAPI.dispatch(sheetsActions.changeIsLoading(false));
      console.log(e);
      throw e;
    }
  }
);

export const removeSheets = createAsyncThunk<ISheetsState, ISheetsFields>(
  'sheets/removeSheets',
  async (fields, thunkAPI) => {
    try {
      const sheets = await sheetsController.remove(fields.id);
      if (!sheets) throw new Error('Таблица не найдена');

      tableController.deleteTables(sheets.lists.map((list) => list.id));
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
    thunkAPI.dispatch(sheetsActions.clearSheets());
    thunkAPI.dispatch(sheetsActions.changeIsLoading(true));

    const sheets = await sheetsController.get(id);
    if (!sheets) throw new Error('Таблица не найдена');

    const { id: listId, cols, rows } = checkAndGetFirstList(sheets.lists);
    const cells = await tableController.get(listId);

    thunkAPI.dispatch(sheetsActions.initSheets(sheets));
    thunkAPI.dispatch(tableActions.initTable(createTableState(listId, rows, cols, cells)));
    thunkAPI.dispatch(sheetsActions.changeIsLoading(false));

    return sheets;
  } catch (e) {
    thunkAPI.dispatch(sheetsActions.changeIsLoading(false));
    console.log(e);
    throw e;
  }
});

export const createList = createAsyncThunk<ISheetsState, ISheetsFields>('sheets/addList', async ({ id }, thunkAPI) => {
  try {
    thunkAPI.dispatch(sheetsActions.changeIsLoading(true));

    const sheets = await sheetsController.get(id);
    if (!sheets) throw new Error('Таблица не найдена');
    const { id: sheetsId } = sheets;

    const table = await tableController.create();
    const { id: tableId, cols, rows } = table;

    const list = createListState(createNewListName(sheets.lists), tableId, cols, rows);
    await sheetsController.addList(sheetsId, tableId, list);

    thunkAPI.dispatch(sheetsActions.addList(list));
    thunkAPI.dispatch(tableActions.initTable(table));
    thunkAPI.dispatch(sheetsActions.changeIsLoading(false));

    return sheets;
  } catch (e) {
    thunkAPI.dispatch(sheetsActions.changeIsLoading(false));
    console.log(e);
    throw e;
  }
});

export const copyList = createAsyncThunk<ISheetsState, ISheetsListIdFields>(
  'sheets/addList',
  async ({ id, listId }, thunkAPI) => {
    try {
      thunkAPI.dispatch(sheetsActions.changeIsLoading(true));

      const sheets = await sheetsController.get(id);
      if (!sheets) throw new Error('Таблица не найдена');

      const list = sheets.lists.find((list) => list.id === listId);
      if (!list) throw new Error('Лист не найден');
      const { cols, rows } = list;

      const { cells, id: newListId } = await tableController.copy(listId);
      const newList = createListState(createNewListName(sheets.lists, 'скопированный'), newListId, cols, rows);

      await sheetsController.addList(sheets.id, newListId, newList);

      thunkAPI.dispatch(sheetsActions.addList(newList));
      thunkAPI.dispatch(tableActions.initTable(createTableState(newListId, rows, cols, cells)));
      thunkAPI.dispatch(sheetsActions.changeIsLoading(false));

      return sheets;
    } catch (e) {
      thunkAPI.dispatch(sheetsActions.changeIsLoading(false));
      console.log(e);
      throw e;
    }
  }
);

export const removeList = createAsyncThunk<ISheetsState, ISheetsListIdFields>(
  'sheets/addList',
  async ({ id, listId }, thunkAPI) => {
    try {
      thunkAPI.dispatch(sheetsActions.changeIsLoading(true));

      const sheets = await sheetsController.get(id);
      if (!sheets) throw new Error('Таблица не найдена');

      tableController.deleteTable(listId);
      await sheetsController.removeList(id, listId);

      const { id: extListId, cols, rows } = checkAndGetFirstList(sheets.lists);
      const cells = await tableController.get(extListId);

      thunkAPI.dispatch(sheetsActions.removeList(listId));
      thunkAPI.dispatch(tableActions.initTable(createTableState(extListId, rows, cols, cells)));
      thunkAPI.dispatch(sheetsActions.changeCurrentListId(extListId));
      thunkAPI.dispatch(sheetsActions.changeIsLoading(false));

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
      thunkAPI.dispatch(sheetsActions.changeIsLoading(true));

      const sheets = await sheetsController.changeCurrentListId(id, newCurrentId);
      if (!sheets) throw new Error('Таблица не найдена');

      const list = sheets.lists.find((list) => list.id === newCurrentId);
      if (!list) throw new Error('Лист не найден');
      const { id: listId, cols, rows } = list;

      const cells = await tableController.get(listId);

      thunkAPI.dispatch(sheetsActions.changeCurrentListId(newCurrentId));
      thunkAPI.dispatch(tableActions.initTable(createTableState(listId, rows, cols, cells)));
      thunkAPI.dispatch(sheetsActions.changeIsLoading(false));

      return sheets;
    } catch (e) {
      thunkAPI.dispatch(sheetsActions.changeIsLoading(false));
      console.log(e);
      throw e;
    }
  }
);

export const renameList = createAsyncThunk<ISheetsState, ISheetsRenameList>(
  'sheets/changeCurrentList',
  async ({ id, listId, name }, thunkAPI) => {
    try {
      thunkAPI.dispatch(sheetsActions.changeIsLoading(true));
      const sheets = await sheetsController.renameList(id, listId, name);

      thunkAPI.dispatch(sheetsActions.renameList({ id: listId, name }));
      thunkAPI.dispatch(sheetsActions.changeIsLoading(false));

      return sheets;
    } catch (e) {
      thunkAPI.dispatch(sheetsActions.changeIsLoading(false));
      console.log(e);
      throw e;
    }
  }
);

export const changeSheetsName = createAsyncThunk<ISheetsState, ISheetsChangeNameFields>(
  'sheets/changeName',
  async ({ id, name }, thunkAPI) => {
    try {
      const sheets = await sheetsController.changeName(id, name);

      thunkAPI.dispatch(sheetsActions.changeName(sheets.name));

      return sheets;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);
