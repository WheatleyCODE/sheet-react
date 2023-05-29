import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISheetsState, sheetsActions } from './sheetsSlice';
import { sheetsController, tableActions, tableController } from 'widgets/sheets';
import { createSheetsActions } from 'widgets/create-sheets';

export interface ISheetsFields {
  id: string;
}

export interface ISheetsChangeNameFields extends ISheetsFields {
  newName: string;
}

export interface ISheetsCurrentListFields extends ISheetsFields {
  newCurrentId: string;
}

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

export const removeSheets = createAsyncThunk<void, ISheetsFields>('sheets/removeSheets', async (fields, thunkAPI) => {
  try {
    const data = await sheetsController.remove(fields.id);

    if (data) {
      data.lists.forEach((list) => {
        tableController.deleteTable(list.id);
      });

      thunkAPI.dispatch(createSheetsActions.removeSheets(data.id));
    }
  } catch (e) {
    console.log(e);
  }
});

export const getSheets = createAsyncThunk<ISheetsState, ISheetsFields>('sheets/getSheets', async (fields, thunkAPI) => {
  try {
    thunkAPI.dispatch(sheetsActions.clearSheets());
    thunkAPI.dispatch(sheetsActions.changeIsLoading(true));
    const sheets = await sheetsController.get(fields.id);

    if (!sheets) throw new Error('Таблица не найдена');

    const { id: tableId, cols, rows } = sheets.lists[0];
    const cells = await tableController.get(tableId);

    thunkAPI.dispatch(sheetsActions.initSheets(sheets));
    thunkAPI.dispatch(tableActions.initTable({ id: tableId, cells, rows, cols }));

    thunkAPI.dispatch(sheetsActions.changeIsLoading(false));

    return sheets;
  } catch (e) {
    thunkAPI.dispatch(sheetsActions.changeIsLoading(false));
    console.log(e);
    throw e;
  }
});

export const createList = createAsyncThunk<ISheetsState, ISheetsFields>('sheets/addList', async (fields, thunkAPI) => {
  try {
    thunkAPI.dispatch(sheetsActions.changeIsLoading(true));
    const sheets = await sheetsController.get(fields.id);

    if (!sheets) throw new Error('Таблица не найдена');

    const table = await tableController.create();

    const list = {
      name: `Лист Новый ${sheets.lists.length + 1}`,
      id: table.id,
      cols: table.cols,
      rows: table.rows,
    };

    await sheetsController.addList(sheets.id, table.id, list);

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

// Todo добавить реквест сервис

export const copyList = createAsyncThunk<ISheetsState, { id: string; listId: string }>(
  'sheets/addList',
  async (fields, thunkAPI) => {
    try {
      thunkAPI.dispatch(sheetsActions.changeIsLoading(true));
      const sheets = await sheetsController.get(fields.id);
      if (!sheets) throw new Error('Таблица не найдена');

      const list = sheets.lists.find((list) => list.id === fields.listId);
      if (!list) throw new Error('Лист не найден');

      const { cells, id: newListId } = await tableController.copy(fields.listId);

      const newList = {
        name: `Лист Новый копированный ${sheets.lists.length + 1}`,
        id: newListId,
        cols: list.cols,
        rows: list.rows,
      };

      await sheetsController.addList(sheets.id, newListId, newList);
      thunkAPI.dispatch(sheetsActions.addList(newList));
      thunkAPI.dispatch(tableActions.initTable({ id: newListId, cells, rows: list.rows, cols: list.cols }));
      thunkAPI.dispatch(sheetsActions.changeIsLoading(false));

      return sheets;
    } catch (e) {
      thunkAPI.dispatch(sheetsActions.changeIsLoading(false));
      console.log(e);
      throw e;
    }
  }
);

export const removeList = createAsyncThunk<ISheetsState, { id: string; listId: string }>(
  'sheets/addList',
  async (fields, thunkAPI) => {
    try {
      thunkAPI.dispatch(sheetsActions.changeIsLoading(true));
      const sheets = await sheetsController.get(fields.id);

      if (!sheets) throw new Error('Таблица не найдена');

      tableController.deleteTable(fields.listId);
      await sheetsController.removeList(fields.id, fields.listId);

      const { id, cols, rows } = sheets.lists[0];
      const cells = await tableController.get(id);

      thunkAPI.dispatch(sheetsActions.removeList(fields.listId));
      thunkAPI.dispatch(tableActions.initTable({ id, cols, cells, rows }));
      thunkAPI.dispatch(sheetsActions.changeCurrentListId(id));
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
  async (fields, thunkAPI) => {
    try {
      thunkAPI.dispatch(sheetsActions.changeIsLoading(true));
      const sheets = await sheetsController.changeCurrentListId(fields.id, fields.newCurrentId);

      if (!sheets) throw new Error('Таблица не найдена');

      const list = sheets.lists.find((list) => list.id === fields.newCurrentId);
      if (!list) throw new Error('Лист не найден');

      const { id: tableId, cols, rows } = list;
      const cells = await tableController.get(tableId);

      thunkAPI.dispatch(sheetsActions.changeCurrentListId(fields.newCurrentId));
      thunkAPI.dispatch(tableActions.initTable({ id: tableId, cells, rows, cols }));

      thunkAPI.dispatch(sheetsActions.changeIsLoading(false));

      return sheets;
    } catch (e) {
      thunkAPI.dispatch(sheetsActions.changeIsLoading(false));
      console.log(e);
      throw e;
    }
  }
);

export const renameList = createAsyncThunk<ISheetsState, { id: string; listId: string; name: string }>(
  'sheets/changeCurrentList',
  async (fields, thunkAPI) => {
    try {
      thunkAPI.dispatch(sheetsActions.changeIsLoading(true));
      const sheets = await sheetsController.renameList(fields.id, fields.listId, fields.name);

      thunkAPI.dispatch(sheetsActions.renameList({ id: fields.listId, newName: fields.name }));
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
  async (fields, thunkAPI) => {
    try {
      const sheets = await sheetsController.changeName(fields.id, fields.newName);

      thunkAPI.dispatch(sheetsActions.changeName(sheets.name));

      return sheets;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);
