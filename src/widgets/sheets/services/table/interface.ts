import { ITable } from 'widgets/sheets/helpers/createTable';
import { ICell } from 'entities/share';

export interface ITableReqEngine {
  create(): Promise<ITable>;
  copy(id: string): Promise<{ cells: ICell[][]; id: string }>;
  get(id: string): Promise<ICell[][]>;
  changeCellValue(tableId: string, id: string, text: string): Promise<ICell>;
  deleteTable(id: string): void;
  deleteTables(ids: string[]): void;
}
