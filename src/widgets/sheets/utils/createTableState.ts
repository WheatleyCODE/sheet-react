import { ICell, ICol, IRow } from 'entities/share';
import { ITable } from '../helpers/createTable';

export const createTableState = (id: string, rows: IRow[], cols: ICol[], cells: ICell[][]): ITable => {
  return { id, rows, cols, cells };
};
