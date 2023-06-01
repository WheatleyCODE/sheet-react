import { FC, memo } from 'react';
import styles from './CellRow.module.css';

export interface ICellRowProps {
  value: string;
  height: number;
  id: number;
}

export const CellRow: FC<ICellRowProps> = memo(({ value, height, id }) => {
  return (
    <div style={{ height }} className={styles.cell_row}>
      {value}

      <div data-row-resize={id} className={styles.resize}>
        <div data-line className={styles.line} />
      </div>
    </div>
  );
});
