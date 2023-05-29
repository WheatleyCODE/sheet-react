import { ICol, IRow } from 'entities/share';
import { IList } from '../store/sheets/interface';

export const createListState = (name: string, id: string, cols: ICol[], rows: IRow[]): IList => {
  return {
    name,
    id,
    cols,
    rows,
  };
};
