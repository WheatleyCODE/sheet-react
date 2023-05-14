import { useEffect } from 'react';
import { v4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { createTable } from 'widgets/sheets/helpers/createTable';
import { useTypedDispatch } from 'shared/lib/hooks/redux/useTypedDispatch';
import { KVFactory, LocalStorageEngine } from 'shared/lib/kv-storage';
import { sheetsActions, tableActions } from 'widgets/index';
import { IndexedDB } from 'shared/lib/indexed-db';
import { ICell } from 'shared/types/table';

export const useInitSheets = () => {
  const { id } = useParams();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const initSheets = async () => {
      if (!id) return;
      const db = new IndexedDB(id, 'table', 'id');
      await db.open();

      const ls = KVFactory('sheets', new LocalStorageEngine());
      const sheets = await ls.get<string>(id);

      if (sheets) {
        const sheetsData = JSON.parse(sheets);
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
            // ! Fix
            cells[row][col] = { ...cell, id: '99:99' } as ICell;
          }
        }

        dispatch(sheetsActions.initSheets(sheetsData));
        dispatch(tableActions.initTable({ cols: sheetsData.cols, rows: sheetsData.rows, cells, id: 'tableId' }));
        return;
      }

      const { cols, rows, cells } = createTable(30, 20);
      const tableId = v4();
      const sheetsData = {
        name: 'Таблица',
        lists: [{ name: 'Лист 1', id: tableId }],
        settings: {},
        id,
      };

      dispatch(tableActions.initTable({ cols, rows, cells, id: tableId }));
      dispatch(sheetsActions.initSheets(sheetsData));

      for await (const row of cells) {
        for await (const cell of row) {
          db.put(cell.id, cell);
        }
      }

      await ls.set(id, JSON.stringify({ ...sheetsData, cols, rows }));
    };

    initSheets();
  }, []);
};
