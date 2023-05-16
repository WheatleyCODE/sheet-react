import { ISheetsData, ListSorters } from '../store/createSheetsSlice';

export const sheetsSortFns = {
  [ListSorters.NAME]: (x: ISheetsData, y: ISheetsData) => {
    return x.name.localeCompare(y.name);
  },
  [ListSorters.CREATE_DATE]: (x: ISheetsData, y: ISheetsData) => {
    return y.createDate - x.createDate;
  },
  [ListSorters.CHANGE_DATE]: (x: ISheetsData, y: ISheetsData) => {
    return y.changeDate - x.changeDate;
  },
  [ListSorters.OPEN_DATE]: (x: ISheetsData, y: ISheetsData) => {
    return y.openDate - x.openDate;
  },
};

export const sheetsSortNames = {
  [ListSorters.NAME]: 'По имени',
  [ListSorters.CREATE_DATE]: 'По дате создания',
  [ListSorters.CHANGE_DATE]: 'По дате изменения',
  [ListSorters.OPEN_DATE]: 'По дате открытия',
};
