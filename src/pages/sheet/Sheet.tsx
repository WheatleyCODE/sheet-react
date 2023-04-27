import { FC } from 'react';
import { SheetHeader, SheetToolbar, SheetTable, SheetFooter } from 'widgets';
import styles from './Sheet.module.css';

export const Sheet: FC = () => {
  return (
    <div className={styles.sheet}>
      <SheetHeader />
      <SheetToolbar />
      <SheetTable />
      <SheetFooter />
    </div>
  );
};
