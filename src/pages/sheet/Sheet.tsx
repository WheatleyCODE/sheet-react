import { FC } from 'react';
import { SheetHeader, SheetToolbar, SheetTable, SheetFooter, SheetAside } from 'widgets';
import styles from './Sheet.module.css';

export const Sheet: FC = () => {
  return (
    <div className={styles.sheet}>
      <SheetHeader />

      <div className={styles.row}>
        <div className={styles.main}>
          <SheetToolbar />
          <SheetTable />
          <SheetFooter />
        </div>

        <SheetAside />
      </div>
    </div>
  );
};
