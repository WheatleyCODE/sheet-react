import { FC, useEffect, useCallback } from 'react';
import styles from './SheetsTable.module.css';
import { Cell, CellCol, CellRow, CellAllSelector } from 'features';
import { useTypedSelector } from 'shared/lib/hooks/redux/useTypedSelector';
import { useTypedDispatch } from 'shared/lib/hooks/redux/useTypedDispatch';
import { tableActions } from 'widgets/tableSlice';
import { ICell } from 'shared/types/table';

export const SheetsTable: FC = () => {
  const { cols, rows, cells, selectCells } = useTypedSelector((state) => state.table);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(tableActions.setSelectCells([cells[0][0]]));
  }, []);

  const selectCell = useCallback((cell: ICell) => {
    dispatch(tableActions.setSelectCells([cell]));
  }, []);

  return (
    <div className={styles.table}>
      <div className={styles.table_row}>
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
              selectCell={selectCell}
              isActive={!!selectCells.find((el) => el.id === cell.id)}
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
