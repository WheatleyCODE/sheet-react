import { ICell } from 'entities/share';
import { ITable } from '../helpers/createTable';
import { TableService } from '../model/tableService';

export class TableController {
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

  changeCellValue(tableId: string, id: string, text: string) {
    this.tableService.changeCellValue(tableId, id, text);
  }

  deleteTable(id: string) {
    this.tableService.deleteTable(id);
  }

  deleteTables(ids: string[]) {
    this.tableService.deleteTables(ids);
  }
}

export const tableController = new TableController();
