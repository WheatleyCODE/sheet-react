import { FC, useEffect } from 'react';
import {
  CreateSheetsFilters,
  CreateSheetsHeader,
  CreateSheetsLists,
  CreateSheetsTemplates,
  createSheetsActions,
} from 'widgets';
import { useTypedDispatch } from 'shared/lib/hooks/redux/useTypedDispatch';
import styles from './CreateSheets.module.css';
import { KVFactory, LocalStorageEngine } from 'shared/lib/kv-storage';
import { ISheetsData } from 'widgets/create-sheets/store/createSheetsSlice';
import { ISheetsState } from 'widgets/sheets/store/sheetsSlice';

export const CreateSheets: FC = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const sheets: ISheetsData[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) as string;
      const data = localStorage.getItem(key) as string;
      const { id, lists, name, createDate, changeDate, openDate }: ISheetsState = JSON.parse(data);
      sheets.push({ name, listsCount: lists.length, id, changeDate, createDate, openDate });
    }

    dispatch(createSheetsActions.changeSheets(sheets));
  }, []);

  const deleteSheets = async (id: string) => {
    const ls = KVFactory('sheets', new LocalStorageEngine());
    const data = await ls.get(id);

    console.log(id, data);

    // ! Fix
    // indexedDB.deleteDatabase(id);
  };

  return (
    <div className={styles.create_sheets}>
      <CreateSheetsHeader />
      <CreateSheetsTemplates />
      <CreateSheetsFilters />
      <CreateSheetsLists deleteSheets={deleteSheets} />
    </div>
  );
};
