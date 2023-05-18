import { FC, useRef, memo } from 'react';
import { ICell } from 'shared/types/table';
import styles from './Cell.module.css';
import { useDebounce } from 'shared/lib/hooks/useDebounce';
import { tableService } from 'widgets/index';

export interface ICellProps {
  isActive?: boolean;
  width: number;
  height: number;
  cell: ICell;
  tableId: string;
  selectCell: (cell: ICell) => void;
}

export const Cell: FC<ICellProps> = memo(({ isActive, width, height, cell, selectCell, tableId }) => {
  const input = useRef<HTMLDivElement | null>(null);

  const onMouseDown = () => {
    input.current?.click();
    selectCell(cell);
  };

  const debouncedChange = useDebounce((text: string) => {
    console.log(text);
    tableService.changeCellValue(tableId, cell.id, text);
  }, 100);

  const onInput = (e: React.FormEvent<HTMLDivElement>) => {
    debouncedChange(e.currentTarget.textContent);
  };

  return (
    <div style={{ width, height }} onMouseDown={onMouseDown} className={`${styles.cell} ${isActive && styles.active}`}>
      <div
        suppressContentEditableWarning
        style={{ fontSize: cell.fontSize }}
        onInput={onInput}
        ref={input}
        className={styles.cell_input}
        contentEditable
      >
        {cell.value}
      </div>

      {isActive && <div className={styles.cell_select} />}
    </div>
  );
});
