import { FC, useEffect } from 'react';
import {
  CreateSheetsFilters,
  CreateSheetsHeader,
  CreateSheetsLists,
  CreateSheetsTemplates,
  sheetsService,
  createSheetsActions,
  tableService,
} from 'widgets';
import { useTypedDispatch } from 'shared/lib/hooks/redux/useTypedDispatch';
import styles from './CreateSheets.module.css';

export const CreateSheets: FC = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(createSheetsActions.changeSheets(sheetsService.getAllSheetsDataLS()));
  }, []);

  const deleteSheets = async (id: string) => {
    const data = await sheetsService.remove(id);

    if (data) {
      data.lists.forEach((list) => {
        tableService.deleteTable(list.id);
      });

      dispatch(createSheetsActions.changeSheets(sheetsService.getAllSheetsDataLS()));
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
