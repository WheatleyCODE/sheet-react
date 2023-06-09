import { FC, useEffect, useCallback } from 'react';
import { tableActions } from 'widgets';
import { Cell, CellCol, CellRow, CellAllSelector, useContextMenu } from 'features';
import { CellsDataTypes, CellsEventEmitter, CellsEventNames, ICell, cellsFocusDefault } from 'entities';
import { useTypedSelector, useTypedDispatch } from 'shared';
import { useTableResize } from './useTableResize';
import styles from './SheetsTable.module.css';

export const SheetsTable: FC = () => {
  const { cols, rows, cells, selectCells, id } = useTypedSelector((state) => state.table);
  const dispatch = useTypedDispatch();
  const { openContextMenu } = useContextMenu();

  useEffect(() => {
    const emitter = new CellsEventEmitter();

    const cell = cells[0]?.[0];
    if (!cell) return;

    dispatch(tableActions.setSelectCells([cell]));
    emitter.emit(cellsFocusDefault(cell.id, CellsEventNames.FOCUS, CellsDataTypes.FOCUS_DEFAULT));
  }, [id]);

  const selectCell = useCallback((cell: ICell) => {
    dispatch(tableActions.setSelectCells([cell]));
  }, []);

  const onContextMenu = (e: React.MouseEvent) => {
    openContextMenu(e);
  };

  useTableResize();

  return (
    <div onContextMenu={onContextMenu} className={styles.table}>
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
              isActive={!!selectCells.find((el) => el?.id === cell?.id)}
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
