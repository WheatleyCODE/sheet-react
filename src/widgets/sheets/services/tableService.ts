import { IndexedDB } from 'shared/lib/indexed-db';

export class TableService {
  deleteTable(id: string) {
    IndexedDB.deleteDB(id);
  }
}

export const tableService = new TableService();
