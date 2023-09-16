import { FC, useEffect, useCallback, useRef } from 'react';
import { tableActions } from 'widgets';
import { Cell, CellCol, CellRow, CellAllSelector, useContextMenu } from 'features';
import { CellsDataTypes, CellsEventEmitter, CellsEventNames, ICell, cellsFocusDefault } from 'entities';
import { useTypedSelector, useTypedDispatch } from 'shared';
import { useTableResize } from './useTableResize';
import { usePreSelect } from './usePreSelect';
import { getIsActive, getIsSelectBorder, getSelectionAreaRect } from './sheetsTable.functions';
import styles from './SheetsTable.module.css';

export const SheetsTable: FC = () => {
  const emitter = useRef<CellsEventEmitter | null>(null);
  const { cols, rows, cells, selectCells, id } = useTypedSelector((state) => state.table);
  const dispatch = useTypedDispatch();
  const { openContextMenu } = useContextMenu();
  const { onMouseDown, onMouseUp, preSelectHandler, preSelectedCells, firstCell } = usePreSelect(cells, selectCells);

  useEffect(() => {
    const cellsEmitter = new CellsEventEmitter();
    emitter.current = cellsEmitter;
    const unsubscribes: (() => void)[] = [];

    for (const cellArr of cells) {
      for (const cell of cellArr) {
        unsubscribes.push(
          cellsEmitter.subscribe(cell.id, CellsEventNames.MOUSE_ENTER, (data) => {
            if (data.type === CellsDataTypes.MOUSE_ENTER_DEFAULT) {
              preSelectHandler(data.id);
            }
          })
        );
      }
    }

    const cell = cells[0]?.[0];
    if (!cell) return;

    dispatch(tableActions.setSelectCells([cell]));
    cellsEmitter.emit(cellsFocusDefault(cell.id, CellsEventNames.FOCUS, CellsDataTypes.FOCUS_DEFAULT));

    return () => {
      for (const unsubscribe of unsubscribes) {
        unsubscribe();
      }
    };
  }, [id]);

  const selectCell = useCallback((cell: ICell) => {
    dispatch(tableActions.setSelectCells([cell]));
  }, []);

  const onContextMenu = (e: React.MouseEvent) => {
    openContextMenu(e);
  };

  useTableResize();

  const onMouseUpHandler = () => {
    const isSuccess = onMouseUp();
    if (!isSuccess) return;
    dispatch(tableActions.setSelectCells(preSelectedCells));
  };

  return (
    <div onContextMenu={onContextMenu} className={styles.table} onMouseDown={onMouseDown} onMouseUp={onMouseUpHandler}>
      <div className={`${styles.table_row_header}`}>
        <CellAllSelector />

        {cols.map((col) => (
          <CellCol key={col.id} id={col.id} value={col.value} width={col.width} />
        ))}
      </div>

      {rows.map((row, i) => (
        <div key={row.id} className={styles.table_row}>
          <CellRow id={row.id} value={row.value} height={row.height} />

          {cells[i].map((cell, j) => (
            <Cell
              tableId={id}
              selectCell={selectCell}
              isPreSelect={!!preSelectedCells.find((el) => el?.id === cell?.id)}
              isActive={getIsActive(selectCells, cell, firstCell)}
              isSelectGroup={!!selectCells.find((el) => el?.id === cell?.id)}
              isSelectBorder={getIsSelectBorder(selectCells, cell)}
              selectionAreaRect={getSelectionAreaRect(selectCells, cell, rows, cols)}
              key={cell.id}
              height={row.height}
              width={cols[j].width}
              cell={cell}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
