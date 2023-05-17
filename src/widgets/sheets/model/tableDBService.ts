import { COLS_COUNT, ROWS_COUNT } from 'shared/consts';
import { IndexedDB } from 'shared/lib/indexed-db';
import { ICell } from 'shared/types/table';

export class TableDBService {
  #dbs: { [key: string]: IndexedDB } = {};
  private static instance: TableDBService;

  constructor() {
    if (TableDBService.instance) return TableDBService.instance;
    TableDBService.instance = this;
  }

  deleteTable(id: string) {
    IndexedDB.deleteDB(id);
  }

  async #openDB(tableId: string): Promise<IndexedDB> {
    const db = new IndexedDB(tableId, 'table', 'id');
    await db.open();
    this.#dbs[tableId] = db;

    return db;
  }

  async getCell(tableId: string, id: string): Promise<ICell | undefined> {
    if (this.#dbs[tableId]?.isOpen) {
      return await this.#dbs[tableId].get<ICell>(id);
    }

    const db = await this.#openDB(tableId);

    return await db.get<ICell>(id);
  }

  async getTable(tableId: string): Promise<ICell[][]> {
    let allCells: ICell[] = [];

    if (this.#dbs[tableId]?.isOpen) {
      allCells = await this.#dbs[tableId].getAll<ICell>();
    } else {
      const db = await this.#openDB(tableId);
      allCells = await db.getAll<ICell>();
    }

    const cells: ICell[][] = [];

    for (let i = 0; i < ROWS_COUNT; i++) {
      cells[i] = new Array(COLS_COUNT);
    }

    for (const cell of allCells) {
      const id = cell.id.split(':');
      const row = Number(id[0]);
      const col = Number(id[1]);
      cells[row][col] = cell;
    }

    return cells;
  }

  async createTable(tableId: string, cells: ICell[][]): Promise<ICell[]> {
    const db = await this.#openDB(tableId);

    for (const row of cells) {
      for await (const cell of row) {
        await db.put(cell.id, cell);
      }
    }

    const data = await db.getAll<ICell>();

    // Todo fix close database
    db.close();

    return data;
  }
}
