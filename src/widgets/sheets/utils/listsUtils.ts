import { IList } from '../store/sheets/interface';

export const checkAndGetFirstList = (lists: IList[]): IList => {
  const list = lists[0];
  if (!list) throw new Error('Лист не найден');
  return lists[0];
};

export const createNewListName = (lists: IList[], prefix?: string) => {
  return `Новый ${prefix || ''} лист ${lists.length + 1}`;
};
