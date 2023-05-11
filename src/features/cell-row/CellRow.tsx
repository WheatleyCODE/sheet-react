import { FC, memo } from 'react';
import styles from './CellRow.module.css';

export interface ICellRowProps {
  value: string;
  height: number;
}

export const CellRow: FC<ICellRowProps> = memo(({ value, height }) => {
  return (
    <div style={{ height }} className={styles.cell_row}>
      {value} <div className={styles.resize}></div>
    </div>
  );
});
