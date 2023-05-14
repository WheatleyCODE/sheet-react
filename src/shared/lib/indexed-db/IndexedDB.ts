export type IndexConstructor = (store: IDBObjectStore) => void;
export class IndexedDB {
  databaseName: string;
  storeName: string;
  keyPath: string;
  #db: IDBDatabase | null;
  isOpen = false;

  constructor(databaseName: string, storeName: string, keyPath: string) {
    this.databaseName = databaseName;
    this.storeName = storeName;
    this.keyPath = keyPath;
    this.#db = null;
  }

  open(constructor?: IndexConstructor): Promise<void> {
    return new Promise((res, rej) => {
      const request = window.indexedDB.open(this.databaseName);

      request.onerror = () => {
        rej(Error('Ошибка IndexedDB: невозможно открыть базу данных'));
      };

      request.onupgradeneeded = () => {
        const db = request.result;
        const store = db.createObjectStore(this.storeName, { keyPath: this.keyPath });

        try {
          constructor && constructor(store);
        } catch {
          rej(Error('Ошибка IndexedDB: ошибка при создании индексов'));
        }
      };

      request.onsuccess = () => {
        this.#db = request.result;
        this.isOpen = true;
        res();
      };
    });
  }

  put<T>(keyPathValue: string, value: T): Promise<void> {
    return new Promise((res, rej) => {
      if (!this.#db || !this.isOpen) {
        rej(Error('Ошибка IndexedDB: базы данных нет или она не открыта'));
        return;
      }

      const transaction = this.#db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put({ [this.keyPath]: keyPathValue, ...value });

      request.onerror = () => {
        rej(Error('Ошибка IndexedDB: невозможно обновить данные'));
      };

      request.onsuccess = () => {
        res();
      };
    });
  }

  get<T>(key: string): Promise<T> {
    return new Promise((res, rej) => {
      if (!this.#db || !this.isOpen) {
        rej(Error('Ошибка IndexedDB: базы данных нет или она не открыта'));
        return;
      }

      const transaction = this.#db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      request.onerror = () => {
        rej(Error('Ошибка IndexedDB: невозможно получить данные'));
      };

      request.onsuccess = () => {
        res(request.result);
      };
    });
  }

  add<T>(data: T): Promise<void> {
    return new Promise((res, rej) => {
      if (!this.#db || !this.isOpen) {
        rej(Error('Ошибка IndexedDB: базы данных нет или она не открыта'));
        return;
      }

      const transaction = this.#db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(data);

      request.onerror = () => {
        rej(Error('Ошибка IndexedDB: невозможно добавить данные'));
      };

      request.onsuccess = () => {
        res();
      };
    });
  }

  getAll<T>(): Promise<T[]> {
    return new Promise((res, rej) => {
      if (!this.#db || !this.isOpen) {
        rej(Error('Ошибка IndexedDB: базы данных нет или она не открыта'));
        return;
      }

      const transaction = this.#db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onerror = () => {
        rej(Error('Ошибка IndexedDB: невозможно получить данные'));
      };

      request.onsuccess = () => {
        res(request.result);
      };
    });
  }

  delete(key: string): Promise<void> {
    return new Promise((res, rej) => {
      if (!this.#db || !this.isOpen) {
        rej(Error('Ошибка IndexedDB: базы данных нет или она не открыта'));
        return;
      }

      const transaction = this.#db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(key);

      request.onerror = () => {
        rej(Error('Ошибка IndexedDB: невозможно удалить данные'));
      };

      request.onsuccess = () => {
        res();
      };
    });
  }
}
