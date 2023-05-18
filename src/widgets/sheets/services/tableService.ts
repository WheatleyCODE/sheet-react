import { TableDBService } from '../model/tableDBService';
import { ICell } from 'shared/types/table';

export class TableService {
  tableDBService = new TableDBService();

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

export const tableService = new TableService();
