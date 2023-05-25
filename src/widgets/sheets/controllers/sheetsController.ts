import { IList, ISheetsState } from '../store/sheetsSlice';
import { SheetsService } from '../model/sheetsService';

// ! Fix
import { ISheetsData } from 'widgets/create-sheets/store/createSheetsSlice';

class SheetsController {
  #sheetsLSService = new SheetsService();

  async getSheets(id: string): Promise<ISheetsState> {
    return await this.#sheetsLSService.get(id);
  }

  async setSheets(id: string, data: any): Promise<void> {
    return await this.#sheetsLSService.set(id, data);
  }

  async addList(id: string, tableId: string, list: IList): Promise<ISheetsState | false> {
    return await this.#sheetsLSService.addList(id, tableId, list);
  }

  async removeList(id: string, listId: string): Promise<ISheetsState | false> {
    return await this.#sheetsLSService.removeList(id, listId);
  }

  getAllData(): ISheetsData[] {
    return this.#sheetsLSService.getAllData();
  }

  async changeName(id: string, newName: string): Promise<ISheetsState> {
    return await this.#sheetsLSService.changeName(id, newName);
  }

  async changeOpenDate(id: string): Promise<ISheetsState> {
    return await this.#sheetsLSService.changeOpenDate(id);
  }

  async remove(id: string): Promise<ISheetsState | false> {
    return await this.#sheetsLSService.remove(id);
  }
}

export const sheetsController = new SheetsController();
