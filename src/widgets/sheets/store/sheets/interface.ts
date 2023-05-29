import { ICol, IRow } from 'entities/share';

export interface ISheetsFields {
  id: string;
}

export interface ISheetsChangeNameFields extends ISheetsFields {
  name: string;
}

export interface ISheetsCurrentListFields extends ISheetsFields {
  newCurrentId: string;
}

export interface ISheetsListIdFields extends ISheetsFields {
  listId: string;
}

export interface ISheetsRenameList extends ISheetsListIdFields {
  name: string;
}

export interface IList {
  name: string;
  id: string;
  cols: ICol[];
  rows: IRow[];
}

export interface ISheetsState {
  id: string;
  name: string;
  lists: IList[];
  currentListId: string | null;
  settings: any;
  createDate: number;
  changeDate: number;
  openDate: number;
  isLoading: boolean;
}
