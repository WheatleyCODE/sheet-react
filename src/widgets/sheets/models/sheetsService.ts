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

  async get(id: string): Promise<ISheetsState | null> {
    return await this.#ls.get<ISheetsState | null>(id);
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
    const data = await this.#ls.get<ISheetsState>(id);
    if (!data) throw new Error('SheetsService, элемент не найден');

    data.changeDate = Date.now();
    data.name = newName;
    await this.#ls.set(id, data);

    return data;
  }

  async renameList(id: string, listId: string, newName: string): Promise<ISheetsState> {
    const data = await this.#ls.get<ISheetsState>(id);
    if (!data) throw new Error('SheetsService, элемент не найден');

    data.lists = data.lists.map((list) => {
      if (list.id === listId) {
        return { ...list, name: newName };
      }

      return list;
    });

    data.changeDate = Date.now();
    await this.#ls.set(id, data);

    return data;
  }

  async addList(id: string, tableId: string, list: IList): Promise<ISheetsState> {
    const data = await this.#ls.get<ISheetsState>(id);

    if (!data) {
      throw new Error('SheetsService, элемент не найден');
    }

    data.changeDate = Date.now();
    data.lists.push(list);
    data.currentListId = tableId;

    await this.#ls.set(id, data);

    return data;
  }

  async changeCurrentListId(id: string, newCurrentId: string): Promise<ISheetsState> {
    const data = await this.#ls.get<ISheetsState>(id);

    if (!data) {
      throw new Error('SheetsService, элемент не найден');
    }

    data.currentListId = newCurrentId;
    data.changeDate = Date.now();

    await this.#ls.set(id, data);

    return data;
  }

  async changeOpenDate(id: string): Promise<ISheetsState> {
    const data = await this.#ls.get<ISheetsState>(id);

    if (!data) {
      throw new Error('SheetsService, элемент не найден');
    }

    data.openDate = Date.now();

    await this.#ls.set(id, data);

    return data;
  }

  async remove(id: string): Promise<ISheetsState | null> {
    const data = await this.#ls.get<ISheetsState>(id);

    if (data) {
      await this.#ls.remove(id);
    }

    return data;
  }

  async removeList(id: string, listId: string): Promise<ISheetsState> {
    const data = await this.#ls.get<ISheetsState>(id);

    if (!data) {
      throw new Error('SheetsService, элемент не найден');
    }

    data.lists = [...data.lists].filter((list) => list.id !== listId);
    data.changeDate = Date.now();

    await this.#ls.set(id, data);

    return data;
  }
}
