import { Nullable } from 'shared/types/utils';
import { IndexedDB } from 'shared/lib/indexed-db';
import { KVStorageEngine } from '../interface';

export class IndexedDBEngine implements KVStorageEngine {
  readonly storeName = 'sheets';
  #db = new IndexedDB(`db-${this.storeName}`, this.storeName, 'key');

  private static instance: IndexedDBEngine;

  constructor() {
    if (IndexedDBEngine.instance) return IndexedDBEngine.instance;

    IndexedDBEngine.instance = this;
  }

  get(key: string): Promise<Nullable<string>> {
    return new Promise((res, rej) => {
      if (this.#db.isOpen) {
        this.#db
          .get<{ key: string; value: string }>(key)
          .then(({ value }) => res(value))
          .catch(rej);
      } else {
        rej();
      }
    });
  }

  set(key: string, value: string): Promise<void> {
    return new Promise((res, rej) => {
      if (this.#db.isOpen) {
        this.#db.update(key, value).then(res).catch(rej);
      } else {
        rej();
      }
    });
  }

  async remove(key: string): Promise<void> {
    return new Promise((res, rej) => {
      if (this.#db.isOpen) {
        this.#db.remove(key).then(res).catch(rej);
      } else {
        rej();
      }
    });
  }
}
