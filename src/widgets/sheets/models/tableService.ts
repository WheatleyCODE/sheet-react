import { v4 } from 'uuid';
import { ICell, COLS_COUNT, ROWS_COUNT } from 'entities';
import { IndexedDBService } from './indexedDBService';
import { createTable } from '..';
import { ITable } from '../helpers/createTable';

export class TableService {
  #idbs = new IndexedDBService();

  async create(): Promise<ITable> {
    const table = createTable(COLS_COUNT, ROWS_COUNT);

    await this.#idbs.createDBFromMatrix(table.id, table.cells);

    return table;
  }

  async get(tableId: string): Promise<ICell[][]> {
    const allCells = await this.#idbs.getAll<ICell>(tableId);

    const cells: ICell[][] = [];

    for (let i = 0; i < ROWS_COUNT; i++) {
      cells[i] = new Array(COLS_COUNT);
    }

    for (const cell of allCells) {
      const [row, col] = cell.id.split(':');
      cells[Number(row)][Number(col)] = cell;
    }

    return cells;
  }

  async changeCellValue(tableId: string, id: string, value: string): Promise<ICell> {
    const cell = await this.#idbs.get<ICell>(tableId, id);

    if (!cell) throw new Error('Ячейка не найдена');

    cell.value = value;
    await this.#idbs.put(tableId, id, cell);
    return cell;
  }

  deleteTable(id: string): void {
    this.#idbs.deleteDB(id);
  }

  deleteTables(ids: string[]): void {
    for (const id of ids) {
      this.deleteTable(id);
    }
  }

  async copy(id: string): Promise<{ cells: ICell[][]; id: string }> {
    const allCells = await this.#idbs.getAll<ICell>(id);

    const tableId = v4();

    for await (const cell of allCells) {
      await this.#idbs.put(tableId, cell.id, cell);
    }

    const cells: ICell[][] = [];

    for (let i = 0; i < ROWS_COUNT; i++) {
      cells[i] = new Array(COLS_COUNT);
    }

    for (const cell of allCells) {
      const [row, col] = cell.id.split(':');
      cells[Number(row)][Number(col)] = cell;
    }

    return { cells, id: tableId };
  }
}
