import { IList } from '../store/sheets/interface';

export const checkAndGetFirstList = (lists: IList[]): IList => {
  const list = lists[0];
  if (!list) throw new Error('Лист не найден');
  return lists[0];
};

export const createNewListName = (lists: IList[], prefix?: string) => {
  return `${prefix || ''} Новый лист ${lists.length + 1}`;
};

export const checkAndFindList = (lists: IList[], id: string): IList => {
  const list = lists.find((list) => list.id === id);
  if (!list) throw new Error('Лист не найден');
  return list;
};
