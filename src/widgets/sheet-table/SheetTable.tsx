import { FC } from 'react';
import styles from './SheetTable.module.css';
import { Cell, CellCol, CellRow, CellAllSelector } from 'features';

export const SheetTable: FC = () => {
  return (
    <div className={styles.table}>
      <div className={styles.table_row}>
        <CellAllSelector />
        <CellCol />
        <CellCol />
        <CellCol />
        <CellCol />
        <CellCol />
        <CellCol />
        <CellCol />
      </div>
      <div className={styles.table_row}>
        <CellRow />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
      <div className={styles.table_row}>
        <CellRow />
        <Cell />
        <Cell />
        <Cell isActive />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
      <div className={styles.table_row}>
        <CellRow />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
      <div className={styles.table_row}>
        <CellRow />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
    </div>
  );
};
