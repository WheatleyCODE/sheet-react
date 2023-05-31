import { SheetsService } from 'widgets/sheets/models/sheetsService';
import { ISheetsData } from 'widgets/create-sheets/store/createSheetsSlice';
import { IList, ISheetsState } from 'widgets/sheets/store/sheets/interface';
import { ISheetsReqEngine } from '../interface';

export class SheetsController implements ISheetsReqEngine {
  #sheetsService = new SheetsService();

  async create(id: string): Promise<ISheetsState> {
    return this.#sheetsService.create(id);
  }

  async get(id: string): Promise<ISheetsState> {
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

  async addList(id: string, tableId: string, list: IList): Promise<ISheetsState> {
    return await this.#sheetsService.addList(id, tableId, list);
  }

  async changeCurrentListId(id: string, newCurrentId: string): Promise<ISheetsState> {
    return await this.#sheetsService.changeCurrentListId(id, newCurrentId);
  }

  async changeOpenDate(id: string): Promise<ISheetsState> {
    return await this.#sheetsService.changeOpenDate(id);
  }

  async remove(id: string): Promise<ISheetsState> {
    return await this.#sheetsService.remove(id);
  }

  async removeList(id: string, listId: string): Promise<ISheetsState> {
    return await this.#sheetsService.removeList(id, listId);
  }
}
