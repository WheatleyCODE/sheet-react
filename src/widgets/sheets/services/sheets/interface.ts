import { ISheetsData } from 'widgets/create-sheets/store/createSheetsSlice';
import { IList, ISheetsState } from 'widgets/sheets/store/sheets/interface';

export interface ISheetsReqEngine {
  create(id: string): Promise<ISheetsState>;
  get(id: string): Promise<ISheetsState>;
  getAllData(): ISheetsData[];
  changeName(id: string, newName: string): Promise<ISheetsState>;
  renameList(id: string, listId: string, newName: string): Promise<ISheetsState>;
  addList(id: string, tableId: string, list: IList): Promise<ISheetsState>;
  changeCurrentListId(id: string, newCurrentId: string): Promise<ISheetsState>;
  changeOpenDate(id: string): Promise<ISheetsState>;
  remove(id: string): Promise<ISheetsState>;
  removeList(id: string, listId: string): Promise<ISheetsState>;
  addColWidth(sheetsId: string, listId: string, colId: number, width: number): Promise<ISheetsState>;
  addRowHeight(sheetsId: string, listId: string, rowId: number, height: number): Promise<ISheetsState>;
}
