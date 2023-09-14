import { FC, useRef, memo, useLayoutEffect, useEffect, useState } from 'react';
import { CellsDataTypes, CellsEventEmitter, CellsEventNames, ICell, cellsMouseUp } from 'entities';
import { useActions, useDebounce } from 'shared';
import { setEndOfContentEditable } from 'features/sheets-table/utils/setEndOfContentEditable';
import styles from './Cell.module.css';

export interface ICellProps {
  isActive?: boolean;
  isPreSelect?: boolean;
  width: number;
  height: number;
  cell: ICell;
  tableId: string;
  selectCell: (cell: ICell) => void;
}

export const Cell: FC<ICellProps> = memo(({ isActive, isPreSelect, width, height, cell, selectCell, tableId }) => {
  const { changeCellValue } = useActions();
  const emitter = useRef<CellsEventEmitter | null>(null);
  const input = useRef<HTMLDivElement | null>(null);

  const onMouseDown = () => {
    input.current?.click();
    selectCell(cell);
  };

  const debouncedChange = useDebounce((value: string) => {
    changeCellValue({ tableId, id: cell.id, value });
  }, 300);

  const onInput = (e: React.FormEvent<HTMLDivElement>) => {
    debouncedChange(e.currentTarget.textContent);
  };

  useLayoutEffect(() => {
    const cellsEmitter = new CellsEventEmitter();
    emitter.current = cellsEmitter;

    const unsubscribe = cellsEmitter.subscribe(cell.id, CellsEventNames.FOCUS, (data) => {
      if (data.type === CellsDataTypes.FOCUS_DEFAULT) {
        input.current?.focus();
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const el = input.current;
    if (!el) return;
    setEndOfContentEditable(el);
  }, [cell.value]);

  const onMouseEnter = () => {
    const cellsEmitter = emitter.current;
    if (!cellsEmitter) return;

    cellsEmitter.emit(
      cellsMouseUp(cell.id, CellsEventNames.MOUSE_ENTER, CellsDataTypes.MOUSE_ENTER_DEFAULT, { data: 10 })
    );
  };

  return (
    <div
      data-cell-id={cell.id}
      style={{ width, height }}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      className={`${styles.cell} ${isActive && styles.active} ${isPreSelect && styles.preselect}`}
    >
      <div
        data-cell-id={cell.id}
        suppressContentEditableWarning
        style={{ fontSize: cell.fontSize }}
        onInput={onInput}
        ref={input}
        className={styles.cell_input}
        contentEditable
        spellCheck={false}
      >
        {cell.value}
      </div>

      {isActive && <div data-cell-id={cell.id} className={styles.cell_select} />}
    </div>
  );
});
