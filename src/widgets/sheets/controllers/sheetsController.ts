import { SheetsService } from '../model/sheetsService';

// ! Fix
import { ISheetsData } from 'widgets/create-sheets/store/createSheetsSlice';
import { IList, ISheetsState } from '../store/sheets/interface';

class SheetsController {
  #sheetsService = new SheetsService();

  async create(id: string): Promise<ISheetsState> {
    return this.#sheetsService.create(id);
  }

  async get(id: string): Promise<ISheetsState | null> {
    return await this.#sheetsService.get(id);
  }

  getAllData(): ISheetsData[] {
    return this.#sheetsService.getAllData();
  }

  async changeName(id: string, newName: string): Promise<ISheetsState> {
    return await this.#sheetsService.changeName(id, newName);
  }

  async renameList(id: string, listId: string, newName: string): Promise<ISheetsState> {
    return await this.#sheetsService.renameList(id, listId, newName);
  }

  async addList(id: string, tableId: string, list: IList): Promise<ISheetsState | false> {
    return await this.#sheetsService.addList(id, tableId, list);
  }

  async changeCurrentListId(id: string, newCurrentId: string): Promise<ISheetsState> {
    return await this.#sheetsService.changeCurrentListId(id, newCurrentId);
  }

  async changeOpenDate(id: string): Promise<ISheetsState> {
    return await this.#sheetsService.changeOpenDate(id);
  }

  async remove(id: string): Promise<ISheetsState | null> {
    return await this.#sheetsService.remove(id);
  }

  async removeList(id: string, listId: string): Promise<ISheetsState | false> {
    return await this.#sheetsService.removeList(id, listId);
  }
}

export const sheetsController = new SheetsController();
