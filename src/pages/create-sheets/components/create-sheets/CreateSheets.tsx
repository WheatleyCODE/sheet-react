import { FC, useEffect } from 'react';
import {
  CreateSheetsFilters,
  CreateSheetsHeader,
  CreateSheetsLists,
  CreateSheetsTemplates,
  sheetsController,
  createSheetsActions,
  tableController,
} from 'widgets';
import { useTypedDispatch } from 'shared';
import styles from './CreateSheets.module.css';

export const CreateSheets: FC = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(createSheetsActions.changeSheets(sheetsController.getAllData()));
  }, []);

  const deleteSheets = async (id: string) => {
    const data = await sheetsController.remove(id);

    if (data) {
      data.lists.forEach((list) => {
        tableController.deleteTable(list.id);
      });

      dispatch(createSheetsActions.changeSheets(sheetsController.getAllData()));
    }
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
