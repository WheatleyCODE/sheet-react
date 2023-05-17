import { ISheetsState } from '../store/sheetsSlice';
import { ISheetsData } from 'widgets/create-sheets/store/createSheetsSlice';
import { ICol, IRow } from 'shared/types/table';
import { SheetsLSService } from '../model/sheetsLSService';

class SheetsService {
  #sheetsLSService = new SheetsLSService();

  async getSheets(id: string): Promise<ISheetsState> {
    return await this.#sheetsLSService.get(id);
  }

  async setSheets(id: string, data: any): Promise<void> {
    return await this.#sheetsLSService.set(id, data);
  }

  getAllData(): ISheetsData[] {
    return this.#sheetsLSService.getAllData();
  }

  async addNewList(id: string, cols: ICol[], rows: IRow[]): Promise<ISheetsState> {
    return await this.#sheetsLSService.addNewList(id, cols, rows);
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

export const sheetsService = new SheetsService();
