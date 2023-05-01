import { FC } from 'react';
import styles from './CellRow.module.css';

export const CellRow: FC = () => {
  return (
    <div className={styles.cell_row}>
      1 <div className={styles.resize}></div>
    </div>
  );
};
