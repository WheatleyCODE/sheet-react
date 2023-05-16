import { useEffect } from 'react';
import { v4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { createTable } from 'widgets/sheets/helpers/createTable';
import { useTypedDispatch } from 'shared/lib/hooks/redux/useTypedDispatch';
import { KVFactory, LocalStorageEngine } from 'shared/lib/kv-storage';
import { sheetsActions, tableActions } from 'widgets/index';
import { IndexedDB } from 'shared/lib/indexed-db';
import { ICell } from 'shared/types/table';
import { ISheetsState } from 'widgets/sheets/store/sheetsSlice';

export const useInitSheets = () => {
  const { id } = useParams();
  const dispatch = useTypedDispatch();

  // ! FIX
  useEffect(() => {
    const initSheets = async () => {
      if (!id) return;

      const ls = KVFactory('sheets', new LocalStorageEngine());
      const sheets: ISheetsState = await ls.get<any>(id);

      if (sheets) {
        const db = new IndexedDB(sheets.lists[0].id, 'table', 'id');
        await db.open();

        const allCells = await db.getAll<ICell>();
        const cells: ICell[][] = [];

        for (let i = 0; i < 20; i++) {
          cells[i] = new Array(30);
        }

        for (const cell of allCells) {
          const id = cell.id.split(':');
          const row = Number(id[0]);
          const col = Number(id[1]);

          cells[row][col] = cell;

          if (row === 0 && col === 0) {
            cells[row][col] = { ...cell, id: '99:99' } as ICell;
          }
        }

        dispatch(sheetsActions.initSheets(sheets));
        dispatch(
          tableActions.initTable({
            cols: sheets.lists[0].cols,
            rows: sheets.lists[0].rows,
            cells,
            id: sheets.currentListId,
          })
        );
        return;
      }

      const { cols, rows, cells } = createTable(30, 20);
      const tableId = v4();

      const db = new IndexedDB(tableId, 'table', 'id');
      await db.open();

      const sheetsData: ISheetsState = {
        name: 'Таблица',
        lists: [{ name: 'Лист 1', id: tableId, cols, rows }],
        settings: {},
        currentListId: tableId,
        id,
        createDate: Date.now(),
        changeDate: Date.now(),
        openDate: Date.now(),
      };

      dispatch(tableActions.initTable({ cols, rows, cells, id: tableId }));
      dispatch(sheetsActions.initSheets(sheetsData));

      for (const row of cells) {
        for (const cell of row) {
          db.put(cell.id, cell);
        }
      }

      await ls.set(id, sheetsData as any);
    };

    initSheets();
  }, []);
};
