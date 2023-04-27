import { Nullable } from 'shared/types/utils';
import { KVStorageEngine } from '../interface';

// * Также можно вынести в отдельный файл нормальную реализацию IndexedDB, а сюда добавлять часть функционала
export class IndexedDBEngine implements KVStorageEngine {
  #db: null | IDBDatabase = null;
  readonly storeName = 'sheets';

  private static instance: IndexedDBEngine;
  private static exists: boolean;

  constructor() {
    if (IndexedDBEngine.exists) return IndexedDBEngine.instance;

    IndexedDBEngine.instance = this;
    IndexedDBEngine.exists = true;
    this.#initDB();
  }

  get(key: string): Promise<Nullable<string>> {
    return new Promise((resolve, reject) => {
      if (!this.#db) {
        reject();
        return;
      }

      const transaction = this.#db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName),
        request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  set(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.#db) {
        reject();
        return;
      }

      const transaction = this.#db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);

      store.put({ key, value });

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject();
      };
    });
  }

  async remove(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.#db) {
        reject();
        return;
      }

      const transaction = this.#db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);

      store.delete(key);

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject();
      };
    });
  }

  #initDB() {
    if (!('indexedDB' in window)) {
      console.error('Нет поддержки IndexedDB');
      return;
    }

    const dbOpen = indexedDB.open(`DB-${this.storeName}`, 1);

    dbOpen.onupgradeneeded = () => {
      const db = dbOpen.result;
      db.createObjectStore(this.storeName, { keyPath: 'key' });
    };

    dbOpen.onsuccess = () => {
      console.log('подключено IndexedDB');
      this.#db = dbOpen.result;
    };

    dbOpen.onerror = (e) => {
      console.error('IndexedDB ошибка:', e);
    };
  }
}
