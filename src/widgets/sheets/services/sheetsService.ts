import { KVFactory, LocalStorageEngine } from 'shared/lib/kv-storage';
import { ISheetsState } from '../store/sheetsSlice';
import { ISheetsData } from 'widgets/create-sheets/store/createSheetsSlice';
import { ICol, IRow } from 'shared/types/table';

class SheetsService {
  #localStorage = KVFactory('sheets', new LocalStorageEngine());

  // Todo: Проверки на ненайденные значения

  getAllSheetsDataLS(): ISheetsData[] {
    const data: ISheetsData[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) as string;
      const lsData = localStorage.getItem(key) as string;
      const { id, lists, name, createDate, changeDate, openDate }: ISheetsState = JSON.parse(lsData);
      data.push({ name, listsCount: lists.length, id, changeDate, createDate, openDate });
    }

    return data;
  }

  async addNewList(id: string, cols: ICol[], rows: IRow[]): Promise<ISheetsState> {
    const data = (await this.#localStorage.get(id)) as unknown as ISheetsState;
    data.changeDate = Date.now();
    data.lists.push({ id, cols, rows, name: `Лист ${data.lists.length + 1}` });
    data.currentListId = id;

    await this.#localStorage.set(id, data as any);

    return data;
  }

  async changeName(id: string, newName: string): Promise<ISheetsState> {
    const data = (await this.#localStorage.get(id)) as unknown as ISheetsState;
    data.changeDate = Date.now();
    data.name = newName;

    await this.#localStorage.set(id, data as any);

    return data;
  }

  async changeOpenDate(id: string): Promise<ISheetsState> {
    const data = (await this.#localStorage.get(id)) as unknown as ISheetsState;
    data.openDate = Date.now();

    await this.#localStorage.set(id, data as any);

    return data;
  }

  async remove(id: string): Promise<ISheetsState | false> {
    const data = (await this.#localStorage.get(id)) as unknown as ISheetsState;

    if (data) {
      await this.#localStorage.remove(id);
      return data;
    }

    return false;
  }
}

export const sheetsService = new SheetsService();
