import { KVFactory, LocalStorageEngine } from 'shared/lib/kv-storage';
import { ISheetsState } from '../store/sheetsSlice';
import { ICol, IRow } from 'shared/types/table';
import { ISheetsData } from 'widgets/create-sheets/store/createSheetsSlice';

export class SheetsLSService {
  #ls = KVFactory('sheets', new LocalStorageEngine());

  async get(id: string): Promise<ISheetsState> {
    return await this.#ls.get<any>(id);
  }

  async set(id: string, data: string): Promise<void> {
    return await this.#ls.set(id, data);
  }

  async remove(id: string): Promise<ISheetsState | false> {
    const data: any = await this.#ls.get(id);

    if (data) {
      await this.#ls.remove(id);
      return data;
    }

    return false;
  }

  async changeOpenDate(id: string): Promise<ISheetsState> {
    const data: any = await this.#ls.get(id);

    if (!data) {
      throw new Error('SheetsLSService, элемент не найден');
    }

    data.openDate = Date.now();

    await this.#ls.set(id, data as any);

    return data;
  }

  async changeName(id: string, newName: string): Promise<ISheetsState> {
    const data = (await this.#ls.get(id)) as unknown as ISheetsState;

    if (!data) {
      throw new Error('SheetsLSService, элемент не найден');
    }

    data.changeDate = Date.now();
    data.name = newName;

    await this.#ls.set(id, data as any);

    return data;
  }

  async addNewList(id: string, cols: ICol[], rows: IRow[]): Promise<ISheetsState> {
    const data = (await this.#ls.get(id)) as unknown as ISheetsState;

    if (!data) {
      throw new Error('SheetsLSService, элемент не найден');
    }

    data.changeDate = Date.now();
    data.lists.push({ id, cols, rows, name: `Лист ${data.lists.length + 1}` });
    data.currentListId = id;

    await this.#ls.set(id, data as any);

    return data;
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
}
