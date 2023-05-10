import { FC } from 'react';
import { CreateSheetsHeader, CreateSheetsLists, CreateSheetsTemplates } from 'widgets';
import styles from './CreateSheets.module.css';

export const CreateSheets: FC = () => {
  return (
    <div className={styles.create_sheets}>
      <CreateSheetsHeader />
      <CreateSheetsTemplates />
      <CreateSheetsLists />
    </div>
  );
};
