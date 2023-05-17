import { ICol, IRow } from 'shared/types/table';
import { ISheetsState } from '../store/sheetsSlice';

export const createSheetsState = (id: string, tableId: string, cols: ICol[], rows: IRow[]): ISheetsState => {
  return {
    name: 'Таблица',
    lists: [{ name: 'Лист 1', id: tableId, cols, rows }],
    settings: {},
    currentListId: tableId,
    id,
    createDate: Date.now(),
    changeDate: Date.now(),
    openDate: Date.now(),
  };
};
