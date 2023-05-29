import { FC, useEffect } from 'react';
import { CreateSheetsFilters, CreateSheetsHeader, CreateSheetsLists, CreateSheetsTemplates } from 'widgets';
import { useActions } from 'shared/lib';
import styles from './CreateSheets.module.css';

export const CreateSheets: FC = () => {
  const { getAllSheetsData, removeSheets } = useActions();

  useEffect(() => {
    getAllSheetsData();
  }, []);

  const deleteSheets = (id: string) => {
    removeSheets({ id });
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
