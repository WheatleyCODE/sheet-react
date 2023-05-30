import { ISheetsState } from '../store/sheets/interface';

export const createSheetsState = (id: string): ISheetsState => {
  return {
    id,
    name: 'Table new',
    lists: [],
    currentListId: null,
    createDate: Date.now(),
    changeDate: Date.now(),
    openDate: Date.now(),
    settings: {},
    isLoading: false,
  };
};
