import { ITable } from 'widgets/sheets/helpers/createTable';
import { TableService } from 'widgets/sheets/models/tableService';
import { ICell } from 'entities/share';
import { ITableReqEngine } from '../interface';

export class TableController implements ITableReqEngine {
  tableService = new TableService();

  async create(): Promise<ITable> {
    return await this.tableService.create();
  }

  async copy(id: string): Promise<{ cells: ICell[][]; id: string }> {
    return await this.tableService.copy(id);
  }

  async get(id: string): Promise<ICell[][]> {
    return await this.tableService.get(id);
  }

  async changeCellValue(tableId: string, id: string, text: string): Promise<ICell> {
    return await this.tableService.changeCellValue(tableId, id, text);
  }

  deleteTable(id: string): void {
    this.tableService.deleteTable(id);
  }

  deleteTables(ids: string[]): void {
    this.tableService.deleteTables(ids);
  }
}
