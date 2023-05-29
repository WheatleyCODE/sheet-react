import { IndexedDB } from 'shared/lib';

export class IndexedDBService {
  private static instance: IndexedDBService;

  constructor() {
    if (IndexedDBService.instance) return IndexedDBService.instance;
    IndexedDBService.instance = this;
  }

  #dbs: { [key: string]: IndexedDB } = {};

  async createDB(tableId: string) {
    const db = new IndexedDB(tableId, 'table', 'id');
    this.#dbs[tableId] = db;
  }

  #closeDB(tableId: string): void {
    this.#dbs[tableId].close();
  }

  deleteDB(id: string) {
    IndexedDB.deleteDB(id);
  }

  async #openDB(tableId: string) {
    if (!this.#dbs[tableId]) {
      await this.createDB(tableId);
    }

    await this.#dbs[tableId].open();
  }

  async put(tableId: string, id: string, data: any): Promise<void> {
    try {
      await this.#openDB(tableId);

      return await this.#dbs[tableId].put(id, data);
    } catch (e) {
      console.log(e, 'put');
      throw e;
    } finally {
      this.#closeDB(tableId);
    }
  }

  async get<T>(tableId: string, id: string): Promise<T> {
    try {
      await this.#openDB(tableId);

      return await this.#dbs[tableId].get<T>(id);
    } catch (e) {
      console.log(e, 'get');
      throw e;
    } finally {
      this.#closeDB(tableId);
    }
  }

  async getAll<T>(tableId: string): Promise<T[]> {
    try {
      await this.#openDB(tableId);

      return await this.#dbs[tableId].getAll<T>();
    } catch (e) {
      console.log(e, 'getAll');
      throw e;
    } finally {
      this.#closeDB(tableId);
    }
  }
}
