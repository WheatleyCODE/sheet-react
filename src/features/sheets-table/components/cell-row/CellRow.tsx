import { FC, memo } from 'react';
import styles from './CellRow.module.css';

export interface ICellRowProps {
  value: string;
  height: number;
  id: number;
  selectAllRow: (rowId: number) => void;
  isSelect?: boolean;
}

export const CellRow: FC<ICellRowProps> = memo(({ value, height, id, selectAllRow, isSelect }) => {
  const onClick = () => {
    selectAllRow(id);
  };

  return (
    <div onClick={onClick} style={{ height }} className={`${styles.cell_row}  ${isSelect && styles.select}`}>
      {value}

      <div data-row-resize={id} className={styles.resize}>
        <div data-line className={styles.line} />
      </div>
    </div>
  );
});
