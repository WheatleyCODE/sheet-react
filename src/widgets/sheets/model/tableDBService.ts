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

  async changeCellValue(tableId: string, id: string, value: string): Promise<ICell | undefined> {
    const db = await this.#openDB(tableId);
    const data = await db.get<ICell>(id);

    data.value = value;

    db.put('id', data);
    db.close();

    return data;
  }

  async getCell(tableId: string, id: string): Promise<ICell | undefined> {
    if (this.#dbs[tableId]?.isOpen) {
      return await this.#dbs[tableId].get<ICell>(id);
    }

    const db = await this.#openDB(tableId);

    const data = await db.get<ICell>(id);
    db.close();

    return data;
  }

  async getTable(tableId: string): Promise<ICell[][]> {
    let allCells: ICell[] = [];
    let db: IndexedDB;

    if (this.#dbs[tableId]?.isOpen) {
      allCells = await this.#dbs[tableId].getAll<ICell>();
      db = this.#dbs[tableId];
    } else {
      const idb = await this.#openDB(tableId);
      db = idb;
      allCells = await idb.getAll<ICell>();
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

    db.close();

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
