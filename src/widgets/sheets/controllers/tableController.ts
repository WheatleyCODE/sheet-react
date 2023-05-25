import { TableService } from '../model/tableService';
import { ICell } from 'entities/share/types/table';

export class TableController {
  tableDBService = new TableService();

  changeCellValue(tableId: string, id: string, text: string) {
    this.tableDBService.changeCellValue(tableId, id, text);
  }

  getCell(tableId: string, id: string) {
    this.tableDBService.getCell(tableId, id);
  }

  deleteTable(id: string) {
    this.tableDBService.deleteTable(id);
  }

  async createTable(tableId: string, cells: ICell[][]): Promise<ICell[]> {
    return await this.tableDBService.createTable(tableId, cells);
  }

  async getTable(id: string): Promise<ICell[][]> {
    return await this.tableDBService.getTable(id);
  }
}

export const tableController = new TableController();
