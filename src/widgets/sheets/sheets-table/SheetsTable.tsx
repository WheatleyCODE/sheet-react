import { FC, useEffect, useCallback } from 'react';
import { Cell, CellCol, CellRow, CellAllSelector, useContextMenu } from 'features';
import { useTypedSelector } from 'shared/lib/hooks/redux/useTypedSelector';
import { useTypedDispatch } from 'shared/lib/hooks/redux/useTypedDispatch';
import { tableActions } from 'widgets/sheets/store/tableSlice';
import { ICell } from 'shared/types/table';
import styles from './SheetsTable.module.css';

export const SheetsTable: FC = () => {
  const { cols, rows, cells, selectCells, id } = useTypedSelector((state) => state.table);
  const dispatch = useTypedDispatch();
  const { openContextMenu } = useContextMenu();

  useEffect(() => {
    dispatch(tableActions.setSelectCells([cells[0]?.[0]]));
  }, [id]);

  const selectCell = useCallback((cell: ICell) => {
    dispatch(tableActions.setSelectCells([cell]));
  }, []);

  const onContextMenu = (e: React.MouseEvent) => {
    openContextMenu(e);
  };

  return (
    <div onContextMenu={onContextMenu} className={styles.table}>
      <div className={`${styles.table_row_header}`}>
        <CellAllSelector />

        {cols.map((col) => (
          <CellCol key={col.id} value={col.value} width={col.width} />
        ))}
      </div>

      {rows.map((row, i) => (
        <div key={row.id} className={styles.table_row}>
          <CellRow value={row.value} height={row.height} />

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
