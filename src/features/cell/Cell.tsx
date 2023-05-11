import { FC, useRef, memo } from 'react';
import styles from './Cell.module.css';
import { ICell } from 'shared/types/table';

export interface ICellProps {
  isActive?: boolean;
  width: number;
  height: number;
  cell: ICell;
  selectCell: (cell: ICell) => void;
}

export const Cell: FC<ICellProps> = memo(({ isActive, width, height, cell, selectCell }) => {
  const input = useRef<HTMLDivElement | null>(null);

  const onMouseDown = () => {
    input.current?.click();
    selectCell(cell);
  };

  return (
    <div style={{ width, height }} onMouseDown={onMouseDown} className={`${styles.cell} ${isActive && styles.active}`}>
      <div
        suppressContentEditableWarning
        style={{ fontSize: cell.fontSize }}
        ref={input}
        className={styles.cell_input}
        contentEditable
      >
        {cell.id}
      </div>

      {isActive && <div className={styles.cell_select} />}
    </div>
  );
});
