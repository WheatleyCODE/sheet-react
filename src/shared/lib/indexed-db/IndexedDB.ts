export class IndexedDB {
  private databaseName: string;
  private storeName: string;
  private keyPath: string;
  private db: IDBDatabase | null;
  isOpen = false;

  constructor(databaseName: string, storeName: string, keyPath: string) {
    this.databaseName = databaseName;
    this.storeName = storeName;
    this.keyPath = keyPath;
    this.db = null;

    this.open();
  }

  open(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.databaseName);

      request.onerror = () => {
        reject(Error('Ошибка IndexedDB: невозможно открыть базу данных'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        this.isOpen = true;
        resolve();
      };

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        db.createObjectStore(this.storeName, { keyPath: this.keyPath });
      };
    });
  }

  set(data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(data);

      request.onerror = () => {
        reject(Error('Ошибка IndexedDB: невозможно добавить данные'));
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }

  get<T>(key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      request.onerror = () => {
        reject(Error('Ошибка IndexedDB: невозможно получить данные'));
      };

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  getAll<T>(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onerror = () => {
        reject(Error('Ошибка IndexedDB: невозможно получить данные'));
      };

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  update(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put({ key, value });

      request.onerror = () => {
        reject(Error('Ошибка IndexedDB: невозможно обновить данные'));
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }

  remove(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(key);

      request.onerror = () => {
        reject(Error('Ошибка IndexedDB: невозможно удалить данные'));
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }
}
