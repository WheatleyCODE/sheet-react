import { IList, ISheetsState } from 'widgets/sheets/store/sheets/interface';
import { ISheetsData } from 'widgets/create-sheets/store/createSheetsSlice';
import { SheetsController } from './sheets-req-local-engine/sheetsController';
import { ISheetsReqEngine } from './interface';

export function SheetsReqServiceFactory(engine?: ISheetsReqEngine): SheetsReqService {
  return new SheetsReqService(engine || new SheetsController());
}

export class SheetsReqService {
  readonly engine: ISheetsReqEngine;

  constructor(engine: ISheetsReqEngine) {
    this.engine = engine;
  }

  async create(id: string): Promise<ISheetsState> {
    return this.engine.create(id);
  }

  async get(id: string): Promise<ISheetsState | null> {
    return await this.engine.get(id);
  }

  getAllData(): ISheetsData[] {
    return this.engine.getAllData();
  }

  async changeName(id: string, newName: string): Promise<ISheetsState> {
    return await this.engine.changeName(id, newName);
  }

  async renameList(id: string, listId: string, newName: string): Promise<ISheetsState> {
    return await this.engine.renameList(id, listId, newName);
  }

  async addList(id: string, tableId: string, list: IList): Promise<ISheetsState | false> {
    return await this.engine.addList(id, tableId, list);
  }

  async changeCurrentListId(id: string, newCurrentId: string): Promise<ISheetsState> {
    return await this.engine.changeCurrentListId(id, newCurrentId);
  }

  async changeOpenDate(id: string): Promise<ISheetsState> {
    return await this.engine.changeOpenDate(id);
  }

  async remove(id: string): Promise<ISheetsState | null> {
    return await this.engine.remove(id);
  }

  async removeList(id: string, listId: string): Promise<ISheetsState | false> {
    return await this.engine.removeList(id, listId);
  }
}
