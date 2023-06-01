import { ISheetsData } from 'widgets/create-sheets/store/createSheetsSlice';
import { KVFactory, LocalStorageEngine, SerializableValue } from 'shared';
import { createSheetsState } from '..';
import { IList, ISheetsState } from '../store/sheets/interface';

export class SheetsService {
  #ls = KVFactory('sheets', new LocalStorageEngine());

  async create(id: string): Promise<ISheetsState> {
    const sheetsData = createSheetsState(id);
    await this.save(id, sheetsData);

    return sheetsData;
  }

  async get(id: string): Promise<ISheetsState> {
    const sheets = await this.#ls.get<ISheetsState | null>(id);
    if (!sheets) throw new Error('Таблица не найдена');

    return sheets;
  }

  async save(id: string, data: SerializableValue): Promise<void> {
    return await this.#ls.set(id, data);
  }

  getAllData(): ISheetsData[] {
    const data: ISheetsData[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) as string;
      const lsData = localStorage.getItem(key) as string;
      const { id, lists, name, createDate, changeDate, openDate }: ISheetsState = JSON.parse(lsData);
      data.push({ name, listsCount: lists.length, id, changeDate, createDate, openDate });
    }

    return data;
  }

  async changeName(id: string, newName: string): Promise<ISheetsState> {
    const sheets = await this.#ls.get<ISheetsState>(id);
    if (!sheets) throw new Error('Таблица не найдена');

    sheets.changeDate = Date.now();
    sheets.name = newName;
    await this.#ls.set(id, sheets);

    return sheets;
  }

  async renameList(id: string, listId: string, newName: string): Promise<ISheetsState> {
    const sheets = await this.#ls.get<ISheetsState>(id);
    if (!sheets) throw new Error('Таблица не найдена');

    sheets.lists = sheets.lists.map((list) => {
      if (list.id === listId) {
        return { ...list, name: newName };
      }

      return list;
    });

    sheets.changeDate = Date.now();
    await this.#ls.set(id, sheets);

    return sheets;
  }

  async addList(id: string, tableId: string, list: IList): Promise<ISheetsState> {
    const sheets = await this.#ls.get<ISheetsState>(id);
    if (!sheets) throw new Error('Таблица не найдена');

    sheets.changeDate = Date.now();
    sheets.lists.push(list);
    sheets.currentListId = tableId;

    await this.#ls.set(id, sheets);

    return sheets;
  }

  async changeCurrentListId(id: string, newCurrentId: string): Promise<ISheetsState> {
    const sheets = await this.#ls.get<ISheetsState>(id);
    if (!sheets) throw new Error('Таблица не найдена');

    sheets.currentListId = newCurrentId;
    sheets.changeDate = Date.now();

    await this.#ls.set(id, sheets);

    return sheets;
  }

  async changeOpenDate(id: string): Promise<ISheetsState> {
    const sheets = await this.#ls.get<ISheetsState>(id);
    if (!sheets) throw new Error('Таблица не найдена');

    sheets.openDate = Date.now();

    await this.#ls.set(id, sheets);

    return sheets;
  }

  async remove(id: string): Promise<ISheetsState> {
    const sheets = await this.#ls.get<ISheetsState>(id);
    if (!sheets) throw new Error('Таблица не найдена');

    await this.#ls.remove(id);

    return sheets;
  }

  async removeList(id: string, listId: string): Promise<ISheetsState> {
    const sheets = await this.#ls.get<ISheetsState>(id);
    if (!sheets) throw new Error('Таблица не найдена');

    sheets.lists = [...sheets.lists].filter((list) => list.id !== listId);
    sheets.changeDate = Date.now();

    await this.#ls.set(id, sheets);

    return sheets;
  }

  async addColWidth(sheetsId: string, listId: string, colId: number, width: number): Promise<ISheetsState> {
    const sheets = await this.#ls.get<ISheetsState>(sheetsId);
    if (!sheets) throw new Error('Таблица не найдена');

    sheets.changeDate = Date.now();

    const listIndex = sheets.lists.findIndex((list) => list.id === listId);
    if (listIndex === -1) throw new Error('Лист не найден');

    const colIndex = sheets.lists[listIndex].cols.findIndex((col) => col.id === colId);
    if (colIndex === -1) throw new Error('Колонка не найдена');

    sheets.lists[listIndex].cols[colIndex].width += width;

    await this.#ls.set(sheetsId, sheets);

    return sheets;
  }

  async addRowHeight(sheetsId: string, listId: string, rowId: number, height: number): Promise<ISheetsState> {
    const sheets = await this.#ls.get<ISheetsState>(sheetsId);
    if (!sheets) throw new Error('Таблица не найдена');

    sheets.changeDate = Date.now();

    const listIndex = sheets.lists.findIndex((list) => list.id === listId);
    if (listIndex === -1) throw new Error('Лист не найден');

    const rowIndex = sheets.lists[listIndex].rows.findIndex((row) => row.id === rowId);
    if (rowIndex === -1) throw new Error('Строка не найдена');

    sheets.lists[listIndex].rows[rowIndex].height += height;

    await this.#ls.set(sheetsId, sheets);

    return sheets;
  }
}
