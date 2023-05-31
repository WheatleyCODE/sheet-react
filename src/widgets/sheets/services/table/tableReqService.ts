import { ITable } from 'widgets/sheets/helpers/createTable';
import { ICell } from 'entities/share';
import { TableController } from './table-req-local-engine/tableController';
import { ITableReqEngine } from './interface';

export function TableReqServiceFactory(engine?: ITableReqEngine): TableReqService {
  return new TableReqService(engine || new TableController());
}

export class TableReqService {
  readonly engine: ITableReqEngine;

  constructor(engine: ITableReqEngine) {
    this.engine = engine;
  }

  async create(): Promise<ITable> {
    return await this.engine.create();
  }

  async copy(id: string): Promise<{ cells: ICell[][]; id: string }> {
    return await this.engine.copy(id);
  }

  async get(id: string): Promise<ICell[][]> {
    return await this.engine.get(id);
  }

  async changeCellValue(tableId: string, id: string, text: string): Promise<ICell> {
    return await this.engine.changeCellValue(tableId, id, text);
  }

  deleteTable(id: string): void {
    this.engine.deleteTable(id);
  }

  deleteTables(ids: string[]): void {
    this.engine.deleteTables(ids);
  }
}
