import { FC, useEffect, useCallback, useRef, useState } from 'react';
import { tableActions } from 'widgets';
import { Cell, CellCol, CellRow, CellAllSelector, useContextMenu } from 'features';
import { CellsDataTypes, CellsEventEmitter, CellsEventNames, ICell, cellsFocusDefault } from 'entities';
import { useTypedSelector, useTypedDispatch } from 'shared';
import { useTableResize } from './useTableResize';
import styles from './SheetsTable.module.css';

let isMouseDown = false;
let selCells: any[] = [];

export const SheetsTable: FC = () => {
  const emitter = useRef<CellsEventEmitter | null>(null);
  const [preSelectedCells, setPreSelectedCells] = useState<ICell[]>([]);
  const { cols, rows, cells, selectCells, id } = useTypedSelector((state) => state.table);
  selCells = selectCells;
  const dispatch = useTypedDispatch();
  const { openContextMenu } = useContextMenu();

  const handler = (id: string, data: number) => {
    if (!isMouseDown) return;

    const ids = id.split(':').map((str) => Number(str));
    const firstCell = selCells[0];
    const lastCell = cells[ids[0]][ids[1]];

    setPreSelectedCells([firstCell, lastCell]);
  };

  useEffect(() => {
    const cellsEmitter = new CellsEventEmitter();
    emitter.current = cellsEmitter;

    const unsubscribes: (() => void)[] = [];

    for (const cellArr of cells) {
      for (const cell of cellArr) {
        unsubscribes.push(
          cellsEmitter.subscribe(cell.id, CellsEventNames.MOUSE_ENTER, (data) => {
            if (data.type === CellsDataTypes.MOUSE_ENTER_DEFAULT) {
              handler(data.id, data.payload.data);
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

  const onMouseDown = () => {
    isMouseDown = true;
    setPreSelectedCells([]);
  };

  const onMouseUp = () => {
    if (preSelectedCells.length <= 0) return;
    isMouseDown = false;
    dispatch(tableActions.setSelectCells(preSelectedCells));
    setPreSelectedCells([]);
  };

  return (
    <div onContextMenu={onContextMenu} className={styles.table} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
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
